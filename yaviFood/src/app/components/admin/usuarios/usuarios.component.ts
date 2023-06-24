import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent{
  users: User[] | undefined;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getAllUsers().subscribe(
      users => {
        this.users = users;
      },
      error => {
        console.log('Error al cargar los usuarios:', error);
      }
    );
  }

  updateUser(user: User) {
    // Lógica para actualizar el usuario, por ejemplo, abrir un formulario de edición
  }

  deleteUser(userId: string) {
    if (confirm('¿Estás seguro de eliminar este usuario?')) {
      this.userService.deleteUser(userId).subscribe(
        () => {
          console.log('Usuario eliminado correctamente');
          this.loadUsers(); // Volver a cargar la lista de usuarios después de eliminar uno
        },
        error => {
          console.log('Error al eliminar el usuario:', error);
        }
      );
    }
  }
}
