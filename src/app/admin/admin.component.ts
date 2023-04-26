import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  user = "";
  login=true;
  loading=true;  
  constructor() { }

  ngOnInit(): void {
  }

  logout(){
    localStorage.removeItem("admin");
    localStorage.removeItem("token");    
    window.location.assign('/');
  }
    
}
