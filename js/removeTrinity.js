// Removes TRINITY- when searching for gene

export function removeTrinity(text) {
  // have any dom element into this function
  let str = text.split("_").join("-");
  let textResult = str
    .substring(str.indexOf("TRINITY-") + "TRINITY-".length)
    .replace(/-/g, "-");

  if (textResult.charAt(0) === "_") {
    return textResult.substring(1);
  } else {
    return textResult;
  }
}
