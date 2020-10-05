import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl } from '@angular/forms';
import { UserServiceService } from '../user-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService : UserServiceService, 
    private router : Router) { }

  ngOnInit(): void {
  }

  profileForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
  successMessage = "";

  onSubmit(){
    console.log(this.profileForm.value);
    debugger;
    this.userService.authUser(this.profileForm.value).subscribe(authData => {
        console.log(authData);

        if(authData['status'] == 'success'){
            
              debugger;
              sessionStorage.setItem('userId', authData['userId']);
              this.successMessage = "You have logged in successfully, proceed to Add login";
        }
        if(authData['status'] == 'failed'){
            this.successMessage = authData['message'];
            return;
        }


    })
    
  }

}
