import {Example} from "./example.service";
import {Observable, of, throwError} from "rxjs";
import {delay} from "rxjs/operators";

export let data: Example[] = [

  {id:1, text: 'tata1'},
  {id:2, text: 'tata2'},
  {id:3, text: 'tata3'},
  {id:4, text: 'tata4'},

];

export function get(): Observable<Example[]> {
  return of(data).pipe(delay(300));
}

export function deleteById(id: number): Observable<void> {
  if(id === 1){
    return throwError('cannot delete with ID 1');
  }

  console.log("deleting by id", id, data);
  data = data.filter((e) => e.id !== id);
  console.log("deleting by id", id, data);

  return of('hello' as unknown as void).pipe(delay<void>(300));
}


