(function () {
  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  (window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-setup-import-setpin-import-setpin-module"], {
    /***/
    "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/setup/import-setpin/import-setpin.page.html":
    /*!*********************************************************************************************************!*\
      !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/setup/import-setpin/import-setpin.page.html ***!
      \*********************************************************************************************************/

    /*! exports provided: default */

    /***/
    function node_modulesRawLoaderDistCjsJsSrcAppPagesSetupImportSetpinImportSetpinPageHtml(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony default export */


      __webpack_exports__["default"] = "\r\n<ion-content [fullscreen]=\"true\">\r\n  <ion-header>\r\n    <ion-toolbar>\r\n      <ion-button routerLink=\"/getting-started\" id=\"backButton\"><ion-icon name=\"chevron-back-outline\"></ion-icon></ion-button>\r\n    </ion-toolbar>\r\n  </ion-header>\r\n  <div id=\"container\">\r\n    <h1>Wallet PIN</h1>\r\n    <p>Please enter a 6 digit PIN to safely lock and encrypt your wallet.</p>\r\n    <div id=\"keypadContainer\">\r\n      <div id=\"keypad\">\r\n        <div>\r\n          <ion-button (click)=\"setPin('1')\">1</ion-button>\r\n          <ion-button (click)=\"setPin('2')\">2</ion-button>\r\n          <ion-button (click)=\"setPin('3')\">3</ion-button>\r\n        </div>\r\n        <div>\r\n          <ion-button (click)=\"setPin('4')\">4</ion-button>\r\n          <ion-button (click)=\"setPin('5')\">5</ion-button>\r\n          <ion-button (click)=\"setPin('6')\">6</ion-button>\r\n        </div>\r\n        <div>\r\n          <ion-button (click)=\"setPin('7')\">7</ion-button>\r\n          <ion-button (click)=\"setPin('8')\">8</ion-button>\r\n          <ion-button (click)=\"setPin('9')\">9</ion-button>\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <ion-button (click)=\"savePin()\" id=\"{{checkPinValidity() ? 'validPin': 'unvalidPin'}}\">set pin: {{ selectedPin }}</ion-button>\r\n  </div>\r\n</ion-content>\r\n";
      /***/
    },

    /***/
    "./src/app/pages/setup/import-setpin/import-setpin-routing.module.ts":
    /*!***************************************************************************!*\
      !*** ./src/app/pages/setup/import-setpin/import-setpin-routing.module.ts ***!
      \***************************************************************************/

    /*! exports provided: ImportSetpinPageRoutingModule */

    /***/
    function srcAppPagesSetupImportSetpinImportSetpinRoutingModuleTs(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "ImportSetpinPageRoutingModule", function () {
        return ImportSetpinPageRoutingModule;
      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! tslib */
      "./node_modules/tslib/tslib.es6.js");
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/core */
      "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/router */
      "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
      /* harmony import */


      var _import_setpin_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ./import-setpin.page */
      "./src/app/pages/setup/import-setpin/import-setpin.page.ts");

      var routes = [{
        path: '',
        component: _import_setpin_page__WEBPACK_IMPORTED_MODULE_3__["ImportSetpinPage"]
      }];

      var ImportSetpinPageRoutingModule = function ImportSetpinPageRoutingModule() {
        _classCallCheck(this, ImportSetpinPageRoutingModule);
      };

      ImportSetpinPageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
      })], ImportSetpinPageRoutingModule);
      /***/
    },

    /***/
    "./src/app/pages/setup/import-setpin/import-setpin.module.ts":
    /*!*******************************************************************!*\
      !*** ./src/app/pages/setup/import-setpin/import-setpin.module.ts ***!
      \*******************************************************************/

    /*! exports provided: ImportSetpinPageModule */

    /***/
    function srcAppPagesSetupImportSetpinImportSetpinModuleTs(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "ImportSetpinPageModule", function () {
        return ImportSetpinPageModule;
      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! tslib */
      "./node_modules/tslib/tslib.es6.js");
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/core */
      "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/common */
      "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
      /* harmony import */


      var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/forms */
      "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
      /* harmony import */


      var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @ionic/angular */
      "./node_modules/@ionic/angular/__ivy_ngcc__/fesm2015/ionic-angular.js");
      /* harmony import */


      var _import_setpin_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! ./import-setpin-routing.module */
      "./src/app/pages/setup/import-setpin/import-setpin-routing.module.ts");
      /* harmony import */


      var _import_setpin_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! ./import-setpin.page */
      "./src/app/pages/setup/import-setpin/import-setpin.page.ts");

      var ImportSetpinPageModule = function ImportSetpinPageModule() {
        _classCallCheck(this, ImportSetpinPageModule);
      };

      ImportSetpinPageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"], _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"], _import_setpin_routing_module__WEBPACK_IMPORTED_MODULE_5__["ImportSetpinPageRoutingModule"]],
        declarations: [_import_setpin_page__WEBPACK_IMPORTED_MODULE_6__["ImportSetpinPage"]]
      })], ImportSetpinPageModule);
      /***/
    },

    /***/
    "./src/app/pages/setup/import-setpin/import-setpin.page.scss":
    /*!*******************************************************************!*\
      !*** ./src/app/pages/setup/import-setpin/import-setpin.page.scss ***!
      \*******************************************************************/

    /*! exports provided: default */

    /***/
    function srcAppPagesSetupImportSetpinImportSetpinPageScss(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony default export */


      __webpack_exports__["default"] = "#container {\n  display: flex;\n  flex-direction: column;\n  padding: 30px;\n}\n\n#logo {\n  width: 200px;\n  margin-top: 75px;\n}\n\nspan {\n  text-align: center;\n  margin-top: 10px;\n  font-weight: 500;\n}\n\nspan b {\n  color: #49C1BF;\n}\n\nion-button {\n  margin-top: 15px;\n}\n\n#backButton {\n  width: 45px;\n  height: 45px;\n  font-size: 13px;\n  --border-radius: 15px !important;\n  margin-left: 30px;\n  margin-top: 30px;\n}\n\n#backButton ion-icon {\n  color: #49C1BF;\n}\n\n#keypadContainer {\n  width: 100%;\n  display: flex;\n  justify-content: center;\n  margin-bottom: 15px;\n}\n\n#keypad {\n  width: 250px;\n  height: 250px;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  flex-direction: column;\n}\n\n#keypad > div {\n  width: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: space-around;\n}\n\n#keypad > div > ion-button {\n  width: 60px;\n  height: 60px;\n  font-size: 24px;\n  --border-radius: 20px !important;\n}\n\n#validPin {\n  --background: #49C1BF;\n  color: white;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcGFnZXMvc2V0dXAvaW1wb3J0LXNldHBpbi9pbXBvcnQtc2V0cGluLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLGFBQUE7RUFDQSxzQkFBQTtFQUNBLGFBQUE7QUFDSjs7QUFFQTtFQUNJLFlBQUE7RUFDQSxnQkFBQTtBQUNKOztBQUVBO0VBQ0ksa0JBQUE7RUFDQSxnQkFBQTtFQUNBLGdCQUFBO0FBQ0o7O0FBRUE7RUFDSSxjQUFBO0FBQ0o7O0FBRUE7RUFDSSxnQkFBQTtBQUNKOztBQUVBO0VBQ0ksV0FBQTtFQUNBLFlBQUE7RUFDQSxlQUFBO0VBQ0EsZ0NBQUE7RUFDQSxpQkFBQTtFQUNBLGdCQUFBO0FBQ0o7O0FBRUE7RUFDSSxjQUFBO0FBQ0o7O0FBRUE7RUFDSSxXQUFBO0VBQ0EsYUFBQTtFQUNBLHVCQUFBO0VBQ0EsbUJBQUE7QUFDSjs7QUFFQTtFQUNJLFlBQUE7RUFDQSxhQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsOEJBQUE7RUFDQSxzQkFBQTtBQUNKOztBQUVBO0VBQ0ksV0FBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLDZCQUFBO0FBQ0o7O0FBRUE7RUFDSSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGVBQUE7RUFDQSxnQ0FBQTtBQUNKOztBQUVBO0VBQ0kscUJBQUE7RUFDQSxZQUFBO0FBQ0oiLCJmaWxlIjoic3JjL2FwcC9wYWdlcy9zZXR1cC9pbXBvcnQtc2V0cGluL2ltcG9ydC1zZXRwaW4ucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiI2NvbnRhaW5lciB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICAgIHBhZGRpbmc6IDMwcHg7XHJcbn1cclxuXHJcbiNsb2dvIHtcclxuICAgIHdpZHRoOjIwMHB4O1xyXG4gICAgbWFyZ2luLXRvcDogNzVweDtcclxufVxyXG5cclxuc3BhbiB7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICBtYXJnaW4tdG9wOiAxMHB4O1xyXG4gICAgZm9udC13ZWlnaHQ6IDUwMDtcclxufVxyXG5cclxuc3BhbiBiIHtcclxuICAgIGNvbG9yOiAjNDlDMUJGO1xyXG59XHJcblxyXG5pb24tYnV0dG9uIHtcclxuICAgIG1hcmdpbi10b3A6IDE1cHg7XHJcbn1cclxuXHJcbiNiYWNrQnV0dG9uIHtcclxuICAgIHdpZHRoOiA0NXB4O1xyXG4gICAgaGVpZ2h0OiA0NXB4O1xyXG4gICAgZm9udC1zaXplOiAxM3B4O1xyXG4gICAgLS1ib3JkZXItcmFkaXVzOiAxNXB4ICFpbXBvcnRhbnQ7XHJcbiAgICBtYXJnaW4tbGVmdDogMzBweDtcclxuICAgIG1hcmdpbi10b3A6IDMwcHg7XHJcbn1cclxuXHJcbiNiYWNrQnV0dG9uIGlvbi1pY29uIHtcclxuICAgIGNvbG9yOiAjNDlDMUJGO1xyXG59XHJcblxyXG4ja2V5cGFkQ29udGFpbmVyIHtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gICAgbWFyZ2luLWJvdHRvbTogMTVweDtcclxufVxyXG5cclxuI2tleXBhZCB7XHJcbiAgICB3aWR0aDogMjUwcHg7XHJcbiAgICBoZWlnaHQ6IDI1MHB4O1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XHJcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG59XHJcblxyXG4ja2V5cGFkID4gZGl2IHtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcclxufVxyXG5cclxuI2tleXBhZCA+IGRpdiA+IGlvbi1idXR0b24ge1xyXG4gICAgd2lkdGg6IDYwcHg7XHJcbiAgICBoZWlnaHQ6IDYwcHg7XHJcbiAgICBmb250LXNpemU6IDI0cHg7XHJcbiAgICAtLWJvcmRlci1yYWRpdXM6IDIwcHggIWltcG9ydGFudDtcclxufVxyXG5cclxuI3ZhbGlkUGluIHtcclxuICAgIC0tYmFja2dyb3VuZDogIzQ5QzFCRjtcclxuICAgIGNvbG9yOiB3aGl0ZTtcclxufSJdfQ== */";
      /***/
    },

    /***/
    "./src/app/pages/setup/import-setpin/import-setpin.page.ts":
    /*!*****************************************************************!*\
      !*** ./src/app/pages/setup/import-setpin/import-setpin.page.ts ***!
      \*****************************************************************/

    /*! exports provided: ImportSetpinPage */

    /***/
    function srcAppPagesSetupImportSetpinImportSetpinPageTs(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "ImportSetpinPage", function () {
        return ImportSetpinPage;
      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! tslib */
      "./node_modules/tslib/tslib.es6.js");
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/core */
      "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
      /* harmony import */


      var crypto_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! crypto-js */
      "./node_modules/crypto-js/index.js");
      /* harmony import */


      var crypto_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(crypto_js__WEBPACK_IMPORTED_MODULE_2__);
      /* harmony import */


      var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @ionic/angular */
      "./node_modules/@ionic/angular/__ivy_ngcc__/fesm2015/ionic-angular.js");
      /* harmony import */


      var _ionic_native_native_storage_ngx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @ionic-native/native-storage/ngx */
      "./node_modules/@ionic-native/native-storage/__ivy_ngcc__/ngx/index.js");
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! @angular/router */
      "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
      /* harmony import */


      var _ionic_native_vibration_ngx__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! @ionic-native/vibration/ngx */
      "./node_modules/@ionic-native/vibration/__ivy_ngcc__/ngx/index.js");

      var _webpack_require__ = __webpack_require__(
      /*! @zilliqa-js/util */
      "./node_modules/@zilliqa-js/util/dist/index.umd.js"),
          BN = _webpack_require__.BN,
          Long = _webpack_require__.Long,
          bytes = _webpack_require__.bytes,
          units = _webpack_require__.units;

      var _webpack_require__2 = __webpack_require__(
      /*! @zilliqa-js/zilliqa */
      "./node_modules/@zilliqa-js/zilliqa/dist/index.js"),
          Zilliqa = _webpack_require__2.Zilliqa;

      var _webpack_require__3 = __webpack_require__(
      /*! @zilliqa-js/crypto */
      "./node_modules/@zilliqa-js/crypto/dist/index.umd.js"),
          toBech32Address = _webpack_require__3.toBech32Address,
          getAddressFromPrivateKey = _webpack_require__3.getAddressFromPrivateKey;

      var zilliqa = new Zilliqa('https://api.zilliqa.com/');

      var ImportSetpinPage = /*#__PURE__*/function () {
        function ImportSetpinPage(vibration, alertController, nativeStorage, route, activatedRoute) {
          _classCallCheck(this, ImportSetpinPage);

          this.vibration = vibration;
          this.alertController = alertController;
          this.nativeStorage = nativeStorage;
          this.route = route;
          this.activatedRoute = activatedRoute;
          this.selectedPin = "XXXXXX";
          this.confirmPin = "";
        }

        _createClass(ImportSetpinPage, [{
          key: "showPopup",
          value: function showPopup(head, message) {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
              var alert;
              return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      _context.next = 2;
                      return this.alertController.create({
                        header: head,
                        message: message,
                        buttons: ['OK']
                      });

                    case 2:
                      alert = _context.sent;
                      _context.next = 5;
                      return alert.present();

                    case 5:
                    case "end":
                      return _context.stop();
                  }
                }
              }, _callee, this);
            }));
          }
        }, {
          key: "ngOnInit",
          value: function ngOnInit() {
            var _this = this;

            this.activatedRoute.params.subscribe(function (param) {
              _this.privkey = param.privkey;
            });
          }
        }, {
          key: "setPin",
          value: function setPin(pin) {
            this.vibration.vibrate(100);
            var totalX = (this.selectedPin.match(/X/gi) || []).length - 1;

            if (totalX >= 0 || this.selectedPin == "XXXXXX") {
              this.selectedPin = this.selectedPin.replace(/X/gi, "");
              this.selectedPin += pin;

              for (var i = 0; i < totalX; i++) {
                this.selectedPin += "X";
              }
            } else {
              this.selectedPin = pin + "XXXXXX";
            }
          }
        }, {
          key: "savePin",
          value: function savePin() {
            var _this2 = this;

            this.vibration.vibrate(100);
            var totalX = (this.selectedPin.match(/X/gi) || []).length;

            if (totalX == 0) {
              if (this.confirmPin.length == 0) {
                this.confirmPin = this.selectedPin;
                this.selectedPin = "XXXXXX";
                this.showPopup("Confirm", "Please re-enter your PIN to confirm it.");
              } else {
                if (this.selectedPin == this.confirmPin) {
                  //Create wallet object
                  zilliqa.wallet.addByPrivateKey(this.privkey); //Encrypt the private key

                  var encryptedData = crypto_js__WEBPACK_IMPORTED_MODULE_2__["AES"].encrypt(JSON.stringify(zilliqa.wallet.defaultAccount.privateKey), this.confirmPin).toString(); //Save data to device's native storage

                  this.nativeStorage.setItem('wallet', {
                    pubKey: zilliqa.wallet.defaultAccount.publicKey,
                    privKey: encryptedData,
                    address: zilliqa.wallet.defaultAccount.address
                  }).then(function () {
                    _this2.route.navigate(['/home/' + zilliqa.wallet.defaultAccount.privateKey]);
                  }, function (error) {
                    _this2.showPopup("Whoops", "Error: " + error);
                  });
                } else {
                  this.showPopup("No match", "Confirmed PIN code does not match the original. Please try again.");
                  this.selectedPin = "XXXXXX";
                  this.confirmPin = "";
                }
              }
            } else {
              this.showPopup("Not that fast!", "Please select a 6 digit PIN.");
            }
          }
        }, {
          key: "checkPinValidity",
          value: function checkPinValidity() {
            var totalX = (this.selectedPin.match(/X/gi) || []).length;

            if (totalX == 0) {
              return true;
            } else {
              return false;
            }
          }
        }]);

        return ImportSetpinPage;
      }();

      ImportSetpinPage.ctorParameters = function () {
        return [{
          type: _ionic_native_vibration_ngx__WEBPACK_IMPORTED_MODULE_6__["Vibration"]
        }, {
          type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["AlertController"]
        }, {
          type: _ionic_native_native_storage_ngx__WEBPACK_IMPORTED_MODULE_4__["NativeStorage"]
        }, {
          type: _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"]
        }, {
          type: _angular_router__WEBPACK_IMPORTED_MODULE_5__["ActivatedRoute"]
        }];
      };

      ImportSetpinPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-import-setpin',
        template: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(
        /*! raw-loader!./import-setpin.page.html */
        "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/setup/import-setpin/import-setpin.page.html"))["default"],
        styles: [Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(
        /*! ./import-setpin.page.scss */
        "./src/app/pages/setup/import-setpin/import-setpin.page.scss"))["default"]]
      })], ImportSetpinPage);
      /***/
    }
  }]);
})();
//# sourceMappingURL=pages-setup-import-setpin-import-setpin-module-es5.js.map