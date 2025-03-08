import {Component, OnInit} from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import {TimerService} from "../services/timer/timer.service";
import {NewTimerButtonComponent} from "../components/new-timer-button/new-timer-button.component";
import {TimerListComponent} from "../components/timer-list/timer-list.component";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, NewTimerButtonComponent, TimerListComponent],
})
export class HomePage implements OnInit{
  constructor(
    private timerService: TimerService
  ) {}

  ngOnInit() {
    this.timerService.init();
  }
}
