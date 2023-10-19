import { Injectable } from '@angular/core';
import { LoadingController, AlertController, ModalController } from '@ionic/angular';
import { PreviewPage } from './preview/preview.page';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CommonFunctionsService {

  constructor(public modalController: ModalController, private route: Router, public alertController: AlertController, public loadingController: LoadingController) { }

  async presentLoading(msg: any) {
    const loading = await this.loadingController.create({
      message: msg,
    });
    await loading.present();
  }

  dismissLoading() {
    this.loadingController.dismiss();
  }

  goToPage(page: string) {
    this.route.navigate(['/' + page]);
  }

  async presentAlertConfirm(ttl: string, msg: any) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: ttl,
      message: msg,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            console.log('Confirm Okay');
          }
        }
      ]
    });
    await alert.present();
  }

  async showPreview(path: any) {
    const modal = await this.modalController.create({
      component: PreviewPage,
      cssClass: '',
      componentProps: { path: path }
    });
    modal.onDidDismiss().then(data => {
      
    });
    return await modal.present();
  }
}
