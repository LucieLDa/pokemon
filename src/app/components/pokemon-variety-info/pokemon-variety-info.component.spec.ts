import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonVarietyInfoComponent } from './pokemon-variety-info.component';

describe('PokemonVarietyInfoComponent', () => {
  let component: PokemonVarietyInfoComponent;
  let fixture: ComponentFixture<PokemonVarietyInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonVarietyInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PokemonVarietyInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
