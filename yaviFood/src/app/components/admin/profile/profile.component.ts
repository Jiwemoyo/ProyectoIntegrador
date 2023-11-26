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
      title: 'Orders',
      imageUrl: '/assets/orders.svg',
      url: '/orders',
      bgColor: '#ec407a',
      color: 'white',
    },
    {
      title: 'Profile',
      imageUrl: '/assets/profile.svg',
      url: '/profile',
      bgColor: '#1565c0',
      color: 'white',
    },
    {
      title: 'Users',
      imageUrl: '/assets/users.svg',
      url: '/admin/users',
      forAdmin: true,
      bgColor: '#00bfa5',
      color: 'white',
    },
    {
      title: 'Foods',
      imageUrl: '/assets/foods.svg',
      url: '/admin/foods',
      forAdmin: true,
      bgColor: '#e040fb',
      color: 'white',
    },
  ];
}
