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

  constructor(private authService: AuthService){}

  onSubmit(form: NgForm){
    if (!form.valid) return;
    const email = form.value.email;
    const password = form.value.password;
    
    if(!this.isLoginMode){
      this.authService.signUp(email, password).subscribe({
        next: (data) => {console.log(data)},
        error: (err) => {console.log(err)},
        complete: () => console.log('completed')
      })
    }
    form.reset();
  }

  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode;
  }
}
