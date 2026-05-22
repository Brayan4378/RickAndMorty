import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Location } from '../../../core/models/location.model';

@Component({
  selector: 'app-location-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <a [routerLink]="['/locations', location.id]" class="location-card">
      <div class="location-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="32" height="32">
          <circle cx="12" cy="12" r="10"/>
          <path d="M2 12h20"/>
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
        </svg>
      </div>
      <div class="location-info">
        <h3>{{ location.name }}</h3>
        <div class="location-meta">
          <span class="meta-tag type">{{ location.type }}</span>
          <span class="meta-tag dimension">{{ location.dimension }}</span>
        </div>
        <p class="residents-count">{{ location.residents.length }} residentes</p>
      </div>
    </a>
  `,
  styles: [`
    .location-card {
      display: flex;
      align-items: flex-start;
      gap: 16px;
      padding: 20px;
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.06);
      border-radius: 14px;
      text-decoration: none;
      transition: all 0.3s ease;
      cursor: pointer;
    }
    .location-card:hover {
      border-color: rgba(151, 206, 76, 0.3);
      background: rgba(255, 255, 255, 0.05);
      transform: translateY(-4px);
      box-shadow: 0 8px 30px rgba(151, 206, 76, 0.1);
    }
    .location-icon {
      color: #97ce4c;
      flex-shrink: 0;
      padding: 10px;
      background: rgba(151, 206, 76, 0.1);
      border-radius: 12px;
      transition: all 0.3s ease;
    }
    .location-card:hover .location-icon {
      background: rgba(151, 206, 76, 0.2);
      transform: rotate(10deg);
    }
    .location-info { flex: 1; min-width: 0; }
    h3 {
      color: #f1f5f9;
      font-size: 1.05rem;
      font-weight: 600;
      margin: 0 0 8px;
    }
    .location-meta {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-bottom: 8px;
    }
    .meta-tag {
      font-size: 0.7rem;
      padding: 3px 8px;
      border-radius: 6px;
      font-weight: 500;
    }
    .type {
      background: rgba(0, 176, 200, 0.15);
      color: #00b0c8;
    }
    .dimension {
      background: rgba(151, 206, 76, 0.15);
      color: #97ce4c;
    }
    .residents-count {
      color: #64748b;
      font-size: 0.8rem;
      margin: 0;
    }
  `]
})
export class LocationCardComponent {
  @Input({ required: true }) location!: Location;
}
