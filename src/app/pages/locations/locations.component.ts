import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RickAndMortyService } from '../../core/services/rick-and-morty.service';
import { Location } from '../../core/models/location.model';
import { LocationCardComponent } from '../../components/molecules/location-card/location-card.component';
import { SearchInputComponent } from '../../components/atoms/search-input/search-input.component';
import { PaginationComponent } from '../../components/molecules/pagination/pagination.component';
import { LoadingSpinnerComponent } from '../../components/atoms/loading-spinner/loading-spinner.component';
import { EmptyStateComponent } from '../../components/atoms/empty-state/empty-state.component';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-locations',
  standalone: true,
  imports: [CommonModule, LocationCardComponent, SearchInputComponent, PaginationComponent, LoadingSpinnerComponent, EmptyStateComponent],
  template: `
    <div class="page-container">
      <div class="page-header">
        <div class="protected-badge">🔓 Ruta Protegida - Portal Gun Activo</div>
        <h1>🌍 Ubicaciones</h1>
        <p>Explora las dimensiones y planetas del multiverso</p>
      </div>
      <div class="filters">
        <app-search-input placeholder="Buscar ubicación..." (onSearch)="onSearchChange($event)"></app-search-input>
      </div>
      <app-loading-spinner *ngIf="loading"></app-loading-spinner>
      <app-empty-state *ngIf="!loading && locations.length === 0" icon="🌍" title="No se encontraron ubicaciones" message="Intenta con otro término de búsqueda."></app-empty-state>
      <div class="locations-grid" *ngIf="!loading && locations.length > 0">
        <app-location-card *ngFor="let loc of locations" [location]="loc"></app-location-card>
      </div>
      <app-pagination [currentPage]="currentPage" [totalPages]="totalPages" (pageChange)="onPageChange($event)"></app-pagination>
    </div>
  `,
  styles: [`
    .page-container { max-width: 1000px; margin: 0 auto; padding: 2rem; }
    .page-header { margin-bottom: 2rem; }
    .protected-badge {
      display: inline-flex; align-items: center; gap: 6px;
      padding: 6px 14px;
      background: rgba(57, 255, 20, 0.1);
      border: 1px solid rgba(57, 255, 20, 0.3);
      border-radius: 8px; color: #39ff14;
      font-size: 0.75rem; font-weight: 600;
      text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 12px;
    }
    .page-header h1 { color: #f1f5f9; font-size: 2rem; font-weight: 700; margin: 0 0 0.5rem; }
    .page-header p { color: #64748b; font-size: 1rem; margin: 0; }
    .filters { margin-bottom: 2rem; }
    .locations-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 16px;
    }
    @media (max-width: 768px) { .locations-grid { grid-template-columns: 1fr; } }
  `]
})
export class LocationsComponent implements OnInit {
  locations: Location[] = [];
  loading = true;
  currentPage = 1;
  totalPages = 1;
  searchName = '';
  private searchSubject = new Subject<string>();

  constructor(private api: RickAndMortyService) {}

  ngOnInit(): void {
    this.loadLocations();
    this.searchSubject.pipe(debounceTime(400), distinctUntilChanged()).subscribe(term => {
      this.searchName = term;
      this.currentPage = 1;
      this.loadLocations();
    });
  }

  loadLocations(): void {
    this.loading = true;
    this.api.getLocations(this.currentPage, this.searchName || undefined).subscribe({
      next: (res) => { this.locations = res.results; this.totalPages = res.info.pages; this.loading = false; },
      error: () => { this.locations = []; this.totalPages = 1; this.loading = false; }
    });
  }

  onSearchChange(term: string): void { this.searchSubject.next(term); }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadLocations();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
