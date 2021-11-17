export const DECORATOR_TEMPLATE = (type: string, object?: string) =>
  `@Field(${type}${type && object ? ', ' : ''}${object ? object : ''})`
