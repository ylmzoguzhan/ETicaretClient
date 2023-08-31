import { Injectable } from '@angular/core';
declare var alertify: any;
declare var $: any;
@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor() { }

  message(message: string, options: Partial<AlertifyOptions>) {
    alertify.set('notifier', 'position', options.position);
    alertify.set('notifier', 'delay', options.delay);
    const msj = alertify[options.messageType](message);
    if (options.dismissOthers)
      msj.dismissOthers();
  }
  dismissAll() {
    alertify.dismissAll();
  }
}

export class AlertifyOptions {
  messageType: AlertifyMessageType = AlertifyMessageType.Message;
  position: AlertifyPosition = AlertifyPosition.BottomRight;
  delay: number = 3;
  dismissOthers: boolean = false;
}

export enum AlertifyMessageType {
  Error = "error",
  Message = "message",
  Success = "success"
}
export enum AlertifyPosition {
  TopRight = "top-right",
  TopCenter = "top-center",
  TopLeft = "top-left",
  BottomRight = "bottom-right",
  BottomCenter = "bottom-center",
  BottomLeft = "bottom-left"
}