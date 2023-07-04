import { User } from './../shared/models/user';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
// import { User } from '../shared/models/user';
import { IUserLogin } from '../shared/interfaces/IUseLogin';
import { HttpClient } from '@angular/common/http';
import { USERS_URL, USER_LOGIN_URL, USER_REGISTER_URL } from '../shared/constants/urls';
import { ToastrService } from 'ngx-toastr';
import { IUserRegister } from '../shared/interfaces/IUserRegister';
import { Router } from '@angular/router';


const USER_KEY = 'User';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject =
  new BehaviorSubject<User>(this.getUserFromLocalStorage());
  public userObservable:Observable<User>;
  constructor(private http:HttpClient, private toastrService:ToastrService, private router: Router) {
    this.userObservable = this.userSubject.asObservable();
  }



  public get currentUser():User{
    return this.userSubject.value;
  }
  public get currentUserId(): string {
    return this.currentUser.id;
  }

  login(userLogin: IUserLogin): Observable<User> {
    return this.http.post<User>(USER_LOGIN_URL, userLogin).pipe(
      tap({
        next: (user) => {
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
  
          if (user.isAdmin) {
            // Redireccionar al enlace del panel de control del administrador
            this.router.navigateByUrl('/admin/dashboard');
          } else {
            // Redireccionar al enlace del perfil del cliente
            this.router.navigateByUrl('/');
          }
  
          this.toastrService.success(
            `Hola ${user.name}!`,
          );
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error, 'Inicio de sesión erroneo');
        }
      })
    );
  }
  

register(userRegiser:IUserRegister): Observable<User>{
  return this.http.post<User>(USER_REGISTER_URL, userRegiser).pipe(
    tap({
      next: (user) => {
        this.setUserToLocalStorage(user);
        this.userSubject.next(user);
        this.toastrService.success(
          `Bienvenida a YaviFood ${user.name}`,
          'Registrarse exitoso'
        )
      },
      error: (errorResponse) => {
        this.toastrService.error(errorResponse.error,
          'Registro fallido')
      }
    })
  )
}




  logout(){
    this.userSubject.next(new User());
    localStorage.removeItem(USER_KEY);
    window.location.reload();
  }
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(USERS_URL);
  }

  getUserById(userId: string): Observable<User> {
    const url = `${USERS_URL}/${userId}`;
    return this.http.get<User>(url);
  }

  updateUser(user: User): Observable<User> {
    const url = `${USERS_URL}/${user.id}`;
    return this.http.put<User>(url, user);
  }

  deleteUser(userId: string): Observable<any> {
    const url = `${USERS_URL}/${userId}`;
    return this.http.delete(url);
  }


  private setUserToLocalStorage(user:User){
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  private getUserFromLocalStorage():User{
    const userJson = localStorage.getItem(USER_KEY);
    if(userJson) return JSON.parse(userJson) as User;
    return new User();
  }
}
