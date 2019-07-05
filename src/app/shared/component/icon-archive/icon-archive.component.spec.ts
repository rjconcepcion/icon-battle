import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IconArchiveComponent } from './icon-archive.component';

describe('IconArchiveComponent', () => {
  let component: IconArchiveComponent;
  let fixture: ComponentFixture<IconArchiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IconArchiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
