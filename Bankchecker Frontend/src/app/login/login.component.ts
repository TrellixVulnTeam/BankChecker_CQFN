import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HeaderType } from '../enum/header-type.enum';
import { NotificationType } from '../enum/notification-type.enum';
import { User } from '../model/user';
import { AuthenticationService } from '../service/authentication.service';
import { NotificationService } from '../service/notification.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  public loading:boolean=false;
  constructor(private router: Router, private authenticationService: AuthenticationService,
    private notifier: NotificationService) { }
  ngOnInit(): void {
    if (this.authenticationService.isLoggedIn()) {
      this.router.navigateByUrl("/home")
    } else {
      this.router.navigateByUrl("/login");
    }
  }
  public login(user: User): void {
    this.loading=true;
    this.subscriptions.push(
      this.authenticationService.login(user).subscribe(
        (response: HttpResponse<User>) => {
          var token = response.headers.get(HeaderType.JWT_TOKEN);
          this.authenticationService.saveToken(token !== null ? token : "");
          this.authenticationService.addUserToLocalCache(response.body !== null ? response.body : new User)
          this.sendErrorNotification(NotificationType.SUCCESS, "Benvenuto, " + user.username + ".")
          this.router.navigateByUrl("/home")
        },
        (errorResponse: HttpErrorResponse) => {
          this.sendErrorNotification(NotificationType.ERROR, errorResponse.error.message);
        }
      )
    );
  }
  private sendErrorNotification(notificationType: NotificationType, message: string): void {
    if (message) {
      this.notifier.notify(notificationType, message)
    }
    else {
      this.notifier.notify(notificationType, 'An error occurred. Please try again.')
    }
  }
  ngOnDestroy(): void {
    //Metodo per eliminare le subscriptions che si creano quando si fa subscribe
    this.subscriptions.forEach(sub => sub.unsubscribe())
  }
}
