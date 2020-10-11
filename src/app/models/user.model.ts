export interface User{
    uid:string,
    email:string;
    photoURL?:string;
    role?:Number;
    authType:Number;
    courses?:string[];
    Course?:string;
}