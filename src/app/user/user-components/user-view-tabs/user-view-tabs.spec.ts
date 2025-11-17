import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserViewTabs } from './user-view-tabs';

describe('UserViewTabs', () => {
  let component: UserViewTabs;
  let fixture: ComponentFixture<UserViewTabs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserViewTabs]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserViewTabs);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
