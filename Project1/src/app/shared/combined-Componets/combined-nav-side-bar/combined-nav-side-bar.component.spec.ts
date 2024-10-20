import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CombinedNavSideBarComponent } from './combined-nav-side-bar.component';

describe('CombinedNavSideBarComponent', () => {
  let component: CombinedNavSideBarComponent;
  let fixture: ComponentFixture<CombinedNavSideBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CombinedNavSideBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CombinedNavSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
