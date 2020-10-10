(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-setup-success-success-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/setup/success/success.page.html":
/*!*********************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/setup/success/success.page.html ***!
  \*********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\r\n<ion-content [fullscreen]=\"true\">\r\n  <ion-header>\r\n    <ion-toolbar>\r\n    </ion-toolbar>\r\n  </ion-header>\r\n  <div id=\"container\">\r\n    <h1>Your wallet has been created!</h1>\r\n    <p>It is highly recommended to save a copy of your private key in case you lose your phone or data corrupts.</p>\r\n    <p>Zilliqa Wallet is not responsible for any loss of funds and does NOT save your wallet credentials.</p>\r\n    <p>Zilliqa Wallet is unable to recover wallets in case of loss.</p>\r\n    <ion-button id=\"copyButton\" (click)=\"copyPrivateKey()\">Copy Private Key</ion-button>\r\n    <ion-button (click)=\"openHome()\">Continue to wallet</ion-button>\r\n  </div>\r\n</ion-content>\r\n");

/***/ }),

/***/ "./src/app/pages/setup/success/success-routing.module.ts":
/*!***************************************************************!*\
  !*** ./src/app/pages/setup/success/success-routing.module.ts ***!
  \***************************************************************/
/*! exports provided: SuccessPageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SuccessPageRoutingModule", function() { return SuccessPageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var _success_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./success.page */ "./src/app/pages/setup/success/success.page.ts");




const routes = [
    {
        path: '',
        component: _success_page__WEBPACK_IMPORTED_MODULE_3__["SuccessPage"]
    }
];
let SuccessPageRoutingModule = class SuccessPageRoutingModule {
};
SuccessPageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
    })
], SuccessPageRoutingModule);



/***/ }),

/***/ "./src/app/pages/setup/success/success.module.ts":
/*!*******************************************************!*\
  !*** ./src/app/pages/setup/success/success.module.ts ***!
  \*******************************************************/
/*! exports provided: SuccessPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SuccessPageModule", function() { return SuccessPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/__ivy_ngcc__/fesm2015/ionic-angular.js");
/* harmony import */ var _success_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./success-routing.module */ "./src/app/pages/setup/success/success-routing.module.ts");
/* harmony import */ var _success_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./success.page */ "./src/app/pages/setup/success/success.page.ts");







let SuccessPageModule = class SuccessPageModule {
};
SuccessPageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
            _success_routing_module__WEBPACK_IMPORTED_MODULE_5__["SuccessPageRoutingModule"]
        ],
        declarations: [_success_page__WEBPACK_IMPORTED_MODULE_6__["SuccessPage"]]
    })
], SuccessPageModule);



/***/ }),

/***/ "./src/app/pages/setup/success/success.page.scss":
/*!*******************************************************!*\
  !*** ./src/app/pages/setup/success/success.page.scss ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("#container {\n  display: flex;\n  flex-direction: column;\n  padding: 30px;\n}\n\n#logo {\n  width: 200px;\n  margin-top: 75px;\n}\n\nspan {\n  text-align: center;\n  margin-top: 10px;\n  font-weight: 500;\n}\n\nspan b {\n  color: #49C1BF;\n}\n\nion-button {\n  margin-top: 15px;\n}\n\n#backButton {\n  width: 45px;\n  height: 45px;\n  font-size: 13px;\n  --border-radius: 15px !important;\n  margin-left: 30px;\n  margin-top: 30px;\n}\n\n#backButton ion-icon {\n  color: #49C1BF;\n}\n\n#copyButton {\n  --background: #49C1BF;\n  color: #FFFFFF;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcGFnZXMvc2V0dXAvc3VjY2Vzcy9zdWNjZXNzLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLGFBQUE7RUFDQSxzQkFBQTtFQUNBLGFBQUE7QUFDSjs7QUFFQTtFQUNJLFlBQUE7RUFDQSxnQkFBQTtBQUNKOztBQUVBO0VBQ0ksa0JBQUE7RUFDQSxnQkFBQTtFQUNBLGdCQUFBO0FBQ0o7O0FBRUE7RUFDSSxjQUFBO0FBQ0o7O0FBRUE7RUFDSSxnQkFBQTtBQUNKOztBQUVBO0VBQ0ksV0FBQTtFQUNBLFlBQUE7RUFDQSxlQUFBO0VBQ0EsZ0NBQUE7RUFDQSxpQkFBQTtFQUNBLGdCQUFBO0FBQ0o7O0FBRUE7RUFDSSxjQUFBO0FBQ0o7O0FBRUE7RUFDSSxxQkFBQTtFQUNBLGNBQUE7QUFDSiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL3NldHVwL3N1Y2Nlc3Mvc3VjY2Vzcy5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIjY29udGFpbmVyIHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAgcGFkZGluZzogMzBweDtcclxufVxyXG5cclxuI2xvZ28ge1xyXG4gICAgd2lkdGg6MjAwcHg7XHJcbiAgICBtYXJnaW4tdG9wOiA3NXB4O1xyXG59XHJcblxyXG5zcGFuIHtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgIG1hcmdpbi10b3A6IDEwcHg7XHJcbiAgICBmb250LXdlaWdodDogNTAwO1xyXG59XHJcblxyXG5zcGFuIGIge1xyXG4gICAgY29sb3I6ICM0OUMxQkY7XHJcbn1cclxuXHJcbmlvbi1idXR0b24ge1xyXG4gICAgbWFyZ2luLXRvcDogMTVweDtcclxufVxyXG5cclxuI2JhY2tCdXR0b24ge1xyXG4gICAgd2lkdGg6IDQ1cHg7XHJcbiAgICBoZWlnaHQ6IDQ1cHg7XHJcbiAgICBmb250LXNpemU6IDEzcHg7XHJcbiAgICAtLWJvcmRlci1yYWRpdXM6IDE1cHggIWltcG9ydGFudDtcclxuICAgIG1hcmdpbi1sZWZ0OiAzMHB4O1xyXG4gICAgbWFyZ2luLXRvcDogMzBweDtcclxufVxyXG5cclxuI2JhY2tCdXR0b24gaW9uLWljb24ge1xyXG4gICAgY29sb3I6ICM0OUMxQkY7XHJcbn1cclxuXHJcbiNjb3B5QnV0dG9uIHtcclxuICAgIC0tYmFja2dyb3VuZDogIzQ5QzFCRjtcclxuICAgIGNvbG9yOiAjRkZGRkZGO1xyXG59Il19 */");

/***/ }),

/***/ "./src/app/pages/setup/success/success.page.ts":
/*!*****************************************************!*\
  !*** ./src/app/pages/setup/success/success.page.ts ***!
  \*****************************************************/
/*! exports provided: SuccessPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SuccessPage", function() { return SuccessPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _ionic_native_clipboard_ngx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic-native/clipboard/ngx */ "./node_modules/@ionic-native/clipboard/__ivy_ngcc__/ngx/index.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/__ivy_ngcc__/fesm2015/ionic-angular.js");
/* harmony import */ var _ionic_native_vibration_ngx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic-native/vibration/ngx */ "./node_modules/@ionic-native/vibration/__ivy_ngcc__/ngx/index.js");






let SuccessPage = class SuccessPage {
    constructor(vibration, clipboard, activatedRoute, alertController, route) {
        this.vibration = vibration;
        this.clipboard = clipboard;
        this.activatedRoute = activatedRoute;
        this.alertController = alertController;
        this.route = route;
    }
    ngOnInit() {
        this.activatedRoute.params.subscribe(param => {
            this.privkey = param.privkey;
        });
    }
    showPopup(head, message) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const alert = yield this.alertController.create({
                header: head,
                message: message,
                buttons: [
                    {
                        text: 'Cancel'
                    },
                    {
                        text: 'Copy',
                        handler: () => {
                            this.clipboard.copy(this.privkey);
                        }
                    }
                ]
            });
            yield alert.present();
        });
    }
    copyPrivateKey() {
        this.showPopup("Private key", "Your private key is: " + this.privkey);
        this.vibration.vibrate(100);
    }
    openHome() {
        this.route.navigate(['/home/' + this.privkey]);
        this.vibration.vibrate(100);
    }
};
SuccessPage.ctorParameters = () => [
    { type: _ionic_native_vibration_ngx__WEBPACK_IMPORTED_MODULE_5__["Vibration"] },
    { type: _ionic_native_clipboard_ngx__WEBPACK_IMPORTED_MODULE_2__["Clipboard"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["AlertController"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] }
];
SuccessPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-success',
        template: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! raw-loader!./success.page.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/setup/success/success.page.html")).default,
        styles: [Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! ./success.page.scss */ "./src/app/pages/setup/success/success.page.scss")).default]
    })
], SuccessPage);



/***/ })

}]);
//# sourceMappingURL=pages-setup-success-success-module-es2015.js.map