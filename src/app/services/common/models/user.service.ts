import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Create_User } from 'src/app/contracts/users/create_user';
import { Create_User_Response } from 'src/app/contracts/users/create_user_response';
import { Observable, firstValueFrom } from 'rxjs';
import { AlertifyMessageType, AlertifyPosition, AlertifyService } from '../alertify.service';
import { Token } from 'src/app/contracts/token/token';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClientService: HttpClientService, private alertify: AlertifyService) { }

  async create(user: Create_User): Promise<Create_User_Response> {
    const observable = this.httpClientService.post<Create_User_Response | Create_User>({
      controller: "users"
    }, user)
    return await firstValueFrom(observable) as Create_User_Response;
  }
  async login(email: string, password: string, callback?: () => void) {
    try {
      const observable: Observable<any | Token> = this.httpClientService.post<any | Token>({
        controller: "users",
        action: "login"
      }, { email, password })
      const token: Token = await firstValueFrom(observable) as Token;
      if (token)
        localStorage.setItem("accessToken", token.accessToken)
      if (callback) {
        callback();
      }
    } catch (error) {

    }
  }
}
