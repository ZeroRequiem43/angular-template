import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-wrapper',
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  template: `
    <header class="navbar">
      <nav class="nav-links">
        <a routerLink="/orders" routerLinkActive="active">
          Дашборд заказов
        </a>
        <a routerLink="/users" routerLinkActive="active"> Пользователи </a>
      </nav>
    </header>

    <div class="body">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [
    `
      .navbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 24px;
        height: 60px;
        background-color: #1976d2;
        color: white;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }

      .nav-links {
        display: flex;
        gap: 16px;
      }

      .nav-links a {
        color: rgba(255, 255, 255, 0.8);
        text-decoration: none;
        padding: 8px 12px;
        border-radius: 4px;
        transition: all 0.2s ease;
        font-size: 0.95rem;
      }

      .nav-links a:hover {
        background-color: rgba(255, 255, 255, 0.1);
        color: white;
      }

      .nav-links a.active {
        background-color: rgba(255, 255, 255, 0.2);
        color: white;
        font-weight: 500;
      }
    `,
  ],
})
export class WrapperComponent {}
