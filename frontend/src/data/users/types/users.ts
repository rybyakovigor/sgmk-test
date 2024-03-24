export type UsersResponse = [User[], number];

export interface User {
  id: string;
  name: string;
  surname: string;
  patronymic: string;
  city: string;
  street: string;
  house: string;
  flat: number;
  avatar: string | null;
  phones: Phone[];
}

export interface Phone {
  id: string;
  number: string;
}

export interface UsersQuery {
  city?: string[];
}
