import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="spinner-container">
      <div class="portal-spinner">
        <div class="ring ring-1"></div>
        <div class="ring ring-2"></div>
        <div class="ring ring-3"></div>
        <div class="center-dot"></div>
      </div>
      <p class="loading-text" *ngIf="message">{{ message }}</p>
    </div>
  `,
  styles: [`
    .spinner-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 3rem;
      gap: 1.5rem;
    }
    .portal-spinner {
      position: relative;
      width: 80px;
      height: 80px;
    }
    .ring {
      position: absolute;
      border-radius: 50%;
      border: 3px solid transparent;
      animation: spin 1.5s linear infinite;
    }
    .ring-1 {
      inset: 0;
      border-top-color: #39ff14;
      border-right-color: #39ff14;
    }
    .ring-2 {
      inset: 8px;
      border-top-color: #00b0c8;
      border-bottom-color: #00b0c8;
      animation-duration: 1s;
      animation-direction: reverse;
    }
    .ring-3 {
      inset: 16px;
      border-top-color: #97ce4c;
      border-left-color: #97ce4c;
      animation-duration: 0.75s;
    }
    .center-dot {
      position: absolute;
      inset: 28px;
      border-radius: 50%;
      background: radial-gradient(circle, #39ff14, #00b0c8);
      box-shadow: 0 0 20px rgba(57, 255, 20, 0.5);
    }
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    .loading-text {
      color: #a0aec0;
      font-size: 0.9rem;
      letter-spacing: 1px;
    }
  `]
})
export class LoadingSpinnerComponent {
  @Input() message: string = 'Cargando desde el multiverso...';
}
