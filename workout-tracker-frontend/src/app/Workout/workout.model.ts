export interface Workout {
  id?:number;
  name: string;
  description: string;
  duration:number;
  exercises: {
    name: string;
    sets: {
      repetitions: number;
      weight: number;
      setNumber: number;
      timestamp: string;
    }[];
  }[];
}
