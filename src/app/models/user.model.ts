export interface User{
    uid:string,
    email:string;
    photoURL?:String;
    role?:Number;
    authType:Number;
    courses?:String[];
    Course?:String;
}