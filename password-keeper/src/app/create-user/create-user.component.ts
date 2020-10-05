import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UserServiceService } from '../user-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

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
    this.userService.createUser(this.profileForm.value).subscribe(userData => {
        console.log(userData);
        if(userData['status'] == 'account created')
        {  
            this.successMessage = "account created successfully";
            setInterval(()=>{
                this.router.navigate(['app/user/auth']);
            }, 2000)
        }
        if(userData['status'] == 'failed'){
            this.successMessage = userData['message'];
            return;
        }
        if(userData['status'] == ""){
            this.successMessage = "Server problem";
            return;
        }
    })
  }

}
