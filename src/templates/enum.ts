export const ENUM_TEMPLATE = (
  ENUM: string,
  ENUMVALUES: string,
  REGISTEREDNAME: string,
) => `import { registerEnumType } from 'type-graphql'

export enum ${ENUM} {
${ENUMVALUES}
}
registerEnumType(${ENUM}, {
    name: '${REGISTEREDNAME}',
})
`
