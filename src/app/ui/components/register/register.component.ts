import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Create_User } from 'src/app/contracts/users/create_user';
import { Create_User_Response } from 'src/app/contracts/users/create_user_response';
import { matchPasswordValidator, maxLengthValidator, minLengthValidator } from 'src/app/helpers/form-validators';
import { AlertifyMessageType, AlertifyPosition, AlertifyService } from 'src/app/services/common/alertify.service';
import { UserService } from 'src/app/services/common/models/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  constructor(private formBuilder: FormBuilder, private userService: UserService, private alertify: AlertifyService) { }
  frm: FormGroup;
  ngOnInit(): void {
    this.frm = this.formBuilder.group({
      FullName: ["", [Validators.required, minLengthValidator(3), maxLengthValidator(50)]],
      Email: ["", [Validators.required, Validators.email]],
      Password: [""],
      PasswordAgain: [""]
    }, {
      validator: matchPasswordValidator('Password', 'PasswordAgain')
    })
  }
  get component() {
    return this.frm.controls;
  }
  async register(user: Create_User) {
    if (!this.frm.invalid) {
      var result: Create_User_Response = await this.userService.create(user)
      if (result.isSuccess) {
        this.alertify.message(result.message, {
          position: AlertifyPosition.TopRight,
          messageType: AlertifyMessageType.Success
        })
      }
      else {
        console.log(result.message)
        this.alertify.message(result.message, {
          position: AlertifyPosition.TopRight,
          messageType: AlertifyMessageType.Error
        })
      }
    }
  }
}
