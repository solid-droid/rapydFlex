import { Component, OnInit } from '@angular/core';
import { GetDataService } from 'src/app/services/get-data/get-data.service';
import {SocialAuthService, GoogleLoginProvider} from 'angularx-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private readonly getData : GetDataService,
    private authService: SocialAuthService,
  ) { }

  ngOnInit(): void {

  }

  hidePopup(){
//
  }

  async signInWithGoogle() {
      this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(res => {
        if(res.email && res.email.includes('@')){
          this.getData.setUser(res.email);
          this.getData.showLogin = false;
        }
        this.hidePopup();
      }).catch(() => { 
        alert('something went wrong. please try again.');
       });

  }


}
