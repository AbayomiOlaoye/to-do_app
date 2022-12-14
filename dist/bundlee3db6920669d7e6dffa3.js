/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/modules/html_functions.js":
/*!***************************************!*\
  !*** ./src/modules/html_functions.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addToHTML": () => (/* binding */ addToHTML),
/* harmony export */   "drop": () => (/* binding */ drop),
/* harmony export */   "populateAll": () => (/* binding */ populateAll),
/* harmony export */   "removeAllCompleted": () => (/* binding */ removeAllCompleted),
/* harmony export */   "showPopup": () => (/* binding */ showPopup),
/* harmony export */   "swing": () => (/* binding */ swing)
/* harmony export */ });
var popup = document.getElementById('popup');
var toDoContainer = document.getElementById('to-do-container');
var clipBoard = document.querySelector('.clipboard img');
var swing = function swing() {
  toDoContainer.classList.remove('animate__shakeX');
  toDoContainer.classList.add('animate__swing');
  setTimeout(function () {
    toDoContainer.classList.remove('animate__swing');
  }, 1000);
};
var showPopup = function showPopup(error) {
  if (error) {
    popup.querySelector('p').textContent = error;
  }

  popup.style.display = 'block';
  popup.classList.remove('animate__slideOutRight');
  popup.classList.add('animate__slideInRight');
  setTimeout(function () {
    popup.classList.remove('animate__slideInRight');
    popup.classList.add('animate__slideOutRight');
  }, 3000);
  toDoContainer.classList.remove('animate__shakeX');
  setTimeout(function () {
    toDoContainer.classList.add('animate__shakeX');
  }, 10);
};
var drop = function drop() {
  toDoContainer.classList.remove('animate__shakeX');
  toDoContainer.classList.add('animate__hinge');
  document.body.style.overflowY = 'hidden';
  setTimeout(function () {
    document.getElementById('dropped').style.display = 'flex';
    clipBoard.addEventListener('click', function () {
      showPopup("Should've thought about it before. Just Refresh the page now.");
    });
    clipBoard.removeEventListener('click', drop);
  }, 2000);
};

var doneButtonListener = function doneButtonListener(toDoList, taskItem, taskInput, task, doneButton, removeButton, moreButton) {
  if (toDoList.taskExists(taskInput.value, task.index)) {
    showPopup();
    return;
  }

  taskInput.disabled = true;
  toDoList.updateExistingTask(task.index, taskInput.value);
  doneButton.classList.add('animate__fadeOutDown');
  removeButton.classList.add('animate__fadeOutDown');
  setTimeout(function () {
    doneButton.remove();
    removeButton.remove();
    moreButton.classList.add('animate__fadeInDown');
    doneButton.classList.remove('animate__fadeOutDown');
    removeButton.classList.remove('animate__fadeOutDown');
    taskItem.appendChild(moreButton);
  }, 100);
};

var removeButtonListener = function removeButtonListener(toDoList, taskItem, task) {
  document.getElementById('tasks-list').querySelectorAll('li').item(task.index * 2).remove();
  taskItem.classList.remove('animate__bounceInLeft');
  setTimeout(function () {
    taskItem.classList.add('animate__bounceOutRight');
    setTimeout(function () {
      taskItem.remove();
    }, 500);
  }, 10);
  toDoList.removeTask(task);
};

var moreButtonListener = function moreButtonListener(toDoList, taskItem, taskInput, task, doneButton, removeButton, moreButton) {
  if (!taskInput.disabled) {
    return;
  }

  taskInput.addEventListener('keyup', function (e) {
    if (e.key === 'Enter' || e.keyCode === 13) {
      doneButtonListener(toDoList, taskItem, taskInput, task, doneButton, removeButton, moreButton);
    }
  });
  taskInput.disabled = false;
  taskInput.focus();
  moreButton.classList.add('animate__fadeOutDown');
  setTimeout(function () {
    moreButton.remove();
    taskItem.append(doneButton, removeButton);
    moreButton.classList.remove('animate__fadeOutDown');
  }, 100);
};

var checkboxListener = function checkboxListener(toDoList, task, checkbox, taskInput) {
  toDoList.updateChecked(task.index, checkbox.checked);

  if (checkbox.checked === true) {
    taskInput.classList.add('checked');
  } else {
    taskInput.classList.remove('checked');
  }
};

var getNewTaskNode = function getNewTaskNode(task, toDoList) {
  // Initialize All Elements
  var taskItem = document.createElement('li');
  taskItem.classList.add('animate__animated', 'animate__bounceInLeft');
  taskItem.classList.add('task');
  var taskDetail = document.createElement('div');
  taskDetail.classList.add('task-detail');
  var checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = task.completed;
  var description = document.createElement('div');
  description.classList.add('description');
  var taskInput = document.createElement('input');
  taskInput.type = 'text';
  taskInput.value = task.description;
  taskInput.disabled = true;

  if (task.completed === true) {
    taskInput.classList.add('checked');
  }

  var moreButton = document.createElement('button');
  moreButton.classList.add('animate__animated', 'animate__faster');
  moreButton.innerHTML = '<img class="icon" src="./assets/images/more.png" alt="Edit">';
  var doneButton = document.createElement('button');
  doneButton.classList.add('animate__animated', 'animate__fadeInDown', 'animate__faster');
  doneButton.innerHTML = "\n      <img class=\"icon\" src=\"./assets/images/accept.png\" alt=\"Update\">\n    ";
  var removeButton = document.createElement('button');
  removeButton.classList.add('animate__animated', 'animate__fadeInDown', 'animate__faster');
  removeButton.innerHTML = "\n      <img class=\"icon\" src=\"./assets/images/delete.png\" alt=\"Remove\">\n    "; // Create DOM hierarchy

  description.appendChild(taskInput);
  taskDetail.appendChild(checkbox);
  taskDetail.appendChild(description);
  taskItem.appendChild(taskDetail);
  taskItem.appendChild(moreButton); // Add Event Listeners

  doneButton.addEventListener('click', function () {
    doneButtonListener(toDoList, taskItem, taskInput, task, doneButton, removeButton, moreButton);
  });
  removeButton.addEventListener('click', function () {
    removeButtonListener(toDoList, taskItem, task);
  });
  moreButton.addEventListener('click', function () {
    moreButtonListener(toDoList, taskItem, taskInput, task, doneButton, removeButton, moreButton);
  });
  checkbox.addEventListener('click', function () {
    checkboxListener(toDoList, task, checkbox, taskInput);
  });
  return taskItem;
};

var addToHTML = function addToHTML(task, toDoList) {
  // Adds a new Element to HTML DOM
  var tasksList = document.getElementById('tasks-list');
  var hr = document.createElement('li');
  hr.innerHTML = '<hr>';
  tasksList.appendChild(hr);
  tasksList.appendChild(getNewTaskNode(task, toDoList));
};
var removeAllCompleted = function removeAllCompleted(toDoList) {
  var listItems = document.getElementById('tasks-list').querySelectorAll('li');
  var removed = false;

  for (var i = toDoList.tasks.length - 1; i >= 0; i -= 1) {
    if (toDoList.tasks.at(i).completed === true) {
      removed = true;
      var item = listItems.item(i * 2 + 1);
      removeButtonListener(toDoList, item, toDoList.tasks.at(i));
    }
  }

  return removed;
};
var populateAll = function populateAll(toDoList) {
  // Populate the To-DO List when the page loads
  toDoList.tasks.forEach(function (task) {
    addToHTML(task, toDoList);
  });
};

/***/ }),

/***/ "./src/modules/local_storage.js":
/*!**************************************!*\
  !*** ./src/modules/local_storage.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ storageAvailable)
/* harmony export */ });
function storageAvailable(type) {
  // Check if Storage is available - Type is String
  var storage;

  try {
    storage = window[type];
    var x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return e instanceof DOMException && (e.code === 22 || e.code === 1014 || e.name === 'QuotaExceededError' || e.name === 'NS_ERROR_DOM_QUOTA_REACHED') && storage && storage.length !== 0;
  }
}

/***/ }),

/***/ "./src/modules/to-do-list.js":
/*!***********************************!*\
  !*** ./src/modules/to-do-list.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ToDoList)
/* harmony export */ });
/* harmony import */ var _html_functions_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./html_functions.js */ "./src/modules/html_functions.js");
/* harmony import */ var _local_storage_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./local_storage.js */ "./src/modules/local_storage.js");
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }




var _fixIndices = /*#__PURE__*/new WeakMap();

var ToDoList = /*#__PURE__*/_createClass(function ToDoList() {
  var _this = this;

  _classCallCheck(this, ToDoList);

  _defineProperty(this, "tasks", void 0);

  _defineProperty(this, "taskExists", function (description, skipIndex) {
    for (var i = 0; i < _this.tasks.length; i += 1) {
      if (i !== skipIndex) {
        if (_this.tasks[i].description === description) {
          return true;
        }
      }
    }

    return false;
  });

  _classPrivateFieldInitSpec(this, _fixIndices, {
    writable: true,
    value: function value(start) {
      for (var i = start; i < _this.tasks.length; i += 1) {
        _this.tasks.at(i).index = i;
      }
    }
  });

  _defineProperty(this, "addNewTask", function (newTask) {
    var task = {
      description: newTask,
      completed: false,
      index: _this.tasks.length
    };

    if (_this.taskExists(task.description)) {
      (0,_html_functions_js__WEBPACK_IMPORTED_MODULE_0__.showPopup)('This task already exists');
      return;
    }

    _this.tasks.push(task);

    (0,_html_functions_js__WEBPACK_IMPORTED_MODULE_0__.addToHTML)(task, _this);

    _this.updateLocalStorage();
  });

  _defineProperty(this, "removeTask", function (toRemove) {
    _this.tasks.splice(toRemove.index, 1);

    _classPrivateFieldGet(_this, _fixIndices).call(_this, toRemove.index);

    _this.updateLocalStorage();
  });

  _defineProperty(this, "updateLocalStorage", function () {
    if ((0,_local_storage_js__WEBPACK_IMPORTED_MODULE_1__["default"])('localStorage') === true) {
      localStorage.setItem('tasks', JSON.stringify(_this.tasks));
    }
  });

  _defineProperty(this, "updateExistingTask", function (index, description) {
    _this.tasks.at(index).description = description;

    _this.updateLocalStorage();
  });

  _defineProperty(this, "updateChecked", function (index, isChecked) {
    _this.tasks.at(index).completed = isChecked;

    _this.updateLocalStorage();
  });

  this.tasks = [];

  if ((0,_local_storage_js__WEBPACK_IMPORTED_MODULE_1__["default"])('localStorage') === true) {
    var storedTasks = localStorage.getItem('tasks');

    if (storedTasks) {
      this.tasks = JSON.parse(storedTasks);
    }
  }
});



/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/styles/main.scss":
/*!***********************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/styles/main.scss ***!
  \***********************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
___CSS_LOADER_EXPORT___.push([module.id, "@import url(https://fonts.googleapis.com/css2?family=Poppins&display=swap);"]);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "root {\n  --animate-delay: 0.5s;\n}\n\n* {\n  padding: 0;\n  margin: 0;\n  box-sizing: content-box;\n  font-family: \"Poppins\", sans-serif;\n  transition: 300ms;\n}\n\nbody {\n  position: relative;\n  background-color: bisque;\n}\n\n.clipboard {\n  padding: calc(10vh - 25px) 0 0 0;\n  width: 100%;\n  display: flex;\n  justify-content: center;\n  position: absolute;\n  z-index: 1;\n}\n\nbutton {\n  cursor: pointer;\n}\n\n.to-do-Section {\n  padding: 10vh 10vw;\n}\n\n#to-do-container {\n  background-color: white;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  border: 1px solid #3a3a3c;\n  border-radius: 5px;\n  box-shadow: 0 4px 10px 5px rgba(0, 0, 0, 0.5);\n}\n\n/* stylelint-disable */\n.icon {\n  width: 30px;\n  height: 30px;\n  opacity: 1;\n}\n\n.icon:hover {\n  opacity: 0.7;\n}\n\n.heading {\n  display: flex;\n  justify-content: space-between;\n  background-color: #eee;\n  padding: 20px 40px;\n}\n.heading h1 {\n  letter-spacing: 1px;\n  font-size: 1.2rem;\n  font-weight: bold;\n}\n.heading button {\n  border: none;\n  background-color: transparent;\n  color: dimgrey;\n  width: 30px;\n}\n\nhr {\n  border: 1px solid #e7e6e6;\n}\n\ninput {\n  border: none;\n}\n\ninput:enabled {\n  border: none;\n  outline: none;\n}\n\n#add-new-task {\n  display: flex;\n  justify-content: space-between;\n  background-color: #f6f6f6;\n  padding: 0 40px;\n}\n#add-new-task input {\n  padding: 25px 0;\n  background-color: #f6f6f6;\n  width: 90%;\n}\n#add-new-task input::placeholder {\n  font-style: italic;\n}\n#add-new-task button {\n  border: none;\n  background-color: transparent;\n  color: dimgrey;\n  width: 30px;\n}\n\n#tasks-list {\n  list-style: none;\n}\n#tasks-list .task {\n  display: flex;\n  padding: 0 40px;\n  align-items: center;\n  gap: 15px;\n}\n#tasks-list .task .description {\n  width: 100%;\n  display: flex;\n  align-items: baseline;\n}\n#tasks-list .task .description input {\n  padding: 25px 0;\n  text-overflow: ellipsis;\n  width: 95%;\n}\n#tasks-list .task .description .checked {\n  color: grey;\n  font-style: italic;\n  text-decoration: line-through;\n}\n#tasks-list .task input:disabled {\n  color: black;\n}\n#tasks-list .task .task-detail {\n  display: flex;\n  flex-grow: 1;\n  gap: 15px;\n  align-items: center;\n}\n#tasks-list .task button {\n  border: none;\n  background-color: transparent;\n  color: dimgrey;\n  width: 30px;\n}\n\n#clear-completed-button {\n  padding: 20px 40px;\n  border: none;\n  background-color: #eee;\n}\n\n#popup {\n  display: none;\n  position: fixed;\n  padding: 15px;\n  z-index: 1;\n  bottom: 10px;\n  right: 10px;\n  background-color: #cc0f0f;\n  border-radius: 10px;\n  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.5);\n}\n#popup p {\n  text-align: center;\n  color: white;\n}\n\ninput[type=checkbox] {\n  width: 20px;\n  height: 20px;\n}\n\n#dropped {\n  inset: 0;\n  position: fixed;\n  display: none;\n  align-items: center;\n  justify-content: center;\n  width: 100vw;\n  height: 100vh;\n  font-size: 2rem;\n  color: white;\n  font-weight: bold;\n}", "",{"version":3,"sources":["webpack://./src/styles/main.scss"],"names":[],"mappings":"AAQA;EACE,qBAAA;AANF;;AASA;EACE,UAAA;EACA,SAAA;EACA,uBAAA;EACA,kCAAA;EACA,iBAAA;AANF;;AASA;EACE,kBAAA;EACA,wBApBgB;AAclB;;AASA;EACE,gCAAA;EACA,WAAA;EACA,aAAA;EACA,uBAAA;EACA,kBAAA;EACA,UAAA;AANF;;AASA;EACE,eAAA;AANF;;AASA;EACE,kBAAA;AANF;;AASA;EACE,uBAAA;EACA,aAAA;EACA,sBAAA;EACA,uBAAA;EACA,yBAAA;EACA,kBAAA;EACA,6CAAA;AANF;;AASA,sBAAA;AAaA;EACE,WAAA;EACA,YAAA;EACA,UAAA;AAlBF;;AAqBA;EACE,YAAA;AAlBF;;AAqBA;EAdE,aAAA;EACA,8BAAA;EAgBA,sBAzEgB;EA0EhB,kBA5Ee;AA0DjB;AAoBE;EACE,mBAAA;EACA,iBAAA;EACA,iBAAA;AAlBJ;AAqBE;EAjCA,YAAA;EACA,6BAAA;EACA,cAAA;EACA,WAAA;AAeF;;AAoBA;EACE,yBAAA;AAjBF;;AAoBA;EACE,YAAA;AAjBF;;AAoBA;EACE,YAAA;EACA,aAAA;AAjBF;;AAoBA;EA5CE,aAAA;EACA,8BAAA;EA8CA,yBAtGoB;EAuGpB,eAAA;AAjBF;AAmBE;EACE,eAAA;EACA,yBA3GkB;EA4GlB,UAAA;AAjBJ;AAoBE;EACE,kBAAA;AAlBJ;AAqBE;EAnEA,YAAA;EACA,6BAAA;EACA,cAAA;EACA,WAAA;AAiDF;;AAoBA;EACE,gBAAA;AAjBF;AAmBE;EACE,aAAA;EACA,eAAA;EACA,mBAAA;EACA,SAAA;AAjBJ;AAmBI;EACE,WAAA;EACA,aAAA;EACA,qBAAA;AAjBN;AAmBM;EACE,eAAA;EACA,uBAAA;EACA,UAAA;AAjBR;AAoBM;EACE,WAAA;EACA,kBAAA;EACA,6BAAA;AAlBR;AAsBI;EACE,YAAA;AApBN;AAuBI;EACE,aAAA;EACA,YAAA;EACA,SAAA;EACA,mBAAA;AArBN;AAwBI;EA9GF,YAAA;EACA,6BAAA;EACA,cAAA;EACA,WAAA;AAyFF;;AAwBA;EACE,kBAxKe;EAyKf,YAAA;EACA,sBAxKgB;AAmJlB;;AAwBA;EACE,aAAA;EACA,eAAA;EACA,aAAA;EACA,UAAA;EACA,YAAA;EACA,WAAA;EACA,yBAAA;EACA,mBAAA;EACA,0CAAA;AArBF;AAuBE;EACE,kBAAA;EACA,YAAA;AArBJ;;AAyBA;EACE,WAAA;EACA,YAAA;AAtBF;;AAyBA;EACE,QAAA;EACA,eAAA;EACA,aAAA;EACA,mBAAA;EACA,uBAAA;EACA,YAAA;EACA,aAAA;EACA,eAAA;EACA,YAAA;EACA,iBAAA;AAtBF","sourcesContent":["@import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');\n\n$body-background: bisque;\n$inline-padding: 20px 40px;\n$light-grey: #e7e6e6;\n$grey-background: #eee;\n$new-task-background: #f6f6f6;\n\nroot {\n  --animate-delay: 0.5s;\n}\n\n* {\n  padding: 0;\n  margin: 0;\n  box-sizing: content-box;\n  font-family: 'Poppins', sans-serif;\n  transition: 300ms;\n}\n\nbody {\n  position: relative;\n  background-color: $body-background;\n}\n\n.clipboard {\n  padding: calc(10vh - 25px) 0 0 0;\n  width: 100%;\n  display: flex;\n  justify-content: center;\n  position: absolute;\n  z-index: 1;\n}\n\nbutton {\n  cursor: pointer;\n}\n\n.to-do-Section {\n  padding: 10vh 10vw;\n}\n\n#to-do-container {\n  background-color: white;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  border: 1px solid #3a3a3c;\n  border-radius: 5px;\n  box-shadow: 0 4px 10px 5px rgba(0, 0, 0, 0.5);\n}\n\n/* stylelint-disable */\n@mixin icon() {\n  border: none;\n  background-color: transparent;\n  color: dimgrey;\n  width: 30px;\n}\n\n@mixin row-space-between() {\n  display: flex;\n  justify-content: space-between;\n}\n\n.icon {\n  width: 30px;\n  height: 30px;\n  opacity: 1;\n}\n\n.icon:hover {\n  opacity: 0.7;\n}\n\n.heading {\n  @include row-space-between;\n\n  background-color: $grey-background;\n  padding: $inline-padding;\n\n  h1 {\n    letter-spacing: 1px;\n    font-size: 1.2rem;\n    font-weight: bold;\n  }\n\n  button {\n    @include icon;\n  }\n}\n\nhr {\n  border: 1px solid $light-grey;\n}\n\ninput {\n  border: none;\n}\n\ninput:enabled {\n  border: none;\n  outline: none;\n}\n\n#add-new-task {\n  @include row-space-between;\n\n  background-color: $new-task-background;\n  padding: 0 40px;\n\n  input {\n    padding: 25px 0;\n    background-color: $new-task-background;\n    width: 90%;\n  }\n\n  input::placeholder {\n    font-style: italic;\n  }\n\n  button {\n    @include icon;\n  }\n}\n\n#tasks-list {\n  list-style: none;\n\n  .task {\n    display: flex;\n    padding: 0 40px;\n    align-items: center;\n    gap: 15px;\n\n    .description {\n      width: 100%;\n      display: flex;\n      align-items: baseline;\n\n      input {\n        padding: 25px 0;\n        text-overflow: ellipsis;\n        width: 95%;\n      }\n\n      .checked {\n        color: grey;\n        font-style: italic;\n        text-decoration: line-through;\n      }\n    }\n\n    input:disabled {\n      color: black;\n    }\n\n    .task-detail {\n      display: flex;\n      flex-grow: 1;\n      gap: 15px;\n      align-items: center;\n    }\n\n    button {\n      @include icon;\n    }\n  }\n}\n\n#clear-completed-button {\n  padding: $inline-padding;\n  border: none;\n  background-color: $grey-background;\n}\n\n#popup {\n  display: none;\n  position: fixed;\n  padding: 15px;\n  z-index: 1;\n  bottom: 10px;\n  right: 10px;\n  background-color: #cc0f0f;\n  border-radius: 10px;\n  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.5);\n\n  p {\n    text-align: center;\n    color: white;\n  }\n}\n\ninput[type=checkbox] {\n  width: 20px;\n  height: 20px;\n}\n\n#dropped {\n  inset: 0;\n  position: fixed;\n  display: none;\n  align-items: center;\n  justify-content: center;\n  width: 100vw;\n  height: 100vh;\n  font-size: 2rem;\n  color: white;\n  font-weight: bold;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";

      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }

      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }

      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }

      content += cssWithMappingToString(item);

      if (needLayer) {
        content += "}";
      }

      if (item[2]) {
        content += "}";
      }

      if (item[4]) {
        content += "}";
      }

      return content;
    }).join("");
  }; // import a list of modules into the list


  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }

      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }

      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }

      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),

/***/ "./src/styles/main.scss":
/*!******************************!*\
  !*** ./src/styles/main.scss ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./main.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/styles/main.scss");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ }),

/***/ "./src/assets/images/accept.png":
/*!**************************************!*\
  !*** ./src/assets/images/accept.png ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "assets/images/accept.png";

/***/ }),

/***/ "./src/assets/images/add.png":
/*!***********************************!*\
  !*** ./src/assets/images/add.png ***!
  \***********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "assets/images/add.png";

/***/ }),

/***/ "./src/assets/images/clipboard.png":
/*!*****************************************!*\
  !*** ./src/assets/images/clipboard.png ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "assets/images/clipboard.png";

/***/ }),

/***/ "./src/assets/images/delete.png":
/*!**************************************!*\
  !*** ./src/assets/images/delete.png ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "assets/images/delete.png";

/***/ }),

/***/ "./src/assets/images/more.png":
/*!************************************!*\
  !*** ./src/assets/images/more.png ***!
  \************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "assets/images/more.png";

/***/ }),

/***/ "./src/assets/images/refresh.png":
/*!***************************************!*\
  !*** ./src/assets/images/refresh.png ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "assets/images/refresh.png";

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_main_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles/main.scss */ "./src/styles/main.scss");
/* harmony import */ var _modules_to_do_list_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/to-do-list.js */ "./src/modules/to-do-list.js");
/* harmony import */ var _modules_html_functions_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/html_functions.js */ "./src/modules/html_functions.js");
/* harmony import */ var _assets_images_refresh_png__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./assets/images/refresh.png */ "./src/assets/images/refresh.png");
/* harmony import */ var _assets_images_add_png__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./assets/images/add.png */ "./src/assets/images/add.png");
/* harmony import */ var _assets_images_more_png__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./assets/images/more.png */ "./src/assets/images/more.png");
/* harmony import */ var _assets_images_delete_png__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./assets/images/delete.png */ "./src/assets/images/delete.png");
/* harmony import */ var _assets_images_clipboard_png__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./assets/images/clipboard.png */ "./src/assets/images/clipboard.png");
/* harmony import */ var _assets_images_accept_png__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./assets/images/accept.png */ "./src/assets/images/accept.png");









var toDoList = new _modules_to_do_list_js__WEBPACK_IMPORTED_MODULE_1__["default"]();
(0,_modules_html_functions_js__WEBPACK_IMPORTED_MODULE_2__.populateAll)(toDoList);
var addNewTaskForm = document.getElementById('add-new-task');
addNewTaskForm.addEventListener('submit', function (event) {
  event.preventDefault();
  toDoList.addNewTask(addNewTaskForm.elements.new_task.value);
  addNewTaskForm.elements.new_task.value = '';
});
document.getElementById('clear-completed-button').addEventListener('click', function () {
  if ((0,_modules_html_functions_js__WEBPACK_IMPORTED_MODULE_2__.removeAllCompleted)(toDoList) === false) {
    (0,_modules_html_functions_js__WEBPACK_IMPORTED_MODULE_2__.showPopup)('Nothing to Remove');
  }
});
var refreshButton = document.getElementById('refresh-button');
refreshButton.addEventListener('click', function () {
  (0,_modules_html_functions_js__WEBPACK_IMPORTED_MODULE_2__.swing)();
});
document.querySelector('.clipboard img').addEventListener('click', function () {
  (0,_modules_html_functions_js__WEBPACK_IMPORTED_MODULE_2__.drop)();
});
})();

/******/ })()
;
//# sourceMappingURL=bundlee3db6920669d7e6dffa3.js.map