import { Component, OnInit } from '@angular/core';
import {
  IonAvatar, IonIcon,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList
} from "@ionic/angular/standalone";
import {TimerComponent} from "../timer/timer.component";
import {Timer} from "../../interfaces/timer";
import {TimerService} from "../../services/timer/timer.service";
import {NgForOf} from "@angular/common";
import {NewTimerButtonComponent} from "../new-timer-button/new-timer-button.component";

@Component({
  selector: 'app-timer-list',
  templateUrl: './timer-list.component.html',
  styleUrls: ['./timer-list.component.scss'],
  imports: [
    IonList,
    IonItem,
    IonLabel,
    IonItemSliding,
    IonAvatar,
    IonItemOptions,
    IonItemOption,
    IonIcon,
    TimerComponent,
    NgForOf,
    NewTimerButtonComponent
  ],
  standalone: true
})
export class TimerListComponent  implements OnInit {
  timers: Timer[] = [];

  constructor(
    private timerService: TimerService
  ) { }

  ngOnInit() {
    this.timerService.timers.subscribe((timers) => {
      console.warn('Timers updated!')
      this.timers = timers;
    });
    return
  }

}
