import { Component, OnInit } from '@angular/core';

import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';


@Component({
  selector: 'countries-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: [
  ]
})
export class ByCapitalPageComponent implements OnInit{

  public countries: Country[] = [];
  public isLoading: boolean = false;
  public initialValue: string = '';

  constructor( private _countryService: CountriesService ) {}

  ngOnInit(): void {
    this.countries = this._countryService.cacheStore.byCapital.countries;
    this.initialValue = this._countryService.cacheStore.byCapital.term;
  }

  searchByCapital( term: string ): void {
    if ( term.length > 0 ) {
      this.isLoading = true;
      
      this._countryService.searchByCapital( term )
      .subscribe( countries => {
        this.countries = countries;
        this.isLoading = false;
      });    
    }
  }

}
