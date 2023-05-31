import { User } from './../shared/models/user';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
// import { User } from '../shared/models/user';
import { IUserLogin } from '../shared/interfaces/IUseLogin';
import { HttpClient } from '@angular/common/http';
import { USER_LOGIN_URL, USER_REGISTER_URL } from '../shared/constants/urls';
import { ToastrService } from 'ngx-toastr';
import { IUserRegister } from '../shared/interfaces/IUseRegister';

const USER_KEY = 'User';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject =
  new BehaviorSubject<User>(this.getUserFromLocalStorage());
  public userObservable:Observable<User>;
  constructor(private http:HttpClient, private toastrService:ToastrService) {
    this.userObservable = this.userSubject.asObservable();
  }

  login(userLogin:IUserLogin):Observable<User>{
      return this.http.post<User>(USER_LOGIN_URL, userLogin).pipe(
        tap({
          next: (user) =>{
            this.setUserToLocalStore(user);
            this.userSubject.next(user);
            this.toastrService.success(
              `Bienvenido a YaviFood ${user.name}!`,
              'Inicio de sesión exitosa'
            )
          },
          error: (errorResponse) =>{
            this.toastrService.error(errorResponse.error, 'Inicio de sesión erroneo');

          }

        })
      );
  }
register(userRegister:IUserRegister): Observable<User>{
  return this.http.post<User>(USER_REGISTER_URL, userRegister).pipe(
    tap({
      next:(user) =>{
        this.setUserToLocalStore(user);
        this.userSubject.next(user);
        this.toastrService.success(
          `Bienvenido a YaviFood ${user.name}!`,
           'Registro exitosamente'
        )
      },
      error: (errorResponse) =>{
        this.toastrService.error(errorResponse.error, 'Registro erroneo')
      }
    })
  )
}




  logout(){
    this.userSubject.next(new User());
    localStorage.removeItem(USER_KEY);
    window.location.reload();
  }

  private setUserToLocalStore(user:User){
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  private getUserFromLocalStorage():User{
    const userJson = localStorage.getItem(USER_KEY);
    if(userJson) return JSON.parse(userJson) as User;
    return new User();
  }
}
