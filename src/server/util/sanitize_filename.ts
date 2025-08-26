export function sanitize_filename(filename: string): string {
  switch (process.platform) {
    case 'win32':
    case 'cygwin':
      return filename.replace(/[\s<>:"/\\|?*\x00-\x1F\x7F]/g, '_');
    case 'darwin':
    case 'linux':
      return filename.replace(/[:\/]/g, '_');
    default:
      return filename;
  }
}
