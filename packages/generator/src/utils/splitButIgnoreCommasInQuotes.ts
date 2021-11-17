export function splitButIgnoreCommasInQuotes(str: string) {
  //split the str first
  //then merge the elments between two double quotes
  var delimiter = ','
  var singleQuotes = `'`
  var doubleQuotes = `"`
  var templateString = '`'
  var elements = str.split(delimiter)
  var newElements = []
  for (var i = 0; i < elements.length; ++i) {
    if (
      elements[i].indexOf(singleQuotes) >= 0 ||
      elements[i].indexOf(doubleQuotes) >= 0 ||
      elements[i].indexOf(templateString) >= 0
    ) {
      //the left double quotes is found
      var indexOfRightQuotes = -1
      var tmp = elements[i]
      //find the right double quotes
      for (var j = i + 1; j < elements.length; ++j) {
        if (
          elements[j].indexOf(singleQuotes) >= 0 ||
          elements[j].indexOf(doubleQuotes) >= 0 ||
          elements[j].indexOf(templateString) >= 0
        ) {
          indexOfRightQuotes = j
          break
        }
      }
      //found the right double quotes
      //merge all the elements between double quotes
      if (-1 != indexOfRightQuotes) {
        for (var j = i + 1; j <= indexOfRightQuotes; ++j) {
          tmp = tmp + delimiter + elements[j]
        }
        newElements.push(tmp)
        i = indexOfRightQuotes
      } else {
        //right double quotes is not found
        newElements.push(elements[i])
      }
    } else {
      //no left double quotes is found
      newElements.push(elements[i])
    }
  }

  return newElements
}
