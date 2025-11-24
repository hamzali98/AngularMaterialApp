import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidematerialnavComponent } from './side-nav.component';

describe('SidematerialnavComponent', () => {
  let component: SidematerialnavComponent;
  let fixture: ComponentFixture<SidematerialnavComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SidematerialnavComponent],
      imports: [
        MatButtonModule,
        MatIconModule,
        MatListModule,
        MatSidenavModule,
        MatToolbarModule,
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidematerialnavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
