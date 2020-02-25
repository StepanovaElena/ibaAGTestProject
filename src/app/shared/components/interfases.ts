export interface User {
  id?: string;
  login?: string;
  email: string;
  password: string;
  returnSecureToken?: boolean;
  permissions?: string[];
  membership?: string[];
}

export interface Group {
  id?: string;
  name: string;
  permissions: string[];
  membership: string[];
}

export interface Permissions {
  id?: string;
  name: string;
}

export interface EffectivePermissions {
  permission_id: string;
  group_id: string;
}

export interface AuthResponse {
  idToken: string;
  expiresIn: string;
  email: string;
}

export class FbResponse {
  name: string;
}


