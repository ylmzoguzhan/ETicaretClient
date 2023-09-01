import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

export class BaseComponent {
  constructor(private spinner: NgxSpinnerService) {

  }
  showSpinner(spinnerName: SpinnerName) {
    this.spinner.show(spinnerName);
    setTimeout(() => {
      this.hideSpinner(spinnerName);
    }, 3000)
  }
  hideSpinner(spinnerName: SpinnerName) {
    this.spinner.hide(spinnerName);
  }
}

export enum SpinnerName {
  BallSpinClockWise = "ball-spin-clockwise",
  BallScaleMultiple = "ball-scale-multiple"
}