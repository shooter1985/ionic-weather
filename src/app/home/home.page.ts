import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  city: string = "Clichy"
  country: string = "Fr";
  data: Object
  name: string
  constructor(private router: Router, private auth: AuthService, private geolocation: Geolocation, private loadingController: LoadingController) {}

  Login(){
    this.router.navigate(['/login'])
  }

  Register(){
    this.router.navigate(['/register'])
  }

  ngOnInit(){ 
    this.getWeather()
  }


  getWeather(){
    this.auth.getWeatherByZipCodeCounty(this.city,this.country).subscribe(
      data => {
        this.data = data
      }
    )
  }

  // Localisation
  async getLocation(){

    const loading = await this.loadingController.create({
      message: 'Please wait...'
    });
    await loading.present();
    try {
      const resp = await this.geolocation.getCurrentPosition()

      this.auth.getWeatherByLonLat(resp.coords.latitude,resp.coords.longitude).subscribe(
        data => {
          this.data = data
          loading.dismiss();
        },
        err => {
          console.log(err);
        }
      )
    } catch (error) {
      console.log(error);
      
    }
  }
}
