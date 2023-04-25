import { Component, OnInit } from '@angular/core';
// import * as $ from 'jquery';
// declare var $;

@Component({
  selector: 'app-compra',
  templateUrl: './compra.component.html',
  styleUrls: ['./compra.component.css']
})
export class CompraComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  modalopen(modal:any){
    // console.log('en l afuntion');
    // $('#exampleModal').modal('show');
  }
}
