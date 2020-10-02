import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UserServiceService } from '../user-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-website-logins',
  templateUrl: './website-logins.component.html',
  styleUrls: ['./website-logins.component.css']
})
export class WebsiteLoginsComponent implements OnInit {

  constructor(private userService : UserServiceService, 
        private router : Router
    ) { }

  successMessage:String = "";

  userId:number;
  ngOnInit(): void {
    this.userId = parseInt(sessionStorage.getItem('userId'));
  }

  profileForm = new FormGroup({
    website: new FormControl(''),
    username: new FormControl(''),
    password: new FormControl(''),
  });

  loginData = [];

  onSubmit(){
      console.log(this.userId)
    this.userService.getLogins(this.userId, this.profileForm.value).subscribe(
            getData => {
                console.log(getData);
                if(getData['status'] == 'success'){
                    this.successMessage = "new login created";
                }
            })
  }


}
