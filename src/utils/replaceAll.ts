export function replaceAll(str: string, match: string, replacement: string) {
  return str.split(match).join(replacement)
}
