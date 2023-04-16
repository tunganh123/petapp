"use strict";
let petArr;
let btnFind = document.querySelector("#find-btn");
let petId = document.querySelector("#input-id");
let petName = document.querySelector("#input-name");
let petType = document.querySelector("#input-type");
let petBreed = document.querySelector("#input-breed");
let petVaccinated = document.querySelector("#input-vaccinated");
let petDewormed = document.querySelector("#input-dewormed");
let petSterilized = document.querySelector("#input-sterilized");
let breedArr = JSON.parse(getFromStorage("breedArr"));

petArr = JSON.parse(getFromStorage("petArr"));
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
    
    <td>${arr[index].date}</td>`;
    //Thêm thẻ addtr làm con của tbody
    tbody.appendChild(addtr);
  }
};
// Hàm gọi từ bên HTML từ onchage của type
const breed = () => {
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
const renderBreed = (arr) => {
  petBreed.innerHTML = "";
  let html = `<option>Select Breed</option>`;
  petBreed.insertAdjacentHTML("beforeend", html);
  arr.forEach((breed) => {
    let html = `<option>${breed.name}</option>`;
    petBreed.insertAdjacentHTML("beforeend", html);
  });
};

//Hiện dữ liệu lần đầu

if (petArr != null) {
  renderTableData(petArr);
  renderBreed(breedArr);
}

//Kiểm tra trường hợp null
if (petArr == null) {
  petArr = [];
}
// Bắt sự kiện click tìm kiếm

let petok;
btnFind.addEventListener("click", function () {
  petok = petArr;
  //Id
  if (petId.value) {
    petok = petok.filter((pet) => pet.id.includes(petId.value));
  }
  //Name
  if (petName.value) {
    petok = petok.filter((pet) => pet.name.includes(petName.value));
  }
  //Type
  if (petType.value != "Select Type") {
    petok = petok.filter((pet) => pet.type.includes(petType.value));
  }
  //Breed
  if (petBreed.value != "Select Breed") {
    petok = petok.filter((pet) => pet.breed.includes(petBreed.value));
  }

  //vaccine
  if (petVaccinated.checked) {
    petok = petok.filter((pet) => pet.vaccin == true);
  }
  //Dewormed
  if (petDewormed.checked) {
    petok = petok.filter((pet) => pet.deworm == true);
  }
  //Sterilized
  if (petSterilized.checked) {
    petok = petok.filter((pet) => pet.steriliz == true);
  }

  renderTableData(petok);
});
