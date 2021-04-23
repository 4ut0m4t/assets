function measureText(pText, pFontSize, pFamily, pWeight) {
  var lDiv = document.createElement("div");

  document.body.appendChild(lDiv);

  if (pFamily != null) {
    lDiv.style.fontFamily = pFamily;
  }
  if (pWeight != null) {
    lDiv.style.fontWeight = pWeight;
  }
  lDiv.style.fontSize = "" + pFontSize + "px";
  lDiv.style.position = "absolute";
  lDiv.style.left = -1000;
  lDiv.style.top = -1000;

  lDiv.innerHTML = pText;

  var lResult = {
    width: lDiv.clientWidth,
    height: lDiv.clientHeight,
  };

  document.body.removeChild(lDiv);
  lDiv = null;

  return lResult;
}
function fitText(el) {
  var text = el.text();
  var fsize = parseInt(el.css("font-size"));
  var measured = measureText(text, fsize);

  if (measured.width > el.width()) {
    console.log("reducing");
    while (true) {
      fsize = parseInt(el.css("font-size"));
      var m = measureText(text, fsize);
      if (m.width > el.width()) {
        el.css("font-size", --fsize + "px");
      } else {
        break;
      }
    }
  } else if (measured.width < el.width()) {
    while (true) {
      fsize = parseInt(el.css("font-size"));
      var m = measureText(text, fsize);
      if (m.width < el.width() - 40) {
        // not sure why -4 is needed (often)
        el.css("font-size", ++fsize + "px");
      } else {
        break;
      }
    }
  }
  if (el.height() > 45) {
    el.css("font-size", "30px");
  }
}
fitText($("#logo"));
