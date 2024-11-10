import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorcomponetComponent } from './errorcomponet.component';

describe('ErrorcomponetComponent', () => {
  let component: ErrorcomponetComponent;
  let fixture: ComponentFixture<ErrorcomponetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorcomponetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErrorcomponetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
