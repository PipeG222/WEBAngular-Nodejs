import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarResenasComponent } from './listar-Resenas.component';

describe('ListarResenasComponent', () => {
  let component: ListarResenasComponent;
  let fixture: ComponentFixture<ListarResenasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListarResenasComponent]
    });
    fixture = TestBed.createComponent(ListarResenasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
