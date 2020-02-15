export function matchString(string: string, regex: RegExp): string {
  const matches = string.match(regex);
  if (matches) {
    return matches[0];
  }
  return '';
}
