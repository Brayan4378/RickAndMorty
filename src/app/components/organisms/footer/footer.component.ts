import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="footer">
      <div class="footer-content">
        <div class="footer-brand">
          <span class="footer-logo">🔬 Rick<span class="accent">&amp;</span>Morty Explorer</span>
          <p>Explorando el multiverso, una dimensión a la vez.</p>
        </div>
        <div class="footer-links">
          <h4>API</h4>
          <a href="https://rickandmortyapi.com" target="_blank" rel="noopener">Rick and Morty API</a>
          <a href="https://rickandmortyapi.com/documentation" target="_blank" rel="noopener">Documentación</a>
        </div>
        <div class="footer-derAut">
          <h4>Trabajo realizado por:</h4>
          <p> Brayan Ocampo de la Institución Universitaria EAM</p>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2026 Rick &amp; Morty Explorer.</p>
      </div>
    </footer>

  `,
  styles: [`
    .footer {
      background: rgba(10, 10, 25, 0.9);
      border-top: 1px solid rgba(255, 255, 255, 0.06);
      padding: 3rem 2rem 1.5rem;
      margin-top: auto;
    }
    .footer-content {
      max-width: 1200px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: 2fr 1fr 1fr;
      gap: 2rem;
    }
    .footer-brand {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .footer-logo {
      font-size: 1.1rem;
      font-weight: 700;
      color: #f1f5f9;
    }
    .accent { color: #39ff14; }
    .footer-brand p {
      color: #64748b;
      font-size: 0.85rem;
      margin: 0;
    }
    .footer-links {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .footer-links h4 {
      color: #e2e8f0;
      font-size: 0.85rem;
      font-weight: 600;
      margin: 0 0 4px;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    .footer-links a, .footer-links span {
      color: #64748b;
      font-size: 0.85rem;
      text-decoration: none;
      transition: color 0.2s;
    }
    .footer-links a:hover { color: #39ff14; }
    .footer-bottom {
      max-width: 1200px;
      margin: 2rem auto 0;
      padding-top: 1.5rem;
      border-top: 1px solid rgba(255, 255, 255, 0.04);
      text-align: center;
    }
    .footer-bottom p {
      color: #475569;
      font-size: 0.8rem;
      margin: 0;
    }
    @media (max-width: 768px) {
      .footer-content {
        grid-template-columns: 1fr;
        gap: 1.5rem;
      }
    }
  `]
})
export class FooterComponent {}
