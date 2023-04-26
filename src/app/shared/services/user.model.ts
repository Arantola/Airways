export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  emailVerified: boolean;
}

export class UserModel implements User {
  constructor(
    public uid: string,
    public email: string,
    public displayName: string,
    public photoURL: string,
    public emailVerified: boolean
  ) {}
}
