import { Routes } from '@angular/router';
import { multiverseGuard } from './core/guards/multiverse.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'characters',
    loadComponent: () => import('./pages/characters/characters.component').then(m => m.CharactersComponent)
  },
  {
    path: 'characters/:id',
    loadComponent: () => import('./pages/character-detail/character-detail.component').then(m => m.CharacterDetailComponent)
  },
  {
    path: 'episodes',
    loadComponent: () => import('./pages/episodes/episodes.component').then(m => m.EpisodesComponent)
  },
  {
    path: 'episodes/:id',
    loadComponent: () => import('./pages/episode-detail/episode-detail.component').then(m => m.EpisodeDetailComponent)
  },
  {
    path: 'locations',
    loadComponent: () => import('./pages/locations/locations.component').then(m => m.LocationsComponent),
    canActivate: [multiverseGuard]
  },
  {
    path: 'locations/:id',
    loadComponent: () => import('./pages/location-detail/location-detail.component').then(m => m.LocationDetailComponent),
    canActivate: [multiverseGuard]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
