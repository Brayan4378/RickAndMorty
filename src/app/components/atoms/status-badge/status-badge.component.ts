import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-status-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span class="status-badge" [ngClass]="status.toLowerCase()">
      <span class="status-dot"></span>
      {{ status }}
    </span>
  `,
  styles: [`
    .status-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .status-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      display: inline-block;
    }
    .alive {
      background: rgba(0, 200, 83, 0.15);
      color: #00c853;
    }
    .alive .status-dot {
      background: #00c853;
      box-shadow: 0 0 8px #00c853;
    }
    .dead {
      background: rgba(255, 61, 0, 0.15);
      color: #ff3d00;
    }
    .dead .status-dot {
      background: #ff3d00;
      box-shadow: 0 0 8px #ff3d00;
    }
    .unknown {
      background: rgba(158, 158, 158, 0.15);
      color: #9e9e9e;
    }
    .unknown .status-dot {
      background: #9e9e9e;
      box-shadow: 0 0 8px #9e9e9e;
    }
  `]
})
export class StatusBadgeComponent {
  @Input() status: string = 'unknown';
}
