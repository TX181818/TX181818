import {inject, Injectable } from '@angular/core';
import { Auth,authState, createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly auth=inject(Auth);
  user$=authState(this.auth);
  signUp(email:string,password: string) {
    return createUserWithEmailAndPassword(this.auth,email,password);
  }
  signIn(email:string,password: string) {
    return signInWithEmailAndPassword(this.auth,email,password);
  }
  //manque signout
   signOut() {
    return signOut(this.auth);
  }
 
}
