import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialtableComponent } from './user-table.component';

describe('MaterialtableComponent', () => {
  let component: MaterialtableComponent;
  let fixture: ComponentFixture<MaterialtableComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialtableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
