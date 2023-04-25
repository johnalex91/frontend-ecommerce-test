import { Component, OnInit } from '@angular/core';

declare var $: any;


@Component({
  selector: 'app-compra',
  templateUrl: './compra.component.html',
  styleUrls: ['./compra.component.css']
})
export class CompraComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }

  modalopen(){
    $('#exampleModal').modal('show');
  }

  modalclose(){
    $('#exampleModal').modal('hide');
    $('#exampleModal2').modal('show');
  }
}
