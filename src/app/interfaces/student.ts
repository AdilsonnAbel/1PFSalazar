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
  id: number;
  data: typeData;
}

export interface StudentId {
  id: number;
  name: string;
}
