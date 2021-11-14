import { DMMF } from '@prisma/generator-helper'

export const removeDublicates = (
  arr: any,
  key: string
): {
  name: string
  kind: DMMF.FieldKind
}[] =>
  arr.reduce((acc: any, current: any) => {
    const x = acc.find((item: any) => item[key] === current[key])
    if (!x) {
      return acc.concat([current])
    } else {
      return acc
    }
  }, [])
