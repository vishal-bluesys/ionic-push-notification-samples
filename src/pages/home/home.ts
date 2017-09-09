import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Push, PushObject, PushOptions } from '@ionic-native/push';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,private push: Push) {

  }

  ionViewDidLoad(){
  
   this.push.hasPermission()
  .then((res: any) => {

    if (res.isEnabled) {
      console.log('We have permission to send push notifications');
    } else {
      console.log('We do not have permission to send push notifications');
    }

  });

// to initialize push notifications

const options: PushOptions = {
   android: {
       senderID: '610132729756'
   },
   ios: {
       alert: 'true',
       badge: true,
       sound: 'false'
   },
   windows: {}
};

const pushObject: PushObject = this.push.init(options);

pushObject.on('notification').subscribe((notification: any) => console.log('Received a notification'+notification));

pushObject.on('registration').subscribe((registration: any) => {alert('Device registered'+registration)});

pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));




  }



}
