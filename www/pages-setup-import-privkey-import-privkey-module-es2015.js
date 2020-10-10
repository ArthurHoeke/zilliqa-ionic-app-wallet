(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-setup-import-privkey-import-privkey-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/setup/import-privkey/import-privkey.page.html":
/*!***********************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/setup/import-privkey/import-privkey.page.html ***!
  \***********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\r\n<ion-content [fullscreen]=\"true\">\r\n  <ion-header>\r\n    <ion-toolbar>\r\n      <ion-button routerLink=\"/getting-started\" id=\"backButton\"><ion-icon name=\"chevron-back-outline\"></ion-icon></ion-button>\r\n    </ion-toolbar>\r\n  </ion-header>\r\n  <div id=\"container\">\r\n    <h1>Import wallet</h1>\r\n    <p>To import your wallet please enter the private key below.</p>\r\n    <ion-item>\r\n      <ion-input [(ngModel)]=\"privkey\" placeholder=\"private key\"></ion-input>\r\n    </ion-item>\r\n    <ion-button (click)=\"checkPrivateKey()\">Continue</ion-button>\r\n  </div>\r\n</ion-content>\r\n");

/***/ }),

/***/ "./src/app/pages/setup/import-privkey/import-privkey-routing.module.ts":
/*!*****************************************************************************!*\
  !*** ./src/app/pages/setup/import-privkey/import-privkey-routing.module.ts ***!
  \*****************************************************************************/
/*! exports provided: ImportPrivkeyPageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ImportPrivkeyPageRoutingModule", function() { return ImportPrivkeyPageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var _import_privkey_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./import-privkey.page */ "./src/app/pages/setup/import-privkey/import-privkey.page.ts");




const routes = [
    {
        path: '',
        component: _import_privkey_page__WEBPACK_IMPORTED_MODULE_3__["ImportPrivkeyPage"]
    }
];
let ImportPrivkeyPageRoutingModule = class ImportPrivkeyPageRoutingModule {
};
ImportPrivkeyPageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
    })
], ImportPrivkeyPageRoutingModule);



/***/ }),

/***/ "./src/app/pages/setup/import-privkey/import-privkey.module.ts":
/*!*********************************************************************!*\
  !*** ./src/app/pages/setup/import-privkey/import-privkey.module.ts ***!
  \*********************************************************************/
/*! exports provided: ImportPrivkeyPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ImportPrivkeyPageModule", function() { return ImportPrivkeyPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/__ivy_ngcc__/fesm2015/ionic-angular.js");
/* harmony import */ var _import_privkey_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./import-privkey-routing.module */ "./src/app/pages/setup/import-privkey/import-privkey-routing.module.ts");
/* harmony import */ var _import_privkey_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./import-privkey.page */ "./src/app/pages/setup/import-privkey/import-privkey.page.ts");







let ImportPrivkeyPageModule = class ImportPrivkeyPageModule {
};
ImportPrivkeyPageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
            _import_privkey_routing_module__WEBPACK_IMPORTED_MODULE_5__["ImportPrivkeyPageRoutingModule"]
        ],
        declarations: [_import_privkey_page__WEBPACK_IMPORTED_MODULE_6__["ImportPrivkeyPage"]]
    })
], ImportPrivkeyPageModule);



/***/ }),

/***/ "./src/app/pages/setup/import-privkey/import-privkey.page.scss":
/*!*********************************************************************!*\
  !*** ./src/app/pages/setup/import-privkey/import-privkey.page.scss ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("#container {\n  display: flex;\n  flex-direction: column;\n  padding: 30px;\n}\n\n#logo {\n  width: 200px;\n  margin-top: 75px;\n}\n\nspan {\n  text-align: center;\n  margin-top: 10px;\n  font-weight: 500;\n}\n\nspan b {\n  color: #49C1BF;\n}\n\nion-button {\n  margin-top: 15px;\n}\n\n#backButton {\n  width: 45px;\n  height: 45px;\n  font-size: 13px;\n  --border-radius: 15px !important;\n  margin-left: 30px;\n  margin-top: 30px;\n}\n\n#backButton ion-icon {\n  color: #49C1BF;\n}\n\nion-item {\n  border-radius: 50px;\n  --background: #BFE9E8;\n  color: #49C1BF;\n  font-weight: bold;\n  -webkit-animation: barFadeIn 0.3s ease forwards;\n          animation: barFadeIn 0.3s ease forwards;\n  -webkit-animation-delay: 0.1s;\n          animation-delay: 0.1s;\n  margin-top: 15px;\n  margin-bottom: 15px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcGFnZXMvc2V0dXAvaW1wb3J0LXByaXZrZXkvaW1wb3J0LXByaXZrZXkucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksYUFBQTtFQUNBLHNCQUFBO0VBQ0EsYUFBQTtBQUNKOztBQUVBO0VBQ0ksWUFBQTtFQUNBLGdCQUFBO0FBQ0o7O0FBRUE7RUFDSSxrQkFBQTtFQUNBLGdCQUFBO0VBQ0EsZ0JBQUE7QUFDSjs7QUFFQTtFQUNJLGNBQUE7QUFDSjs7QUFFQTtFQUNJLGdCQUFBO0FBQ0o7O0FBRUE7RUFDSSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGVBQUE7RUFDQSxnQ0FBQTtFQUNBLGlCQUFBO0VBQ0EsZ0JBQUE7QUFDSjs7QUFFQTtFQUNJLGNBQUE7QUFDSjs7QUFFQTtFQUNJLG1CQUFBO0VBQ0EscUJBQUE7RUFDQSxjQUFBO0VBQ0EsaUJBQUE7RUFDQSwrQ0FBQTtVQUFBLHVDQUFBO0VBQ0EsNkJBQUE7VUFBQSxxQkFBQTtFQUNBLGdCQUFBO0VBQ0EsbUJBQUE7QUFDSiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL3NldHVwL2ltcG9ydC1wcml2a2V5L2ltcG9ydC1wcml2a2V5LnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIiNjb250YWluZXIge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgICBwYWRkaW5nOiAzMHB4O1xyXG59XHJcblxyXG4jbG9nbyB7XHJcbiAgICB3aWR0aDoyMDBweDtcclxuICAgIG1hcmdpbi10b3A6IDc1cHg7XHJcbn1cclxuXHJcbnNwYW4ge1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgbWFyZ2luLXRvcDogMTBweDtcclxuICAgIGZvbnQtd2VpZ2h0OiA1MDA7XHJcbn1cclxuXHJcbnNwYW4gYiB7XHJcbiAgICBjb2xvcjogIzQ5QzFCRjtcclxufVxyXG5cclxuaW9uLWJ1dHRvbiB7XHJcbiAgICBtYXJnaW4tdG9wOiAxNXB4O1xyXG59XHJcblxyXG4jYmFja0J1dHRvbiB7XHJcbiAgICB3aWR0aDogNDVweDtcclxuICAgIGhlaWdodDogNDVweDtcclxuICAgIGZvbnQtc2l6ZTogMTNweDtcclxuICAgIC0tYm9yZGVyLXJhZGl1czogMTVweCAhaW1wb3J0YW50O1xyXG4gICAgbWFyZ2luLWxlZnQ6IDMwcHg7XHJcbiAgICBtYXJnaW4tdG9wOiAzMHB4O1xyXG59XHJcblxyXG4jYmFja0J1dHRvbiBpb24taWNvbiB7XHJcbiAgICBjb2xvcjogIzQ5QzFCRjtcclxufVxyXG5cclxuaW9uLWl0ZW0ge1xyXG4gICAgYm9yZGVyLXJhZGl1czogNTBweDtcclxuICAgIC0tYmFja2dyb3VuZDogI0JGRTlFODtcclxuICAgIGNvbG9yOiAjNDlDMUJGO1xyXG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbiAgICBhbmltYXRpb246IGJhckZhZGVJbiAuM3MgZWFzZSBmb3J3YXJkcztcclxuICAgIGFuaW1hdGlvbi1kZWxheTogLjFzO1xyXG4gICAgbWFyZ2luLXRvcDogMTVweDtcclxuICAgIG1hcmdpbi1ib3R0b206IDE1cHg7XHJcbiAgfSJdfQ== */");

/***/ }),

/***/ "./src/app/pages/setup/import-privkey/import-privkey.page.ts":
/*!*******************************************************************!*\
  !*** ./src/app/pages/setup/import-privkey/import-privkey.page.ts ***!
  \*******************************************************************/
/*! exports provided: ImportPrivkeyPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ImportPrivkeyPage", function() { return ImportPrivkeyPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/__ivy_ngcc__/fesm2015/ionic-angular.js");
/* harmony import */ var _ionic_native_native_storage_ngx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic-native/native-storage/ngx */ "./node_modules/@ionic-native/native-storage/__ivy_ngcc__/ngx/index.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var _ionic_native_vibration_ngx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic-native/vibration/ngx */ "./node_modules/@ionic-native/vibration/__ivy_ngcc__/ngx/index.js");






const { BN, Long, bytes, units, validation } = __webpack_require__(/*! @zilliqa-js/util */ "./node_modules/@zilliqa-js/util/dist/index.umd.js");
const { Zilliqa } = __webpack_require__(/*! @zilliqa-js/zilliqa */ "./node_modules/@zilliqa-js/zilliqa/dist/index.js");
const { toBech32Address, getAddressFromPrivateKey, } = __webpack_require__(/*! @zilliqa-js/crypto */ "./node_modules/@zilliqa-js/crypto/dist/index.umd.js");
const zilliqa = new Zilliqa('https://api.zilliqa.com/');
let ImportPrivkeyPage = class ImportPrivkeyPage {
    constructor(vibration, alertController, nativeStorage, route) {
        this.vibration = vibration;
        this.alertController = alertController;
        this.nativeStorage = nativeStorage;
        this.route = route;
    }
    showPopup(head, message) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const alert = yield this.alertController.create({
                header: head,
                message: message,
                buttons: ['OK']
            });
            yield alert.present();
        });
    }
    ngOnInit() {
    }
    checkPrivateKey() {
        this.vibration.vibrate(100);
        if (validation.isPrivateKey(this.privkey)) {
            this.route.navigate(['/import-setpin/' + this.privkey]);
        }
        else {
            this.showPopup("Error", "Private key is incorrect.");
        }
    }
};
ImportPrivkeyPage.ctorParameters = () => [
    { type: _ionic_native_vibration_ngx__WEBPACK_IMPORTED_MODULE_5__["Vibration"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"] },
    { type: _ionic_native_native_storage_ngx__WEBPACK_IMPORTED_MODULE_3__["NativeStorage"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"] }
];
ImportPrivkeyPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-import-privkey',
        template: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! raw-loader!./import-privkey.page.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/setup/import-privkey/import-privkey.page.html")).default,
        styles: [Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! ./import-privkey.page.scss */ "./src/app/pages/setup/import-privkey/import-privkey.page.scss")).default]
    })
], ImportPrivkeyPage);



/***/ })

}]);
//# sourceMappingURL=pages-setup-import-privkey-import-privkey-module-es2015.js.map