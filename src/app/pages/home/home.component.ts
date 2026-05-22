import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { RickAndMortyService } from '../../core/services/rick-and-morty.service';
import { MultiverseAccessService } from '../../core/services/multiverse-access.service';
import { Character } from '../../core/models/character.model';
import { CharacterCardComponent } from '../../components/molecules/character-card/character-card.component';
import { LoadingSpinnerComponent } from '../../components/atoms/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, CharacterCardComponent, LoadingSpinnerComponent],
  template: `
    <section class="hero">
      <div class="hero-bg"></div>
      <div class="hero-content">
        <h1 class="hero-title">
          Explora el
          <span class="gradient-text">Multiverso</span>
        </h1>
        <p class="hero-subtitle">
          Descubre personajes, episodios y ubicaciones del universo de Rick and Morty.
          Consume datos en tiempo real desde la API oficial.
        </p>
        <div class="hero-actions">
          <a routerLink="/characters" class="btn btn-primary">👽 Ver Personajes</a>
          <button class="btn btn-portal" [class.active]="isPortalActive" (click)="togglePortalGun()">
            {{ isPortalActive ? '✅ Portal Gun Activo' : '🔫 Activar Portal Gun' }}
          </button>
        </div>
        <p class="portal-hint" *ngIf="showPortalHint">
          ⚠️ Debes activar el Portal Gun para acceder a las Ubicaciones del multiverso.
        </p>
      </div>
      <div class="hero-portal">
        <div class="portal" [class.active]="isPortalActive">
          <div class="portal-ring ring-1"></div>
          <div class="portal-ring ring-2"></div>
          <div class="portal-ring ring-3"></div>
          <div class="portal-center"></div>
        </div>
      </div>
    </section>

    <section class="featured">
      <div class="section-header">
        <h2>Personajes Destacados</h2>
        <a routerLink="/characters" class="see-all">Ver todos &rarr;</a>
      </div>
      <app-loading-spinner *ngIf="loading"></app-loading-spinner>
      <div class="characters-grid" *ngIf="!loading">
        <app-character-card *ngFor="let char of featuredCharacters" [character]="char"></app-character-card>
      </div>
    </section>

    <section class="stats">
      <div class="stat-card">
        <div class="stat-number">826+</div>
        <div class="stat-label">Personajes</div>
      </div>
      <div class="stat-card">
        <div class="stat-number">126+</div>
        <div class="stat-label">Ubicaciones</div>
      </div>
      <div class="stat-card">
        <div class="stat-number">51</div>
        <div class="stat-label">Episodios</div>
      </div>
    </section>
  `,
  styles: [`
    .hero {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: space-between;
      min-height: calc(100vh - 70px);
      padding: 2rem;
      overflow: hidden;
    }
    .hero-bg {
      position: absolute;
      inset: 0;
      background:
        radial-gradient(ellipse at 20% 50%, rgba(57, 255, 20, 0.06) 0%, transparent 50%),
        radial-gradient(ellipse at 80% 50%, rgba(0, 176, 200, 0.06) 0%, transparent 50%);
    }
    .hero-content { position: relative; z-index: 1; max-width: 600px; }
    .hero-title {
      font-size: 3.5rem;
      font-weight: 800;
      color: #f1f5f9;
      line-height: 1.1;
      margin: 0 0 1.5rem;
    }
    .gradient-text {
      background: linear-gradient(135deg, #39ff14, #00b0c8);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    .hero-subtitle {
      color: #94a3b8;
      font-size: 1.15rem;
      line-height: 1.7;
      margin: 0 0 2rem;
    }
    .hero-actions { display: flex; gap: 12px; flex-wrap: wrap; }
    .btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 14px 28px;
      border-radius: 12px;
      font-size: 1rem;
      font-weight: 600;
      text-decoration: none;
      border: none;
      cursor: pointer;
      transition: all 0.3s ease;
      font-family: 'Outfit', sans-serif;
    }
    .btn-primary {
      background: linear-gradient(135deg, #39ff14, #00b0c8);
      color: #0f0f23;
    }
    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(57, 255, 20, 0.3);
    }
    .btn-portal {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.15);
      color: #e2e8f0;
    }
    .btn-portal:hover {
      border-color: rgba(57, 255, 20, 0.4);
      background: rgba(57, 255, 20, 0.05);
    }
    .btn-portal.active {
      border-color: #39ff14;
      color: #39ff14;
      background: rgba(57, 255, 20, 0.1);
    }
    .portal-hint {
      color: #ff9800;
      font-size: 0.85rem;
      margin-top: 1rem;
      animation: fadeIn 0.5s ease;
    }
    .hero-portal { position: relative; z-index: 1; }
    .portal { position: relative; width: 300px; height: 300px; }
    .portal-ring {
      position: absolute;
      border-radius: 50%;
      border: 3px solid transparent;
      animation: portalSpin 4s linear infinite;
      opacity: 0.3;
      transition: opacity 0.5s;
    }
    .portal.active .portal-ring { opacity: 1; }
    .ring-1 { inset: 0; border-top-color: #39ff14; border-right-color: #39ff14; }
    .ring-2 {
      inset: 30px;
      border-bottom-color: #00b0c8;
      border-left-color: #00b0c8;
      animation-duration: 3s;
      animation-direction: reverse;
    }
    .ring-3 {
      inset: 60px;
      border-top-color: #97ce4c;
      border-right-color: #97ce4c;
      animation-duration: 2s;
    }
    .portal-center {
      position: absolute;
      inset: 90px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(57, 255, 20, 0.1), rgba(0, 176, 200, 0.05));
      transition: all 0.5s;
    }
    .portal.active .portal-center {
      background: radial-gradient(circle, rgba(57, 255, 20, 0.4), rgba(0, 176, 200, 0.2));
      box-shadow: 0 0 60px rgba(57, 255, 20, 0.3);
    }
    @keyframes portalSpin { to { transform: rotate(360deg); } }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .featured {
      padding: 4rem 2rem;
      max-width: 1280px;
      margin: 0 auto;
    }
    .section-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 2rem;
    }
    .section-header h2 {
      color: #f1f5f9;
      font-size: 1.8rem;
      font-weight: 700;
      margin: 0;
    }
    .see-all {
      color: #39ff14;
      text-decoration: none;
      font-size: 0.9rem;
      font-weight: 500;
      transition: all 0.2s;
    }
    .characters-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
      gap: 20px;
    }
    .stats {
      display: flex;
      justify-content: center;
      gap: 2rem;
      padding: 3rem 2rem 5rem;
      max-width: 800px;
      margin: 0 auto;
    }
    .stat-card {
      text-align: center;
      padding: 2rem;
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.06);
      border-radius: 16px;
      flex: 1;
      transition: all 0.3s ease;
    }
    .stat-card:hover {
      border-color: rgba(57, 255, 20, 0.2);
      transform: translateY(-4px);
    }
    .stat-number {
      font-size: 2.5rem;
      font-weight: 800;
      background: linear-gradient(135deg, #39ff14, #00b0c8);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    .stat-label { color: #64748b; font-size: 0.9rem; margin-top: 4px; }
    @media (max-width: 768px) {
      .hero { flex-direction: column; text-align: center; padding-top: 2rem; }
      .hero-title { font-size: 2.5rem; }
      .hero-actions { justify-content: center; }
      .portal { width: 200px; height: 200px; }
      .ring-2 { inset: 20px; }
      .ring-3 { inset: 40px; }
      .portal-center { inset: 60px; }
      .stats { flex-direction: column; gap: 1rem; }
    }
  `]
})
export class HomeComponent implements OnInit {
  featuredCharacters: Character[] = [];
  loading = true;
  isPortalActive = false;
  showPortalHint = false;

  constructor(
    private api: RickAndMortyService,
    private multiverseService: MultiverseAccessService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.api.getCharacters(1).subscribe({
      next: (res) => {
        this.featuredCharacters = res.results.slice(0, 8);
        this.loading = false;
      },
      error: () => this.loading = false
    });

    this.multiverseService.portalGunActivated$.subscribe(
      active => this.isPortalActive = active
    );

    this.route.queryParams.subscribe(params => {
      if (params['portalRequired']) {
        this.showPortalHint = true;
      }
    });
  }

  togglePortalGun(): void {
    if (this.isPortalActive) {
      this.multiverseService.deactivatePortalGun();
    } else {
      this.multiverseService.activatePortalGun();
      this.showPortalHint = false;
    }
  }
}
