export const INDEX_TEMPLATE = (CLASSES: string, IMPORTS?: string) => `${
  IMPORTS ? IMPORTS : ''
}
${CLASSES}`
