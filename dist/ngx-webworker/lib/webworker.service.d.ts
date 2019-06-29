export declare class WebworkerService {
    private workerFunctionToUrlMap;
    private promiseToWorkerMap;
    run<T>(workerFunction: (input: any) => T, data?: any): Promise<T>;
    runUrl(url: string, data?: any): Promise<any>;
    terminate<T>(promise: Promise<T>): Promise<T>;
    getWorker(promise: Promise<any>): Worker;
    private createPromiseForWorker;
    private getOrCreateWorkerUrl;
    private createWorkerUrl;
    private createPromiseCleaner;
    private removePromise;
}
