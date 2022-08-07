export const toPascalCase = (str: string) => {
  return (' ' + str).toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => {
    return chr.toUpperCase()
  })
}
