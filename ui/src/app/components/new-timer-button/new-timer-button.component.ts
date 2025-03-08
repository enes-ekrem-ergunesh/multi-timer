import { Component, OnInit } from '@angular/core';
import {IonFab, IonFabButton, IonIcon} from "@ionic/angular/standalone";
import {addIcons} from "ionicons";
import {add} from "ionicons/icons";

@Component({
  selector: 'app-new-timer-button',
  templateUrl: './new-timer-button.component.html',
  styleUrls: ['./new-timer-button.component.scss'],
  imports: [
    IonFab,
    IonFabButton,
    IonIcon
  ],
  standalone: true
})
export class NewTimerButtonComponent  implements OnInit {

  constructor() {
    addIcons({add})
  }

  ngOnInit() {
    return
  }

}
