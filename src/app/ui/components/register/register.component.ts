import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { matchPasswordValidator, maxLengthValidator, minLengthValidator } from 'src/app/helpers/form-validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  constructor(private formBuilder: FormBuilder) { }
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
  register(form: any) {
  }
}
