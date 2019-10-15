import { Roles } from './roles';
export class RegisterUser {
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    repeatPassword?: string;
    roles: Roles;
}
