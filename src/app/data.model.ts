import { DateTime } from 'luxon';

export type Data = {
  _id: string;
  age: number;
  eyeColor: string;
  name: string;
  gender: string;
  email: string;
  address: string;
  registered: string;
  message: string;
  favouriteSport: string;
  activeMinutes?: number;
  registeredDate?: DateTime;
};
