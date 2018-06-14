import { Component } from '@angular/core';

/**
 * Generated class for the GgmapsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'ggmaps',
  templateUrl: 'ggmaps.html'
})
export class GgmapsComponent {

  text: string;

  constructor() {
    console.log('Hello GgmapsComponent Component');
    this.text = 'Hello World';
  }

}
