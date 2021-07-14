// ****** select items **********

const form = document.querySelector(".grocery-form");//we need form for submit event
const alert = document.querySelector(".alert");
//the green and red alert bar
const grocery = document.getElementById("grocery");//input bar
const submitBtn = document.querySelector(".submit-btn");
const container = document.querySelector(".grocery-container");//container for grocerylist and clear all
const list = document.querySelector(".grocery-list");//list
const clearBtn = document.querySelector(".clear-btn"); //clear button
// edit option
let editElement;
let editFlag = false;//need for editing name of the grocery item in ui and storage
let editID = "";//needed for editing items in  storage
// ****** event listeners **********

// submit form
form.addEventListener("submit", addItem);
// clear list
clearBtn.addEventListener("click", clearItems);
// display items onload
window.addEventListener("DOMContentLoaded", setupItems);

// ****** functions **********

// add item
function addItem(e) {
  e.preventDefault();
  const value = grocery.value;
  const id = new Date().getTime().toString();//coming up with unique id is a pain in the ass.so use time

  // editFlag ===false(if returns true) can also be written as !editFlag
  if (value !== "" && !editFlag) {
    const element = document.createElement("article");
    let attr = document.createAttribute("data-id");
    attr.value = id;
    element.setAttributeNode(attr);
    element.classList.add("grocery-item");
    element.innerHTML = `<p class="title">${value}</p>
            <div class="btn-container">
              <!-- edit btn -->
              <button type="button" class="edit-btn">
                <i class="fas fa-edit"></i>
              </button>
              <!-- delete btn -->
              <button type="button" class="delete-btn">
                <i class="fas fa-trash"></i>
              </button>
            </div>
          `;
    // add event listeners to both buttons;
    const deleteBtn = element.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", deleteItem);
    const editBtn = element.querySelector(".edit-btn");
    editBtn.addEventListener("click", editItem);

    // append child
    list.appendChild(element);
    // display alert
    displayAlert("item added to the list", "success");
    // show container
    container.classList.add("show-container");
    // set local storage
    addToLocalStorage(id, value);
    // set back to default-for clearing the input in form
    setBackToDefault();
  } else if (value !== "" && editFlag) {
    editElement.innerHTML = value;//edit element is reference to the title in p in grocery item
    displayAlert("value changed", "success");

    // edit  local storage
    editLocalStorage(editID, value);
    setBackToDefault();
  } else {
    displayAlert("please enter value", "danger");//text,action
  }
}
// display alert
function displayAlert(text, action) {
  alert.textContent = text;
  alert.classList.add(`alert-${action}`);

  // remove alert after 1 sec
  setTimeout(function () {
    alert.textContent = "";
    alert.classList.remove(`alert-${action}`);
  }, 1000);
}

// clear items
function clearItems() {
  const items = document.querySelectorAll(".grocery-item");
  if (items.length > 0) {
    items.forEach(function (item) {
      list.removeChild(item);//remove items from grocery list
    });
  }
  container.classList.remove("show-container");//make the container invisible
  displayAlert("empty list", "danger");
  setBackToDefault();
  localStorage.removeItem("list");//directly remove from the local storage with key
}

// delete item

function deleteItem(e) {
  const element = e.currentTarget.parentElement.parentElement;//take the parent container
  const id = element.dataset.id;

  list.removeChild(element);

  if (list.children.length === 0)//children for only element nodes
   {
    container.classList.remove("show-container");//remove container for no items
  }
  displayAlert("item removed", "danger");

  setBackToDefault();
  // remove from local storage
  removeFromLocalStorage(id);
}
// edit item
function editItem(e) {
  const element = e.currentTarget.parentElement.parentElement;
  // set edit item
  editElement = e.currentTarget.parentElement.previousElementSibling;//returns previous element node in the same inheritance tree
  // set form value
  grocery.value = editElement.textContent;
  editFlag = true;
  editID = element.dataset.id;
  //
  submitBtn.textContent = "edit";
}
// set backt to defaults
function setBackToDefault() {
  grocery.value = "";
  editFlag = false;
  editID = "";
  submitBtn.textContent = "submit";
}

// ****** local storage **********

// add to local storage
function addToLocalStorage(id, value) {
  const grocery = { id, value };//short syntax in es6 for objects
  let items = getLocalStorage();
  items.push(grocery);
  localStorage.setItem("list", JSON.stringify(items));
}

function getLocalStorage() {
  return localStorage.getItem("list")//if empty(false) return empty array or get array from local storage
    ? JSON.parse(localStorage.getItem("list"))
    : [];
}

function removeFromLocalStorage(id) {
  let items = getLocalStorage();

  items = items.filter(function (item) {//this is not a key value object are in array.so,a new array without the object with the id should be made
    if (item.id !== id) {
      return item;
    }
  });

  localStorage.setItem("list", JSON.stringify(items));
}
function editLocalStorage(id, value) {
  let items = getLocalStorage();//user defined method

  items = items.map(function (item) {//edit object in array with particular id
    if (item.id === id) {
      item.value = value;
    }
    return item;
  });
  localStorage.setItem("list", JSON.stringify(items));
}

// SETUP LOCALSTORAGE.REMOVEITEM('LIST');

// ****** setup items **********

function setupItems() {
  let items = getLocalStorage();//get array

  if (items.length > 0) {
    items.forEach(function (item) {
      createListItem(item.id, item.value);//passthrough array
    });
    container.classList.add("show-container");
  }
}

function createListItem(id, value) {
  const element = document.createElement("article");
  let attr = document.createAttribute("data-id");
  attr.value = id;
  element.setAttributeNode(attr);
  element.classList.add("grocery-item");
  element.innerHTML = `<p class="title">${value}</p>
            <div class="btn-container">
              <!-- edit btn -->
              <button type="button" class="edit-btn">
                <i class="fas fa-edit"></i>
              </button>
              <!-- delete btn -->
              <button type="button" class="delete-btn">
                <i class="fas fa-trash"></i>
              </button>
            </div>
          `;
  // add event listeners to both buttons;
  const deleteBtn = element.querySelector(".delete-btn");
  deleteBtn.addEventListener("click", deleteItem);
  const editBtn = element.querySelector(".edit-btn");
  editBtn.addEventListener("click", editItem);

  // append child
  list.appendChild(element);
}
