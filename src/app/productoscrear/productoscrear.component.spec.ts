import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoscrearComponent } from './productoscrear.component';

describe('ProductoscrearComponent', () => {
  let component: ProductoscrearComponent;
  let fixture: ComponentFixture<ProductoscrearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductoscrearComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductoscrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
