"use strict";
//Animation cho nav
let navv = document.querySelector("#sidebar");
navv.addEventListener("click", function () {
  this.classList.toggle("active");
});
// Hàm lưu dữ liệu vào storage
function saveToStorage(key, value) {
  localStorage.setItem(key, value);
}
// Lấy dữ liệu từ storage
function getFromStorage(key) {
  return localStorage.getItem(key);
}
