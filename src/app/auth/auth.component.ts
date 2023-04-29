import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  isLoginMode: boolean = true;
  isLoading: boolean = false;
  errorMessage: string | null = null;

  constructor(private authService: AuthService){}

  onSubmit(form: NgForm){
  this.isLoading = true;

    if (!form.valid) return;
    const email = form.value.email;
    const password = form.value.password;
    
    if(!this.isLoginMode){
      this.authService.signUp(email, password).subscribe({
        next: (data) => {
          this.isLoading = false;
          console.log(data)},
        error: (err) => {
          this.isLoading = false;
          this.errorMessage = err
        },
        complete: () => console.log('completed')
      })
    } else {
      this.authService.signIn(email, password).subscribe({
        next: (data) => {
          this.isLoading = false;
          console.log(data)},
        error: (err) => {
          this.isLoading = false;
          this.errorMessage = err
        },
        complete: () => console.log('completed')
      })
    }
    form.reset();
  }

  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode;
  }
}
