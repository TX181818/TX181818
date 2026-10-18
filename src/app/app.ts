import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OpenFoodFacts } from './services/open-food-facts';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { Mypantry } from './mypantry';
import { Product } from './product';
import { OpenFoodFactsResponse } from './services/modele';
import {AuthService} from './auth-service';
@Component({
  imports: [RouterOutlet, AsyncPipe, FormsModule],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
//authState = observe l’état de connexion Firebase 
export class App {
  [x: string]: any;
  protected readonly title = signal('may-pantry-app');
  private readonly service=inject(OpenFoodFacts)
  private readonly pantryService = inject(Mypantry);
   private readonly authService = inject(AuthService);
  products$ = this.pantryService.getProducts();
  user$ = this.authService.user$;
  authEmail='';
  authPassword='';
  selectedProductId: string | null = null;

  productForm: Product = {
    name: '',
    quantity: 0,
    unit: 'piece',
    location: '',
    minQuantity: 0,
  };

  async ajouterProduit() {
    await this.pantryService.addProduct(this.productForm);
    this.resetForm();
  }

  selectionnerProduit(product: Product) {
    this.selectedProductId = product.id ?? null;

    this.productForm = {
      name: product.name,
      quantity: product.quantity,
      unit: product.unit,
      location: product.location,
      minQuantity: product.minQuantity,
    };
  }

  async modifierProduit() {
    if (!this.selectedProductId) {
      return;
    }

    await this.pantryService.updateProduct(
      this.selectedProductId,
      this.productForm
    );

    this.resetForm();
  }

  async supprimerProduit(id: string | undefined) {
    if (!id) {
      return;
    }

    await this.pantryService.deleteProduct(id);
  }

  resetForm() {
    this.selectedProductId = null;

    this.productForm = {
      name: '',
      quantity: 0,
      unit: 'piece',
      location: '',
      minQuantity: 0,
    };
  }
//
openFoodProduct$: Observable<OpenFoodFactsResponse> | null = null;  //pour chercher produit
  chercherProduit(codeBarre: string) {
    const code=codeBarre.trim();
    if(!code) {
      this.openFoodProduct$=null;
      return
    }
    this.openFoodProduct$=this.service.getProduct(code);
  }
  async inscription() {
    try {
      await this.authService.signUp(this.authEmail, this.authPassword);
      this.authEmail = '';
      this.authPassword = '';
      console.log('Inscription réussie');
    } catch (error) {
      console.error('Erreur lors de l\'inscription :', error);
    }
  }
  async connexion() {
    try {
      await this.authService.signIn(this.authEmail, this.authPassword);
      this.authEmail = '';
      this.authPassword = '';
      console.log('Connexion réussie');
    } catch (error) {
      console.error('Erreur lors de la connexion :', error);
    }
  }
  async deconnexion() {
  await this.authService.signOut();
}
}
