import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/api-response.model';
import { Character } from '../models/character.model';
import { Location } from '../models/location.model';
import { Episode } from '../models/episode.model';

@Injectable({
  providedIn: 'root'
})
export class RickAndMortyService {
  private readonly baseUrl = 'https://rickandmortyapi.com/api';

  constructor(private http: HttpClient) {}

  // Characters
  getCharacters(page: number = 1, name?: string, status?: string): Observable<ApiResponse<Character>> {
    let params = new HttpParams().set('page', page.toString());
    if (name) params = params.set('name', name);
    if (status) params = params.set('status', status);
    return this.http.get<ApiResponse<Character>>(`${this.baseUrl}/character`, { params });
  }

  getCharacter(id: number): Observable<Character> {
    return this.http.get<Character>(`${this.baseUrl}/character/${id}`);
  }

  getMultipleCharacters(ids: number[]): Observable<Character[]> {
    return this.http.get<Character[]>(`${this.baseUrl}/character/${ids.join(',')}`);
  }

  // Locations
  getLocations(page: number = 1, name?: string): Observable<ApiResponse<Location>> {
    let params = new HttpParams().set('page', page.toString());
    if (name) params = params.set('name', name);
    return this.http.get<ApiResponse<Location>>(`${this.baseUrl}/location`, { params });
  }

  getLocation(id: number): Observable<Location> {
    return this.http.get<Location>(`${this.baseUrl}/location/${id}`);
  }

  // Episodes
  getEpisodes(page: number = 1, name?: string): Observable<ApiResponse<Episode>> {
    let params = new HttpParams().set('page', page.toString());
    if (name) params = params.set('name', name);
    return this.http.get<ApiResponse<Episode>>(`${this.baseUrl}/episode`, { params });
  }

  getEpisode(id: number): Observable<Episode> {
    return this.http.get<Episode>(`${this.baseUrl}/episode/${id}`);
  }

  getMultipleEpisodes(ids: number[]): Observable<Episode[]> {
    return this.http.get<Episode[]>(`${this.baseUrl}/episode/${ids.join(',')}`);
  }

  // Utility: extract ID from URL
  extractIdFromUrl(url: string): number {
    const parts = url.split('/');
    return parseInt(parts[parts.length - 1], 10);
  }
}
