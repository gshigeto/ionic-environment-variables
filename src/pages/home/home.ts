import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

// Import environment variables in any component
import { ENV } from '@app/env';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  mode: string = ENV.mode;

  constructor(public navCtrl: NavController) {

  }

}
