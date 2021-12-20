const toLine = (text) => {
  return text.replace(/([A-Z])/g, "-$1").toLowerCase();
};

export const styleObj2String = (styleObj) => {
  let styleString = "";
  if (Object.prototype.toString.call(styleObj) === "[object Object]") {
    for (const [key, value] of Object.entries(styleObj)) {
      styleString += `${toLine(key)}:${value};`;
    }
  }
  return styleString;
};
