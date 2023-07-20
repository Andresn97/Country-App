import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: [
  ]
})
export class SearchBoxComponent implements OnInit{

  @Input()
  public placeholder!: string;

  @Output() 
  public onValue: EventEmitter<string> = new EventEmitter<string>();


  ngOnInit(): void {
    if ( !this.placeholder ) 
      throw new Error('Placeholder is necessary to use this component');
  }

  emitValue( value: string ): void {
    this.onValue.emit( value );
  }

}
