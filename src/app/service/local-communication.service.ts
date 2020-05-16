import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalCommunicationService {
  
  public user: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor() { }

  setUser(params){
    this.user.next(params);
  }
}
