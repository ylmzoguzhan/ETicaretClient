import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Create_User } from 'src/app/contracts/users/create_user';
import { Create_User_Response } from 'src/app/contracts/users/create_user_response';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClientService: HttpClientService) { }

  async create(user: Create_User): Promise<Create_User_Response> {
    const observable = this.httpClientService.post<Create_User_Response | Create_User>({
      controller: "users"
    }, user)
    return await firstValueFrom(observable) as Create_User_Response;
  }
  async login(email: string, password: string, callback?: () => void) {

    try {
      const observable = this.httpClientService.post({
        controller: "users",
        action: "login"
      }, { email, password })
      await firstValueFrom(observable)
      if (callback) {
        callback();
      }
    } catch (error) {

    }
  }
}
