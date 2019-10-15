import { MessageService } from 'primeng/api';
import { AuthService } from './../../shared/services/auth.service';
import { RegisterUser } from './../../shared/models/register-user';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  

  registerForm: FormGroup;
  registerUser: RegisterUser;

  authErrors: any;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.initForm();
    this.checkForFSErrors();
  }

  initForm() {
    this.registerForm = this.fb.group({
      username: new FormControl('', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(15)])),
      email: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(20)])),
      firstName: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(20)])),
      lastName: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(20)])),
      password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(20)])),
      repeatPassword: new FormControl('', Validators.compose([Validators.required]))
    }, { validator: this.confirmPass });
  }

  confirmPass(form: FormGroup) {
    const confirmPas = form.get('repeatPassword');
    if (confirmPas.errors == null || 'passwordMismatch' in confirmPas.errors) {
      if (form.get('password').value !== confirmPas.value) {
        confirmPas.setErrors({ passwordMismatch: true });
      } else {
        confirmPas.setErrors(null);
      }
    }
  }

  register() {
    const user = new RegisterUser();
    user.username = this.registerForm.get('username').value;
    user.email = this.registerForm.get('email').value;
    user.firstName = this.registerForm.get('firstName').value;
    user.lastName = this.registerForm.get('lastName').value;
    user.password = this.registerForm.get('password').value;
    user.repeatPassword = this.registerForm.get('repeatPassword').value;
    this.createUser(user);
    this.clearForm();
  }

  createUser(frm) {
    this.auth.createUser(frm);
  }


  checkForFSErrors() {
    this.auth.eventAuthError$.subscribe(data => {
      this.authErrors = data;
      this.messageService.add({
        sticky: true, severity: 'error',
        summary: 'Register error', detail: data
      });
    });
  }
  clearForm() {
    this.registerForm.reset();
  }

  valid(entity: any) {
    let valid = false;
    if (
      entity !== '' &&
      entity !== undefined &&
      entity !== null
    ) {
      valid = true;
    }
    return valid;
  }

}
