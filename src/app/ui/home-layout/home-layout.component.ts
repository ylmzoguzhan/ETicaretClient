import { Component } from '@angular/core';
import { AlertifyMessageType, AlertifyPosition, AlertifyService } from 'src/app/services/common/alertify.service';

@Component({
  selector: 'app-home-layout',
  templateUrl: './home-layout.component.html',
  styleUrls: ['./home-layout.component.scss']
})
export class HomeLayoutComponent {

  constructor(private alertify: AlertifyService) { }

  ngOnInit(): void {
    this.alertify.message("Mesaj", {
      messageType: AlertifyMessageType.Error,
      position: AlertifyPosition.TopLeft
    })
  }
}
