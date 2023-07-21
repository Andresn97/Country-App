import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs';

import { Country } from '../interfaces/country.interface';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';


@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private apiUrl: string = 'https://restcountries.com/v3.1';
  private regions: Region[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  public cacheStore: CacheStore = {
    byCapital: { term: '', countries: [] },
    byCountries: { term: '', countries: [] },
    byRegion: { region: '', countries: [] },
  }

  constructor( private _http: HttpClient ) {
    this.loadFromLocalStorage();
  }

  private saveToLocalStorage(): void {
    localStorage.setItem( 'cacheStore', JSON.stringify(this.cacheStore) );
  }

  private loadFromLocalStorage(): void {
    if ( !localStorage.getItem('cacheStore') ) return;
  
    this.cacheStore = JSON.parse( localStorage.getItem('cacheStore')! );
  }

  private getCountriesRequest( 
    url: string, 
    term: string,
    type: string
  ): Observable<Country[]> {
    return this._http.get<Country[]>( url )
      .pipe(
        catchError( () => of([]) ),
        tap( countries => {
          if ( type === 'country' ) {
            this.cacheStore.byCountries = { term, countries };
          } 
          if ( type === 'capital' ) {
            this.cacheStore.byCapital = { term, countries };
          } 
          if ( type === 'region' ) {
            const region = this.regions.find( region => region === term ) || '';
            this.cacheStore.byRegion = { region, countries };
          }
        }),
        tap( () => this.saveToLocalStorage() )
      );
  }

  searchCountryByAlphaCode( code: string ): Observable<Country | null> {    
    const url: string = `${ this.apiUrl }/alpha/${ code.toUpperCase() }`;
    return this._http.get<Country[]>( url )
      .pipe(
        map( countries => countries.length > 0 ? countries[0] : null ),
        catchError( () => of(null) )
      );
  }

  searchByCapital( term: string ): Observable<Country[]> {
    const url: string = `${ this.apiUrl }/capital/${ term }`;
    return this.getCountriesRequest( url, term, 'capital' );
  }

  searchByCountry( term: string ) {
    const url: string = `${ this.apiUrl }/name/${ term }`;
    return this.getCountriesRequest( url, term, 'country' );
  }

  searchByRegion( term: string ) {
    const url: string = `${ this.apiUrl }/region/${ term }`;
    return this.getCountriesRequest( url, term, 'region' );
  }

}
 