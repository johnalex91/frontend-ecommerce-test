import {Injectable} from '@angular/core';
declare var $ :any;
declare var require: any;


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
	Producto(){return new producto(0, "", "", "", "", "");}
    Usuario(){return new usuario(0, "", "", "", "");}
}