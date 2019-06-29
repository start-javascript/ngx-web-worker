/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
var WebworkerService = /** @class */ (function () {
    function WebworkerService() {
        this.workerFunctionToUrlMap = new WeakMap();
        this.promiseToWorkerMap = new WeakMap();
    }
    /**
     * @template T
     * @param {?} workerFunction
     * @param {?=} data
     * @return {?}
     */
    WebworkerService.prototype.run = /**
     * @template T
     * @param {?} workerFunction
     * @param {?=} data
     * @return {?}
     */
    function (workerFunction, data) {
        /** @type {?} */
        var url = this.getOrCreateWorkerUrl(workerFunction);
        return this.runUrl(url, data);
    };
    /**
     * @param {?} url
     * @param {?=} data
     * @return {?}
     */
    WebworkerService.prototype.runUrl = /**
     * @param {?} url
     * @param {?=} data
     * @return {?}
     */
    function (url, data) {
        /** @type {?} */
        var worker = new Worker(url);
        /** @type {?} */
        var promise = this.createPromiseForWorker(worker, data);
        /** @type {?} */
        var promiseCleaner = this.createPromiseCleaner(promise);
        this.promiseToWorkerMap.set(promise, worker);
        promise.then(promiseCleaner).catch(promiseCleaner);
        return promise;
    };
    /**
     * @template T
     * @param {?} promise
     * @return {?}
     */
    WebworkerService.prototype.terminate = /**
     * @template T
     * @param {?} promise
     * @return {?}
     */
    function (promise) {
        return this.removePromise(promise);
    };
    /**
     * @param {?} promise
     * @return {?}
     */
    WebworkerService.prototype.getWorker = /**
     * @param {?} promise
     * @return {?}
     */
    function (promise) {
        return this.promiseToWorkerMap.get(promise);
    };
    /**
     * @private
     * @template T
     * @param {?} worker
     * @param {?} data
     * @return {?}
     */
    WebworkerService.prototype.createPromiseForWorker = /**
     * @private
     * @template T
     * @param {?} worker
     * @param {?} data
     * @return {?}
     */
    function (worker, data) {
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        function (resolve, reject) {
            worker.addEventListener('message', (/**
             * @param {?} event
             * @return {?}
             */
            function (event) { return resolve(event.data); }));
            worker.addEventListener('error', reject);
            worker.postMessage(data);
        }));
    };
    /**
     * @private
     * @param {?} fn
     * @return {?}
     */
    WebworkerService.prototype.getOrCreateWorkerUrl = /**
     * @private
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        if (!this.workerFunctionToUrlMap.has(fn)) {
            /** @type {?} */
            var url = this.createWorkerUrl(fn);
            this.workerFunctionToUrlMap.set(fn, url);
            return url;
        }
        return this.workerFunctionToUrlMap.get(fn);
    };
    /**
     * @private
     * @param {?} resolve
     * @return {?}
     */
    WebworkerService.prototype.createWorkerUrl = /**
     * @private
     * @param {?} resolve
     * @return {?}
     */
    function (resolve) {
        /** @type {?} */
        var resolveString = resolve.toString();
        /** @type {?} */
        var webWorkerTemplate = "\n      self.addEventListener('message', function(e) {\n        postMessage((" + resolveString + ")(e.data));\n      });\n    ";
        /** @type {?} */
        var blob = new Blob([webWorkerTemplate], { type: 'text/javascript' });
        return URL.createObjectURL(blob);
    };
    /**
     * @private
     * @template T
     * @param {?} promise
     * @return {?}
     */
    WebworkerService.prototype.createPromiseCleaner = /**
     * @private
     * @template T
     * @param {?} promise
     * @return {?}
     */
    function (promise) {
        var _this = this;
        return (/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            _this.removePromise(promise);
            return event;
        });
    };
    /**
     * @private
     * @template T
     * @param {?} promise
     * @return {?}
     */
    WebworkerService.prototype.removePromise = /**
     * @private
     * @template T
     * @param {?} promise
     * @return {?}
     */
    function (promise) {
        /** @type {?} */
        var worker = this.promiseToWorkerMap.get(promise);
        if (worker) {
            worker.terminate();
        }
        this.promiseToWorkerMap.delete(promise);
        return promise;
    };
    WebworkerService.decorators = [
        { type: Injectable }
    ];
    return WebworkerService;
}());
export { WebworkerService };
if (false) {
    /**
     * @type {?}
     * @private
     */
    WebworkerService.prototype.workerFunctionToUrlMap;
    /**
     * @type {?}
     * @private
     */
    WebworkerService.prototype.promiseToWorkerMap;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2Vid29ya2VyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtd2Vid29ya2VyLyIsInNvdXJjZXMiOlsibGliL3dlYndvcmtlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBSTNDO0lBQUE7UUFFVSwyQkFBc0IsR0FBRyxJQUFJLE9BQU8sRUFBNEIsQ0FBQztRQUNqRSx1QkFBa0IsR0FBRyxJQUFJLE9BQU8sRUFBd0IsQ0FBQztJQXNFbkUsQ0FBQzs7Ozs7OztJQXBFQyw4QkFBRzs7Ozs7O0lBQUgsVUFBTyxjQUFpQyxFQUFFLElBQVU7O1lBQzVDLEdBQUcsR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQUMsY0FBYyxDQUFDO1FBQ3JELE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDaEMsQ0FBQzs7Ozs7O0lBRUQsaUNBQU07Ozs7O0lBQU4sVUFBTyxHQUFXLEVBQUUsSUFBVTs7WUFDdEIsTUFBTSxHQUFHLElBQUksTUFBTSxDQUFDLEdBQUcsQ0FBQzs7WUFDeEIsT0FBTyxHQUFHLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDOztZQUNuRCxjQUFjLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUFDLE9BQU8sQ0FBQztRQUV6RCxJQUFJLENBQUMsa0JBQWtCLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQztRQUU3QyxPQUFPLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUVuRCxPQUFPLE9BQU8sQ0FBQztJQUNqQixDQUFDOzs7Ozs7SUFFRCxvQ0FBUzs7Ozs7SUFBVCxVQUFhLE9BQW1CO1FBQzlCLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNyQyxDQUFDOzs7OztJQUVELG9DQUFTOzs7O0lBQVQsVUFBVSxPQUFxQjtRQUM3QixPQUFPLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDOUMsQ0FBQzs7Ozs7Ozs7SUFFTyxpREFBc0I7Ozs7Ozs7SUFBOUIsVUFBa0MsTUFBYyxFQUFFLElBQVM7UUFDekQsT0FBTyxJQUFJLE9BQU87Ozs7O1FBQUksVUFBQyxPQUFPLEVBQUUsTUFBTTtZQUNwQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsU0FBUzs7OztZQUFFLFVBQUMsS0FBSyxJQUFLLE9BQUEsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBbkIsQ0FBbUIsRUFBQyxDQUFDO1lBQ25FLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFDekMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMzQixDQUFDLEVBQUMsQ0FBQztJQUNMLENBQUM7Ozs7OztJQUVPLCtDQUFvQjs7Ozs7SUFBNUIsVUFBNkIsRUFBTztRQUNsQyxJQUFJLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRTs7Z0JBQ2xDLEdBQUcsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLEVBQUUsQ0FBQztZQUNwQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUN6QyxPQUFPLEdBQUcsQ0FBQztTQUNaO1FBQ0QsT0FBTyxJQUFJLENBQUMsc0JBQXNCLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzdDLENBQUM7Ozs7OztJQUVPLDBDQUFlOzs7OztJQUF2QixVQUF3QixPQUF5Qjs7WUFDekMsYUFBYSxHQUFHLE9BQU8sQ0FBQyxRQUFRLEVBQUU7O1lBQ2xDLGlCQUFpQixHQUFHLGtGQUVQLGFBQWEsaUNBRS9COztZQUNLLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxDQUFDLGlCQUFpQixDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsaUJBQWlCLEVBQUUsQ0FBQztRQUN2RSxPQUFPLEdBQUcsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbkMsQ0FBQzs7Ozs7OztJQUVPLCtDQUFvQjs7Ozs7O0lBQTVCLFVBQWdDLE9BQW1CO1FBQW5ELGlCQUtDO1FBSkM7Ozs7UUFBTyxVQUFDLEtBQUs7WUFDWCxLQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzVCLE9BQU8sS0FBSyxDQUFDO1FBQ2YsQ0FBQyxFQUFDO0lBQ0osQ0FBQzs7Ozs7OztJQUVPLHdDQUFhOzs7Ozs7SUFBckIsVUFBeUIsT0FBbUI7O1lBQ3BDLE1BQU0sR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQztRQUNuRCxJQUFJLE1BQU0sRUFBRTtZQUNWLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQztTQUNwQjtRQUNELElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDeEMsT0FBTyxPQUFPLENBQUM7SUFDakIsQ0FBQzs7Z0JBeEVGLFVBQVU7O0lBeUVYLHVCQUFDO0NBQUEsQUF6RUQsSUF5RUM7U0F4RVksZ0JBQWdCOzs7Ozs7SUFDM0Isa0RBQXlFOzs7OztJQUN6RSw4Q0FBaUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbnR5cGUgQ2FsbGJhY2tGdW5jdGlvbiA9ICgpID0+IHZvaWQ7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBXZWJ3b3JrZXJTZXJ2aWNlIHtcbiAgcHJpdmF0ZSB3b3JrZXJGdW5jdGlvblRvVXJsTWFwID0gbmV3IFdlYWtNYXA8Q2FsbGJhY2tGdW5jdGlvbiwgc3RyaW5nPigpO1xuICBwcml2YXRlIHByb21pc2VUb1dvcmtlck1hcCA9IG5ldyBXZWFrTWFwPFByb21pc2U8YW55PiwgV29ya2VyPigpO1xuXG4gIHJ1bjxUPih3b3JrZXJGdW5jdGlvbjogKGlucHV0OiBhbnkpID0+IFQsIGRhdGE/OiBhbnkpOiBQcm9taXNlPFQ+IHtcbiAgICBjb25zdCB1cmwgPSB0aGlzLmdldE9yQ3JlYXRlV29ya2VyVXJsKHdvcmtlckZ1bmN0aW9uKTtcbiAgICByZXR1cm4gdGhpcy5ydW5VcmwodXJsLCBkYXRhKTtcbiAgfVxuXG4gIHJ1blVybCh1cmw6IHN0cmluZywgZGF0YT86IGFueSk6IFByb21pc2U8YW55PiB7XG4gICAgY29uc3Qgd29ya2VyID0gbmV3IFdvcmtlcih1cmwpO1xuICAgIGNvbnN0IHByb21pc2UgPSB0aGlzLmNyZWF0ZVByb21pc2VGb3JXb3JrZXIod29ya2VyLCBkYXRhKTtcbiAgICBjb25zdCBwcm9taXNlQ2xlYW5lciA9IHRoaXMuY3JlYXRlUHJvbWlzZUNsZWFuZXIocHJvbWlzZSk7XG5cbiAgICB0aGlzLnByb21pc2VUb1dvcmtlck1hcC5zZXQocHJvbWlzZSwgd29ya2VyKTtcblxuICAgIHByb21pc2UudGhlbihwcm9taXNlQ2xlYW5lcikuY2F0Y2gocHJvbWlzZUNsZWFuZXIpO1xuXG4gICAgcmV0dXJuIHByb21pc2U7XG4gIH1cblxuICB0ZXJtaW5hdGU8VD4ocHJvbWlzZTogUHJvbWlzZTxUPik6IFByb21pc2U8VD4ge1xuICAgIHJldHVybiB0aGlzLnJlbW92ZVByb21pc2UocHJvbWlzZSk7XG4gIH1cblxuICBnZXRXb3JrZXIocHJvbWlzZTogUHJvbWlzZTxhbnk+KTogV29ya2VyIHtcbiAgICByZXR1cm4gdGhpcy5wcm9taXNlVG9Xb3JrZXJNYXAuZ2V0KHByb21pc2UpO1xuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVQcm9taXNlRm9yV29ya2VyPFQ+KHdvcmtlcjogV29ya2VyLCBkYXRhOiBhbnkpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2U8VD4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgd29ya2VyLmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCAoZXZlbnQpID0+IHJlc29sdmUoZXZlbnQuZGF0YSkpO1xuICAgICAgd29ya2VyLmFkZEV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgcmVqZWN0KTtcbiAgICAgIHdvcmtlci5wb3N0TWVzc2FnZShkYXRhKTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0T3JDcmVhdGVXb3JrZXJVcmwoZm46IGFueSk6IHN0cmluZyB7XG4gICAgaWYgKCF0aGlzLndvcmtlckZ1bmN0aW9uVG9VcmxNYXAuaGFzKGZuKSkge1xuICAgICAgY29uc3QgdXJsID0gdGhpcy5jcmVhdGVXb3JrZXJVcmwoZm4pO1xuICAgICAgdGhpcy53b3JrZXJGdW5jdGlvblRvVXJsTWFwLnNldChmbiwgdXJsKTtcbiAgICAgIHJldHVybiB1cmw7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLndvcmtlckZ1bmN0aW9uVG9VcmxNYXAuZ2V0KGZuKTtcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlV29ya2VyVXJsKHJlc29sdmU6IENhbGxiYWNrRnVuY3Rpb24pOiBzdHJpbmcge1xuICAgIGNvbnN0IHJlc29sdmVTdHJpbmcgPSByZXNvbHZlLnRvU3RyaW5nKCk7XG4gICAgY29uc3Qgd2ViV29ya2VyVGVtcGxhdGUgPSBgXG4gICAgICBzZWxmLmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIHBvc3RNZXNzYWdlKCgke3Jlc29sdmVTdHJpbmd9KShlLmRhdGEpKTtcbiAgICAgIH0pO1xuICAgIGA7XG4gICAgY29uc3QgYmxvYiA9IG5ldyBCbG9iKFt3ZWJXb3JrZXJUZW1wbGF0ZV0sIHsgdHlwZTogJ3RleHQvamF2YXNjcmlwdCcgfSk7XG4gICAgcmV0dXJuIFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZVByb21pc2VDbGVhbmVyPFQ+KHByb21pc2U6IFByb21pc2U8VD4pOiAoaW5wdXQ6IGFueSkgPT4gVCB7XG4gICAgcmV0dXJuIChldmVudCkgPT4ge1xuICAgICAgdGhpcy5yZW1vdmVQcm9taXNlKHByb21pc2UpO1xuICAgICAgcmV0dXJuIGV2ZW50O1xuICAgIH07XG4gIH1cblxuICBwcml2YXRlIHJlbW92ZVByb21pc2U8VD4ocHJvbWlzZTogUHJvbWlzZTxUPik6IFByb21pc2U8VD4ge1xuICAgIGNvbnN0IHdvcmtlciA9IHRoaXMucHJvbWlzZVRvV29ya2VyTWFwLmdldChwcm9taXNlKTtcbiAgICBpZiAod29ya2VyKSB7XG4gICAgICB3b3JrZXIudGVybWluYXRlKCk7XG4gICAgfVxuICAgIHRoaXMucHJvbWlzZVRvV29ya2VyTWFwLmRlbGV0ZShwcm9taXNlKTtcbiAgICByZXR1cm4gcHJvbWlzZTtcbiAgfVxufVxuIl19