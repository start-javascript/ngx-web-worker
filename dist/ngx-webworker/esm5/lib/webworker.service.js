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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2Vid29ya2VyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Abml0aW5rcm1yL25neC13ZWJ3b3JrZXIvIiwic291cmNlcyI6WyJsaWIvd2Vid29ya2VyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFJM0M7SUFBQTtRQUVVLDJCQUFzQixHQUFHLElBQUksT0FBTyxFQUE0QixDQUFDO1FBQ2pFLHVCQUFrQixHQUFHLElBQUksT0FBTyxFQUF3QixDQUFDO0lBc0VuRSxDQUFDOzs7Ozs7O0lBcEVDLDhCQUFHOzs7Ozs7SUFBSCxVQUFPLGNBQWlDLEVBQUUsSUFBVTs7WUFDNUMsR0FBRyxHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxjQUFjLENBQUM7UUFDckQsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNoQyxDQUFDOzs7Ozs7SUFFRCxpQ0FBTTs7Ozs7SUFBTixVQUFPLEdBQVcsRUFBRSxJQUFVOztZQUN0QixNQUFNLEdBQUcsSUFBSSxNQUFNLENBQUMsR0FBRyxDQUFDOztZQUN4QixPQUFPLEdBQUcsSUFBSSxDQUFDLHNCQUFzQixDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUM7O1lBQ25ELGNBQWMsR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQUMsT0FBTyxDQUFDO1FBRXpELElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBRTdDLE9BQU8sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBRW5ELE9BQU8sT0FBTyxDQUFDO0lBQ2pCLENBQUM7Ozs7OztJQUVELG9DQUFTOzs7OztJQUFULFVBQWEsT0FBbUI7UUFDOUIsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3JDLENBQUM7Ozs7O0lBRUQsb0NBQVM7Ozs7SUFBVCxVQUFVLE9BQXFCO1FBQzdCLE9BQU8sSUFBSSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUM5QyxDQUFDOzs7Ozs7OztJQUVPLGlEQUFzQjs7Ozs7OztJQUE5QixVQUFrQyxNQUFjLEVBQUUsSUFBUztRQUN6RCxPQUFPLElBQUksT0FBTzs7Ozs7UUFBSSxVQUFDLE9BQU8sRUFBRSxNQUFNO1lBQ3BDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTOzs7O1lBQUUsVUFBQyxLQUFLLElBQUssT0FBQSxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFuQixDQUFtQixFQUFDLENBQUM7WUFDbkUsTUFBTSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQztZQUN6QyxNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzNCLENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQzs7Ozs7O0lBRU8sK0NBQW9COzs7OztJQUE1QixVQUE2QixFQUFPO1FBQ2xDLElBQUksQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFOztnQkFDbEMsR0FBRyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsRUFBRSxDQUFDO1lBQ3BDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQ3pDLE9BQU8sR0FBRyxDQUFDO1NBQ1o7UUFDRCxPQUFPLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDN0MsQ0FBQzs7Ozs7O0lBRU8sMENBQWU7Ozs7O0lBQXZCLFVBQXdCLE9BQXlCOztZQUN6QyxhQUFhLEdBQUcsT0FBTyxDQUFDLFFBQVEsRUFBRTs7WUFDbEMsaUJBQWlCLEdBQUcsa0ZBRVAsYUFBYSxpQ0FFL0I7O1lBQ0ssSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLENBQUMsaUJBQWlCLENBQUMsRUFBRSxFQUFFLElBQUksRUFBRSxpQkFBaUIsRUFBRSxDQUFDO1FBQ3ZFLE9BQU8sR0FBRyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNuQyxDQUFDOzs7Ozs7O0lBRU8sK0NBQW9COzs7Ozs7SUFBNUIsVUFBZ0MsT0FBbUI7UUFBbkQsaUJBS0M7UUFKQzs7OztRQUFPLFVBQUMsS0FBSztZQUNYLEtBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDNUIsT0FBTyxLQUFLLENBQUM7UUFDZixDQUFDLEVBQUM7SUFDSixDQUFDOzs7Ozs7O0lBRU8sd0NBQWE7Ozs7OztJQUFyQixVQUF5QixPQUFtQjs7WUFDcEMsTUFBTSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDO1FBQ25ELElBQUksTUFBTSxFQUFFO1lBQ1YsTUFBTSxDQUFDLFNBQVMsRUFBRSxDQUFDO1NBQ3BCO1FBQ0QsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN4QyxPQUFPLE9BQU8sQ0FBQztJQUNqQixDQUFDOztnQkF4RUYsVUFBVTs7SUF5RVgsdUJBQUM7Q0FBQSxBQXpFRCxJQXlFQztTQXhFWSxnQkFBZ0I7Ozs7OztJQUMzQixrREFBeUU7Ozs7O0lBQ3pFLDhDQUFpRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxudHlwZSBDYWxsYmFja0Z1bmN0aW9uID0gKCkgPT4gdm9pZDtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFdlYndvcmtlclNlcnZpY2Uge1xuICBwcml2YXRlIHdvcmtlckZ1bmN0aW9uVG9VcmxNYXAgPSBuZXcgV2Vha01hcDxDYWxsYmFja0Z1bmN0aW9uLCBzdHJpbmc+KCk7XG4gIHByaXZhdGUgcHJvbWlzZVRvV29ya2VyTWFwID0gbmV3IFdlYWtNYXA8UHJvbWlzZTxhbnk+LCBXb3JrZXI+KCk7XG5cbiAgcnVuPFQ+KHdvcmtlckZ1bmN0aW9uOiAoaW5wdXQ6IGFueSkgPT4gVCwgZGF0YT86IGFueSk6IFByb21pc2U8VD4ge1xuICAgIGNvbnN0IHVybCA9IHRoaXMuZ2V0T3JDcmVhdGVXb3JrZXJVcmwod29ya2VyRnVuY3Rpb24pO1xuICAgIHJldHVybiB0aGlzLnJ1blVybCh1cmwsIGRhdGEpO1xuICB9XG5cbiAgcnVuVXJsKHVybDogc3RyaW5nLCBkYXRhPzogYW55KTogUHJvbWlzZTxhbnk+IHtcbiAgICBjb25zdCB3b3JrZXIgPSBuZXcgV29ya2VyKHVybCk7XG4gICAgY29uc3QgcHJvbWlzZSA9IHRoaXMuY3JlYXRlUHJvbWlzZUZvcldvcmtlcih3b3JrZXIsIGRhdGEpO1xuICAgIGNvbnN0IHByb21pc2VDbGVhbmVyID0gdGhpcy5jcmVhdGVQcm9taXNlQ2xlYW5lcihwcm9taXNlKTtcblxuICAgIHRoaXMucHJvbWlzZVRvV29ya2VyTWFwLnNldChwcm9taXNlLCB3b3JrZXIpO1xuXG4gICAgcHJvbWlzZS50aGVuKHByb21pc2VDbGVhbmVyKS5jYXRjaChwcm9taXNlQ2xlYW5lcik7XG5cbiAgICByZXR1cm4gcHJvbWlzZTtcbiAgfVxuXG4gIHRlcm1pbmF0ZTxUPihwcm9taXNlOiBQcm9taXNlPFQ+KTogUHJvbWlzZTxUPiB7XG4gICAgcmV0dXJuIHRoaXMucmVtb3ZlUHJvbWlzZShwcm9taXNlKTtcbiAgfVxuXG4gIGdldFdvcmtlcihwcm9taXNlOiBQcm9taXNlPGFueT4pOiBXb3JrZXIge1xuICAgIHJldHVybiB0aGlzLnByb21pc2VUb1dvcmtlck1hcC5nZXQocHJvbWlzZSk7XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZVByb21pc2VGb3JXb3JrZXI8VD4od29ya2VyOiBXb3JrZXIsIGRhdGE6IGFueSkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTxUPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB3b3JrZXIuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIChldmVudCkgPT4gcmVzb2x2ZShldmVudC5kYXRhKSk7XG4gICAgICB3b3JrZXIuYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLCByZWplY3QpO1xuICAgICAgd29ya2VyLnBvc3RNZXNzYWdlKGRhdGEpO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRPckNyZWF0ZVdvcmtlclVybChmbjogYW55KTogc3RyaW5nIHtcbiAgICBpZiAoIXRoaXMud29ya2VyRnVuY3Rpb25Ub1VybE1hcC5oYXMoZm4pKSB7XG4gICAgICBjb25zdCB1cmwgPSB0aGlzLmNyZWF0ZVdvcmtlclVybChmbik7XG4gICAgICB0aGlzLndvcmtlckZ1bmN0aW9uVG9VcmxNYXAuc2V0KGZuLCB1cmwpO1xuICAgICAgcmV0dXJuIHVybDtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMud29ya2VyRnVuY3Rpb25Ub1VybE1hcC5nZXQoZm4pO1xuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVXb3JrZXJVcmwocmVzb2x2ZTogQ2FsbGJhY2tGdW5jdGlvbik6IHN0cmluZyB7XG4gICAgY29uc3QgcmVzb2x2ZVN0cmluZyA9IHJlc29sdmUudG9TdHJpbmcoKTtcbiAgICBjb25zdCB3ZWJXb3JrZXJUZW1wbGF0ZSA9IGBcbiAgICAgIHNlbGYuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgcG9zdE1lc3NhZ2UoKCR7cmVzb2x2ZVN0cmluZ30pKGUuZGF0YSkpO1xuICAgICAgfSk7XG4gICAgYDtcbiAgICBjb25zdCBibG9iID0gbmV3IEJsb2IoW3dlYldvcmtlclRlbXBsYXRlXSwgeyB0eXBlOiAndGV4dC9qYXZhc2NyaXB0JyB9KTtcbiAgICByZXR1cm4gVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlUHJvbWlzZUNsZWFuZXI8VD4ocHJvbWlzZTogUHJvbWlzZTxUPik6IChpbnB1dDogYW55KSA9PiBUIHtcbiAgICByZXR1cm4gKGV2ZW50KSA9PiB7XG4gICAgICB0aGlzLnJlbW92ZVByb21pc2UocHJvbWlzZSk7XG4gICAgICByZXR1cm4gZXZlbnQ7XG4gICAgfTtcbiAgfVxuXG4gIHByaXZhdGUgcmVtb3ZlUHJvbWlzZTxUPihwcm9taXNlOiBQcm9taXNlPFQ+KTogUHJvbWlzZTxUPiB7XG4gICAgY29uc3Qgd29ya2VyID0gdGhpcy5wcm9taXNlVG9Xb3JrZXJNYXAuZ2V0KHByb21pc2UpO1xuICAgIGlmICh3b3JrZXIpIHtcbiAgICAgIHdvcmtlci50ZXJtaW5hdGUoKTtcbiAgICB9XG4gICAgdGhpcy5wcm9taXNlVG9Xb3JrZXJNYXAuZGVsZXRlKHByb21pc2UpO1xuICAgIHJldHVybiBwcm9taXNlO1xuICB9XG59XG4iXX0=