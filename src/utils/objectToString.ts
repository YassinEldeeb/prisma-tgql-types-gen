export function objToString(obj: any) {
  let str = ''
  let index = 0
  const entries = Object.entries(obj)
  for (const [p, val] of entries) {
    str += `${index === 0 ? '' : ' '}${p}: ${val}${
      entries.length === index + 1 ? '' : ','
    }`
    index++
  }
  return `{ ${str} }`
}
