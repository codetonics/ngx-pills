import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxPillsComponent } from './ngx-pills.component';

describe('NgxPillsComponent', () => {
  let component: NgxPillsComponent;
  let fixture: ComponentFixture<NgxPillsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxPillsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxPillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
