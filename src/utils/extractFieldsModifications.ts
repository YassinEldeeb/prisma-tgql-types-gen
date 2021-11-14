export const ExtractFieldsModifications = (dataModel: string) => {
  let hideField = false
  let privateField = false
  let currentCodeBlock: { name: string; type: 'model' | 'enum' }
  const extractedData: {
    fieldName: string
    modelName: string
    private?: boolean
    hide?: boolean
  }[] = []

  dataModel.split('\n').forEach((line) => {
    if (line.includes('@hide')) {
      return (hideField = true)
    } else if (line.includes('@private')) {
      return (privateField = true)
    }

    if (line.includes('model')) {
      currentCodeBlock = { name: line.split(' ')[1], type: 'model' }
    } else if (line.includes('enum')) {
      currentCodeBlock = { name: line.split(' ')[1], type: 'enum' }
    }

    const fieldName = line
      .split(' ')
      .filter((e) => e !== '')
      .map((e) => e.replace('\r', ''))[0]

    if (hideField) {
      extractedData.push({
        fieldName,
        hide: true,
        modelName: currentCodeBlock.name,
      })

      // Reset
      hideField = false
    } else if (privateField) {
      extractedData.push({
        fieldName,
        private: true,
        modelName: currentCodeBlock.name,
      })

      // Reset
      privateField = false
    }
  })

  return extractedData
}
