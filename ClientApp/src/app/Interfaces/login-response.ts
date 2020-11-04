import {LoginJWT} from './login-jwt';

export interface LoginResponse {
  succeeded: boolean;
  message: string;
  data: LoginJWT;
}
