import { inject, Injectable } from '@angular/core';
import {addDoc, collection, Firestore ,doc, deleteDoc,collectionData,updateDoc} from '@angular/fire/firestore';
import {firstValueFrom, Observable} from 'rxjs';
import { Product } from './product';
import { AuthService } from './auth-service';
@Injectable({
  providedIn: 'root',
})
export class Mypantry {
  private readonly firestore = inject(Firestore);
  private readonly productCollection = collection(this.firestore, 'products');// je choisie quelle  collection
 private readonly authService = inject(AuthService);   //afficher produits
   getProducts(): Observable<Product[]> {
    return collectionData(this.productCollection, {idField:'id',}) as Observable<Product[]>;
   

   }

   async addProduct(product : Product) {
    const user = await firstValueFrom(this.authService.user$);
    return addDoc(this.productCollection, {...product, userId: user?.uid}); //il créer collection si n'dxiste pas
  
  }
  deleteProduct(id:string){
    const productDoc=doc(this.firestore,`products/${id}`);
    return deleteDoc(productDoc);
  }
  //modifer le  produit
  updateProduct(id:string,product:Product) {
    const productDoc=doc(this.firestore,`products/${id}`);
    return updateDoc(productDoc, {
      name:product.name,
      quantity:product.quantity,
      unit:product.unit,
      location:product.location,
      minQuantity:product.minQuantity
    });
  }
    
  
}
