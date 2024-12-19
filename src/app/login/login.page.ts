import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { HomePage } from '../home/home.page';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HTTP } from '@ionic-native/http/ngx';
import { environment } from 'src/environments/environment';
import { LandingPage } from '../landing/landing.page';
import { Router } from '@angular/router';

const API_URL2 = environment.API_URL2;
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string = "";
  password: any = "";


  constructor(
    public modalController: ModalController,
    private http: HttpClient,
    private router: Router,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
  }


  login() {
    this.http.post(`${API_URL2}/login`, { email: this.email, password: this.password }).subscribe((results: any) => {
    
      if (results.success) {
        this.router.navigate(['/landing']);
      }
    }, (error) => {
      this.presentAlert();
    });
  }

  async presentAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Login Failed',
      message: 'Wrong credentials.',
      buttons: ['Ok'],
    });

    await alert.present();
  }

  async openLanding() {
    const secimModal = this.modalController.create({
      component: LandingPage,
      componentProps: {
        showBackdrop: true,
        enableBackdropDismiss: false,
      }
    },);
    (await secimModal).present();
    (await secimModal).onDidDismiss().then(result => {
    })
  }

}
