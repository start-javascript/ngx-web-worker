(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "../../dist/ngx-webworker/fesm2015/ngx-webworker.js":
/*!***********************************************************************************************************!*\
  !*** /Users/nitin/Sites/projects/angular/libs/ngx-webworker/dist/ngx-webworker/fesm2015/ngx-webworker.js ***!
  \***********************************************************************************************************/
/*! exports provided: WebworkerService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WebworkerService", function() { return WebworkerService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");


/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class WebworkerService {
    constructor() {
        this.workerFunctionToUrlMap = new WeakMap();
        this.promiseToWorkerMap = new WeakMap();
    }
    /**
     * @template T
     * @param {?} workerFunction
     * @param {?=} data
     * @return {?}
     */
    run(workerFunction, data) {
        /** @type {?} */
        const url = this.getOrCreateWorkerUrl(workerFunction);
        return this.runUrl(url, data);
    }
    /**
     * @param {?} url
     * @param {?=} data
     * @return {?}
     */
    runUrl(url, data) {
        /** @type {?} */
        const worker = new Worker(url);
        /** @type {?} */
        const promise = this.createPromiseForWorker(worker, data);
        /** @type {?} */
        const promiseCleaner = this.createPromiseCleaner(promise);
        this.promiseToWorkerMap.set(promise, worker);
        promise.then(promiseCleaner).catch(promiseCleaner);
        return promise;
    }
    /**
     * @template T
     * @param {?} promise
     * @return {?}
     */
    terminate(promise) {
        return this.removePromise(promise);
    }
    /**
     * @param {?} promise
     * @return {?}
     */
    getWorker(promise) {
        return this.promiseToWorkerMap.get(promise);
    }
    /**
     * @private
     * @template T
     * @param {?} worker
     * @param {?} data
     * @return {?}
     */
    createPromiseForWorker(worker, data) {
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        (resolve, reject) => {
            worker.addEventListener('message', (/**
             * @param {?} event
             * @return {?}
             */
            (event) => resolve(event.data)));
            worker.addEventListener('error', reject);
            worker.postMessage(data);
        }));
    }
    /**
     * @private
     * @param {?} fn
     * @return {?}
     */
    getOrCreateWorkerUrl(fn) {
        if (!this.workerFunctionToUrlMap.has(fn)) {
            /** @type {?} */
            const url = this.createWorkerUrl(fn);
            this.workerFunctionToUrlMap.set(fn, url);
            return url;
        }
        return this.workerFunctionToUrlMap.get(fn);
    }
    /**
     * @private
     * @param {?} resolve
     * @return {?}
     */
    createWorkerUrl(resolve) {
        /** @type {?} */
        const resolveString = resolve.toString();
        /** @type {?} */
        const webWorkerTemplate = `
      self.addEventListener('message', function(e) {
        postMessage((${resolveString})(e.data));
      });
    `;
        /** @type {?} */
        const blob = new Blob([webWorkerTemplate], { type: 'text/javascript' });
        return URL.createObjectURL(blob);
    }
    /**
     * @private
     * @template T
     * @param {?} promise
     * @return {?}
     */
    createPromiseCleaner(promise) {
        return (/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            this.removePromise(promise);
            return event;
        });
    }
    /**
     * @private
     * @template T
     * @param {?} promise
     * @return {?}
     */
    removePromise(promise) {
        /** @type {?} */
        const worker = this.promiseToWorkerMap.get(promise);
        if (worker) {
            worker.terminate();
        }
        this.promiseToWorkerMap.delete(promise);
        return promise;
    }
}
WebworkerService.decorators = [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"] }
];


//# sourceMappingURL=ngx-webworker.js.map


/***/ }),

/***/ "../../node_modules/raw-loader/index.js!./src/app/app.component.html":
/*!*******************************************************************************************************************!*\
  !*** /Users/nitin/Sites/projects/angular/libs/ngx-webworker/node_modules/raw-loader!./src/app/app.component.html ***!
  \*******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h2 class=\"heading mt-0\">calculating fibonacci using web worker</h2>\n<form (ngSubmit)=\"startWebWorkerCalculation()\">\n  <div>\n    <span>calculate fib(n) from</span>\n    <input type=\"number\" [(ngModel)]=\"webWorkerStart\" name=\"webWorkerStart\" />\n    <span>to:</span>\n    <input type=\"number\" [(ngModel)]=\"webWorkerEnd\" name=\"webWorkerEnd\" />\n  </div>\n  <button class=\"mt-20\" type=\"submit\">Start</button>\n  <button class=\"mt-20\" type=\"button\" (click)=\"stopWebWorkerCalculation()\">\n    Stop\n  </button>\n</form>\n<div>\n  <p *ngFor=\"let result of webWorkerResults\">\n    fib({{ result.number }}) =\n    <span *ngIf=\"result.loading\" class=\"spin-me-baby\">... calculating ...</span>\n    <span *ngIf=\"!result.loading\">{{ result.result }}</span>\n  </p>\n</div>\n\n<h2>calculating fibonacci using main UI thread</h2>\n<form (ngSubmit)=\"startSynchronousCalculation()\">\n  <div>\n    <span>calculate fib(n) from</span>\n    <input\n      type=\"number\"\n      [(ngModel)]=\"synchronousStart\"\n      name=\"synchronousStart\"\n    />\n    <span>to:</span>\n    <input type=\"number\" [(ngModel)]=\"synchronousEnd\" name=\"synchronousEnd\" />\n  </div>\n  <button type=\"submit\" class=\"mt-20\">\n    Start (might lock up your browser for large numbers)\n  </button>\n</form>\n<div>\n  <div style=\"height: 50px\">\n    <span *ngIf=\"synchronousDuration\" [class.zoom-me-baby]=\"true\">\n      took {{ synchronousDuration }} seconds\n    </span>\n  </div>\n  <p *ngFor=\"let result of synchronousResults\">\n    fib({{ result.number }}) = {{ result.result }}\n  </p>\n</div>\n"

/***/ }),

/***/ "./$$_lazy_route_resource lazy recursive":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app.component.css":
/*!***********************************!*\
  !*** ./src/app/app.component.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".spin-me-baby {\n  -webkit-animation: spin 4s linear infinite;\n          animation: spin 4s linear infinite;\n}\n@-webkit-keyframes spin {\n  100% {\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg);\n  }\n}\n@keyframes spin {\n  100% {\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg);\n  }\n}\n.zoom-me-baby {\n  -webkit-animation: zoom 4s linear infinite;\n          animation: zoom 4s linear infinite;\n}\n@-webkit-keyframes zoom {\n  50% {\n    font-size: 2em;\n  }\n  100% {\n    font-size: 1em;\n  }\n}\n@keyframes zoom {\n  50% {\n    font-size: 2em;\n  }\n  100% {\n    font-size: 1em;\n  }\n}\n:host {\n  padding: 20px;\n  display: block;\n}\n:host input:focus,\n:host button:focus {\n  outline: none;\n  border: 1px solid #3e8ef7;\n}\n.mt-0 {\n  margin-top: 0;\n}\n.mt-10 {\n  margin-top: 10px;\n}\n.mt-20 {\n  margin-top: 20px;\n}\ninput {\n  padding: 10px 20px;\n  border-radius: 4px;\n  border: none;\n  background: #eeeeee;\n  margin: 0 20px;\n  font-size: 14px;\n  border: 1px solid transparent;\n}\nbutton {\n  padding: 8px 20px;\n  font-size: 14px;\n  margin-right: 20px;\n  background: #3e8ef7;\n  border: 1px solid #3e8ef7;\n  border-radius: 4px;\n  cursor: pointer;\n  color: #ffffff;\n}\nbutton:hover,\nbutton:focus {\n  background: #0966df;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2plY3RzL3dlYi13cm9rZXItdGVzdGVyL3NyYy9hcHAvYXBwLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSwwQ0FBa0M7VUFBbEMsa0NBQWtDO0FBQ3BDO0FBQ0E7RUFDRTtJQUNFLGlDQUF5QjtZQUF6Qix5QkFBeUI7RUFDM0I7QUFDRjtBQUpBO0VBQ0U7SUFDRSxpQ0FBeUI7WUFBekIseUJBQXlCO0VBQzNCO0FBQ0Y7QUFDQTtFQUNFLDBDQUFrQztVQUFsQyxrQ0FBa0M7QUFDcEM7QUFDQTtFQUNFO0lBQ0UsY0FBYztFQUNoQjtFQUNBO0lBQ0UsY0FBYztFQUNoQjtBQUNGO0FBUEE7RUFDRTtJQUNFLGNBQWM7RUFDaEI7RUFDQTtJQUNFLGNBQWM7RUFDaEI7QUFDRjtBQUNBO0VBQ0UsYUFBYTtFQUNiLGNBQWM7QUFDaEI7QUFDQTs7RUFFRSxhQUFhO0VBQ2IseUJBQXlCO0FBQzNCO0FBRUE7RUFDRSxhQUFhO0FBQ2Y7QUFDQTtFQUNFLGdCQUFnQjtBQUNsQjtBQUVBO0VBQ0UsZ0JBQWdCO0FBQ2xCO0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsa0JBQWtCO0VBQ2xCLFlBQVk7RUFDWixtQkFBbUI7RUFDbkIsY0FBYztFQUNkLGVBQWU7RUFDZiw2QkFBNkI7QUFDL0I7QUFFQTtFQUNFLGlCQUFpQjtFQUNqQixlQUFlO0VBQ2Ysa0JBQWtCO0VBQ2xCLG1CQUFtQjtFQUNuQix5QkFBeUI7RUFDekIsa0JBQWtCO0VBQ2xCLGVBQWU7RUFDZixjQUFjO0FBQ2hCO0FBQ0E7O0VBRUUsbUJBQW1CO0FBQ3JCIiwiZmlsZSI6InByb2plY3RzL3dlYi13cm9rZXItdGVzdGVyL3NyYy9hcHAvYXBwLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuc3Bpbi1tZS1iYWJ5IHtcbiAgYW5pbWF0aW9uOiBzcGluIDRzIGxpbmVhciBpbmZpbml0ZTtcbn1cbkBrZXlmcmFtZXMgc3BpbiB7XG4gIDEwMCUge1xuICAgIHRyYW5zZm9ybTogcm90YXRlKDM2MGRlZyk7XG4gIH1cbn1cbi56b29tLW1lLWJhYnkge1xuICBhbmltYXRpb246IHpvb20gNHMgbGluZWFyIGluZmluaXRlO1xufVxuQGtleWZyYW1lcyB6b29tIHtcbiAgNTAlIHtcbiAgICBmb250LXNpemU6IDJlbTtcbiAgfVxuICAxMDAlIHtcbiAgICBmb250LXNpemU6IDFlbTtcbiAgfVxufVxuOmhvc3Qge1xuICBwYWRkaW5nOiAyMHB4O1xuICBkaXNwbGF5OiBibG9jaztcbn1cbjpob3N0IGlucHV0OmZvY3VzLFxuOmhvc3QgYnV0dG9uOmZvY3VzIHtcbiAgb3V0bGluZTogbm9uZTtcbiAgYm9yZGVyOiAxcHggc29saWQgIzNlOGVmNztcbn1cblxuLm10LTAge1xuICBtYXJnaW4tdG9wOiAwO1xufVxuLm10LTEwIHtcbiAgbWFyZ2luLXRvcDogMTBweDtcbn1cblxuLm10LTIwIHtcbiAgbWFyZ2luLXRvcDogMjBweDtcbn1cblxuaW5wdXQge1xuICBwYWRkaW5nOiAxMHB4IDIwcHg7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgYm9yZGVyOiBub25lO1xuICBiYWNrZ3JvdW5kOiAjZWVlZWVlO1xuICBtYXJnaW46IDAgMjBweDtcbiAgZm9udC1zaXplOiAxNHB4O1xuICBib3JkZXI6IDFweCBzb2xpZCB0cmFuc3BhcmVudDtcbn1cblxuYnV0dG9uIHtcbiAgcGFkZGluZzogOHB4IDIwcHg7XG4gIGZvbnQtc2l6ZTogMTRweDtcbiAgbWFyZ2luLXJpZ2h0OiAyMHB4O1xuICBiYWNrZ3JvdW5kOiAjM2U4ZWY3O1xuICBib3JkZXI6IDFweCBzb2xpZCAjM2U4ZWY3O1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgY29sb3I6ICNmZmZmZmY7XG59XG5idXR0b246aG92ZXIsXG5idXR0b246Zm9jdXMge1xuICBiYWNrZ3JvdW5kOiAjMDk2NmRmO1xufVxuIl19 */"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var ngx_webworker__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngx-webworker */ "../../dist/ngx-webworker/fesm2015/ngx-webworker.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _result__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./result */ "./src/app/result.ts");




let AppComponent = class AppComponent {
    constructor(_webWorkerService) {
        this._webWorkerService = _webWorkerService;
        this.webWorkerResults = [];
        this.webWorkerStart = 35;
        this.webWorkerEnd = 45;
        this.synchronousStart = 35;
        this.synchronousEnd = 38;
        this.synchronousResults = [];
        this.synchronousDuration = 0;
        this.promises = [];
        this.fib = (n) => {
            const fib = (n) => {
                if (n < 2) {
                    return 1;
                }
                return fib(n - 1) + fib(n - 2);
            };
            return fib(n);
        };
    }
    ngOnInit() {
        const promise = this._webWorkerService.run(() => 'polo', 0);
        const worker = this._webWorkerService.getWorker(promise);
        worker.addEventListener('message', (event) => {
            console.log('Worker Response => ', event.data);
        });
        this.startExternalRequest();
    }
    startWebWorkerCalculation() {
        let pointer = this.webWorkerStart;
        const end = this.webWorkerEnd;
        this.stopWebWorkerCalculation();
        while (pointer <= end) {
            this.webWorkerCalculate(pointer);
            pointer++;
        }
    }
    stopWebWorkerCalculation() {
        this.promises.forEach((promise) => {
            this._webWorkerService.terminate(promise);
        });
        this.promises.length = 0;
        this.webWorkerResults.length = 0;
    }
    startSynchronousCalculation() {
        let pointer = this.synchronousStart;
        const end = this.synchronousEnd;
        this.synchronousResults.length = 0;
        const start = new Date();
        while (pointer <= end) {
            const result = new _result__WEBPACK_IMPORTED_MODULE_3__["Result"](pointer, this.fib(pointer), false);
            this.synchronousResults.push(result);
            pointer++;
        }
        this.synchronousDuration = (new Date().getTime() - start.getTime()) / 1000;
    }
    startExternalRequest() {
        const promises = [];
        promises.push(this._webWorkerService.runUrl('/assets/echo.js', 'marco'));
        promises.push(this._webWorkerService.run(() => 'polo', 0));
        promises.forEach((promise) => {
            const worker = this._webWorkerService.getWorker(promise);
            worker.addEventListener('message', (event) => {
                console.log('getWorker', event.data);
            });
        });
        Promise.all(promises)
            .then((response) => console.log(response))
            .catch((error) => console.error(error));
    }
    webWorkerCalculate(n) {
        const promise = this._webWorkerService.run(this.fib, n);
        const result = new _result__WEBPACK_IMPORTED_MODULE_3__["Result"](n, 0, true);
        this.webWorkerResults.push(result);
        this.promises.push(promise);
        promise.then((response) => {
            result.result = response;
            result.loading = false;
        });
    }
};
AppComponent.ctorParameters = () => [
    { type: ngx_webworker__WEBPACK_IMPORTED_MODULE_1__["WebworkerService"] }
];
AppComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"])({
        selector: 'app-root',
        template: __webpack_require__(/*! raw-loader!./app.component.html */ "../../node_modules/raw-loader/index.js!./src/app/app.component.html"),
        providers: [ngx_webworker__WEBPACK_IMPORTED_MODULE_1__["WebworkerService"]],
        styles: [__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")]
    })
], AppComponent);



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "../../node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ "../../node_modules/@angular/platform-browser/fesm2015/platform-browser.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");





let AppModule = class AppModule {
};
AppModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        declarations: [_app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"]],
        imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__["BrowserModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"]],
        bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"]],
        providers: [],
    })
], AppModule);



/***/ }),

/***/ "./src/app/result.ts":
/*!***************************!*\
  !*** ./src/app/result.ts ***!
  \***************************/
/*! exports provided: Result */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Result", function() { return Result; });
class Result {
    constructor(number, result, loading) {
        this.number = number;
        this.result = result;
        this.loading = loading;
    }
}
Result.ctorParameters = () => [
    { type: Number },
    { type: Number },
    { type: Boolean }
];


/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "../../node_modules/@angular/platform-browser-dynamic/fesm2015/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(err => console.error(err));


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/nitin/Sites/projects/angular/libs/ngx-webworker/projects/web-wroker-tester/src/main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main-es2015.js.map