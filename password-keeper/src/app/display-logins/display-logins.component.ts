import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../user-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-display-logins',
  templateUrl: './display-logins.component.html',
  styleUrls: ['./display-logins.component.css']
})
export class DisplayLoginsComponent implements OnInit {

  constructor(private userService : UserServiceService, private router : Router) { }

  userId : number;
  successMessage : String;

  loginData = [];

  ngOnInit(): void {
        debugger;
        this.userId = parseInt(sessionStorage.getItem('userId'));
        console.log(this.userId);
        this.userService.getSites(this.userId).subscribe(
            websiteData => {
                console.log(websiteData);
                this.loginData = websiteData['message'];
                if(websiteData['status'] == 'failed'){
                    this.successMessage = websiteData['message'];
                }
                if(websiteData['status'] == 'success'){
                    this.loginData = websiteData['message'];
                    console.log(this.loginData);
                }
                if(websiteData['status'] == ''){
                    this.successMessage = "Server issue";
                    return;
                }

            }
        )
    }



}
