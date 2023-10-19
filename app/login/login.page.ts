import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RestApiService } from '../rest-api.service';
import { ForgotpasswordPage } from '../forgotpassword/forgotpassword.page';
import { General_Config } from '../General_Config';
import { CommonFunctionsService } from '../common-functions.service';
import { ModalController, MenuController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  isLoading: boolean = false;
  dataForm!: FormGroup;
  constructor(public menuCtrl: MenuController, public modalController: ModalController, private route: Router, public restApi: RestApiService, public commonFunctions: CommonFunctionsService) { }

  ngOnInit() {
    this.dataForm = new FormGroup({
      'UserName': new FormControl(null, [Validators.required]),
      'Password': new FormControl(null, [Validators.required])
    });
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  loginUser() {
    this.isLoading = true;
    this.restApi.loginUser(this.dataForm.value).subscribe((data: any) => {
      this.isLoading = false;
      if (data['code'] == 200) {
        window.localStorage.setItem(General_Config.session_key + 'name', data['data']['name']);
        window.localStorage.setItem(General_Config.session_key + 'token', data['data']['token']);
        this.route.navigate(['/dashboard']);
      } else {
        this.commonFunctions.presentAlertConfirm('Information', data['message']);
      }
    }, (error: any) => {
      this.isLoading = false;
      this.commonFunctions.presentAlertConfirm('Information', error);
    });
  }

  async forgotPassword() {
    const modal = await this.modalController.create({
      component: ForgotpasswordPage,
      cssClass: ''
    });
    return await modal.present();
  }

}
