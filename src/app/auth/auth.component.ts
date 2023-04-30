import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthResponseData, AuthService } from './auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  isLoginMode: boolean = true;
  isLoading: boolean = false;
  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute){}

  onSubmit(form: NgForm){
  this.isLoading = true;

  if (!form.valid) return;
  const email = form.value.email;
  const password = form.value.password;

  let authObservable: Observable<AuthResponseData>;
  
  if(!this.isLoginMode){
    authObservable = this.authService.signUp(email, password);
  } else {
    authObservable = this.authService.signIn(email, password)
  }

  authObservable.subscribe({
    next: (data) => {
      this.isLoading = false;
      console.log(data);
      this.router.navigate(['/recipes']);
    },
    error: (err) => {
      this.isLoading = false;
      this.errorMessage = err
    },
    complete: () => console.log('completed')
  })    

    form.reset();
  }



  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode;
  }
}
