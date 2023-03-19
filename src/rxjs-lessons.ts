import {
  debounce, debounceTime,
  distinctUntilChanged, fromEvent,
  map, Observable, observable, takeUntil
} from "rxjs";


const search$: Observable<Event> = fromEvent<Event>(
  document.getElementById('search') as HTMLInputElement,
  'input'
);
const stop$: Observable<Event> = fromEvent<Event>(
  document.getElementById('stop') as HTMLInputElement,
  'click'
);

/*const search$ = new Observable<Event>(observer => {

  const search = document.getElementById('search');

  if (!search){
    observer.error("Element not found!")
    return;
  }
  search!.addEventListener("input", event => {
    console.log(123)
    observer.next(event);
    observer.complete();
  })
});*/
// VARIANT 1
search$.pipe(
  map(event => {
    return (event.target as HTMLInputElement).value;
  }),
  debounceTime(500),
  map(value => value.length > 3 ? value : '' ),//ждет 500 мс, и только потом считывает значение с инпута
  distinctUntilChanged(), // проверяет изменилось ли значение или нет, если нет значение вперед не проходит
  takeUntil(stop$))
  .subscribe((value)=> {
  console.log(value);
})

// VARIANT 2
/*search$.subscribe( {
  next: value => {
    console.log(value)
  },
  error: err => console.log(err),
  complete:() => console.log('End')
  });*/

