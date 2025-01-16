import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbilityInfoBoxComponent } from './ability-info-box.component';

describe('AbilityInfoBoxComponent', () => {
  let component: AbilityInfoBoxComponent;
  let fixture: ComponentFixture<AbilityInfoBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AbilityInfoBoxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AbilityInfoBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
