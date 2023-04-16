"use strict";

// Lấy ra các thẻ bên HTML
let petId = document.querySelector("#input-id");

let petName = document.querySelector("#input-name");
let petAge = document.querySelector("#input-age");
let petType = document.querySelector("#input-type");
let petWeight = document.querySelector("#input-weight");
let petLength = document.querySelector("#input-length");
let petColor = document.querySelector("#input-color-1");
let petBreed = document.querySelector("#input-breed");
let petVaccinated = document.querySelector("#input-vaccinated");
let petDewormed = document.querySelector("#input-dewormed");
let petSterilized = document.querySelector("#input-sterilized");
let tbody = document.querySelector("#tbody");
let containerform = document.querySelector("#container-form");
let check;
let btnSubmit = document.querySelector("#submit-btn");
let breedArr;
let petArr;
var cc;

petArr = JSON.parse(getFromStorage("petArr"));

breedArr = JSON.parse(getFromStorage("breedArr"));
if (breedArr == null) {
  breedArr = [];
}
const renderBreed = (arr) => {
  petBreed.innerHTML = "";
  let html = `<option>Select Type</option>`;
  petBreed.insertAdjacentHTML("beforeend", html);
  arr.forEach((breed) => {
    let html = `<option>${breed.name}</option>`;
    petBreed.insertAdjacentHTML("beforeend", html);
  });
};
const breed = () => {
  console.log(breedArr);
  if (petType.value == "Dog") {
    let breedDog = breedArr.filter((breed) => {
      return breed.type == "Dog";
    });
    renderBreed(breedDog);
  } else if (petType.value == "Cat") {
    let breedCat = breedArr.filter((breed) => {
      return breed.type == "Cat";
    });
    renderBreed(breedCat);
  } else if (petType.value == "Select Type") {
    renderBreed(breedArr);
  }
};
const validateData = (dataobject) => {
  //Age
  if (
    dataobject.age < 1 ||
    dataobject.age > 15 ||
    dataobject.age.trim() == ""
  ) {
    alert("Age must be between 1 and 15!");
    check = false;
  }
  // Weight
  if (
    dataobject.weight < 1 ||
    dataobject.weight > 15 ||
    dataobject.weight.trim() == ""
  ) {
    alert("weight must be between 1 and 15!");
    check = false;
  }
  //Length
  if (
    dataobject.length < 1 ||
    dataobject.length > 100 ||
    dataobject.length.trim() == ""
  ) {
    alert("Length must be between 1 and 100!");
    check = false;
  }
  // Type
  if (dataobject.type == "Select Type") {
    alert("Please select Type!");
    check = false;
  }
  // Breed
  if (dataobject.breed == "Select Breed") {
    alert("Please select Breed!");
    check = false;
  }
  if (dataobject.name.trim() == "") {
    alert("Please input name");
    check = false;
  }
};

const editrow = (iid) => {
  cc = iid;
  console.log(cc);

  //Hiện form
  containerform.classList.remove("hide");
  // Lọc ra petIdd có id tương ứng
  let petIdd = petArr.filter((pet) => pet.id == iid);
  petId.value = petIdd[0].id;
  petName.value = petIdd[0].name;
  petAge.value = petIdd[0].age;
  petType.value = petIdd[0].type;
  petWeight.value = petIdd[0].weight;
  petLength.value = petIdd[0].length;
  petColor.value = petIdd[0].color;

  if (petIdd[0].type == "Dog") {
    let breedDog = breedArr.filter((breed) => {
      return breed.type == "Dog";
    });
    renderBreed(breedDog);
  } else if (petIdd[0].type == "Cat") {
    let breedCat = breedArr.filter((breed) => {
      return breed.type == "Cat";
    });
    renderBreed(breedCat);
  }
  petBreed.value = petIdd[0].breed;
  petVaccinated.checked = petIdd[0].vaccin;
  petDewormed.checked = petIdd[0].deworm;
  petSterilized.checked = petIdd[0].steriliz;
};

const renderTableData = (arr) => {
  const tbody = document.querySelector("#tbody");
  tbody.innerHTML = "";
  for (let index = 0; index < arr.length; index++) {
    // Thêm thẻ tr
    const addtr = document.createElement("tr");
    addtr.innerHTML = `<th scope="row">${arr[index].id}</th>
  <td>${arr[index].name}</td>
  <td>${arr[index].age}</td>
  <td>${arr[index].type}</td>
  <td>${arr[index].weight} kg</td>
  <td>${arr[index].length} cm</td>
  <td>${arr[index].breed}</td>
  <td>
      <i class="bi bi-square-fill" style="color: ${arr[index].color}"></i>
  </td>
  <td><i class="${
    arr[index].vaccin == true
      ? "bi bi-check-circle-fill"
      : "bi bi-x-circle-fill"
  }"></i></td>
  <td><i class="${
    arr[index].deworm == true
      ? "bi bi-check-circle-fill"
      : "bi bi-x-circle-fill"
  }"></i></td>
  <td><i class="${
    arr[index].steriliz == true
      ? "bi bi-check-circle-fill"
      : "bi bi-x-circle-fill"
  }"></i></td>
  
  <td>${arr[index].date}</td>
  <td><button type="button" onclick = "editrow('${
    arr[index].id
  }')" class="btn btn-warning">Edit</button>
  </td>`;
    //Thêm thẻ addtr làm con của tbody
    tbody.appendChild(addtr);
  }
};
//Duyệt lần đầu
console.log(petArr);
if (petArr != null) {
  renderTableData(petArr);
}
//Kiểm tra trường hợp null
if (petArr == null) {
  petArr = [];
}
btnSubmit.addEventListener("click", function () {
  let iid = cc;
  console.log(iid);
  check = true;
  containerform.classList.add("hide");
  let datee = new Date();
  let date = `${datee.getDate()}/${datee.getMonth()}/${datee.getFullYear()}`;
  let pet = {
    id: petId.value,
    name: petName.value,
    age: petAge.value,
    type: petType.value,
    weight: petWeight.value,
    length: petLength.value,
    color: petColor.value,
    breed: petBreed.value,
    date: date,
    vaccin: petVaccinated.checked,
    deworm: petDewormed.checked,
    BMI: "?",
    steriliz: petSterilized.checked,
  };

  validateData(pet);
  if (check) {
    // Xóa ra khỏi mảng pet Arr
    petArr.forEach(function (pett, i) {
      if (pett.id == iid) {
        console.log("iid4", iid);
        petArr.splice(i, 1);
        petArr.splice(i, 0, pet);
      }
    });

    console.log(petArr);
    saveToStorage("petArr", JSON.stringify(petArr));
    console.log(petArr);
    renderTableData(petArr);
  }
});
