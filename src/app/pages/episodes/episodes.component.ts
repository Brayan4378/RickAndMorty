import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RickAndMortyService } from '../../core/services/rick-and-morty.service';
import { Episode } from '../../core/models/episode.model';
import { EpisodeCardComponent } from '../../components/molecules/episode-card/episode-card.component';
import { SearchInputComponent } from '../../components/atoms/search-input/search-input.component';
import { PaginationComponent } from '../../components/molecules/pagination/pagination.component';
import { LoadingSpinnerComponent } from '../../components/atoms/loading-spinner/loading-spinner.component';
import { EmptyStateComponent } from '../../components/atoms/empty-state/empty-state.component';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-episodes',
  standalone: true,
  imports: [CommonModule, EpisodeCardComponent, SearchInputComponent, PaginationComponent, LoadingSpinnerComponent, EmptyStateComponent],
  template: `
    <div class="page-container">
      <div class="page-header">
        <h1>🎬 Episodios</h1>
        <p>Todos los episodios de Rick and Morty</p>
      </div>
      <div class="filters">
        <app-search-input placeholder="Buscar episodio..." (onSearch)="onSearchChange($event)"></app-search-input>
      </div>
      <app-loading-spinner *ngIf="loading"></app-loading-spinner>
      <app-empty-state *ngIf="!loading && episodes.length === 0" icon="🎬" title="No se encontraron episodios" message="Intenta con otro término de búsqueda."></app-empty-state>
      <div class="episodes-list" *ngIf="!loading && episodes.length > 0">
        <app-episode-card *ngFor="let ep of episodes" [episode]="ep"></app-episode-card>
      </div>
      <app-pagination [currentPage]="currentPage" [totalPages]="totalPages" (pageChange)="onPageChange($event)"></app-pagination>
    </div>
  `,
  styles: [`
    .page-container { max-width: 900px; margin: 0 auto; padding: 2rem; }
    .page-header { margin-bottom: 2rem; }
    .page-header h1 { color: #f1f5f9; font-size: 2rem; font-weight: 700; margin: 0 0 0.5rem; }
    .page-header p { color: #64748b; font-size: 1rem; margin: 0; }
    .filters { margin-bottom: 2rem; }
    .episodes-list { display: flex; flex-direction: column; gap: 10px; }
  `]
})
export class EpisodesComponent implements OnInit {
  episodes: Episode[] = [];
  loading = true;
  currentPage = 1;
  totalPages = 1;
  searchName = '';
  private searchSubject = new Subject<string>();

  constructor(private api: RickAndMortyService) {}

  ngOnInit(): void {
    this.loadEpisodes();
    this.searchSubject.pipe(debounceTime(400), distinctUntilChanged()).subscribe(term => {
      this.searchName = term;
      this.currentPage = 1;
      this.loadEpisodes();
    });
  }

  loadEpisodes(): void {
    this.loading = true;
    this.api.getEpisodes(this.currentPage, this.searchName || undefined).subscribe({
      next: (res) => { this.episodes = res.results; this.totalPages = res.info.pages; this.loading = false; },
      error: () => { this.episodes = []; this.totalPages = 1; this.loading = false; }
    });
  }

  onSearchChange(term: string): void { this.searchSubject.next(term); }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadEpisodes();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
