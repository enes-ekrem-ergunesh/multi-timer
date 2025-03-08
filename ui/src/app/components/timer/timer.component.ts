import {Component, input, OnInit} from '@angular/core';
import {DecimalPipe} from "@angular/common";
import {TimerService} from "../../services/timer/timer.service";
import {Duration} from "../../interfaces/duration";
import {IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel} from "@ionic/angular/standalone";

import {addIcons} from "ionicons";
import {pencil, trash, play, pause, refresh} from "ionicons/icons";

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
  imports: [
    DecimalPipe,
    IonItem,
    IonItemOption,
    IonItemOptions,
    IonLabel,
    IonItemSliding,
    IonIcon
  ],
  standalone: true
})
export class TimerComponent implements OnInit {
  timerId = input.required<number>()
  difference!: Duration;
  status: string = "play";


  constructor(
    private timerService: TimerService
  ) {
    addIcons({pencil, trash, play, pause, refresh})
  }

  ngOnInit() {
    this.timerService.currentTime.subscribe(() => {
      this.calculateDifference()
    });
    return
  }

  getTimer() {
    return this.timerService.getTimerById(this.timerId())
  }

  closeSlidingItem() {
    const slidingItem:any = document.querySelector('ion-item-sliding');
    slidingItem.close();
  }

  onSwipeEnd() {
    this.playPause()
    this.closeSlidingItem()
  }

  onSwipeStart() {
    this.delete()
    this.closeSlidingItem()
  }

  playPause() {
    switch (this.status) {
      case "play":
        console.log("start the timer")
        this.timerService.startTimer(this.timerId())
        this.status = "pause"
        break
      case "pause":
        console.log("pause the timer")
        this.timerService.pauseTimer(this.timerId(), this.difference)
        this.status = "play"
        break
    }
    this.calculateDifference()
  }

  reset() {
    console.log("reset the timer")
    this.timerService.resetTimer(this.timerId())
    this.status = "play"
    this.calculateDifference()
  }

  calculateDifference() {
    this.difference = this.timerService.timerRemaining(this.timerId())
  }

  delete() {
    console.log("delete the timer")
    this.timerService.deleteTimer(this.timerId())
  }
}
