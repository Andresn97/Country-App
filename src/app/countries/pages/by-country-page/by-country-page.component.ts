import { Component, OnInit } from '@angular/core';

import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';


@Component({
  selector: 'country-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: [
  ]
})
export class ByCountryPageComponent implements OnInit{

  public countries: Country[] = [];
  public isLoading: boolean = false;
  public initialValue: string = '';

  constructor( private _countriesService: CountriesService ) {}

  ngOnInit(): void {
    this.countries = this._countriesService.cacheStore.byCountries.countries;
    this.initialValue = this._countriesService.cacheStore.byCountries.term;
  }

  searchByCountry( term: string ): void {
    if ( term.length > 0 ) {
      this.isLoading = true;

      this._countriesService.searchByCountry( term )
      .subscribe( countries => {
        this.countries = countries;
        this.isLoading = false;
      });    
    }  
  }

}
