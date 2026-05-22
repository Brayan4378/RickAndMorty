import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MultiverseAccessService } from '../../../core/services/multiverse-access.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <nav class="navbar">
      <a routerLink="/" class="logo">
        <span class="logo-icon">🔬</span>
        <span class="logo-text">Rick<span class="accent">&amp;</span>Morty</span>
      </a>
      <div class="nav-links" [class.open]="menuOpen">
        <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" (click)="menuOpen = false">
          <span class="nav-icon">🏠</span> Inicio
        </a>
        <a routerLink="/characters" routerLinkActive="active" (click)="menuOpen = false">
          <span class="nav-icon">👽</span> Personajes
        </a>
        <a routerLink="/locations" routerLinkActive="active" (click)="menuOpen = false"
           [class.locked]="!isPortalActive">
          <span class="nav-icon">{{ isPortalActive ? '🌍' : '🔒' }}</span> Ubicaciones
          <span class="lock-badge" *ngIf="!isPortalActive">Portal Gun requerido</span>
        </a>
      </div>
      <button class="menu-toggle" (click)="menuOpen = !menuOpen">
        <span [class.open]="menuOpen">&#9776;</span>
      </button>
    </nav>
  `,
  styles: [`
    .navbar {
      position: fixed;
      top: 0; left: 0; right: 0;
      z-index: 1000;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 2rem;
      height: 70px;
      background: rgba(15, 15, 35, 0.85);
      backdrop-filter: blur(20px);
      border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    }
    .logo {
      display: flex;
      align-items: center;
      gap: 10px;
      text-decoration: none;
      font-size: 1.3rem;
      font-weight: 700;
      color: #f1f5f9;
    }
    .logo-icon { font-size: 1.5rem; }
    .accent { color: #39ff14; margin: 0 2px; }
    .nav-links {
      display: flex;
      align-items: center;
      gap: 4px;
    }
    .nav-links a {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 16px;
      color: #94a3b8;
      text-decoration: none;
      font-size: 0.9rem;
      font-weight: 500;
      border-radius: 10px;
      transition: all 0.3s ease;
      position: relative;
    }
    .nav-links a:hover {
      color: #e2e8f0;
      background: rgba(255, 255, 255, 0.05);
    }
    .nav-links a.active {
      color: #39ff14;
      background: rgba(57, 255, 20, 0.1);
    }
    .nav-icon { font-size: 1.1rem; }
    .locked { opacity: 0.6; }
    .lock-badge {
      position: absolute;
      top: -8px; right: -10px;
      background: rgba(255, 152, 0, 0.9);
      color: #fff;
      font-size: 0.55rem;
      padding: 2px 6px;
      border-radius: 4px;
      white-space: nowrap;
      font-weight: 600;
    }
    .menu-toggle {
      display: none;
      background: none;
      border: none;
      color: #e2e8f0;
      font-size: 1.5rem;
      cursor: pointer;
      padding: 8px;
    }
    @media (max-width: 768px) {
      .navbar { padding: 0 1rem; }
      .menu-toggle { display: block; }
      .nav-links {
        position: fixed;
        top: 70px; left: 0; right: 0;
        background: rgba(15, 15, 35, 0.98);
        backdrop-filter: blur(20px);
        flex-direction: column;
        padding: 1rem;
        gap: 4px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        transform: translateY(-100%);
        opacity: 0;
        pointer-events: none;
        transition: all 0.3s ease;
      }
      .nav-links.open {
        transform: translateY(0);
        opacity: 1;
        pointer-events: all;
      }
      .nav-links a { width: 100%; padding: 12px 16px; }
    }
  `]
})
export class NavbarComponent implements OnInit {
  menuOpen = false;
  isPortalActive = false;

  constructor(private multiverseService: MultiverseAccessService) {}

  ngOnInit(): void {
    this.multiverseService.portalGunActivated$.subscribe(
      active => this.isPortalActive = active
    );
  }
}
