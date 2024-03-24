import type { Phone as PhoneFromResponse, User as UsersFromResponse, UsersQuery } from '~~/src/data/users/types/users';

export interface DomainUser<T = DomainPhone> extends Omit<UsersFromResponse, 'phones'> {
  phones: T[];
}

export interface DomainPhone extends PhoneFromResponse {}

export interface PhoneForCreate {
  number: string;
}

export interface CreateOrUpdateUserBody extends Omit<DomainUser, 'avatar' | 'phones'> {
  phones: string[];
}

export interface UsersDomainQuery extends UsersQuery {}
