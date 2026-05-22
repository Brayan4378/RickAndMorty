import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="pagination" *ngIf="totalPages > 1">
      <button class="page-btn" [disabled]="currentPage === 1" (click)="pageChange.emit(currentPage - 1)">
        &larr; Anterior
      </button>
      <div class="page-info">
        <span class="current">{{ currentPage }}</span>
        <span class="separator">de</span>
        <span class="total">{{ totalPages }}</span>
      </div>
      <button class="page-btn" [disabled]="currentPage === totalPages" (click)="pageChange.emit(currentPage + 1)">
        Siguiente &rarr;
      </button>
    </div>
  `,
  styles: [`
    .pagination {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 20px;
      padding: 2rem 0;
    }
    .page-btn {
      padding: 10px 20px;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 10px;
      color: #e2e8f0;
      font-size: 0.9rem;
      cursor: pointer;
      transition: all 0.3s ease;
      font-family: 'Outfit', sans-serif;
    }
    .page-btn:hover:not(:disabled) {
      background: rgba(57, 255, 20, 0.1);
      border-color: #39ff14;
      color: #39ff14;
    }
    .page-btn:disabled {
      opacity: 0.3;
      cursor: not-allowed;
    }
    .page-info {
      display: flex;
      align-items: center;
      gap: 8px;
      color: #94a3b8;
      font-size: 0.9rem;
    }
    .current {
      color: #39ff14;
      font-weight: 700;
      font-size: 1.1rem;
    }
    .total { font-weight: 600; }
  `]
})
export class PaginationComponent {
  @Input() currentPage: number = 1;
  @Input() totalPages: number = 1;
  @Output() pageChange = new EventEmitter<number>();
}
