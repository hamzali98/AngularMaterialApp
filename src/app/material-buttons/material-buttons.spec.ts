import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialButtons } from './material-buttons';

describe('MaterialButtons', () => {
  let component: MaterialButtons;
  let fixture: ComponentFixture<MaterialButtons>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialButtons]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaterialButtons);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
