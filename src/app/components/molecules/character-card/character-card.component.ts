import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Character } from '../../../core/models/character.model';
import { StatusBadgeComponent } from '../../atoms/status-badge/status-badge.component';

@Component({
  selector: 'app-character-card',
  standalone: true,
  imports: [CommonModule, RouterLink, StatusBadgeComponent],
  template: `
    <a [routerLink]="['/characters', character.id]" class="card">
      <div class="card-image">
        <img [src]="character.image" [alt]="character.name" loading="lazy" />
        <div class="card-overlay">
          <app-status-badge [status]="character.status"></app-status-badge>
        </div>
      </div>
      <div class="card-body">
        <h3 class="card-title">{{ character.name }}</h3>
        <p class="card-info">
          <span class="species">{{ character.species }}</span>
          <span class="separator">&bull;</span>
          <span class="gender">{{ character.gender }}</span>
        </p>
        <p class="card-location">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
          {{ character.location.name }}
        </p>
      </div>
    </a>
  `,
  styles: [`
    .card {
      display: block;
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.06);
      border-radius: 16px;
      overflow: hidden;
      text-decoration: none;
      transition: all 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      cursor: pointer;
    }
    .card:hover {
      transform: translateY(-6px);
      border-color: rgba(57, 255, 20, 0.3);
      box-shadow: 0 12px 40px rgba(57, 255, 20, 0.1), 0 4px 12px rgba(0, 0, 0, 0.3);
    }
    .card-image {
      position: relative;
      aspect-ratio: 1;
      overflow: hidden;
    }
    .card-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s ease;
    }
    .card:hover .card-image img {
      transform: scale(1.08);
    }
    .card-overlay {
      position: absolute;
      top: 12px;
      right: 12px;
    }
    .card-body {
      padding: 16px;
    }
    .card-title {
      color: #f1f5f9;
      font-size: 1.05rem;
      font-weight: 600;
      margin: 0 0 8px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .card-info {
      color: #94a3b8;
      font-size: 0.85rem;
      margin: 0 0 8px;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .separator { color: #475569; }
    .card-location {
      color: #64748b;
      font-size: 0.8rem;
      margin: 0;
      display: flex;
      align-items: center;
      gap: 6px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .card-location svg {
      flex-shrink: 0;
      color: #39ff14;
    }
  `]
})
export class CharacterCardComponent {
  @Input({ required: true }) character!: Character;
}
