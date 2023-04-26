import {Injectable} from '@angular/core';
declare var $ :any;
declare var require: any;

export class Product{
	constructor(
	public id:number,
    public name:string,
    public reference:string,
    public quantity:string,
    public image:string,
    public category:string
	){}
}

export class User{
	constructor(
	public id:number,
    public username:string,
    public email:string
	){}
}

export class producto{
	constructor(
	public id:number,
    public nombre:string,
    public referencia:string,
    public categoria:string,
    public cantidad:string,
    public foto:string
	){}
}

export class usuario{
	constructor(
	public id:number,
    public usuario:string,
    public email:string,
    public password:string,
    public confirmpassword:string,
	){}
}

@Injectable()
export class Models{
    constructor(){}
	Product(){return new Product(0, "", "", "", "","");}
    User(){return new User(0,"","");};

    Producto(){return new producto(0, "", "", "", "", "");}
    Usuario(){return new usuario(0, "", "", "", "");}
}