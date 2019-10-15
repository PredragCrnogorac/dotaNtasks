import { Hero } from './../models/hero';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {
  private apiUrl = '/heroes';

  constructor(
    private db: AngularFirestore
  ) { }

  getAll(): Observable<Hero[]> {
    return this.db.collection<Hero>(this.apiUrl).valueChanges().pipe();
  }
  getByCat(cat: string) {
    return this.db.collection<Hero>(this.apiUrl, ref => ref.where('primary', '==', cat)).valueChanges().pipe();
  }
  getById(id: string): Observable<any> {
    return this.db.collection<any>(this.apiUrl).doc(id).get().pipe();
  }
}
