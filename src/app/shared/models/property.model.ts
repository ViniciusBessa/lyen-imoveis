import { UserData } from 'src/app/auth/models/user.model';
import { Location } from './location.model';

export interface Property {
  _id: string;
  title: string;
  description: string;
  price: number;
  location: Location;
  announcer: UserData;
  announceType: 'sale' | 'rent';
  petAllowed: boolean;
  numberBedrooms: number;
  numberBathrooms: number;
  hasGarage: boolean;
  images: string[];
  createdAt: Date;
  updatedAt: Date;
}
