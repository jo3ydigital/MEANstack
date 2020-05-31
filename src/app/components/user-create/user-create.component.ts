import { Router } from '@angular/router';
import { ApiService } from '../../service/api.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})

export class UserCreateComponent implements OnInit {  
  submitted = false;
  UserForm: FormGroup;
  UserProfile: any = ['Super', 'Admin', 'Business', 'Unrestricted', 'Restricted']
  
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private apiService: ApiService
  ) { 
    this.mainForm();
  }

  ngOnInit() { }

  mainForm() {
    this.UserForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      role: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    })
  }

  // Choose role with select dropdown
  updateProfile(e){
    this.UserForm.get('role').setValue(e, {
      onlySelf: true
    })
  }

  // Getter to access form control
  get myForm(){
    return this.UserForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (!this.UserForm.valid) {
      return false;
    } else {
      this.apiService.createUser(this.UserForm.value).subscribe(
        (res) => {
          console.log('User successfully created!')
          this.ngZone.run(() => this.router.navigateByUrl('/user-list'))
        }, (error) => {
          console.log(error);
        });
    }
  }

}
