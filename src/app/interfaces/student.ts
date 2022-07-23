import { FormControl } from '@angular/forms';

export type typeClassroom =
  | 'alpha'
  | 'beta'
  | 'gamma'
  | 'delta'
  | 'epsilon'
  | 'zeta'
  | 'eta';

export type typeLastNames = [string, string];
export type typeGenre = 'male' | 'female' | 'others';
export type typeShift = 'morning' | 'afternoon ';
export type typeState = 'approved' | 'disapproved';

export type typeNames = {
  firstNames: string[];
  lastNames: typeLastNames;
};

export type typeData = {
  birth: string;
  classroom: string;
  email: string;
  genre: typeGenre;
  names: typeNames;
  shift: typeShift;
  state: typeState;
};

export interface Student {
  active: boolean;
  data: typeData;
  id: number;
}

export interface ControlStudent {
  firstNames: FormControl<string>;
  lastNames: FormControl<string>;
  genre: FormControl<string>;
  birth: FormControl<string>;
  email: FormControl<string>;
  classroom: FormControl<string>;
  state: FormControl<string>;
}

export interface ControlSearch {
  search: FormControl<string>;
}

export interface Course {
  area: string;
  name: string;
  description: string;
}
