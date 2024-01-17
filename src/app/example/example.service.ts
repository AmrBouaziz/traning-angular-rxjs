import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of, Subject, switchMap} from 'rxjs';
import {deleteById, get} from './backend.mock';
import {tap} from 'rxjs/operators';


export interface Example {
  text: string;
  id: number;
}

@Injectable({providedIn: 'root'})
export class ExampleService {

  private _examples = new Subject<Example[]>();
  get examples() {
    return this._examples.asObservable();
  }
  isLoading = new BehaviorSubject(false);
  load(): Observable<void> {
    this.isLoading.next(true);
    return get().pipe(tap((data) => {
      console.log("hello");
      this._examples.next(data);
      this.isLoading.next(false);
    }), switchMap(() => of()));
  }

  delete(id: number): Observable<void> {
    this.isLoading.next(true);
    console.log("deleting id", id);
    return deleteById(id).pipe(switchMap((something:any) => {
      console.log("calling load again", something);
      return this.load();
    }));
  }
}
