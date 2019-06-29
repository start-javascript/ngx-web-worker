import { WebworkerService } from 'ngx-webworker';

import { Component, OnInit } from '@angular/core';

import { Result } from './result';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [WebworkerService],
})
export class AppComponent implements OnInit {
  public webWorkerResults: any[] = [];
  public webWorkerStart = 35;
  public webWorkerEnd = 45;
  public synchronousStart = 35;
  public synchronousEnd = 38;
  public synchronousResults: any[] = [];
  public synchronousDuration = 0;
  private promises: Promise<any>[] = [];

  constructor(private _webWorkerService: WebworkerService) {}

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
      const result = new Result(pointer, this.fib(pointer), false);
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

  private webWorkerCalculate(n: number) {
    const promise = this._webWorkerService.run(this.fib, n);
    const result = new Result(n, 0, true);
    this.webWorkerResults.push(result);
    this.promises.push(promise);

    promise.then((response) => {
      result.result = response;
      result.loading = false;
    });
  }

  private fib = (n: number) => {
    const fib = (n: number): number => {
      if (n < 2) {
        return 1;
      }
      return fib(n - 1) + fib(n - 2);
    };

    return fib(n);
  }
}
