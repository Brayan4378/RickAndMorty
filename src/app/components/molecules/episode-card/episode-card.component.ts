import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Episode } from '../../../core/models/episode.model';

@Component({
  selector: 'app-episode-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <a [routerLink]="['/episodes', episode.id]" class="episode-card">
      <div class="episode-code">{{ episode.episode }}</div>
      <div class="episode-info">
        <h3 class="episode-name">{{ episode.name }}</h3>
        <p class="episode-date">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
            <line x1="16" y1="2" x2="16" y2="6"/>
            <line x1="8" y1="2" x2="8" y2="6"/>
            <line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
          {{ episode.air_date }}
        </p>
        <p class="episode-chars">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
          </svg>
          {{ episode.characters.length }} personajes
        </p>
      </div>
      <div class="arrow">&rarr;</div>
    </a>
  `,
  styles: [`
    .episode-card {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 16px 20px;
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.06);
      border-radius: 14px;
      text-decoration: none;
      transition: all 0.3s ease;
      cursor: pointer;
    }
    .episode-card:hover {
      border-color: rgba(0, 176, 200, 0.3);
      background: rgba(255, 255, 255, 0.05);
      transform: translateX(4px);
      box-shadow: 0 4px 20px rgba(0, 176, 200, 0.1);
    }
    .episode-code {
      background: linear-gradient(135deg, #00b0c8, #39ff14);
      color: #0f0f23;
      font-weight: 700;
      font-size: 0.85rem;
      padding: 10px 14px;
      border-radius: 10px;
      white-space: nowrap;
      min-width: 70px;
      text-align: center;
    }
    .episode-info { flex: 1; min-width: 0; }
    .episode-name {
      color: #f1f5f9;
      font-size: 1rem;
      font-weight: 600;
      margin: 0 0 6px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .episode-date, .episode-chars {
      color: #64748b;
      font-size: 0.8rem;
      margin: 0 0 2px;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .episode-chars svg { color: #00b0c8; }
    .episode-date svg { color: #97ce4c; }
    .arrow {
      color: #475569;
      font-size: 1.2rem;
      transition: all 0.3s ease;
    }
    .episode-card:hover .arrow {
      color: #39ff14;
      transform: translateX(4px);
    }
  `]
})
export class EpisodeCardComponent {
  @Input({ required: true }) episode!: Episode;
}
