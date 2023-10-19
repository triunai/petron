import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.page.html',
  styleUrls: ['./preview.page.scss'],
})
export class PreviewPage implements OnInit {
  @Input()
  path!: string;
  constructor(public modalController: ModalController) { }

  ngOnInit() {
  }

  closeDialog() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

}
