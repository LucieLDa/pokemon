import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvolutionChainLinkComponent } from './evolution-chain-link.component';

describe('EvolutionChainLinkComponent', () => {
  let component: EvolutionChainLinkComponent;
  let fixture: ComponentFixture<EvolutionChainLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EvolutionChainLinkComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EvolutionChainLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
