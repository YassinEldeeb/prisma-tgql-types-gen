export const MODEL_TEMPLATE = (
  CLASSNAME: string,
  FIELDS: string,
  CUSTOMFIELDS: string = '  // skip overwrite 👇\n}',
  EXTENDS: string = '',
) => {
  return `${
    EXTENDS.length > 0 ? '@ObjectType()\n' : ''
  }export class ${CLASSNAME}${EXTENDS} {
${FIELDS}
${CUSTOMFIELDS}`
}
