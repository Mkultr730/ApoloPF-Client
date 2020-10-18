export interface User{
    uid: string;
    email: string;
    photoURL?: string;
    role?: string;
    authType: number;
    courses?: string[];
    Course?: string;
    displayName?: string;
}
