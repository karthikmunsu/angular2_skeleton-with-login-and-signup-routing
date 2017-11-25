import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {
  public show_login: boolean = true;
  public show_signup: boolean = false;
  public show_forgot: boolean = false;
  public sign_email: any;
  public sign_pwd: any;
  public cnf_pwd: any;
  public errors: any;
  public success: any;

  constructor( private loginService: LoginService) { }

  ngOnInit() {
  }

public show_signup_section() {
 this.show_login = false;
 this.show_signup = true;
 this.reset();
}

public showlogin() {
 this.show_login = true;
 this.show_signup = false;
 this.show_forgot = false;
 this.reset();
}

public forgot() {
 this.show_login = false;
 this.show_signup = false;
 this.show_forgot = true;
 //this.Registered();
}

public login(username, pwd) {
	 this.loginService.authLogin(username, pwd).subscribe(
        (res) => {
        console.log(res);
      }, (err) => {
        //console.log(err);
        this.errors = "username or password is wrong!";
      });
}

public signup(email, pwd, cnfpwd) {
	this.reset();
	let regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
	if(regexp.test(email)) {
		if(cnfpwd !== pwd) {
		  this.errors = "password and cnf-pwd doesnt match.."
		}else {
			this.loginService.authSignup(email, pwd).subscribe(
		        (res) => {
		        console.log(res);
		        this.success = "Registered Sucessfully";
		        this.clearSignup();
		        setInterval(() => { this.success = null;
		        	this.showlogin();  }, 1000 * 3 );
		      }, (err) => {
		        console.log(err._body);
		        this.errors = "email-already-in-use";
		      });
		}
	}else {
		this.errors = "enter a valid email address."
	}
}

public forgetUser(email) {
let regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
	if(regexp.test(email)) {
	this.loginService.authForgot(email).subscribe(
        (res) => {
        console.log(res);
        this.success = "kindly check your email for reset password link."
        setInterval(() => { this.success = null;
        			this.show_forgot = false;
		        	this.showlogin();  }, 1000 * 3 );
      }, (err) => {
        console.log(err);
        this.errors = "email is not present!";
      });
  }else {
    this.errors = "Enter a valid email.";
  }
}

public reset() {
    this.success = null;
	this.errors = null;
}

public clearSignup() {
	this.sign_email = "";
   	this.sign_pwd = "";
	this.cnf_pwd = "";
}

}
