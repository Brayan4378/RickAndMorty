import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { RickAndMortyService } from '../../core/services/rick-and-morty.service';
import { Location } from '../../core/models/location.model';
import { Character } from '../../core/models/character.model';
import { CharacterCardComponent } from '../../components/molecules/character-card/character-card.component';
import { LoadingSpinnerComponent } from '../../components/atoms/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-location-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, CharacterCardComponent, LoadingSpinnerComponent],
  template: `
    <div class="detail-container" *ngIf="!loading && location">
      <a routerLink="/locations" class="back-link">&larr; Volver a ubicaciones</a>
      <div class="location-hero">
        <div class="location-icon-big">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="64" height="64">
            <circle cx="12" cy="12" r="10"/>
            <path d="M2 12h20"/>
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
          </svg>
        </div>
        <h1>{{ location.name }}</h1>
        <div class="location-meta">
          <span class="meta-tag type">{{ location.type }}</span>
          <span class="meta-tag dimension">{{ location.dimension }}</span>
        </div>
        <p class="residents-info">👥 {{ location.residents.length }} residentes</p>
      </div>
      <div class="residents-section" *ngIf="residents.length > 0">
        <h2>Residentes</h2>
        <div class="residents-grid">
          <app-character-card *ngFor="let char of residents" [character]="char"></app-character-card>
        </div>
      </div>
    </div>
    <app-loading-spinner *ngIf="loading"></app-loading-spinner>
  `,
  styles: [`
    .detail-container { max-width: 1280px; margin: 0 auto; padding: 2rem; }
    .back-link {
      display: inline-flex; color: #64748b; text-decoration: none;
      font-size: 0.9rem; margin-bottom: 2rem; transition: color 0.2s;
    }
    .back-link:hover { color: #39ff14; }
    .location-hero {
      text-align: center; margin-bottom: 3rem; padding: 3rem 2rem;
      background: rgba(255, 255, 255, 0.02);
      border: 1px solid rgba(255, 255, 255, 0.06); border-radius: 20px;
    }
    .location-icon-big { color: #97ce4c; margin-bottom: 1rem; }
    .location-hero h1 { color: #f1f5f9; font-size: 2.5rem; font-weight: 700; margin: 0 0 1rem; }
    .location-meta { display: flex; justify-content: center; gap: 10px; margin-bottom: 1rem; }
    .meta-tag { font-size: 0.85rem; padding: 6px 14px; border-radius: 8px; font-weight: 500; }
    .type { background: rgba(0, 176, 200, 0.15); color: #00b0c8; }
    .dimension { background: rgba(151, 206, 76, 0.15); color: #97ce4c; }
    .residents-info { color: #94a3b8; font-size: 1rem; margin: 0; }
    .residents-section h2 { color: #f1f5f9; font-size: 1.5rem; font-weight: 600; margin: 0 0 1.5rem; }
    .residents-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 16px;
    }
    @media (max-width: 768px) { .location-hero h1 { font-size: 1.8rem; } }
  `]
})
export class LocationDetailComponent implements OnInit {
  location: Location | null = null;
  residents: Character[] = [];
  loading = true;

  constructor(private route: ActivatedRoute, private api: RickAndMortyService) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.api.getLocation(id).subscribe({
      next: (loc) => { this.location = loc; this.loadResidents(loc.residents); },
      error: () => this.loading = false
    });
  }

  private loadResidents(residentUrls: string[]): void {
    if (residentUrls.length === 0) { this.loading = false; return; }
    const ids = residentUrls.slice(0, 20).map(url => this.api.extractIdFromUrl(url));
    if (ids.length === 1) {
      this.api.getCharacter(ids[0]).subscribe({
        next: (char) => { this.residents = [char]; this.loading = false; },
        error: () => this.loading = false
      });
    } else {
      this.api.getMultipleCharacters(ids).subscribe({
        next: (chars) => { this.residents = chars; this.loading = false; },
        error: () => this.loading = false
      });
    }
  }
}
