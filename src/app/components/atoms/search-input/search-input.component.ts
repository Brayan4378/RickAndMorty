import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="search-wrapper">
      <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="11" cy="11" r="8"/>
        <path d="m21 21-4.35-4.35"/>
      </svg>
      <input
        type="text"
        [placeholder]="placeholder"
        [(ngModel)]="searchTerm"
        (ngModelChange)="onSearch.emit($event)"
        (keyup.enter)="onSearchSubmit.emit(searchTerm)"
        class="search-input"
      />
      <button *ngIf="searchTerm" class="clear-btn" (click)="clearSearch()">
        &#10005;
      </button>
    </div>
  `,
  styles: [`
    .search-wrapper {
      position: relative;
      width: 100%;
      max-width: 400px;
    }
    .search-icon {
      position: absolute;
      left: 14px;
      top: 50%;
      transform: translateY(-50%);
      width: 18px;
      height: 18px;
      color: #64748b;
      pointer-events: none;
    }
    .search-input {
      width: 100%;
      padding: 12px 40px 12px 44px;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 12px;
      color: #e2e8f0;
      font-size: 0.95rem;
      transition: all 0.3s ease;
      outline: none;
      font-family: 'Outfit', sans-serif;
    }
    .search-input::placeholder {
      color: #64748b;
    }
    .search-input:focus {
      border-color: #39ff14;
      box-shadow: 0 0 0 3px rgba(57, 255, 20, 0.1);
      background: rgba(255, 255, 255, 0.08);
    }
    .clear-btn {
      position: absolute;
      right: 12px;
      top: 50%;
      transform: translateY(-50%);
      background: none;
      border: none;
      color: #64748b;
      cursor: pointer;
      font-size: 0.85rem;
      padding: 4px;
      transition: color 0.2s;
    }
    .clear-btn:hover {
      color: #ff3d00;
    }
  `]
})
export class SearchInputComponent {
  @Input() placeholder: string = 'Buscar...';
  @Output() onSearch = new EventEmitter<string>();
  @Output() onSearchSubmit = new EventEmitter<string>();
  searchTerm: string = '';

  clearSearch(): void {
    this.searchTerm = '';
    this.onSearch.emit('');
  }
}
