#!/usr/bin/env python3
"""Antigravity macOS, Linux & Windows localization installer. Python 3.9+, standard library only."""
import argparse
import copy
import hashlib
import json
import os
from pathlib import Path
import plistlib
import shutil
import stat
import struct
import subprocess
import sys
import tempfile

ROOT = Path(__file__).resolve().parents[1]
MARKER = b'/* TeacherXuAI Antigravity Chinese UI'
MAX_HEADER = 32 * 1024 * 1024
LINUX_DEFAULT_PATHS = (
    Path('/opt/Antigravity'),
    Path('/opt/antigravity'),
    Path('/usr/share/antigravity'),
    Path('/usr/lib/antigravity'),
    Path.home() / '.local/share/antigravity',
    Path.home() / 'Antigravity-x64',
    Path.home() / 'Antigravity-arm64',
    Path.home() / 'Antigravity',
)


def _windows_default_paths():
    local_appdata = Path(os.environ.get('LOCALAPPDATA', str(Path.home() / 'AppData/Local')))
    program_files = Path(os.environ.get('ProgramFiles', r'C:\Program Files'))
    program_files_x86 = Path(os.environ.get('ProgramFiles(x86)', r'C:\Program Files (x86)'))
    return (
        local_appdata / 'Programs/Antigravity',
        local_appdata / 'Antigravity',
        program_files / 'Antigravity',
        program_files_x86 / 'Antigravity',
        Path.home() / 'AppData/Local/Programs/Antigravity',
        Path.home() / 'Antigravity',
        Path.home() / 'Antigravity-win32-x64',
        Path.home() / 'Antigravity-win32-arm64',
    )


WINDOWS_DEFAULT_PATHS = _windows_default_paths()


def digest(data):
    return hashlib.sha256(data).hexdigest()


class Archive:
    """Read ASAR without extracting vendor files; replace one packed entry."""
    def __init__(self, data):
        if len(data) < 16:
            raise ValueError('ASAR header is truncated')
        size, header_size, payload_size, json_size = struct.unpack_from('<4I', data)
        if (size != 4 or header_size > MAX_HEADER or header_size < 8 or
                payload_size + 4 != header_size or json_size > payload_size - 4 or
                8 + header_size > len(data)):
            raise ValueError('Invalid ASAR header')
        self.raw_header = data[16:16 + json_size]
        self.header = json.loads(self.raw_header)
        self.body = data[8 + header_size:]
        if not isinstance(self.header.get('files'), dict):
            raise ValueError('Missing ASAR file table')

    def entry(self, name):
        if any(part in ('', '.', '..') for part in name.split('/')):
            raise ValueError('Invalid archive path')
        item = self.header
        for part in name.split('/'):
            item = item['files'][part]
        if item.get('unpacked') or 'link' in item or 'files' in item:
            raise ValueError('Expected a packed regular file')
        return item

    def read(self, name):
        entry = self.entry(name)
        offset, size = int(entry['offset']), int(entry['size'])
        if offset < 0 or size < 0 or offset + size > len(self.body):
            raise ValueError('Entry outside ASAR bounds')
        data = self.body[offset:offset + size]
        integrity = entry.get('integrity')
        if integrity:
            if integrity.get('algorithm') != 'SHA256' or integrity.get('hash') != digest(data):
                raise ValueError('Entry checksum mismatch')
        return data

    def replace(self, name, data):
        header = copy.deepcopy(self.header)
        item = header
        for part in name.split('/'):
            item = item['files'][part]
        self.read(name)  # Validate bounds and checksum before replacing.
        block_size = item.get('integrity', {}).get('blockSize', 4 * 1024 * 1024)
        if not isinstance(block_size, int) or not 0 < block_size <= MAX_HEADER:
            raise ValueError('Invalid integrity block size')
        item.update(size=len(data), offset=str(len(self.body)), integrity={
            'algorithm': 'SHA256', 'hash': digest(data), 'blockSize': block_size,
            'blocks': [digest(data[i:i + block_size]) for i in range(0, len(data), block_size)]
        })
        raw = json.dumps(header, separators=(',', ':'), ensure_ascii=False).encode()
        pad = b'\0' * (-len(raw) % 4)
        header_pickle = struct.pack('<II', 4 + len(raw) + len(pad), len(raw)) + raw + pad
        result = struct.pack('<II', 4, len(header_pickle)) + header_pickle + self.body + data
        return result


def build():
    dictionary = json.loads((ROOT / 'locales/zh-CN.json').read_text(encoding='utf-8'))
    if not dictionary or not all(isinstance(k, str) and k.strip() == k and
                                 isinstance(v, str) and v for k, v in dictionary.items()):
        raise ValueError('Invalid translation dictionary')
    source = (ROOT / 'src/runtime.js').read_text(encoding='utf-8')
    token = '/*__DICTIONARY__*/ {}'
    if source.count(token) != 1:
        raise ValueError('Invalid runtime template')
    payload = source.replace(token, json.dumps(dictionary, ensure_ascii=False, sort_keys=True))
    return payload.encode('utf-8')


def is_link(path):
    if path.is_symlink():
        return True
    is_junction = getattr(path, 'is_junction', None)
    if callable(is_junction):
        return is_junction()
    if sys.platform == 'win32':
        try:
            st = os.lstat(path)
            return bool(
                getattr(st, 'st_file_attributes', 0) & getattr(stat, 'FILE_ATTRIBUTE_REPARSE_POINT', 0x400)
                and getattr(st, 'st_reparse_tag', 0) in (
                    getattr(stat, 'IO_REPARSE_TAG_MOUNT_POINT', 0xA0000003),
                    getattr(stat, 'IO_REPARSE_TAG_SYMLINK', 0xA000000C),
                )
            )
        except OSError:
            return False
    return False


def executable_name(platform):
    if platform == 'darwin':
        return 'Contents/MacOS/Antigravity'
    return 'Antigravity.exe' if platform == 'win32' else 'antigravity'


def same_app_path(recorded, current, platform=None):
    if not isinstance(recorded, str):
        return False
    if (platform or app_platform(current)) == 'win32':
        return os.path.normcase(os.path.abspath(recorded)) == os.path.normcase(os.path.abspath(current))
    return recorded == str(current)


def default_app_path():
    if sys.platform == 'win32':
        for candidate in WINDOWS_DEFAULT_PATHS:
            if (candidate / 'resources/app.asar').is_file() and (candidate / 'Antigravity.exe').is_file():
                return candidate
        for cmd in ('Antigravity.exe', 'antigravity'):
            which_bin = shutil.which(cmd)
            if which_bin:
                bin_path = Path(os.path.abspath(which_bin))
                if not is_link(bin_path):
                    for parent in (bin_path.parent, *list(bin_path.parents)[:3]):
                        if (parent / 'resources/app.asar').is_file() and (parent / 'Antigravity.exe').is_file():
                            return parent
        return WINDOWS_DEFAULT_PATHS[0]
    if not sys.platform.startswith('linux'):
        return Path('/Applications/Antigravity.app')
    for candidate in LINUX_DEFAULT_PATHS:
        if (candidate / 'resources/app.asar').is_file() and (candidate / 'antigravity').is_file():
            return candidate
    which_bin = shutil.which('antigravity')
    if which_bin:
        bin_path = Path(os.path.abspath(which_bin))
        if not is_link(bin_path) and (bin_path.parent / 'resources/app.asar').is_file():
            return bin_path.parent
    return LINUX_DEFAULT_PATHS[0]


def app_platform(app):
    app = Path(os.path.abspath(app))
    backup, state = paths(app)
    if app.suffix == '.app' or (app / 'Contents').exists() or (backup / 'Contents').exists():
        return 'darwin'
    if (app / 'Antigravity.exe').exists() or (backup / 'Antigravity.exe').exists():
        return 'win32'
    if (app / 'antigravity').exists() or (backup / 'antigravity').exists():
        return 'linux'
    if state.is_file() and not is_link(state):
        try:
            metadata = json.loads(state.read_text(encoding='utf-8'))
            if isinstance(metadata, dict) and metadata.get('platform') in ('darwin', 'linux', 'win32'):
                return metadata['platform']
        except (ValueError, OSError):
            pass
    if (app / 'resources/app.asar').exists() or (backup / 'resources/app.asar').exists():
        return 'win32' if sys.platform == 'win32' else 'linux'
    if sys.platform == 'win32':
        return 'win32'
    return 'linux' if sys.platform.startswith('linux') else 'darwin'


def asar_path(app, platform=None):
    platform = platform or app_platform(app)
    return app / ('Contents/Resources/app.asar' if platform == 'darwin' else 'resources/app.asar')


def fs_path(path):
    s = os.path.abspath(str(path))
    if os.name != 'nt' or s.startswith('\\\\?\\'):
        return Path(s)
    if s.startswith('\\\\'):
        return Path('\\\\?\\UNC\\' + s[2:])
    return Path('\\\\?\\' + s)


def assert_no_escaping_symlinks(root):
    root_fs = fs_path(root)
    root_resolved = root_fs.resolve()
    for current_root, dirnames, filenames in os.walk(root_fs, followlinks=False):
        base = Path(current_root)
        kept_dirs = []
        for name in dirnames:
            entry = base / name
            if is_link(entry):
                try:
                    entry.resolve().relative_to(root_resolved)
                except ValueError as exc:
                    raise ValueError('Application directory contains a symlink escaping the app root: ' + str(entry)) from exc
            else:
                kept_dirs.append(name)
        dirnames[:] = kept_dirs
        for name in filenames:
            entry = base / name
            if is_link(entry):
                try:
                    entry.resolve().relative_to(root_resolved)
                except ValueError as exc:
                    raise ValueError('Application directory contains a symlink escaping the app root: ' + str(entry)) from exc


def permission_error_hint():
    if sys.platform == 'win32':
        return 'run as Administrator or use a user-writable installation path'
    return 'run with appropriate permissions (e.g. sudo) or use a user-writable installation path'


def ensure_writable(*targets):
    for target in targets:
        target = Path(target)
        check = target if target.exists() else target.parent
        mode = (os.W_OK | os.X_OK) if check.is_dir() else os.W_OK
        if not check.exists() or not os.access(check, mode):
            raise ValueError(
                f'Insufficient permissions to modify {target}; ' + permission_error_hint()
            )


def assert_app_path(app):
    app = Path(os.path.abspath(app))
    if app.resolve() != app or is_link(app):
        raise ValueError('Symlink application paths are not supported')
    platform = app_platform(app)
    if platform == 'darwin':
        if app.suffix != '.app' or not app.is_dir():
            raise ValueError('Select an existing .app bundle')
        for relative in ('Contents/Info.plist', 'Contents/Resources/app.asar'):
            p = app / relative
            if not p.is_file() or is_link(p) or p.resolve() != p:
                raise ValueError('Expected regular bundle files: ' + relative)
    else:
        if not app.is_dir():
            raise ValueError('Select an existing Antigravity application directory')
        for relative in (executable_name(platform), 'resources/app.asar'):
            p = app / relative
            if not p.is_file() or is_link(p) or p.resolve() != p:
                raise ValueError('Expected regular application files: ' + relative)
        assert_no_escaping_symlinks(app)
    return app


def paths(app):
    return app.with_name(app.name + '.zh-cn-original'), app.with_name(app.name + '.zh-cn-state.json')


def stale_backup_version(app, version, backup, state):
    if (is_link(backup) or is_link(state) or not backup.is_dir() or
            not state.is_file() or backup.resolve() != backup):
        return None
    platform = app_platform(app)
    exe_rel = executable_name(platform)
    required = ('Contents/Info.plist', 'Contents/Resources/app.asar') if platform == 'darwin' else (exe_rel, 'resources/app.asar')
    for relative in required:
        f = backup / relative
        if not f.is_file() or is_link(f) or f.resolve() != f:
            return None
    try:
        metadata = json.loads(state.read_text(encoding='utf-8'))
    except (ValueError, OSError):
        return None
    old_version = metadata.get('version') if isinstance(metadata, dict) else None
    if (metadata.get('schema') != 1 or not same_app_path(metadata.get('app'), app, platform) or
            not isinstance(old_version, str) or old_version == version):
        return None
    if platform == 'darwin':
        if (digest((backup / 'Contents/Resources/app.asar').read_bytes()) != metadata.get('original_asar') or
                digest((backup / 'Contents/Info.plist').read_bytes()) != metadata.get('original_plist')):
            return None
    else:
        if (digest((backup / 'resources/app.asar').read_bytes()) != metadata.get('original_asar') or
                digest((backup / exe_rel).read_bytes()) != metadata.get('original_executable')):
            return None
    return old_version


def inspect(app):
    app = assert_app_path(app)
    platform = app_platform(app)
    compatibility = json.loads((ROOT / 'tools/compatibility.json').read_text(encoding='utf-8'))
    if platform == 'darwin':
        plist = plistlib.loads((app / 'Contents/Info.plist').read_bytes())
        if plist.get('CFBundleIdentifier') != compatibility['bundle_id']:
            raise ValueError('This is not Antigravity Desktop')
        version = plist.get('CFBundleShortVersionString')
        rule = compatibility['versions'].get(version)
        if not rule:
            raise ValueError('Unsupported version: ' + str(version) + '; no files changed')
        raw = (app / 'Contents/Resources/app.asar').read_bytes()
        archive = Archive(raw)
        package = json.loads(archive.read('package.json'))
        if package.get('name') != 'antigravity' or package.get('version') != version:
            raise ValueError('Bundle version differs from package version')
        integrity = plist.get('ElectronAsarIntegrity', {}).get('Resources/app.asar')
        if not integrity or integrity.get('algorithm') != 'SHA256' or integrity.get('hash') != digest(archive.raw_header):
            raise ValueError('Bundle ASAR integrity does not match')
    else:
        plist = None
        raw = (app / 'resources/app.asar').read_bytes()
        archive = Archive(raw)
        package = json.loads(archive.read('package.json'))
        if package.get('name') != 'antigravity' or package.get('productName', 'Antigravity') != 'Antigravity':
            raise ValueError('This is not Antigravity Desktop')
        version = package.get('version')
        rule = compatibility['versions'].get(version)
        if not rule:
            raise ValueError('Unsupported version: ' + str(version) + '; no files changed')
        if 'platforms' in rule and platform not in rule['platforms']:
            label = 'Windows' if platform == 'win32' else 'Linux'
            raise ValueError(f'Unsupported version on {label}: ' + str(version) + '; no files changed')
    preload = archive.read(rule['entry'])
    patched = MARKER in preload
    if not patched:
        if digest(preload) != rule['preload_sha256']:
            raise ValueError('Unknown preload fingerprint; refusing to patch')
        for path, spec in rule.get('text_patches', {}).items():
            raw_entry = archive.read(path)
            if digest(raw_entry) != spec['sha256']:
                raise ValueError('Unknown ' + path + ' fingerprint; refusing to patch')
            text = raw_entry.decode('utf-8')
            for old, _ in spec['replacements']:
                if text.count(old) != 1:
                    raise ValueError('Expected exact match in ' + path + '; refusing to patch')
    else:
        for path in rule.get('text_patches', {}):
            archive.read(path)
    return {'version': version, 'archive': archive, 'rule': rule, 'plist': plist,
            'platform': platform, 'asar_sha256': digest(raw), 'patched': patched, 'app': app}


def report(info):
    backup, state = paths(info['app'])
    platform = info.get('platform', 'darwin')
    scope = 'Settings, navigation, Automations, approval & panel toolbars'
    if info['rule'].get('text_patches'):
        scope += '; native quit dialog & tray'
    if platform == 'darwin':
        signature_effect = 'local ad-hoc outer signature and explicit app-scoped library-validation exception'
    elif platform == 'win32':
        signature_effect = 'ASAR internal block integrity updated; no outer executable modification required on Windows'
    else:
        signature_effect = 'ASAR internal block integrity updated; no outer binary signature modification required on Linux'
    result = {'app': str(info['app']), 'platform': platform, 'version': info['version'],
              'patched': info['patched'], 'asar_sha256': info['asar_sha256'],
              'translations': len(json.loads((ROOT / 'locales/zh-CN.json').read_text(encoding='utf-8'))),
              'backup': str(backup), 'state_present': state.exists(),
              'native_ui_tested': info['rule']['native_ui_tested'],
              'scope': scope,
              'signature_effect': signature_effect}
    stale_ver = stale_backup_version(info['app'], info['version'], backup, state) if not info['patched'] else None
    if stale_ver:
        result['stale_backup_version'] = stale_ver
    return result


def run(*args):
    return subprocess.run(args, check=True, capture_output=True, text=True, errors='replace')


def ensure_stopped(app):
    platform = app_platform(app)
    if platform == 'win32':
        output = run(
            'powershell', '-NoProfile', '-NonInteractive', '-Command',
            'Get-CimInstance Win32_Process | ForEach-Object { $_.ExecutablePath; $_.CommandLine }',
        ).stdout
        targets = (
            str(app / 'Antigravity.exe').replace('\\', '/').lower(),
            str(app / 'resources').replace('\\', '/').lower() + '/',
        )
        for line in output.splitlines():
            normalized = line.replace('\\', '/').lower()
            if 'patcher.py' in normalized:
                continue
            if any(t in normalized for t in targets):
                raise ValueError('Quit Antigravity completely before patching or restoring, then retry')
        return
    output = run('/bin/ps', '-axo', 'command=').stdout
    if platform == 'darwin':
        executable = str(app / 'Contents/MacOS').replace('\\', '/') + '/'
        if any(executable in line.replace('\\', '/') for line in output.splitlines()):
            raise ValueError('Quit Antigravity completely with Cmd+Q, then retry')
    else:
        targets = (
            str(app / 'antigravity').replace('\\', '/'),
            str(app / 'resources').replace('\\', '/') + '/',
        )
        for line in output.splitlines():
            normalized = line.replace('\\', '/')
            if 'patcher.py' in normalized:
                continue
            if any(t in normalized for t in targets):
                raise ValueError('Quit Antigravity completely before patching or restoring, then retry')


def leave_app_dir_if_inside(app):
    if sys.platform != 'win32':
        return
    try:
        cwd = Path.cwd().resolve()
        app_resolved = Path(app).resolve()
        if cwd == app_resolved or app_resolved in cwd.parents:
            os.chdir(Path(app).parent)
    except OSError:
        pass


def verify_signature(app):
    run('/usr/bin/codesign', '--verify', '--deep', '--strict', str(app))


def patch_bundle(app):
    info = inspect(app)
    if info['patched']:
        raise ValueError('Already patched')
    entry = info['rule']['entry']
    updates = {}
    for path, spec in info['rule'].get('text_patches', {}).items():
        text = info['archive'].read(path).decode('utf-8')
        for old, new in spec['replacements']:
            if text.count(old) != 1:
                raise ValueError('Expected exact match in ' + path)
            text = text.replace(old, new, 1)
        updates[path] = text.encode('utf-8')
    base_preload = updates.get(entry, info['archive'].read(entry))
    updates[entry] = base_preload + b'\n' + build() + b'\n'
    rebuilt = info['archive']
    archive_bytes = None
    for path, payload in updates.items():
        archive_bytes = rebuilt.replace(path, payload)
        rebuilt = Archive(archive_bytes)
    for path, payload in updates.items():
        if rebuilt.read(path) != payload:
            raise ValueError('Rebuilt archive verification failed')
    if info.get('platform', 'darwin') == 'darwin':
        plist = info['plist']
        plist['ElectronAsarIntegrity']['Resources/app.asar']['hash'] = digest(rebuilt.raw_header)
        (app / 'Contents/Resources/app.asar').write_bytes(archive_bytes)
        (app / 'Contents/Info.plist').write_bytes(plistlib.dumps(plist))
    else:
        (app / 'resources/app.asar').write_bytes(archive_bytes)
    return digest(archive_bytes)


def install(app, acknowledge=False, allow_local_libraries=False, replace_stale_backup=False):
    platform = app_platform(app)
    if platform == 'darwin':
        if sys.platform != 'darwin':
            raise ValueError('v0.1 supports macOS installation only')
        if not acknowledge:
            raise ValueError('Read README first. Installation requires --acknowledge-signature-change')
        if not allow_local_libraries:
            raise ValueError('Local signing requires an app-scoped library-validation exception; read README and use --allow-local-library-loading')
    elif platform == 'linux':
        if not sys.platform.startswith('linux'):
            raise ValueError('Linux installation requires running on Linux')
    elif platform == 'win32':
        if sys.platform != 'win32':
            raise ValueError('Windows installation requires running on Windows')
    info = inspect(app)
    app = info['app']
    if info['patched']:
        raise ValueError('Already patched; restore before installing a different patch version')
    backup, state = paths(app)
    has_existing = backup.exists() or state.exists() or is_link(backup) or is_link(state)
    stale_version = stale_backup_version(app, info['version'], backup, state) if has_existing else None
    if has_existing:
        if not stale_version:
            raise ValueError('Backup/state already exists; refusing to overwrite it')
        if not replace_stale_backup:
            raise ValueError('Backup/state already exists from ' + stale_version +
                             '; pass --replace-stale-backup after an app update')
    ensure_writable(app.parent, app, asar_path(app, platform), *([backup, state] if stale_version else []))
    ensure_stopped(app)
    if platform == 'darwin':
        if stale_version:
            verify_signature(backup)
        verify_signature(app)
        run('/usr/sbin/spctl', '--assess', '--type', 'execute', str(app))
        signature = run('/usr/bin/codesign', '-dv', '--verbose=2', str(app)).stderr
        if 'Authority=Developer ID Application: Google LLC (EQHXZ8M8AV)' not in signature:
            raise ValueError('Original application must have a Google LLC signature')
    else:
        if stale_version:
            assert_no_escaping_symlinks(backup)
    staging = Path(tempfile.mkdtemp(prefix='.antigravity-zh-', dir=app.parent))
    staged = staging / app.name
    old_backup = staging / 'stale-backup.app'
    old_state = staging / 'stale-state.json'
    moved_stale_backup = False
    moved_stale_state = False
    moved_original = False
    committed = False
    state_created = False
    try:
        if platform == 'darwin':
            run('/usr/bin/ditto', str(app), str(staged))
            patched_hash = patch_bundle(staged)
            # Ad-hoc identities have no Apple Team ID. Explicit opt-in is required to
            # load the original Google-signed frameworks in this locally signed process.
            entitlements_raw = run('/usr/bin/codesign', '-d', '--entitlements', ':-', str(app)).stdout
            entitlements = plistlib.loads(entitlements_raw.encode()) if entitlements_raw.strip() else {}
            entitlements['com.apple.security.cs.disable-library-validation'] = True
            entitlements_path = staging / 'local-entitlements.plist'
            entitlements_path.write_bytes(plistlib.dumps(entitlements))
            run('/usr/bin/codesign', '--force', '--sign', '-',
                '--preserve-metadata=flags,runtime', '--entitlements', str(entitlements_path), str(staged))
            verify_signature(staged)
        else:
            shutil.copytree(fs_path(app), fs_path(staged), symlinks=True)
            patched_hash = patch_bundle(staged)
        ensure_stopped(app)
        # Detect an updater replacing the original while we prepared the copy.
        if inspect(app)['asar_sha256'] != info['asar_sha256']:
            raise ValueError('Original app changed during preparation; retry')
        if platform == 'darwin':
            metadata = {'schema': 1, 'app': str(app), 'version': info['version'],
                        'original_asar': info['asar_sha256'], 'patched_asar': patched_hash,
                        'original_plist': digest((app / 'Contents/Info.plist').read_bytes())}
        else:
            metadata = {'schema': 1, 'platform': platform, 'app': str(app), 'version': info['version'],
                        'original_asar': info['asar_sha256'], 'patched_asar': patched_hash,
                        'original_executable': digest((app / executable_name(platform)).read_bytes())}
        if stale_version:
            os.rename(fs_path(backup), fs_path(old_backup))
            moved_stale_backup = True
            os.rename(state, old_state)
            moved_stale_state = True
        # Reserve the manifest exclusively; never overwrite an existing recovery record.
        with state.open('x', encoding='utf-8') as f:
            state_created = True
            json.dump(metadata, f, indent=2)
            f.flush()
            os.fsync(f.fileno())
        leave_app_dir_if_inside(app)
        os.rename(fs_path(app), fs_path(backup))
        moved_original = True
        try:
            os.rename(fs_path(staged), fs_path(app))
        except BaseException:
            os.rename(fs_path(backup), fs_path(app))
            moved_original = False
            raise
        committed = True
    finally:
        if not committed and not moved_original:
            if state_created and state.is_file():
                state.unlink()
            if moved_stale_state and not state.exists():
                os.rename(old_state, state)
            if moved_stale_backup and not backup.exists():
                os.rename(fs_path(old_backup), fs_path(backup))
        shutil.rmtree(fs_path(staging), ignore_errors=True)
    return report(inspect(app))


def restore(app):
    app = Path(os.path.abspath(app))
    platform = app_platform(app)
    if platform == 'darwin':
        if sys.platform != 'darwin':
            raise ValueError('v0.1 supports macOS restoration only')
    elif platform == 'linux':
        if not sys.platform.startswith('linux'):
            raise ValueError('Linux restoration requires running on Linux')
    elif platform == 'win32':
        if sys.platform != 'win32':
            raise ValueError('Windows restoration requires running on Windows')
    backup, state = paths(app)
    if is_link(state) or is_link(backup) or backup.resolve() != backup:
        raise ValueError('Invalid recovery path')
    if not state.is_file():
        raise ValueError('No recovery state file found for ' + str(app))
    metadata = json.loads(state.read_text(encoding='utf-8'))
    if metadata.get('schema') != 1 or not same_app_path(metadata.get('app'), app, platform):
        raise ValueError('Recovery record does not match the application')
    ensure_writable(app.parent, state, *([backup] if backup.exists() else []), *([app] if app.exists() else []))
    ensure_stopped(app)
    exe_rel = executable_name(platform)
    if not backup.exists() and app.exists():
        assert_app_path(app)
        if platform == 'darwin':
            if (digest((app / 'Contents/Resources/app.asar').read_bytes()) == metadata['original_asar'] and
                    digest((app / 'Contents/Info.plist').read_bytes()) == metadata['original_plist']):
                verify_signature(app)
                state.unlink()
                return {'restored': True, 'app': str(app), 'version': metadata['version'],
                        'recovered': 'interrupted before original app was moved'}
        else:
            if (digest((app / 'resources/app.asar').read_bytes()) == metadata['original_asar'] and
                    digest((app / exe_rel).read_bytes()) == metadata['original_executable']):
                state.unlink()
                return {'restored': True, 'app': str(app), 'version': metadata['version'],
                        'recovered': 'interrupted before original app was moved'}
    if platform == 'darwin':
        if digest((backup / 'Contents/Resources/app.asar').read_bytes()) != metadata['original_asar']:
            raise ValueError('Backup archive checksum mismatch')
        if digest((backup / 'Contents/Info.plist').read_bytes()) != metadata['original_plist']:
            raise ValueError('Backup Info.plist checksum mismatch')
        verify_signature(backup)
    else:
        if not backup.is_dir():
            raise ValueError('Backup directory is missing')
        for relative in (exe_rel, 'resources/app.asar'):
            bf = backup / relative
            if not bf.is_file() or is_link(bf) or bf.resolve() != bf:
                raise ValueError('Expected regular backup files: ' + relative)
        assert_no_escaping_symlinks(backup)
        if digest((backup / 'resources/app.asar').read_bytes()) != metadata['original_asar']:
            raise ValueError('Backup archive checksum mismatch')
        if digest((backup / exe_rel).read_bytes()) != metadata['original_executable']:
            raise ValueError('Backup executable checksum mismatch')
    # Missing app is recoverable after interruption between the two directory renames.
    if app.exists():
        assert_app_path(app)
        if digest(asar_path(app, platform).read_bytes()) != metadata['patched_asar']:
            raise ValueError('Installed app changed (possibly updated). Restore would overwrite it; stopped')
    staging = Path(tempfile.mkdtemp(prefix='.antigravity-zh-restore-', dir=app.parent))
    current = staging / app.name
    try:
        if app.exists():
            leave_app_dir_if_inside(app)
            os.rename(fs_path(app), fs_path(current))
        try:
            os.rename(fs_path(backup), fs_path(app))
        except BaseException:
            if current.exists():
                os.rename(fs_path(current), fs_path(app))
            raise
        state.unlink()
    finally:
        # If rollback itself fails, retain current as a recoverable copy.
        if app.exists():
            shutil.rmtree(fs_path(staging), ignore_errors=True)
    return {'restored': True, 'app': str(app), 'version': metadata['version']}


def main():
    if hasattr(sys.stdout, 'reconfigure'):
        sys.stdout.reconfigure(encoding='utf-8', errors='replace')
    if hasattr(sys.stderr, 'reconfigure'):
        sys.stderr.reconfigure(encoding='utf-8', errors='replace')
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('command', choices=('doctor', 'build', 'install', 'restore'))
    parser.add_argument('--app', type=Path, default=None)
    parser.add_argument('--acknowledge-signature-change', action='store_true')
    parser.add_argument('--allow-local-library-loading', action='store_true')
    parser.add_argument('--replace-stale-backup', action='store_true')
    args = parser.parse_args()
    app = args.app if args.app is not None else default_app_path()
    try:
        if args.command == 'build':
            target = ROOT / 'dist/antigravity-zh-cn.js'
            target.parent.mkdir(exist_ok=True)
            target.write_bytes(build())
            result = {'built': str(target), 'sha256': digest(target.read_bytes())}
        elif args.command == 'doctor':
            result = report(inspect(app))
        elif args.command == 'install':
            result = install(app, args.acknowledge_signature_change,
                             args.allow_local_library_loading, args.replace_stale_backup)
        else:
            result = restore(app)
        print(json.dumps(result, ensure_ascii=False, indent=2))
    except PermissionError as exc:
        print(
            f'Stopped: Insufficient permissions ({exc}); ' + permission_error_hint(),
            file=sys.stderr,
        )
        return 1
    except (ValueError, KeyError, OSError, subprocess.CalledProcessError) as exc:
        print('Stopped: ' + str(exc), file=sys.stderr)
        if isinstance(exc, subprocess.CalledProcessError) and exc.stderr:
            print(exc.stderr.strip(), file=sys.stderr)
        return 1
    return 0


if __name__ == '__main__':
    sys.exit(main())
