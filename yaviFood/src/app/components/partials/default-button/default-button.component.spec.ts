import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultButtonComponent } from './default-button.component';

describe('DefaultButtonComponent', () => {
  let component: DefaultButtonComponent;
  let fixture: ComponentFixture<DefaultButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefaultButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DefaultButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
