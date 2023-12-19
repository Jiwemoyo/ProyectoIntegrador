import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  user: any; // Asegúrate de que el tipo de user coincida con el tipo devuelto por useAuth()
  allItems = [
    {
      title: 'Usuarios',
      imageUrl: '/assets/users.svg',
      url: '/admin/usuarios',
      forAdmin: true,
      bgColor: '#2196F3', // Azul
      color: 'white',
    },
    {
      title: 'Platillos',
      imageUrl: '/assets/foods.svg',
      url: '/admin/crud',
      forAdmin: true,
      bgColor: '#4CAF50', // Verde
      color: 'white',
    },
    {
      title: 'Ordenes',
      imageUrl: '/assets/orders.svg',
      url: '/admin/ordenes',
      bgColor: '#FFC107', // Amarillo
      color: 'white',
    },
    {
      title: 'Salir',
      imageUrl: '/assets/profile.svg',
      url: '/logout',
      bgColor: '#FF5722', // Naranja
      color: 'white',
    },
  ];
}
