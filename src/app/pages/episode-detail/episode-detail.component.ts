import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { RickAndMortyService } from '../../core/services/rick-and-morty.service';
import { Episode } from '../../core/models/episode.model';
import { Character } from '../../core/models/character.model';
import { CharacterCardComponent } from '../../components/molecules/character-card/character-card.component';
import { LoadingSpinnerComponent } from '../../components/atoms/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-episode-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, CharacterCardComponent, LoadingSpinnerComponent],
  template: `
    <div class="detail-container" *ngIf="!loading && episode">
      <a routerLink="/episodes" class="back-link">&larr; Volver a episodios</a>
      <div class="episode-hero">
        <div class="episode-code-big">{{ episode.episode }}</div>
        <h1>{{ episode.name }}</h1>
        <div class="episode-meta">
          <span class="meta-item">📅 {{ episode.air_date }}</span>
          <span class="meta-item">👥 {{ episode.characters.length }} personajes</span>
        </div>
      </div>
      <div class="characters-section" *ngIf="characters.length > 0">
        <h2>Personajes en este episodio</h2>
        <div class="characters-grid">
          <app-character-card *ngFor="let char of characters" [character]="char"></app-character-card>
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
    .episode-hero {
      text-align: center; margin-bottom: 3rem; padding: 3rem 2rem;
      background: rgba(255, 255, 255, 0.02);
      border: 1px solid rgba(255, 255, 255, 0.06); border-radius: 20px;
    }
    .episode-code-big {
      display: inline-block;
      background: linear-gradient(135deg, #00b0c8, #39ff14);
      color: #0f0f23; font-weight: 800; font-size: 1.2rem;
      padding: 12px 24px; border-radius: 12px; margin-bottom: 1rem;
    }
    .episode-hero h1 { color: #f1f5f9; font-size: 2.5rem; font-weight: 700; margin: 0 0 1rem; }
    .episode-meta { display: flex; justify-content: center; gap: 2rem; }
    .meta-item { color: #94a3b8; font-size: 1rem; }
    .characters-section h2 { color: #f1f5f9; font-size: 1.5rem; font-weight: 600; margin: 0 0 1.5rem; }
    .characters-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 16px;
    }
    @media (max-width: 768px) {
      .episode-hero h1 { font-size: 1.8rem; }
      .episode-meta { flex-direction: column; gap: 0.5rem; }
    }
  `]
})
export class EpisodeDetailComponent implements OnInit {
  episode: Episode | null = null;
  characters: Character[] = [];
  loading = true;

  constructor(private route: ActivatedRoute, private api: RickAndMortyService) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.api.getEpisode(id).subscribe({
      next: (ep) => { this.episode = ep; this.loadCharacters(ep.characters); },
      error: () => this.loading = false
    });
  }

  private loadCharacters(characterUrls: string[]): void {
    const ids = characterUrls.map(url => this.api.extractIdFromUrl(url));
    if (ids.length === 1) {
      this.api.getCharacter(ids[0]).subscribe({
        next: (char) => { this.characters = [char]; this.loading = false; },
        error: () => this.loading = false
      });
    } else {
      this.api.getMultipleCharacters(ids).subscribe({
        next: (chars) => { this.characters = chars; this.loading = false; },
        error: () => this.loading = false
      });
    }
  }
}
