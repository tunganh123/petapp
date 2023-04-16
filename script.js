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

let btnSubmit = document.querySelector("#submit-btn");
let btnHealthy = document.querySelector("#healthy-btn");
let btnBmi = document.querySelector("#bmi-btn");

let breedArr = [];
let petArr = [];

let check = true;

//Kiểm tra các trường nhập
// Không có trường nào bị nhập thiếu dữ liệu.
// Giá trị ID không được trùng với các thú cưng còn lại. Nếu không hợp lệ, hãy đưa ra thông báo "ID must be unique!".
// Trường Age chỉ được nhập giá trị trong khoảng 1 đến 15. Nếu không hợp lệ, hãy đưa ra thông báo "Age must be between 1 and 15!".
// Trường Weight chỉ được nhập giá trị trong khoảng 1 đến 15. Nếu không hợp lệ, hãy đưa ra thông báo "Weight must be between 1 and 15!".
// Trường Length chỉ được nhập giá trị trong khoảng 1 đến 100. Nếu không hợp lệ, hãy đưa ra thông báo "Length must be between 1 and 100!".
// Bắt buộc phải chọn giá trị cho trường Type. Nếu không hợp lệ, hãy đưa ra thông báo "Please select Type!".
// Bắt buộc phải chọn giá trị cho trường Breed. Nếu không hợp lệ, hãy đưa ra thông báo "Please select Breed!".
// Tạo hàm validateData(data) để check cái này
// const petArr = []; //Danh sách thú cưng
// alert() để đưa ra thông báo cho người dùng

// clearInput() Để xóa thông tin dữ liệu vừa nhập, sau khi đã thêm thú vào danh sách
// Tạo hàm renderTableData(petArr) để đưa thú cưng vào danh sách
/////////////////////////////////
// Hàm gọi từ bên HTML từ onchage của type

// Giá trị khởi tạo
const init = () => {
  petId.value = "";
  petName.value = "";
  petAge.value = "";
  petType.value = "Select Type";
  petWeight.value = "";
  petLength.value = "";
  petColor.value = "#000000";
  petBreed.value = "Select Breed";
  petVaccinated.checked = false;
  petDewormed.checked = false;
  petSterilized.checked = false;
};

breedArr = JSON.parse(getFromStorage("breedArr"));

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

//Duyệt breed ra màn hình
const renderBreed = (arr) => {
  petBreed.innerHTML = "";
  let html = `<option>Select Breed</option>`;
  petBreed.insertAdjacentHTML("beforeend", html);
  arr.forEach((breed) => {
    let html = `<option>${breed.name}</option>`;
    petBreed.insertAdjacentHTML("beforeend", html);
  });
};

//Kiểm tra dữ liệu đầu vào
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
  // ID
  if (dataobject.id.trim() == "") {
    alert("Please input id");
    check = false;
  }
  for (let index = 0; index < petArr.length; index++) {
    if (dataobject.id == petArr[index].id) {
      alert("ID must be unique!");
      check = false;
    }
  }
};

//Xóa dữ liệu ở trạng thái thường
const deleterow = (b) => {
  let a = confirm("Are you sure?");
  if (a) {
    petArr.forEach((pet, id) => {
      if (pet.id == b) {
        petArr.splice(id, 1);
      }
    });
    console.log("PETARnew", petArr);
    renderTableData(petArr);
    localStorage.removeItem("petArr");
    saveToStorage("petArr", JSON.stringify(petArr));
  }
};
// Xóa dữ liệu khi ở trang show healthy
const deleterowHealthy = (b) => {
  let c = confirm("Are you sure?");
  if (c) {
    let idok = petOk.findIndex(checkindex);
    console.log(idok);
    function checkindex(a) {
      return a.id == b;
    }
    petOk.splice(idok, 1);
    for (let index = 0; index < petArr.length; index++) {
      if (petArr[index].id == b) {
        petArr.splice(index, 1);
      }
    }
  }

  console.log("PETARnew", petArr);
  renderTableHealthy(petOk);
  localStorage.removeItem("petArr");
  saveToStorage("petArr", JSON.stringify(petArr));
};

// Duyệt dữ liệu ra trang chính
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
<td>${arr[index].BMI}</td>
<td>${arr[index].date}</td>
<td><button type="button" onclick = "deleterow('${
      arr[index].id
    }')" class="btn btn-danger">Delete</button>
</td>`;
    //Thêm thẻ addtr làm con của tbody
    tbody.appendChild(addtr);
  }
};
// Duyệt dữ liệu ở danh sách healthy
const renderTableHealthy = (arr) => {
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
<td>${arr[index].BMI}</td>
<td>${arr[index].date}</td>
<td><button type="button" onclick = "deleterowHealthy('${
      arr[index].id
    }')" class="btn btn-danger">Delete</button>
</td>`;
    //Thêm thẻ addtr làm con của tbody
    tbody.appendChild(addtr);
  }
};
//Thêm pet vào mảng
const addPet = (pet) => {
  petArr.push(pet);
  saveToStorage("petArr", JSON.stringify(petArr));
};
// Hiển thị lần đầu tiên
petArr = JSON.parse(getFromStorage("petArr"));
if (petArr != null) {
  renderTableData(petArr);
}
//Kiểm tra trường hợp null
if (breedArr == null) {
  breedArr = [];
}
//Kiểm tra trường hợp null
if (petArr == null) {
  petArr = [];
}

// Bắt sự kiện submit
btnSubmit.addEventListener("click", function () {
  let datee = new Date();
  let date = `${datee.getDate()}/${
    datee.getMonth() + 1
  }/${datee.getFullYear()}`;
  check = true;
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
    steriliz: petSterilized.checked,
    BMI: "?",
  };
  validateData(pet);

  if (check == true) {
    console.log("PetARR", petArr);
    addPet(pet);
    renderTableData(petArr);
    init();
  }
});

// Hiện BMI
btnBmi.addEventListener("click", function () {
  for (let index = 0; index < petArr.length; index++) {
    if (petArr[index].type == "Dog") {
      petArr[index].BMI =
        (petArr[index].weight * 703) / petArr[index].length ** 2;
    } else {
      petArr[index].BMI =
        (petArr[index].weight * 886) / petArr[index].length ** 2;
    }
    renderTableData(petArr);
  }
});

// Lọc thú cưng khỏe mạnh
let checkPet = true;
let petOk = [];
btnHealthy.addEventListener("click", function () {
  petOk = [];
  if (checkPet) {
    for (let index = 0; index < petArr.length; index++) {
      if (
        petArr[index].vaccin &&
        petArr[index].deworm &&
        petArr[index].steriliz
      ) {
        petOk.push(petArr[index]);
        console.log(petOk);
      }
    }

    checkPet = false;
    btnHealthy.textContent = "Show All Pet";
    renderTableHealthy(petOk);
  } else {
    btnHealthy.textContent = "Show Healthy Pet";
    renderTableData(petArr);
    checkPet = true;
  }
});
