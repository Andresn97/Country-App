import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { Country } from '../interfaces/country.interface';


@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private apiUrl: string = 'https://restcountries.com/v3.1';

  constructor( private _http: HttpClient ) { }

  searchByCapital( term: string ): Observable<Country[]> {
    const url: string = `${ this.apiUrl }/capital/${ term }`;
    return this._http.get<Country[]>( url )
    .pipe(
      catchError( () => of([]) )
    );
  }

  searchByCountry( term: string ) {}

}
 