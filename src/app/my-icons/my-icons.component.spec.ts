import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyIconsComponent } from './my-icons.component';

describe('MyIconsComponent', () => {
  let component: MyIconsComponent;
  let fixture: ComponentFixture<MyIconsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyIconsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyIconsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
