import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  register(form){
    this.authService.register(form.value).subscribe(res => {
      this.router.navigateByUrl('home')
    })
  }

  Back(){
    this.router.navigate(['/home'])
  }

}
