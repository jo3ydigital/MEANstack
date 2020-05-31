import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';

// Search (user defined)
import { SearchService } from '../../service/search.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})

export class UserListComponent implements OnInit {
  
  User: any = [];
  res: any;  // Property for our submitted forms
  show_db_data: boolean = true;

  // Search (user defined)
  search_subscription;
  searchTerm$: any;
  sField: any = 'name';
  search_results_count: number = 1;

  constructor(private apiService: ApiService, private searchService: SearchService) { 
    this.readUser();
  }

  ngOnInit() { }

  getSearchField(val) {
    this.sField = ''; this.sField = val;
  }

  searchUser() {
    let obj = JSON;
    obj['sterms'] = this.searchTerm$;
    obj['sField'] = this.sField;
    let body = obj;

    this.search_subscription = this.searchService.searchEntries( body ).subscribe((data: any) => {
      if(data.length === 0) {
        this.res = [];
        this.show_db_data = false;
        this.search_results_count = 0;
      } else {
        this.res = data;
        this.User = data;
        this.show_db_data = true;
        this.search_results_count = data.length;
      }
    })
  }

  readUser(){
    this.apiService.getUsers().subscribe((data) => {
      this.User = data;
    })    
  }

  removeUser(User, index) {
    if(window.confirm('Are you sure?')) {
        this.apiService.deleteUser(User._id).subscribe((data) => {
          this.User.splice(index, 1);
        }
      )    
    }
  }

}