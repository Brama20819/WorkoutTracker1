import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Import the Router
import { AuthService } from '../auth.service';
import {CommonModule} from '@angular/common'; // Adjust path to your actual service

@Component({
  selector: 'app-login',
  standalone:true,
  imports:[CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onGuestLogin() {
    this.authService.loginAsGuest().subscribe({
      next: (response) => {
        console.log('Success!', response);
        this.router.navigate(['/workouts']);
      },
      error: (err) => {
        console.error('Login error:', err);
        alert('Backend not running or Guest user missing in Database!');
      }
    });
  }
}
