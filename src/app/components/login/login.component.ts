import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup, Validators,  } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  user: firebase.User;
  email = new FormControl('', [Validators.required, Validators.email]);
  password = '';
  hide = true;
  casa = '';

  registerForm: FormGroup;
  submitted = false;

  constructor(
    private service: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.service.getLoggedUser()
      .subscribe(user => {
        this.user = user;
        if (this.user) { this.router.navigate(['/']); }
      });

  }

  async googleSignin() {
    console.log('Login...');
    await this.service.googleSignin();
    if (this.user) { this.router.navigate(['/']); }
  }

  async msSignin() {
    console.log('Login...');
    await this.service.msSignin();
    if (this.user) { this.router.navigate(['/']); }
  }

  async signin() {
    console.log('Login...');
    await this.service.signin(this.email.value, this.password);
    if (this.user) { this.router.navigate(['/']); }
  }

  async showModal() {
    const { value: formValues } = await Swal.fire({
      title: 'Registrar',
      html: `
              <div class="row">
                  <div class="col-sm-12">
                      <div class="form-group">
                          <label>Nombre</label>
                          <input type="text" id="firstname" formControlName="firstname" class="form-control" [ngClass]="{ 'is-invalid': submitted && f.firstname.errors }" />
                          <div *ngIf="submitted && f.firstname.errors" class="invalid-feedback">
                              <div *ngIf="f.firstname.errors.required">FirstName is required</div>
                          </div>
                      </div>
                  </div>
                  <div class="col-sm-6">
                      <div class="form-group">
                          <label>Correo</label>
                          <input type="text" id="email" formControlName="email" class="form-control" [ngClass]="{ 'is-invalid': submitted && f.email.errors }" />
                          <div *ngIf="submitted && f.email.errors" class="invalid-feedback">
                              <div *ngIf="f.email.errors.required">Email is required</div>
                              <div *ngIf="f.email.errors.email">Email must be a valid email address</div>
                          </div>
                      </div>
                  </div>
                  <div class="col-sm-6">
                      <div class="form-group">
                          <label>Año Escolar</label>
                          <select name="grade" id="grade" style="height:auto; width: 100%;">
                            <option value="0">Seleccione</option>
                            <option value="4">Cuarto</option>
                            <option value="5">Quinto</option>
                          </select>
                      </div>
                  </div>
                  <div class="col-sm-6">
                      <div class="form-group">
                          <label>Contraseña</label>
                          <input type="password" id="password" formControlName="password" class="form-control" [ngClass]="{ 'is-invalid': submitted && f.password.errors }" />
                          <div *ngIf="submitted && f.password.errors" class="invalid-feedback">
                              <div *ngIf="f.password.errors.required">Password is required</div>
                              <div *ngIf="f.password.errors.minlength">Password must be at least 6 characters</div>
                          </div>
                      </div>
                  </div>
                  <div class="col-sm-6">
                      <div class="form-group">
                          <label>Código de Curso</label>
                          <input type="text" id="courseId" formControlName="courseId" class="form-control" [ngClass]="{ 'is-invalid': submitted && f.password.errors }" />
                          <div *ngIf="submitted && f.password.errors" class="invalid-feedback">
                              <div *ngIf="f.password.errors.required">Password is required</div>
                              <div *ngIf="f.password.errors.minlength">Password must be at least 6 characters</div>
                          </div>
                      </div>
                  </div>
              </div>
              <div class="form-check">
              <input type="checkbox" class="form-check-input" id="exampleCheck1">
                <label class="form-check-label" for="exampleCheck1">Acepto los <a href="terminos-condiciones" target="_blank">terminos y condiciones</a></label>
              </div>
      `,
      focusConfirm: false,
      inputPlaceholder: 'I agree with the terms and conditions',
      preConfirm: () => {
        return {
          name: (document.getElementById('firstname') as HTMLInputElement).value,
          email: (document.getElementById('email') as HTMLInputElement).value,
          password: (document.getElementById('password') as HTMLInputElement).value,
          courseId: (document.getElementById('courseId') as HTMLInputElement).value,
          grade: (document.getElementById('grade') as HTMLInputElement).value,
        }
      }
    })

    if (formValues) {
      Swal.showLoading();
      this.service.signup(formValues.email, formValues.password, formValues.name, formValues.courseId, formValues.grade)
      Swal.fire({
        title: 'Registro',
        text: 'Registro Completado',
        icon: 'success',
        confirmButtonText: 'Aceptar'
    });
      console.log(formValues);
    }
  }

  ngOnDestroy() {
    (document.querySelector('.mdk-drawer.js-mdk-drawer.layout-mini__drawer') as HTMLDivElement).style.display = 'block';
    (document.querySelector('.navbar.navbar-expand.navbar-light.border-bottom-2') as HTMLDivElement).style.display = 'flex';
  }

}
