import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { OpenFoodFactsResponse } from './modele';

@Injectable({
  providedIn: 'root',
})
export class OpenFoodFacts {
  private readonly http = inject(HttpClient);

  getProduct(barcode: string) {
    return this.http.get<OpenFoodFactsResponse>(
      `https://world.openfoodfacts.org/api/v2/product/${barcode}`
    );
  }
}