export const removeTheFirstChar = (str: string, char: string) => {
  let copy = ''
  let found = false

  str.split('').forEach((e) => {
    if (e === char && !found) {
      return (found = true)
    }
    copy += e
  })

  return copy
}
