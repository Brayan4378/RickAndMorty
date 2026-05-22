import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { RickAndMortyService } from '../../core/services/rick-and-morty.service';
import { Character } from '../../core/models/character.model';
import { Episode } from '../../core/models/episode.model';
import { StatusBadgeComponent } from '../../components/atoms/status-badge/status-badge.component';
import { LoadingSpinnerComponent } from '../../components/atoms/loading-spinner/loading-spinner.component';
import { EpisodeCardComponent } from '../../components/molecules/episode-card/episode-card.component';

@Component({
  selector: 'app-character-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, StatusBadgeComponent, LoadingSpinnerComponent, EpisodeCardComponent],
  template: `
    <div class="detail-container" *ngIf="!loading && character">
      <a routerLink="/characters" class="back-link">&larr; Volver a personajes</a>
      <div class="detail-header">
        <div class="detail-image">
          <img [src]="character.image" [alt]="character.name" />
        </div>
        <div class="detail-info">
          <app-status-badge [status]="character.status"></app-status-badge>
          <h1>{{ character.name }}</h1>
          <div class="info-grid">
            <div class="info-item">
              <span class="info-label">Especie</span>
              <span class="info-value">{{ character.species }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Género</span>
              <span class="info-value">{{ character.gender }}</span>
            </div>
            <div class="info-item" *ngIf="character.type">
              <span class="info-label">Tipo</span>
              <span class="info-value">{{ character.type }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Origen</span>
              <span class="info-value">{{ character.origin.name }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Última ubicación</span>
              <span class="info-value">{{ character.location.name }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Episodios</span>
              <span class="info-value">{{ character.episode.length }} apariciones</span>
            </div>
          </div>
        </div>
      </div>
      <div class="episodes-section" *ngIf="episodes.length > 0">
        <h2>Apariciones en Episodios</h2>
        <div class="episodes-list">
          <app-episode-card *ngFor="let ep of episodes" [episode]="ep"></app-episode-card>
        </div>
      </div>
    </div>
    <app-loading-spinner *ngIf="loading"></app-loading-spinner>
  `,
  styles: [`
    .detail-container { max-width: 1000px; margin: 0 auto; padding: 2rem; }
    .back-link {
      display: inline-flex; color: #64748b; text-decoration: none;
      font-size: 0.9rem; margin-bottom: 2rem; transition: color 0.2s;
    }
    .back-link:hover { color: #39ff14; }
    .detail-header { display: flex; gap: 2.5rem; margin-bottom: 3rem; }
    .detail-image { flex-shrink: 0; }
    .detail-image img {
      width: 300px; height: 300px; border-radius: 20px;
      object-fit: cover; border: 2px solid rgba(255, 255, 255, 0.06);
    }
    .detail-info { flex: 1; }
    .detail-info h1 { color: #f1f5f9; font-size: 2.2rem; font-weight: 700; margin: 12px 0 24px; }
    .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
    .info-item { display: flex; flex-direction: column; gap: 4px; }
    .info-label { color: #64748b; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.5px; }
    .info-value { color: #e2e8f0; font-size: 1rem; font-weight: 500; }
    .episodes-section { margin-top: 1rem; }
    .episodes-section h2 { color: #f1f5f9; font-size: 1.5rem; font-weight: 600; margin: 0 0 1.5rem; }
    .episodes-list { display: flex; flex-direction: column; gap: 10px; }
    @media (max-width: 768px) {
      .detail-header { flex-direction: column; align-items: center; text-align: center; }
      .detail-image img { width: 200px; height: 200px; }
      .info-grid { grid-template-columns: 1fr; }
    }
  `]
})
export class CharacterDetailComponent implements OnInit {
  character: Character | null = null;
  episodes: Episode[] = [];
  loading = true;

  constructor(private route: ActivatedRoute, private api: RickAndMortyService) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.api.getCharacter(id).subscribe({
      next: (char) => { this.character = char; this.loadEpisodes(char.episode); },
      error: () => this.loading = false
    });
  }

  private loadEpisodes(episodeUrls: string[]): void {
    const ids = episodeUrls.map(url => this.api.extractIdFromUrl(url));
    if (ids.length === 1) {
      this.api.getEpisode(ids[0]).subscribe({
        next: (ep) => { this.episodes = [ep]; this.loading = false; },
        error: () => this.loading = false
      });
    } else {
      this.api.getMultipleEpisodes(ids).subscribe({
        next: (eps) => { this.episodes = eps; this.loading = false; },
        error: () => this.loading = false
      });
    }
  }
}
