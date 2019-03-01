import { Component, OnInit } from '@angular/core';

import { GitSearchService } from '../git-search.service';

import { GitSearch } from '../git-search';

@Component({
  selector: 'app-git-search',
  templateUrl: './git-search.component.html',
  styleUrls: ['./git-search.component.css']
})
export class GitSearchComponent implements OnInit {
  // When you declare variable types above a constructor, TypeScript automatically creates a variable scoped to this.
  searchResults: GitSearch;

  constructor(private gitSearchService: GitSearchService) { }

  ngOnInit() {
    this.gitSearchService.gitSearch('angular').then((response) => {
      this.searchResults = response;
    }, (error) => {
      alert("Error: " + error.statusText)
    });
  }

  gitSearch = (query: string) => {
    this.gitSearchService.gitSearch(query).then((response) => {
      this.searchResults = response;
    }, (error) => {
      alert("Error: " + error.statusText)
    });
  }

}
