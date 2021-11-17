export const HideOrPrivate = (
  extractedData: any,
  fieldName: string,
  modelName: string
) => {
  const isPrivate = !!extractedData.find(
    (e: any) => e.fieldName === fieldName && modelName === e.modelName
  )?.private

  const isHide = !!extractedData.find(
    (e: any) => e.fieldName === fieldName && modelName === e.modelName
  )?.hide

  return { isHide, isPrivate }
}
