import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="empty-state">
      <div class="empty-icon">{{ icon }}</div>
      <h3>{{ title }}</h3>
      <p>{{ message }}</p>
    </div>
  `,
  styles: [`
    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 4rem 2rem;
      text-align: center;
    }
    .empty-icon {
      font-size: 4rem;
      margin-bottom: 1rem;
      opacity: 0.6;
    }
    h3 {
      color: #e2e8f0;
      font-size: 1.3rem;
      margin: 0 0 0.5rem;
    }
    p {
      color: #64748b;
      font-size: 0.95rem;
      max-width: 400px;
    }
  `]
})
export class EmptyStateComponent {
  @Input() icon: string = '🔍';
  @Input() title: string = 'No se encontraron resultados';
  @Input() message: string = 'Intenta con un término de búsqueda diferente.';
}
