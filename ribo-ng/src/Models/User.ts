import { Role } from "./Role";

export class User {
  public idUser!: number;
  public Firstname!: string;
  public lastName!: string;
  public email!: string;
  public login!: string;
  public password!: string;
  public photo!: string;
  public universityname!: string;
  public societyname!: string;
  public role!: Role;
}
