import { Component, OnInit } from '@angular/core';

import { Country } from '../../interfaces/country.interface';
import { CountriesService } from '../../services/countries.service';
import { Region } from '../../interfaces/region.type';


@Component({
  selector: 'countries-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: [
  ]
})
export class ByRegionPageComponent implements OnInit{

  public countries: Country[] = [];
  public regions: Region[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania']; 
  public selectedRegion: Region = '';
  public isLoading: boolean = false;

  constructor( private _countriesService: CountriesService ) {}

  ngOnInit(): void {
    this.countries = this._countriesService.cacheStore.byRegion.countries;
    this.selectedRegion = this._countriesService.cacheStore.byRegion.region;
  }

  searchByRegion( region: Region ): void {

    this.selectedRegion = region;
    this.isLoading = true;

    this._countriesService.searchByRegion( region )
    .subscribe( countries => {
      this.countries = countries;
      this.isLoading = false;
    });    
  }

}
