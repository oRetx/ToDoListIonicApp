import { Component } from '@angular/core';
import {ModalController, NavController} from 'ionic-angular';
import { AddItemPage } from '../add-item/add-item'
import { ItemDetailPage } from '../item-detail/item-detail';
import { Data } from '../../providers/data/data';
import { AlertController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public items = [];

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public dataService: Data, private alertCtrl: AlertController, private toastCtrl: ToastController) {

    for (let x = 0; x < 5; x++) {
      this.items.push(x);

    }

    this.dataService.getData().then((todos) => {

      if (todos) {
        this.items = todos;
      }
    });
  }

  ionViewDidLoad() {
  }

  addItem() {

    let addModal = this.modalCtrl.create(AddItemPage);

    addModal.onDidDismiss((item) => {

      if (item) {
        this.saveItem(item);
      }
    });

    addModal.present();
  }

  saveItem(item) {
    this.items.push(item);
    this.dataService.save(this.items);

    let toast = this.toastCtrl.create({
      message: 'ToDo was added successfully',
      duration: 3000,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

  viewItem(item) {
    this.navCtrl.push(ItemDetailPage, {
      item: item
    });
  }

  removeItem(item){
    let index = this.items.indexOf(item);

    if(index > -1){
      this.items.splice(index, 1);
      this.dataService.save(this.items);
    }

    let alert = this.alertCtrl.create({
      title: 'Deleted',
      subTitle: 'Item has been deleted from the list!',
      buttons: ['Dismiss']
    });
    alert.present();
  }

  reorderItems(indexes) {
    let element = this.items[indexes.from];
    this.items.splice(indexes.from, 1);
    this.items.splice(indexes.to, 0, element);
  }



}
