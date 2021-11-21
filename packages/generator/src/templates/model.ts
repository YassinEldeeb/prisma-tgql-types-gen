export const MODEL_TEMPLATE = (
  CLASSNAME: string,
  FIELDS: string,
  CUSTOMFIELDS: string = '  // skip overwrite 👇\n}',
) => {
  return `export class ${CLASSNAME} {
${FIELDS}
${CUSTOMFIELDS}`
}
