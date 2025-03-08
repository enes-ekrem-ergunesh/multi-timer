import {Duration} from "./duration";

export interface Timer {
  id: number,
  name: string,
  initial_duration: Duration,
  duration: Duration,
  started_at: Date|null;
}
