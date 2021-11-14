export const prismaTypes = [
  'String',
  'Int',
  'Float',
  'Boolean',
  'DateTime',
  'BigInt',
  'Decimal',
  'Json',
  'Bytes',
]

export const convertType = (type: string) => {
  if (prismaTypes.includes(type)) {
    switch (type) {
      case 'String':
        return 'string'
      case 'Boolean':
        return 'boolean'
      case 'Int':
        return 'number'
      case 'BigInt':
        return 'number'
      case 'Decimal':
        return 'number'
      case 'Float':
        return 'number'
      case 'DateTime':
        return 'Date'
      case 'Json':
        return 'Prisma.JsonValue'
      case 'Bytes':
        return 'Buffer'
    }
  } else {
    return type
  }
}
