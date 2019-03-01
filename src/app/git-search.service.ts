import { Injectable } from '@angular/core';
import { GitSearch } from './git-search';
import { HttpClient } from '@angular/common/http';

//we will import a feature from RxJS will allow us to convert the Observable emitted by the HttpClient into a Promise.
//As of rxjs 5.5.0-beta.5+ the toPromise method is now a permanent method of Observable. You don't need to import it anymore
//import 'rxjs/add/operator/toPromise';



@Injectable({
  providedIn: 'root'
})
export class GitSearchService {
  // Caching 
  cachedValues: Array<{
    [query: string]: GitSearch
  }> = [];


  constructor(private http: HttpClient) {}

  // Prepare a method to be used within our service to access the GitHub API, and set up caching within that method.
  gitSearch = (query: string): Promise<GitSearch> => {
    let promise = new Promise<GitSearch> ((resolve, reject) => {
      if (this.cachedValues[query]) {
        resolve(this.cachedValues[query]);
      }
      else {
        this.http.get('https://api.github.com/search/repositories?q=' + query)
        .toPromise()
        .then((response) => {
          resolve(response as GitSearch);
        }, (error) => {
          reject(error);
        });
      }
    }); 
    return promise;
  }


}
