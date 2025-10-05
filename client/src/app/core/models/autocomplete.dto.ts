export interface AutocompleteDto {
  query: string;
  limit?: number;
  types?: ('doctor' | 'specialty' | 'disease' | 'clinic')[];
  location?: string;
  specialty?: string;
  minRating?: number;
  maxDistance?: number;
}

export interface AutocompleteResponse {
  query: string;
  suggestions: AutocompleteResult[];
  total: number;
  types: ('doctor' | 'specialty' | 'disease' | 'clinic')[];
}

export interface AutocompleteResult {
  id: string;
  name: string;
  type: 'doctor' | 'specialty' | 'disease' | 'clinic';
  display?: string;
  specialty?: string;
  experience?: number;
  rating?: number;
  location?: string;
  description?: string;
  distance?: number;
  relevanceScore?: number;
  metadata?: Record<string, any>;
}
