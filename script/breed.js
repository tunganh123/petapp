"use strict";
let breedName = document.querySelector("#input-breed");
let breedType = document.querySelector("#input-type");
let breedArr = [];
let btnSubmit = document.querySelector("#submit-btn");
let check;

const init = () => {
  breedName.value = "";
  breedType.value = "Select Type";
};
const validateData = (dataobject) => {
  if (dataobject.name.trim() == "") {
    alert("Please input name");
    check = false;
  }
  // ID
  if (dataobject.type.trim() == "Select Type") {
    alert("Please input type");
    check = false;
  }
};
const renderBreedTable = (arr) => {
  let i = 1;
  const tbody = document.querySelector("#tbody");
  tbody.innerHTML = "";
  for (let index = 0; index < arr.length; index++) {
    // Thêm thẻ tr
    const addtr = document.createElement("tr");
    addtr.innerHTML = `<th scope="row">${i}</th>
    <td>${arr[index].name}</td>
    <td>${arr[index].type}</td>
    <td><button type="button" onclick = "deleterow('${arr[index].name}')" class="btn btn-danger">Delete</button>
    </td>
   `;
    //Thêm thẻ addtr làm con của tbody
    i++;
    tbody.appendChild(addtr);
  }
};
const addbreed = (breed) => {
  breedArr.push(breed);
  saveToStorage("breedArr", JSON.stringify(breedArr));
};

const deleterow = (b) => {
  console.log("breedARR");
  let a = confirm("Are you sure?");
  if (a) {
    breedArr.forEach((breed, i) => {
      if (breed.name == b) {
        breedArr.splice(i, 1);
        console.log("PETARnew", breedArr);
        renderBreedTable(breedArr);
        localStorage.removeItem("breedArr");
        saveToStorage("breedArr", JSON.stringify(breedArr));
      }
    });
  }
};

//Hiện bảng lúc mới vào
breedArr = JSON.parse(getFromStorage("breedArr"));
if (breedArr) {
  renderBreedTable(breedArr);
}

btnSubmit.addEventListener("click", function () {
  check = true;
  let breed = {
    name: breedName.value,
    type: breedType.value,
  };
  validateData(breed);
  console.log(check);
  //Kiểm tra trường hợp breedArr null
  if (breedArr == null) {
    breedArr = [];
  }
  if (check == true) {
    console.log(breed);
    console.log("PetARR", breedArr);

    addbreed(breed);
    console.log("PetARR", breedArr);
    // addbreed(breed);
    console.log("PetARR", breedArr);
    renderBreedTable(breedArr);
    init();
  }
});
