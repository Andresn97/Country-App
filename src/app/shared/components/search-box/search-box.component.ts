import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';


@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: [
  ]
})
export class SearchBoxComponent implements OnInit, OnDestroy{

  private debouncer: Subject<string> = new Subject<string>;
  private debouncerSuscription?: Subscription;

  @Input()
  public placeholder!: string;

  @Input()
  public initialValue: string = '';

  @Output() 
  public onDebounce: EventEmitter<string> = new EventEmitter<string>();

  ngOnInit(): void {
    if ( !this.placeholder ) {
      throw new Error('Placeholder is necessary to use this component');
    }

    this.debouncerSuscription = this.debouncer
      .pipe(
        debounceTime(500)
      )
      .subscribe( value => {
       this.onDebounce.emit( value );
    });
  }

  ngOnDestroy(): void {
    this.debouncerSuscription?.unsubscribe();
  }

  onKeyPress( searchTerm: string ) {
    this.debouncer.next( searchTerm );
  }

}
