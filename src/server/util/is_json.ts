export function is_json(content: string) {
  try {
    JSON.parse(content);
    return true;
  } catch (error) {
    return false;
  }
}
