import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Timer} from "../../interfaces/timer";
import {Duration} from "../../interfaces/duration";

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  currentTime = new BehaviorSubject(new Date());
  private intervalId: any = null;

  timers = new BehaviorSubject<Timer[]>([
    {
      id: 1,
      name: '15 min',
      initial_duration: {
        hours: 0,
        minutes: 15,
        seconds: 0
      },
      duration: {
        hours: 0,
        minutes: 15,
        seconds: 0
      },
      started_at: null
    },
    {
      id: 2,
      name: '15 min',
      initial_duration: {
        hours: 0,
        minutes: 15,
        seconds: 0
      },
      duration: {
        hours: 0,
        minutes: 15,
        seconds: 0
      },
      started_at: null
    },
  ])

  init() {
    if (this.intervalId) {
      return;
    }
    this.intervalId = setInterval(() => {
      this.currentTime.next(new Date());
    }, 1000);
  }

  constructor() {
  }

  getTimerById(timerId: number) {
    let timer = this.timers.value.find(timer => timer.id === timerId);
    if (!timer) {
      return null;
    }
    return timer;
  }

  getTimerIndexById(timerId: number) {
    return this.timers.value.findIndex(timer => timer.id === timerId);
  }

  timerRemaining(timerId: number): Duration {
    let timer = this.getTimerById(timerId);
    if (!timer) {
      return {
        hours: 0,
        minutes: 0,
        seconds: 0
      }
    }
    if (!timer.started_at) {
      return timer.duration;
    }
    let durationInMillis = timer.duration.hours * 60 * 60 * 1000 +
      timer.duration.minutes * 60 * 1000 + timer.duration.seconds * 1000;
    let difference = timer.started_at.getTime() + durationInMillis - this.currentTime.value.getTime();
    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    console.log(hours, minutes, seconds);

    if (difference <= 0) {
      return {
        hours: 0,
        minutes: 0,
        seconds: 0
      }
    }
    return {
      hours: hours,
      minutes: minutes,
      seconds: seconds
    }
  }

  startTimer(timerId: number) {
    let index = this.getTimerIndexById(timerId);
    this.timers.value[index].started_at = new Date();
  }

  pauseTimer(timerId: number, duration: Duration) {
    let index = this.getTimerIndexById(timerId);
    this.timers.value[index].started_at = null;
    this.timers.value[index].duration = duration;
  }

  resetTimer(timerId: number) {
    let index = this.getTimerIndexById(timerId);
    this.timers.value[index].started_at = null;
    this.timers.value[index].duration = this.timers.value[index].initial_duration;
  }

  deleteTimer(timerId: number) {
    let index = this.getTimerIndexById(timerId);
    if (index === -1) {
      return;
    }
    this.timers.value.splice(index, 1)
  }

  newTimer(name: string, duration: Duration) {
    let id = 0;
    if (this.timers.value.length == 0) {
      id = 1;
    } else {
      id = this.timers.value[this.timers.value.length - 1].id + 1;
    }
    this.timers.value.push({
      id: id,
      name: name,
      initial_duration: duration,
      duration: duration,
      started_at: null
    });
  }

  editTimer(timerId: number, name: string, duration: Duration) {
    let index = this.getTimerIndexById(timerId);
    this.timers.value[index].name = name;
    this.timers.value[index].initial_duration = duration;
    this.timers.value[index].duration = duration;
  }

}
