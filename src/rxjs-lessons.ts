import {Observable, observable} from "rxjs";


const search$ = new Observable(observer => {

  const search = document.getElementById('search');

  if (!search){
    observer.error("Element not found!")
  }
  search!.addEventListener("input", event => {
    observer.next(event);
    observer.complete();
  })
});
// VARIANT 1
//search$.subscribe((value)=> {
//  console.log(1);
//  console.log(value);
//})

// VARIANT 2
search$.subscribe( {
  next: value => {
    console.log(value)
  },
  error: err => console.log(err),
  complete:() => console.log('End')
  });

