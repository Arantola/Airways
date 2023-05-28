export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  emailVerified: boolean;
}

export class UserModel implements User {
  constructor(
    public uid: string,
    public email: string | null,
    public displayName: string | null,
    public photoURL: string | null,
    public emailVerified: boolean
  ) {}
}
