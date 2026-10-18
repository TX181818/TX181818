import { TestBed } from '@angular/core/testing';
import { OpenFoodFacts } from './open-food-facts';
import { HttpClient } from '@angular/common/http';

describe('OpenFoodFacts', () => {
  let service: OpenFoodFacts;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpenFoodFacts);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
