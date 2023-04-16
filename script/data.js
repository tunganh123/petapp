"use strict";
let btnImport = document.querySelector("#import-btn");
let btnExport = document.querySelector("#export-btn");
function getFromStorage(key) {
  return localStorage.getItem(key);
}
function saveDynamicDataToFile() {
  var blob = new Blob([JSON.stringify(getFromStorage("petArr"), null, 2)], {
    type: "application/json",
  });
  saveAs(blob, "petArr.json");
}
btnExport.addEventListener("click", saveDynamicDataToFile);
