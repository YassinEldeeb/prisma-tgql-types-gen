import prettier from 'prettier'

export const format = (content: string): Promise<string> => {
  return new Promise((res, rej) =>
    prettier.resolveConfig(process.cwd()).then((options) => {
      if (!options) {
        res(content) // prettier has no config, no need to format
      }

      try {
        const formatted = prettier.format(content, {
          ...options,
          parser: 'typescript',
        })

        res(formatted)
      } catch (error) {
        console.error(error)
        rej(error)
      }
    }),
  )
}
