import { typeClassroom } from '../interfaces/student';

const roomNames: typeClassroom[] = [
  'alpha',
  'beta',
  'gamma',
  'delta',
  'epsilon',
  'zeta',
  'eta',
];

export const valRoomName = (data: string): boolean =>
  (roomNames as string[]).includes(data);
