/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/CounterTime.js":
/*!*******************************!*\
  !*** ./src/js/CounterTime.js ***!
  \*******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ CounterTime; }
/* harmony export */ });
class CounterTime {
  constructor(element) {
    this.element = element;
    this.intervalId = null;
  }
  startCounter() {
    let minutesTen = 0;
    let minutesUnit = 0;
    let secondsTen = 0;
    let secondsUnit = 0;
    this.element.textContent = `${minutesTen}${minutesUnit}:${secondsTen}${secondsUnit}`;
    this.intervalId = setInterval(() => {
      secondsUnit += 1;
      if (secondsUnit === 10) {
        secondsUnit = 0;
        secondsTen += 1;
      }
      if (secondsTen === 6) {
        secondsTen = 0;
        minutesUnit += 1;
      }
      if (minutesUnit === 10) {
        minutesUnit = 0;
        minutesTen += 1;
      }
      if (minutesTen === 6) this.element.textContent = 'end';
      this.element.textContent = `${minutesTen}${minutesUnit}:${secondsTen}${secondsUnit}`;
    }, 1000);
  }
  stopCounter() {
    this.element.textContent = '';
    clearInterval(this.intervalId);
  }
}

/***/ }),

/***/ "./src/js/CreationElements.js":
/*!************************************!*\
  !*** ./src/js/CreationElements.js ***!
  \************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ CreationElements; }
/* harmony export */ });
class CreationElements {
  static createElement(tag, classes, attributes) {
    const element = document.createElement(tag);
    if (classes) element.classList.add(...classes);
    if (attributes) {
      for (let i = 0; i < attributes.length; i += 1) {
        element.setAttribute(attributes[i].name, attributes[i].value);
      }
    }
    return element;
  }
}

/***/ }),

/***/ "./src/js/Curtain.js":
/*!***************************!*\
  !*** ./src/js/Curtain.js ***!
  \***************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Curtain; }
/* harmony export */ });
class Curtain {
  constructor(element) {
    this.element = element;
  }
  showCurtain(zIndex, color) {
    if (zIndex) this.element.style.zIndex = zIndex;
    if (color) this.element.style.backgroundColor = color;
    this.element.classList.remove('hidden');
  }
  hideCurtain() {
    if (this.element.style) this.element.removeAttribute('style');
    this.element.classList.add('hidden');
  }
}

/***/ }),

/***/ "./src/js/GetDate.js":
/*!***************************!*\
  !*** ./src/js/GetDate.js ***!
  \***************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ GetDate; }
/* harmony export */ });
class GetDate {
  static getFormatDate() {
    const date = new Date();
    const dd = GetDate.getDay(date);
    const mm = GetDate.getMonth(date);
    const yy = GetDate.getYear(date);
    const fullDate = `${dd}.${mm}.${yy}`;
    const time = date.toTimeString().slice(0, 5);
    const result = `${fullDate} ${time}`;
    return result;
  }
  static getDay(date) {
    let dd = date.getDate();
    if (dd.length === 1) dd = `0${dd}`;
    return dd;
  }
  static getMonth(date) {
    let mm = date.getMonth() + 1;
    if (mm.length === 1) mm = `0${mm}`;
    return mm;
  }
  static getYear(date) {
    const result = `${date.getUTCFullYear()}`;
    return result;
  }
}

/***/ }),

/***/ "./src/js/PostControl.js":
/*!*******************************!*\
  !*** ./src/js/PostControl.js ***!
  \*******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ PostControl; }
/* harmony export */ });
/* harmony import */ var _GetDate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GetDate */ "./src/js/GetDate.js");
/* harmony import */ var _conversionUserCoords__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./conversionUserCoords */ "./src/js/conversionUserCoords.js");


class PostControl {
  constructor(widget, showErrorMessage, toolTip, previewWidget, showInform, counter) {
    this.widget = widget;
    this.showErrorMessage = showErrorMessage;
    this.toolTip = toolTip;
    this.previewWidget = previewWidget;
    this.showInform = showInform;
    this.counter = counter;
    this.chunks = null;
    this.objPost = null;
    this.recorder = null;
    this.stream = null;
    this.canselStatus = true;
    this.addTextPost = this.addTextPost.bind(this);
    this.getUserCoords = this.getUserCoords.bind(this);
    this.recAudio = this.recAudio.bind(this);
    this.stopRecord = this.stopRecord.bind(this);
    this.recVideo = this.recVideo.bind(this);
    this.canselRecord = this.canselRecord.bind(this);
  }
  activation() {
    this.widget.formAddPost.addEventListener('submit', this.addTextPost);
    this.widget.enterCoords.addEventListener('input', () => {
      if (this.toolTip.isToolTip()) this.toolTip.hideAllToolTips();
    });
    this.widget.btnAddAudio.addEventListener('click', this.recAudio);
    this.widget.btnAddVideo.addEventListener('click', this.recVideo);
    this.widget.btnEndRec.addEventListener('click', this.stopRecord);
    this.widget.btnCansel.addEventListener('click', this.canselRecord);
  }
  createObjPost() {
    this.objPost = {};
    this.objPost.date = _GetDate__WEBPACK_IMPORTED_MODULE_0__["default"].getFormatDate();
  }
  addTextPost(e) {
    e.preventDefault();
    this.createObjPost();
    this.objPost.text = this.widget.enterText.value;
    this.objPost.type = 'text';
    this.addPost();
  }
  addPost() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(data => {
        const {
          latitude,
          longitude
        } = data.coords;
        this.objPost.coords = `[${latitude}, ${longitude}]`;
        this.widget.createPost(this.objPost);
        this.objPost = null;
      }, err => {
        console.log(err.message);
        this.showForm();
      }, {
        enableHighAccuracy: true
      });
    } else {
      this.showInform.showMessage('Используйте другой браузер, определение геолокации недоступно');
    }
  }
  showForm() {
    this.widget.formCoords.classList.remove('hidden');
    this.widget.formCoords.addEventListener('submit', this.getUserCoords);
    this.widget.formCoords.style.left = `${this.widget.timelineBox.offsetWidth / 2 - this.widget.enterCoords.offsetWidth / 2}px`;
  }
  getUserCoords(e) {
    e.preventDefault();
    const coords = (0,_conversionUserCoords__WEBPACK_IMPORTED_MODULE_1__["default"])(this.widget.enterCoords.value);
    if (coords) {
      this.objPost.coords = coords;
      this.widget.createPost(this.objPost);
      this.objPost = null;
      this.widget.formCoords.classList.add('hidden');
      this.widget.formCoords.reset();
    } else {
      const message = 'Введите координаты в виде: 51.50851, -0.12572';
      this.toolTip.showToolTip(this.widget.enterCoords, message);
    }
  }
  recAudio() {
    if (navigator.mediaDevices) {
      navigator.mediaDevices.getUserMedia({
        audio: true
      }).then(stream => {
        this.stream = stream;
        this.recorder = new MediaRecorder(stream);
        this.recorder.addEventListener('start', () => {
          this.chunks = [];
          this.widget.toggleBtnBox();
          this.counter.startCounter();
        });
        this.recorder.addEventListener('dataavailable', event => {
          this.chunks.push(event.data);
        });
        this.recorder.addEventListener('stop', () => {
          if (this.canselStatus) {
            const blob = new Blob(this.chunks);
            const src = URL.createObjectURL(blob);
            this.addAudioPost(src);
          }
          this.widget.toggleBtnBox();
          this.chunks = null;
          this.canselStatus = true;
          this.counter.stopCounter();
        });
        this.recorder.start();
      }).catch(err => {
        console.log(err.message);
        this.showInform.showMessage('Предоставьте доступ к микрофону');
      });
    } else {
      this.showInform.showMessage('Используйте другой браузер, невозможно получить доступ к микрофону');
    }
  }
  addAudioPost(src) {
    this.createObjPost();
    this.objPost.src = src;
    this.objPost.type = 'audio';
    this.addPost();
  }
  stopRecord() {
    this.recorder.stop();
    this.stream.getTracks().forEach(track => track.stop());
    this.recorder = null;
    this.stream = null;
  }
  canselRecord() {
    this.canselStatus = false;
    this.stopRecord();
  }
  recVideo() {
    if (navigator.mediaDevices) {
      navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true
      }).then(stream => {
        this.stream = stream;
        this.recorder = new MediaRecorder(this.stream);
        this.recorder.addEventListener('start', () => {
          this.chunks = [];
          this.widget.toggleBtnBox();
          this.previewWidget.showPreview(this.widget.listPosts, stream);
          this.counter.startCounter();
        });
        this.recorder.addEventListener('dataavailable', event => {
          this.chunks.push(event.data);
        });
        this.recorder.addEventListener('stop', () => {
          if (this.canselStatus) {
            const blob = new Blob(this.chunks);
            const src = URL.createObjectURL(blob);
            this.addVideoPost(src);
          }
          this.widget.toggleBtnBox();
          this.previewWidget.hidePreview();
          this.chunks = null;
          this.canselStatus = true;
          this.counter.stopCounter();
        });
        this.recorder.start();
      }).catch(err => {
        console.log(err.message);
        this.showInform.showMessage('Предоставьте доступ к камере и  микрофону');
      });
    } else {
      this.showInform.showMessage('Используйте другой браузер, невозможно получить доступ к камере');
    }
  }
  addVideoPost(src) {
    this.createObjPost();
    this.objPost.src = src;
    this.objPost.type = 'video';
    this.addPost();
  }
}

/***/ }),

/***/ "./src/js/PreviewWidget.js":
/*!*********************************!*\
  !*** ./src/js/PreviewWidget.js ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ PreviewWidget; }
/* harmony export */ });
class PreviewWidget {
  constructor(container, showErrorMessage) {
    this.container = container;
    this.showErrorMessage = showErrorMessage;
    this.previewStatus = false;
    this.previewBox = this.container.querySelector('.preview_box');
    this.preview = this.previewBox.querySelector('.preview');
  }
  showPreview(element, stream) {
    if ('srcObject' in this.preview) {
      try {
        this.previewStatus = true;
        this.previewBox.classList.remove('hidden');
        const {
          bottom
        } = element.getBoundingClientRect();
        this.previewBox.style.top = `${bottom - this.previewBox.offsetHeight - 10}px`;
        this.preview.srcObject = stream;
        this.preview.addEventListener('canplay', e => {
          e.preventDefault();
          this.preview.play();
        });
      } catch (err) {
        this.showErrorMessage.showMessage(err.message);
      }
    }
  }
  hidePreview() {
    if (this.previewStatus) {
      this.previewBox.classList.add('hidden');
      this.preview.srcOject = null;
      this.previewStatus = false;
    }
  }
}

/***/ }),

/***/ "./src/js/ShowErrorMessage.js":
/*!************************************!*\
  !*** ./src/js/ShowErrorMessage.js ***!
  \************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ ShowErrorMessage; }
/* harmony export */ });
class ShowErrorMessage {
  constructor(container, classNameBox, classNameMessage, classNameBtn, classNameHide, curtain) {
    this.container = container;
    this.classNameBox = classNameBox;
    this.classNameMessage = classNameMessage;
    this.classNameHide = classNameHide;
    this.classNameBtn = classNameBtn;
    this.curtain = curtain;
    this.errorMessageBox = this.container.querySelector(`.${this.classNameBox}`);
    this.errorMessage = this.errorMessageBox.querySelector(`.${this.classNameMessage}`);
    this.errorBtnOK = this.errorMessageBox.querySelector(`.${classNameBtn}`);
    this.hideMessage = this.hideMessage.bind(this);
  }
  showMessage(message) {
    if (message) this.errorMessage.textContent = message;
    this.curtain.showCurtain('9999', 'red');
    this.errorMessageBox.classList.remove(this.classNameHide);
    this.errorMessageBox.style.left = `${this.container.offsetWidth / 2 - this.errorMessageBox.offsetWidth / 2}px`;
    this.errorMessageBox.style.top = `${this.container.offsetHeight / 2 - this.errorMessageBox.offsetHeight / 2}px`;
    this.errorBtnOK.addEventListener('click', this.hideMessage);
  }
  hideMessage() {
    this.errorMessage.textContent = '';
    this.curtain.hideCurtain();
    this.errorMessageBox.classList.add(this.classNameHide);
    this.errorBtnOK.removeEventListener('click', this.hideMessage);
  }
}

/***/ }),

/***/ "./src/js/ShowInform.js":
/*!******************************!*\
  !*** ./src/js/ShowInform.js ***!
  \******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ ShowInform; }
/* harmony export */ });
class ShowInform {
  constructor(container, curtain) {
    this.container = container;
    this.curtain = curtain;
    this.informBox = this.container.querySelector('.inform_box');
    this.messageEl = this.informBox.querySelector('.inform_message');
    this.btnOk = this.informBox.querySelector('.inform_ok');
    this.hideMessage = this.hideMessage.bind(this);
  }
  showMessage(message) {
    this.informBox.classList.remove('hidden');
    this.curtain.showCurtain('99');
    this.messageEl.textContent = message;
    this.informBox.style.left = `${this.container.offsetWidth / 2 - this.informBox.offsetWidth / 2}px`;
    this.informBox.style.top = `${this.container.offsetHeight / 2 - this.informBox.offsetHeight / 2}px`;
    this.btnOk.addEventListener('click', this.hideMessage);
  }
  hideMessage() {
    this.messageEl.textContent = '';
    this.informBox.classList.add('hidden');
    this.curtain.hideCurtain();
    this.btnOk.removeEventListener('click', this.hideMessage);
  }
}

/***/ }),

/***/ "./src/js/TimelineWidget.js":
/*!**********************************!*\
  !*** ./src/js/TimelineWidget.js ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ TimelineWidget; }
/* harmony export */ });
/* harmony import */ var _CreationElements__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CreationElements */ "./src/js/CreationElements.js");

class TimelineWidget {
  constructor(container) {
    this.container = container;
    this.timelineBox = this.container.querySelector('.timeline_box');
    this.formAddPost = document.forms.post;
    this.enterText = this.formAddPost.elements.text;
    this.listPosts = this.container.querySelector('.list_posts');
    this.formCoords = document.forms.entercoords;
    this.enterCoords = this.formCoords.elements.coords;
    this.enterCurtain = this.container.querySelector('.enter_curtain');
    this.addBox = this.container.querySelector('.box_add');
    this.btnAddAudio = this.container.querySelector('.add_audio');
    this.btnAddVideo = this.container.querySelector('.add_video');
    this.recBox = this.container.querySelector('.box_rec');
    this.btnEndRec = this.container.querySelector('.btn_end');
    this.btnCansel = this.container.querySelector('.btn_cansel');
  }
  createPost(obj) {
    const post = _CreationElements__WEBPACK_IMPORTED_MODULE_0__["default"].createElement('li', ['post']);
    const contentBox = _CreationElements__WEBPACK_IMPORTED_MODULE_0__["default"].createElement('div', ['content_box']);
    let content = null;
    switch (obj.type) {
      case 'text':
        content = _CreationElements__WEBPACK_IMPORTED_MODULE_0__["default"].createElement('p', ['content_text', 'content']);
        content.textContent = obj.text;
        break;
      case 'audio':
        content = _CreationElements__WEBPACK_IMPORTED_MODULE_0__["default"].createElement('audio', ['content_audio', 'content'], [{
          name: 'src',
          value: obj.src
        }, {
          name: 'controls',
          value: true
        }]);
        break;
      case 'video':
        content = _CreationElements__WEBPACK_IMPORTED_MODULE_0__["default"].createElement('video', ['content_video', 'content'], [{
          name: 'src',
          value: obj.src
        }, {
          name: 'controls',
          value: true
        }]);
        break;
      default:
        break;
    }
    contentBox.append(content);
    post.append(contentBox);
    const dateBox = _CreationElements__WEBPACK_IMPORTED_MODULE_0__["default"].createElement('div', ['date_box']);
    const dateText = _CreationElements__WEBPACK_IMPORTED_MODULE_0__["default"].createElement('span', ['date_text']);
    dateText.textContent = obj.date;
    dateBox.append(dateText);
    post.append(dateBox);
    const coordsBox = _CreationElements__WEBPACK_IMPORTED_MODULE_0__["default"].createElement('div', ['coordinates_box']);
    const coordsText = _CreationElements__WEBPACK_IMPORTED_MODULE_0__["default"].createElement('span', ['coordinates_text']);
    coordsText.textContent = obj.coords;
    coordsBox.append(coordsText);
    post.append(coordsBox);
    this.listPosts.append(post);
    post.scrollIntoView({
      block: 'end',
      behavior: 'smooth'
    });
  }
  toggleBtnBox() {
    this.enterText.classList.toggle('hidden');
    this.enterCurtain.classList.toggle('hidden');
    this.addBox.classList.toggle('hidden');
    this.recBox.classList.toggle('hidden');
  }
}

/***/ }),

/***/ "./src/js/ToolTip.js":
/*!***************************!*\
  !*** ./src/js/ToolTip.js ***!
  \***************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ ToolTip; }
/* harmony export */ });
class ToolTip {
  constructor(classNameTooltip) {
    this.classNameTooltip = classNameTooltip;
    this.toolTipsBox = [];
  }
  showToolTip(element, message) {
    const toolTip = document.createElement('div');
    toolTip.classList.add(this.classNameTooltip);
    toolTip.textContent = message;
    toolTip.dataset.name = element.name;
    this.toolTipsBox.push(toolTip);
    document.body.append(toolTip);
    const {
      top,
      left
    } = element.getBoundingClientRect();
    const offsetHorizont = (toolTip.offsetWidth - element.offsetWidth) / 2;
    toolTip.style.left = `${left - offsetHorizont}px`;
    toolTip.style.top = `${top - toolTip.offsetHeight - 10}px`;
  }
  hideAllToolTips() {
    for (let i = 0; i < this.toolTipsBox.length; i += 1) {
      this.toolTipsBox[i].remove();
    }
    this.toolTipsBox = [];
  }
  hideToolTip(name) {
    const hideToolTip = this.toolTipsBox.find(t => t.dataset.name === name);
    hideToolTip.remove();
    this.toolTipsBox = this.toolTipsBox.filter(t => t !== hideToolTip);
  }
  isToolTip() {
    if (this.toolTipsBox.length !== 0) return true;
    return false;
  }
}

/***/ }),

/***/ "./src/js/app.js":
/*!***********************!*\
  !*** ./src/js/app.js ***!
  \***********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _PostControl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PostControl */ "./src/js/PostControl.js");
/* harmony import */ var _TimelineWidget__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TimelineWidget */ "./src/js/TimelineWidget.js");
/* harmony import */ var _Curtain__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Curtain */ "./src/js/Curtain.js");
/* harmony import */ var _ShowErrorMessage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ShowErrorMessage */ "./src/js/ShowErrorMessage.js");
/* harmony import */ var _ToolTip__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ToolTip */ "./src/js/ToolTip.js");
/* harmony import */ var _PreviewWidget__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./PreviewWidget */ "./src/js/PreviewWidget.js");
/* harmony import */ var _ShowInform__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./ShowInform */ "./src/js/ShowInform.js");
/* harmony import */ var _CounterTime__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./CounterTime */ "./src/js/CounterTime.js");








const container = document.querySelector('.container');
const curtainEl = document.querySelector('.curtain');
const time = document.querySelector('.timer_rec');
const widget = new _TimelineWidget__WEBPACK_IMPORTED_MODULE_1__["default"](container);
const curtain = new _Curtain__WEBPACK_IMPORTED_MODULE_2__["default"](curtainEl);
const errMessage = new _ShowErrorMessage__WEBPACK_IMPORTED_MODULE_3__["default"](container, 'error-message_box', 'error-message_text', 'error-message_ok', 'hidden', curtain);
const toolTip = new _ToolTip__WEBPACK_IMPORTED_MODULE_4__["default"]('tooltip');
const previewWidget = new _PreviewWidget__WEBPACK_IMPORTED_MODULE_5__["default"](container, errMessage);
const showInform = new _ShowInform__WEBPACK_IMPORTED_MODULE_6__["default"](container, curtain);
const counter = new _CounterTime__WEBPACK_IMPORTED_MODULE_7__["default"](time);
const controller = new _PostControl__WEBPACK_IMPORTED_MODULE_0__["default"](widget, errMessage, toolTip, previewWidget, showInform, counter);
controller.activation();

/***/ }),

/***/ "./src/js/conversionUserCoords.js":
/*!****************************************!*\
  !*** ./src/js/conversionUserCoords.js ***!
  \****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ conversionUserCoords; }
/* harmony export */ });
function conversionUserCoords(value) {
  if (/^\[?[-]?\d*\.{1}\d*[,]{1}[ ]?[-]?\d*\.{1}\d*\]?$/.test(value)) {
    const array = [];
    value.split(',').forEach(el => array.push(el.split('').filter(e => e !== '[' && e !== ']' && e !== ' ').join('')));
    return `[${array[0]}, ${array[1]}]`;
  }
  return false;
}

/***/ }),

/***/ "./src/index.html":
/*!************************!*\
  !*** ./src/index.html ***!
  \************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <meta http-equiv=\"X-UA-Compatible\" content=\"ie=edge\">\n    <title>Timeline</title>\n</head>\n<body>\n    <div class=\"container\">\n        <div class=\"timeline_box\">\n            <ul class=\"list_posts\"></ul>\n            <div class=\"preview_box hidden\">\n                <video class=\"preview\" autoplay muted></video>\n            </div>\n            <form name=\"post\" class=\"add_post\">\n                <div class=\"enter_curtain hidden\">\n                    <span class=\"enter_curtain_text\">Идет запись</span>\n                </div>\n                <input name=\"text\" type=\"text\" class=\"enter_text\" placeholder=\"Enter text...\">\n                <div class=\"btn_box box_add\">\n                    <button type=\"button\" class=\"add_audio btn_add\" aria-label=\"Записать аудио\"></button>\n                    <button type=\"button\" class=\"add_video btn_add\" aria-label=\"Записать видео\"></button>\n                </div>\n                <div class=\"btn_box box_rec hidden\">\n                    <button type=\"button\" class=\"btn_end btn_rec\" aria-label=\"Остановить запись\"></button>\n                    <p class=\"timer_rec\"></p>\n                    <button type=\"button\" class=\"btn_cansel btn_rec\" aria-label=\"Отменить запись\"></button>\n                </div>\n            </form>\n            <form name=\"entercoords\" class=\"coords_user hidden\">\n                <h5 class=\"inform_title\">Что-то пошло не так</h5>\n                <p class=\"inform_text\">\n                    К сожалению, нам не удалось определить ваше местоположение,\n                    пожалуйста, дайте разрешение на использование геолокации,\n                    либо введите координаты вручную.\n                </p>\n                <p class=\"coords_comment\">Широта и долгота через запятую</p>\n                <input name=\"coords\" type=\"text\" class=\"enter_coords\">\n            </form>\n        </div>\n        <div class=\"error-message_box hidden\">\n            <h3 class=\"error-message_title\">Произошла ошибка</h3>\n            <span class=\"error-message_text\"></span>\n            <button type=\"button\" class=\"error-message_ok\">Ok</button>\n        </div>\n        <div class=\"inform_box hidden\">\n            <span class=\"inform_message\"></span>\n            <button type=\"button\" class=\"inform_ok\">Ok</button>\n        </div>\n        <div class=\"curtain hidden\"></div>\n    </div>\n</body>\n</html>\n";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "./src/css/style.css":
/*!***************************!*\
  !*** ./src/css/style.css ***!
  \***************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/licenses.txt":
/*!**************************!*\
  !*** ./src/licenses.txt ***!
  \**************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "licenses.txt";

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
/******/ 			// no module.id needed
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
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	!function() {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	!function() {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && !scriptUrl) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _js_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./js/app */ "./src/js/app.js");
/* harmony import */ var _index_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.html */ "./src/index.html");
/* harmony import */ var _css_style_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./css/style.css */ "./src/css/style.css");
/* harmony import */ var _licenses_txt__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./licenses.txt */ "./src/licenses.txt");




}();
/******/ })()
;
//# sourceMappingURL=main.js.map