import { Auth } from './auth.interface'

export interface YandexAuth extends Auth {
  accessToken: string;
  mailDomain: string;
}

export interface YandexUser {
  id: number;
  login: string;
  client_id: string;
  display_name: string;
  real_name: string;
  first_name: string;
  last_name: string;
  sex: string | null;
  default_email: string;
  emails: string[];
  default_avatar_id: string;
  is_avatar_empty: boolean;
}