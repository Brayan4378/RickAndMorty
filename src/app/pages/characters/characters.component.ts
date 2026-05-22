import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RickAndMortyService } from '../../core/services/rick-and-morty.service';
import { Character } from '../../core/models/character.model';
import { CharacterCardComponent } from '../../components/molecules/character-card/character-card.component';
import { SearchInputComponent } from '../../components/atoms/search-input/search-input.component';
import { PaginationComponent } from '../../components/molecules/pagination/pagination.component';
import { LoadingSpinnerComponent } from '../../components/atoms/loading-spinner/loading-spinner.component';
import { EmptyStateComponent } from '../../components/atoms/empty-state/empty-state.component';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-characters',
  standalone: true,
  imports: [CommonModule, CharacterCardComponent, SearchInputComponent, PaginationComponent, LoadingSpinnerComponent, EmptyStateComponent],
  template: `
    <div class="page-container">
      <div class="page-header">
        <h1>👽 Personajes</h1>
        <p>Explora todos los personajes del multiverso de Rick and Morty</p>
      </div>
      <div class="filters">
        <app-search-input placeholder="Buscar personaje..." (onSearch)="onSearchChange($event)"></app-search-input>
        <div class="status-filters">
          <button *ngFor="let s of statuses" class="filter-btn" [class.active]="selectedStatus === s.value" (click)="filterByStatus(s.value)">
            {{ s.label }}
          </button>
        </div>
      </div>
      <app-loading-spinner *ngIf="loading"></app-loading-spinner>
      <app-empty-state *ngIf="!loading && characters.length === 0" icon="👽" title="No se encontraron personajes" message="Intenta con otro nombre o filtro de estado."></app-empty-state>
      <div class="characters-grid" *ngIf="!loading && characters.length > 0">
        <app-character-card *ngFor="let char of characters" [character]="char"></app-character-card>
      </div>
      <app-pagination [currentPage]="currentPage" [totalPages]="totalPages" (pageChange)="onPageChange($event)"></app-pagination>
    </div>
  `,
  styles: [`
    .page-container { max-width: 1280px; margin: 0 auto; padding: 2rem; }
    .page-header { margin-bottom: 2rem; }
    .page-header h1 { color: #f1f5f9; font-size: 2rem; font-weight: 700; margin: 0 0 0.5rem; }
    .page-header p { color: #64748b; font-size: 1rem; margin: 0; }
    .filters { display: flex; align-items: center; gap: 16px; margin-bottom: 2rem; flex-wrap: wrap; }
    .status-filters { display: flex; gap: 8px; }
    .filter-btn {
      padding: 8px 16px;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 8px;
      color: #94a3b8;
      font-size: 0.85rem;
      cursor: pointer;
      transition: all 0.2s;
      font-family: 'Outfit', sans-serif;
    }
    .filter-btn:hover { background: rgba(255, 255, 255, 0.08); color: #e2e8f0; }
    .filter-btn.active { background: rgba(57, 255, 20, 0.1); border-color: #39ff14; color: #39ff14; }
    .characters-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
      gap: 20px;
    }
    @media (max-width: 768px) {
      .filters { flex-direction: column; align-items: stretch; }
      .characters-grid { grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); }
    }
  `]
})
export class CharactersComponent implements OnInit {
  characters: Character[] = [];
  loading = true;
  currentPage = 1;
  totalPages = 1;
  searchName = '';
  selectedStatus = '';
  private searchSubject = new Subject<string>();

  statuses = [
    { label: 'Todos', value: '' },
    { label: '🟢 Vivos', value: 'alive' },
    { label: '🔴 Muertos', value: 'dead' },
    { label: '❓ Desconocido', value: 'unknown' }
  ];

  constructor(private api: RickAndMortyService) {}

  ngOnInit(): void {
    this.loadCharacters();
    this.searchSubject.pipe(debounceTime(400), distinctUntilChanged()).subscribe(term => {
      this.searchName = term;
      this.currentPage = 1;
      this.loadCharacters();
    });
  }

  loadCharacters(): void {
    this.loading = true;
    this.api.getCharacters(this.currentPage, this.searchName || undefined, this.selectedStatus || undefined).subscribe({
      next: (res) => { this.characters = res.results; this.totalPages = res.info.pages; this.loading = false; },
      error: () => { this.characters = []; this.totalPages = 1; this.loading = false; }
    });
  }

  onSearchChange(term: string): void { this.searchSubject.next(term); }

  filterByStatus(status: string): void {
    this.selectedStatus = status;
    this.currentPage = 1;
    this.loadCharacters();
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadCharacters();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
