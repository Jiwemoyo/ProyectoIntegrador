import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoFoundPageComponent } from './no-found-page.component';

describe('NoFoundPageComponent', () => {
  let component: NoFoundPageComponent;
  let fixture: ComponentFixture<NoFoundPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoFoundPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoFoundPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
