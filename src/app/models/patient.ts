import {Hospital} from './hospital';

export interface Patient {
  applicationId: string;
  name: string;
  mobileNumber: string;
  gender: string;
  age: number;
  email: string;
  status: string;
  hospital1: string;
  hospital: Hospital;
}
