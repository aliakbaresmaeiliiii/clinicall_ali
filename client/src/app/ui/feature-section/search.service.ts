/**
 * SEARCH SERVICE
 * Service for handling search functionality across the application
 * Provides autocomplete, comprehensive search, and doctor-specific search capabilities
 * Integrates with backend API for real-time search suggestions
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, delay } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import {
  AutocompleteDto,
  AutocompleteResponse,
  AutocompleteResult,
} from '../../core/models/autocomplete.dto';

/**
 * Interface for search result objects
 * Represents unified format for all types of search results
 */
export interface SearchResult {
  id: string;
  name: string;
  type: 'doctor' | 'specialty' | 'disease' | 'clinic';
  specialty?: string;
  experience?: number;
  rating?: number;
  location?: string;
  description?: string;
  icon: string;
  category: string;
}

/**
 * Interface for API search response
 * Standard format for backend search responses
 */
export interface ApiSearchResponse {
  results: any[];
  total: number;
}

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  // Base URL for API endpoints from environment configuration
  private baseUrl = environment.apiEndPoint;

  constructor(private http: HttpClient) {}

  /**
   * Main search function for autocomplete
   * Provides real-time search suggestions with debouncing handled by component
   * @param query - Search query string
   * @returns Observable of SearchResult array
   */
  search(query: string): Observable<SearchResult[]> {
    if (!query || query.length < 2) {
      return of([]);
    }

    // Use autocomplete endpoint for real-time suggestions
    const autocompleteDto: AutocompleteDto = {
      query: query,
      limit: 10,
      types: ['doctor', 'specialty', 'disease', 'clinic'],
    };

    return this.autocomplete(autocompleteDto).pipe(
      map(response => this.transformAutocompleteResponse(response)),
      catchError(error => {
        console.error('Search API error:', error);
        return of([]);
      })
    );
  }

  /**
   * Enhanced autocomplete method using AutocompleteDto
   * Makes HTTP request to backend autocomplete endpoint with various filters
   * @param autocompleteDto - Autocomplete data transfer object with search parameters
   * @returns Observable of AutocompleteResponse
   */
  autocomplete(
    autocompleteDto: AutocompleteDto
  ): Observable<AutocompleteResponse> {
    if (!autocompleteDto.query || autocompleteDto.query.length < 2) {
      return of({ query: autocompleteDto.query, suggestions: [], total: 0, types: autocompleteDto.types || ['doctor', 'specialty', 'disease', 'clinic'] });
    }
    // Build query parameters from AutocompleteDto - always include types parameter
    let params = new HttpParams()
      .set('query', autocompleteDto.query)
      .set(
        'types',
        autocompleteDto.types && autocompleteDto.types.length > 0
          ? autocompleteDto.types.join(',')
          : 'doctor,specialty,disease,clinic'
      );

    if (autocompleteDto.limit) {
      params = params.set('limit', autocompleteDto.limit.toString());
    }
    if (autocompleteDto.location) {
      params = params.set('location', autocompleteDto.location);
    }
    if (autocompleteDto.specialty) {
      params = params.set('specialty', autocompleteDto.specialty);
    }
    if (autocompleteDto.minRating) {
      params = params.set('minRating', autocompleteDto.minRating.toString());
    }
    if (autocompleteDto.maxDistance) {
      params = params.set(
        'maxDistance',
        autocompleteDto.maxDistance.toString()
      );
    }

    return this.http
      .get<AutocompleteResponse>(`${this.baseUrl}search/autocomplete`, {
        params,
      })
      .pipe(
        catchError(error => {
          console.error('Autocomplete API error:', error);
          return of({ query: autocompleteDto.query, suggestions: [], total: 0, types: autocompleteDto.types || ['doctor', 'specialty', 'disease', 'clinic'] });
        })
      );
  }

  /**
   * Comprehensive search for everything
   * Searches across all categories without filtering
   * @param query - Search query string
   * @returns Observable of SearchResult array
   */
  comprehensiveSearch(query: string): Observable<SearchResult[]> {
    if (!query || query.length < 2) {
      return of([]);
    }

    const params = new HttpParams().set('query', query);

    return this.http
      .get<ApiSearchResponse>(`${this.baseUrl}search`, { params })
      .pipe(
        map(response => this.transformApiResponse(response)),
        catchError(error => {
          console.error('Comprehensive search API error:', error);
          return of([]);
        })
      );
  }

  /**
   * Search doctors by specialty and location
   * Filtered search for doctors with optional specialty and city filters
   * @param specialty - Optional specialty filter
   * @param city - Optional city/location filter
   * @returns Observable of SearchResult array
   */
  searchDoctors(specialty?: string, city?: string): Observable<SearchResult[]> {
    let params = new HttpParams();
    if (specialty) params = params.set('specialty', specialty);
    if (city) params = params.set('city', city);

    return this.http
      .get<ApiSearchResponse>(`${this.baseUrl}search/doctors`, { params })
      .pipe(
        map(response => this.transformApiResponse(response)),
        catchError(error => {
          console.error('Doctors search API error:', error);
          return of([]);
        })
      );
  }

  /**
   * Transform API response to SearchResult format
   * Converts backend API response to unified frontend format
   * @param response - API search response
   * @returns Array of SearchResult objects
   */
  private transformApiResponse(response: ApiSearchResponse): SearchResult[] {
    if (!response || !response.results) {
      return [];
    }
    return response.results.map(item => {
      // Determine type based on API response structure
      let type: 'doctor' | 'specialty' | 'disease' | 'clinic' = 'doctor';
      let icon = '👨‍⚕️';
      let category = 'Doctors';

      if (item.type) {
        type = item.type;
      } else if (item.specialty) {
        type = 'doctor';
      } else if (item.isClinic) {
        type = 'clinic';
      } else if (item.isCondition) {
        type = 'disease';
      }

      // Set appropriate icon and category
      switch (type) {
        case 'doctor':
          icon = '👨‍⚕️';
          category = 'Doctors';
          break;
        case 'specialty':
          icon = '🏥';
          category = 'Specialties';
          break;
        case 'disease':
          icon = '🩺';
          category = 'Conditions';
          break;
        case 'clinic':
          icon = '🏢';
          category = 'Clinics';
          break;
      }

      return {
        id: item.id || item._id || Math.random().toString(),
        name: item.name || item.title || item.fullName || 'Unknown',
        type: type,
        specialty: item.specialty || item.specialization,
        experience: item.experience || item.yearsOfExperience,
        rating: item.rating || item.averageRating,
        location: item.location || item.city || item.address,
        description: item.description || item.bio || item.about,
        icon: icon,
        category: category,
      };
    });
  }

  /**
   * Transform autocomplete response to SearchResult format
   * Converts autocomplete API response to unified frontend format
   * @param response - Autocomplete API response
   * @returns Array of SearchResult objects
   */
  private transformAutocompleteResponse(
    response: AutocompleteResponse
  ): SearchResult[] {
    if (!response || !response.suggestions) {
      return [];
    }
    return response.suggestions.map(item => {
      let icon = '👨‍⚕️';
      let category = 'Doctors';

      // Set appropriate icon and category
      switch (item.type) {
        case 'doctor':
          icon = '👨‍⚕️';
          category = 'Doctors';
          break;
        case 'specialty':
          icon = '🏥';
          category = 'Specialties';
          break;
        case 'disease':
          icon = '🩺';
          category = 'Conditions';
          break;
        case 'clinic':
          icon = '🏢';
          category = 'Clinics';
          break;
      }

      // Use display field if available, otherwise use name
      const displayName = item.display || item.name;

      return {
        id: item.id?.toString() || Math.random().toString(),
        name: displayName,
        type: item.type,
        specialty: item.specialty,
        experience: item.experience,
        rating: item.rating,
        location: item.location,
        description: item.description || `Search for ${displayName}`,
        icon: icon,
        category: category,
      };
    });
  }

  /**
   * Returns popular searches for suggestions
   * Provides default popular search terms when no query is entered
   * @returns Observable of SearchResult array with popular searches
   */
  getPopularSearches(): Observable<SearchResult[]> {
    // Return some default popular searches
    return of([
      {
        id: 'dentistry',
        name: 'Dentistry',
        type: 'specialty',
        description: 'Oral health and dental care',
        icon: '🦷',
        category: 'Specialties',
      },
      {
        id: 'cardiology',
        name: 'Cardiology',
        type: 'specialty',
        description: 'Heart and cardiovascular system care',
        icon: '❤️',
        category: 'Specialties',
      },
      {
        id: 'dermatology',
        name: 'Dermatology',
        type: 'specialty',
        description: 'Skin, hair, and nail care',
        icon: '🌟',
        category: 'Specialties',
      },
      {
        id: 'diabetes',
        name: 'Diabetes',
        type: 'disease',
        description: 'Blood sugar management',
        icon: '🩺',
        category: 'Conditions',
      },
      {
        id: 'hypertension',
        name: 'Hypertension',
        type: 'disease',
        description: 'High blood pressure condition',
        icon: '🩺',
        category: 'Conditions',
      },
    ]);
  }
}
