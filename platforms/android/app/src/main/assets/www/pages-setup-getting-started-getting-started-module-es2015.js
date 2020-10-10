(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-setup-getting-started-getting-started-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/setup/getting-started/getting-started.page.html":
/*!*************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/setup/getting-started/getting-started.page.html ***!
  \*************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-content [fullscreen]=\"true\">\r\n  <ion-header>\r\n    <ion-toolbar>\r\n      <ion-title>\r\n        <img src=\"/assets/icon/logo.png\" alt=\"Logo\" id=\"logo\">\r\n      </ion-title>\r\n    </ion-toolbar>\r\n  </ion-header>\r\n  <div id=\"container\">\r\n    <h1>Getting started</h1>\r\n    <p>Zilliqa Wallet is a free open-source community managed app designed for safe storage of your Zilliqa tokens.</p>\r\n    <ion-button routerLink=\"/account-setup\">Create wallet</ion-button>\r\n    <span routerLink=\"/import-privkey\">Already have a wallet? <b>Import</b></span>\r\n  </div>\r\n</ion-content>\r\n");

/***/ }),

/***/ "./src/app/pages/setup/getting-started/getting-started-routing.module.ts":
/*!*******************************************************************************!*\
  !*** ./src/app/pages/setup/getting-started/getting-started-routing.module.ts ***!
  \*******************************************************************************/
/*! exports provided: GettingStartedPageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GettingStartedPageRoutingModule", function() { return GettingStartedPageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var _getting_started_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getting-started.page */ "./src/app/pages/setup/getting-started/getting-started.page.ts");




const routes = [
    {
        path: '',
        component: _getting_started_page__WEBPACK_IMPORTED_MODULE_3__["GettingStartedPage"]
    }
];
let GettingStartedPageRoutingModule = class GettingStartedPageRoutingModule {
};
GettingStartedPageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
    })
], GettingStartedPageRoutingModule);



/***/ }),

/***/ "./src/app/pages/setup/getting-started/getting-started.module.ts":
/*!***********************************************************************!*\
  !*** ./src/app/pages/setup/getting-started/getting-started.module.ts ***!
  \***********************************************************************/
/*! exports provided: GettingStartedPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GettingStartedPageModule", function() { return GettingStartedPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/__ivy_ngcc__/fesm2015/ionic-angular.js");
/* harmony import */ var _getting_started_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./getting-started-routing.module */ "./src/app/pages/setup/getting-started/getting-started-routing.module.ts");
/* harmony import */ var _getting_started_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./getting-started.page */ "./src/app/pages/setup/getting-started/getting-started.page.ts");







let GettingStartedPageModule = class GettingStartedPageModule {
};
GettingStartedPageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
            _getting_started_routing_module__WEBPACK_IMPORTED_MODULE_5__["GettingStartedPageRoutingModule"]
        ],
        declarations: [_getting_started_page__WEBPACK_IMPORTED_MODULE_6__["GettingStartedPage"]]
    })
], GettingStartedPageModule);



/***/ }),

/***/ "./src/app/pages/setup/getting-started/getting-started.page.scss":
/*!***********************************************************************!*\
  !*** ./src/app/pages/setup/getting-started/getting-started.page.scss ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("#container {\n  display: flex;\n  flex-direction: column;\n  padding: 30px;\n}\n\n#logo {\n  width: 200px;\n  margin-top: 75px;\n}\n\nspan {\n  text-align: center;\n  margin-top: 10px;\n  font-weight: 500;\n}\n\nspan b {\n  color: #49C1BF;\n}\n\nion-button {\n  margin-top: 15px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcGFnZXMvc2V0dXAvZ2V0dGluZy1zdGFydGVkL2dldHRpbmctc3RhcnRlZC5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxhQUFBO0FBQ0o7O0FBRUE7RUFDSSxZQUFBO0VBQ0EsZ0JBQUE7QUFDSjs7QUFFQTtFQUNJLGtCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxnQkFBQTtBQUNKOztBQUVBO0VBQ0ksY0FBQTtBQUNKOztBQUVBO0VBQ0ksZ0JBQUE7QUFDSiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL3NldHVwL2dldHRpbmctc3RhcnRlZC9nZXR0aW5nLXN0YXJ0ZWQucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiI2NvbnRhaW5lciB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICAgIHBhZGRpbmc6IDMwcHg7XHJcbn1cclxuXHJcbiNsb2dvIHtcclxuICAgIHdpZHRoOjIwMHB4O1xyXG4gICAgbWFyZ2luLXRvcDogNzVweDtcclxufVxyXG5cclxuc3BhbiB7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICBtYXJnaW4tdG9wOiAxMHB4O1xyXG4gICAgZm9udC13ZWlnaHQ6IDUwMDtcclxufVxyXG5cclxuc3BhbiBiIHtcclxuICAgIGNvbG9yOiAjNDlDMUJGO1xyXG59XHJcblxyXG5pb24tYnV0dG9uIHtcclxuICAgIG1hcmdpbi10b3A6IDE1cHg7XHJcbn0iXX0= */");

/***/ }),

/***/ "./src/app/pages/setup/getting-started/getting-started.page.ts":
/*!*********************************************************************!*\
  !*** ./src/app/pages/setup/getting-started/getting-started.page.ts ***!
  \*********************************************************************/
/*! exports provided: GettingStartedPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GettingStartedPage", function() { return GettingStartedPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _ionic_native_android_permissions_ngx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic-native/android-permissions/ngx */ "./node_modules/@ionic-native/android-permissions/__ivy_ngcc__/ngx/index.js");



let GettingStartedPage = class GettingStartedPage {
    constructor(androidPermissions) {
        this.androidPermissions = androidPermissions;
    }
    ngOnInit() {
    }
};
GettingStartedPage.ctorParameters = () => [
    { type: _ionic_native_android_permissions_ngx__WEBPACK_IMPORTED_MODULE_2__["AndroidPermissions"] }
];
GettingStartedPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-getting-started',
        template: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! raw-loader!./getting-started.page.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/setup/getting-started/getting-started.page.html")).default,
        styles: [Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! ./getting-started.page.scss */ "./src/app/pages/setup/getting-started/getting-started.page.scss")).default]
    })
], GettingStartedPage);



/***/ })

}]);
//# sourceMappingURL=pages-setup-getting-started-getting-started-module-es2015.js.map