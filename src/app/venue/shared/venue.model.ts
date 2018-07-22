import { Reservation } from '../../reservation/shared/reservation.model';
import { User } from '../../user/shared/user.model';

export class Venue {
  public static readonly CATEGORIES = ['Kosher', 'Gluten-Free', 'Keto', 'Vegetarian', 'Vegan', 'Peanut Allergy', 'GMO-Free', 'Locally Sourced', 'Pescatarian', 'Lactose-Free', 'Paleo']

  public static readonly DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

  _id: string;
  name: String;
  address: String;
  placeId: String;
  dietaryCategories: String;
  picture: String;
  seats: number;
  bio: String;
  individualRate: number;
  dayOfTheWeek: number
  createdAt: string;
  shared: boolean;
  reservations: Reservation[];
  user: User;
}