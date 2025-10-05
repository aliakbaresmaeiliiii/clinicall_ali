import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

export interface SearchSuggestion {
  type: 'doctor' | 'specialty' | 'disease' | 'clinic';
  id: number;
  name: string;
  display: string;
}

export interface SearchResponse {
  query: string;
  types: string[];
  total: number;
  suggestions: SearchSuggestion[];
}

@Injectable()
export class SearchEnhancedService {
  constructor(private prisma: PrismaService) {}

  /**
   * Expand search query with synonyms from the Keyword table or hardcoded fallback
   */
  private async expandQueryWithSynonyms(query: string): Promise<string[]> {
    const searchTerms = [query.toLowerCase()];

    // Hardcoded synonyms as fallback
    const hardcodedSynonyms: Record<string, string[]> = {
      dentist: ['dentistry', 'dental', 'tooth', 'teeth', 'oral'],
      doctor: ['physician', 'medic', 'practitioner', 'clinician'],
      clinic: ['medical center', 'health center', 'hospital', 'practice'],
      specialty: ['specialization', 'field', 'area', 'discipline'],
      heart: ['cardiac', 'cardiovascular', 'chest'],
      skin: ['dermatology', 'dermatological', 'epidermis'],
      eye: ['ophthalmology', 'ocular', 'vision'],
      bone: ['orthopedic', 'skeletal', 'orthopaedic'],
      child: ['pediatric', 'pediatrics', 'kids', 'children'],
      woman: ['gynecology', 'obstetrics', 'female', 'women'],
      brain: ['neurology', 'neurological', 'neural'],
      cancer: ['oncology', 'tumor', 'malignancy'],
      kidney: ['nephrology', 'renal'],
      lung: ['pulmonology', 'respiratory', 'breathing'],
      stomach: ['gastroenterology', 'digestive', 'gut'],
      mental: ['psychiatry', 'psychological', 'psychology'],
      allergy: ['immunology', 'hypersensitivity', 'reaction'],
      pain: ['ache', 'discomfort', 'soreness'],
      fever: ['temperature', 'pyrexia'],
      infection: ['bacterial', 'viral', 'disease'],
      tooth: ['dentist', 'dentistry', 'dental', 'teeth', 'oral'],
      teeth: ['dentist', 'dentistry', 'dental', 'tooth', 'oral'],
      dental: ['dentist', 'dentistry', 'tooth', 'teeth', 'oral'],
      cardiology: ['heart', 'cardiac', 'cardiovascular'],
      dermatology: ['skin', 'dermatological'],
      orthopedics: ['bone', 'skeletal', 'orthopaedic'],
      pediatrics: ['child', 'children', 'kids'],
      gynecology: ['woman', 'female', 'obstetrics'],
      neurology: ['brain', 'neurological', 'neural'],
    };

    try {
      // Try to find synonyms in the Keyword table first
      const keywords = await this.prisma.keyword.findMany({
        where: {
          OR: [
            { term: { contains: query } },
            { synonyms: { contains: query } },
          ],
        },
      });

      for (const keyword of keywords) {
        try {
          const synonyms = JSON.parse(keyword.synonyms) as string[];
          searchTerms.push(...synonyms);
        } catch (e) {
          // If JSON parsing fails, treat synonyms as comma-separated
          const synonyms = keyword.synonyms.split(',').map((s) => s.trim());
          searchTerms.push(...synonyms);
        }
      }

      // Add the original term's synonyms if found
      const exactMatch = await this.prisma.keyword.findFirst({
        where: { term: query.toLowerCase() },
      });

      if (exactMatch) {
        try {
          const synonyms = JSON.parse(exactMatch.synonyms) as string[];
          searchTerms.push(...synonyms);
        } catch (e) {
          const synonyms = exactMatch.synonyms.split(',').map((s) => s.trim());
          searchTerms.push(...synonyms);
        }
      }

      // If no database synonyms found, use hardcoded ones
      if (searchTerms.length === 1) {
        const lowerQuery = query.toLowerCase();
        for (const [term, synonyms] of Object.entries(hardcodedSynonyms)) {
          if (term.includes(lowerQuery) || lowerQuery.includes(term)) {
            searchTerms.push(...synonyms);
          }
        }

        // Also check if query matches any synonym directly
        for (const [term, synonyms] of Object.entries(hardcodedSynonyms)) {
          if (
            synonyms.some(
              (synonym) =>
                synonym.includes(lowerQuery) || lowerQuery.includes(synonym),
            )
          ) {
            searchTerms.push(term, ...synonyms);
          }
        }
      }

      // Remove duplicates and return
      return [...new Set(searchTerms)].filter((term) => term.length > 0);
    } catch (error) {
      // If Keyword table doesn't exist or there's an error, use hardcoded synonyms
      console.warn(
        'Keyword table not available, using hardcoded synonyms:',
        error,
      );

      const lowerQuery = query.toLowerCase();
      for (const [term, synonyms] of Object.entries(hardcodedSynonyms)) {
        if (term.includes(lowerQuery) || lowerQuery.includes(term)) {
          searchTerms.push(...synonyms);
        }
      }

      // Also check if query matches any synonym directly
      for (const [term, synonyms] of Object.entries(hardcodedSynonyms)) {
        if (
          synonyms.some(
            (synonym) =>
              synonym.includes(lowerQuery) || lowerQuery.includes(synonym),
          )
        ) {
          searchTerms.push(term, ...synonyms);
        }
      }

      return [...new Set(searchTerms)].filter((term) => term.length > 0);
    }
  }

  /**
   * Calculate Levenshtein distance for fuzzy matching
   */
  private levenshteinDistance(a: string, b: string): number {
    const matrix = [];

    // Increment along the first column of each row
    for (let i = 0; i <= b.length; i++) {
      matrix[i] = [i];
    }

    // Increment each column in the first row
    for (let j = 0; j <= a.length; j++) {
      matrix[0][j] = j;
    }

    // Fill in the rest of the matrix
    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        if (b.charAt(i - 1) === a.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1, // substitution
            matrix[i][j - 1] + 1, // insertion
            matrix[i - 1][j] + 1, // deletion
          );
        }
      }
    }

    return matrix[b.length][a.length];
  }

  /**
   * Check if two strings are similar using fuzzy matching
   */
  private isFuzzyMatch(
    str1: string,
    str2: string,
    threshold: number = 2,
  ): boolean {
    const distance = this.levenshteinDistance(
      str1.toLowerCase(),
      str2.toLowerCase(),
    );
    const maxLength = Math.max(str1.length, str2.length);
    return distance <= threshold && distance <= maxLength * 0.3;
  }

  /**
   * Search doctors with fuzzy matching and synonym expansion
   */
  private async searchDoctors(
    searchTerms: string[],
    limit: number = 5,
  ): Promise<SearchSuggestion[]> {
    const allDoctors = await this.prisma.doctor.findMany({
      include: {
        specialty: true,
      },
    });

    const suggestions: SearchSuggestion[] = [];

    for (const doctor of allDoctors) {
      const fullName =
        `${doctor.firstName || ''} ${doctor.lastName || ''}`.trim();
      const specialtyName = doctor.specialty?.name || '';

      for (const term of searchTerms) {
        if (
          this.isFuzzyMatch(term, fullName) ||
          this.isFuzzyMatch(term, specialtyName) ||
          (doctor.medicalCode && this.isFuzzyMatch(term, doctor.medicalCode))
        ) {
          suggestions.push({
            type: 'doctor',
            id: doctor.id,
            name: fullName,
            display: `${fullName} - ${specialtyName} (Doctor)`,
          });
          break; // Avoid duplicate entries for the same doctor
        }
      }
    }

    return suggestions.slice(0, limit);
  }

  /**
   * Search specialties with fuzzy matching and synonym expansion
   */
  private async searchSpecialties(
    searchTerms: string[],
    limit: number = 5,
  ): Promise<SearchSuggestion[]> {
    const allSpecialties = await this.prisma.specialty.findMany();

    const suggestions: SearchSuggestion[] = [];

    for (const specialty of allSpecialties) {
      for (const term of searchTerms) {
        if (this.isFuzzyMatch(term, specialty.name)) {
          suggestions.push({
            type: 'specialty',
            id: specialty.id,
            name: specialty.name,
            display: `${specialty.name} (Specialty)`,
          });
          break;
        }
      }
    }

    return suggestions.slice(0, limit);
  }

  /**
   * Search diseases with fuzzy matching and synonym expansion
   */
  private async searchDiseases(
    searchTerms: string[],
    limit: number = 5,
  ): Promise<SearchSuggestion[]> {
    try {
      const allDiseases = await this.prisma.disease.findMany();

      const suggestions: SearchSuggestion[] = [];

      for (const disease of allDiseases) {
        for (const term of searchTerms) {
          if (this.isFuzzyMatch(term, disease.name)) {
            suggestions.push({
              type: 'disease',
              id: disease.id,
              name: disease.name,
              display: `${disease.name} (Disease)`,
            });
            break;
          }
        }
      }

      return suggestions.slice(0, limit);
    } catch (error) {
      // If Disease table doesn't exist, return empty array
      console.warn('Disease table not available:', error);
      return [];
    }
  }

  /**
   * Search clinics with fuzzy matching and synonym expansion
   */
  private async searchClinics(
    searchTerms: string[],
    limit: number = 5,
  ): Promise<SearchSuggestion[]> {
    const allClinics = await this.prisma.clinic.findMany();

    const suggestions: SearchSuggestion[] = [];

    for (const clinic of allClinics) {
      for (const term of searchTerms) {
        if (
          this.isFuzzyMatch(term, clinic.name || '') ||
          (clinic.description && this.isFuzzyMatch(term, clinic.description))
        ) {
          suggestions.push({
            type: 'clinic',
            id: clinic.id,
            name: clinic.name || 'Unnamed Clinic',
            display: `${clinic.name} (Clinic)`,
          });
          break;
        }
      }
    }

    return suggestions.slice(0, limit);
  }

  /**
   * Main search function that implements Elasticsearch-like autocomplete
   */
  async elasticSearch(
    query: string,
    types: string[] = ['doctor', 'specialty', 'disease', 'clinic'],
  ): Promise<SearchResponse> {
    if (!query || query.trim().length === 0) {
      return {
        query,
        types,
        total: 0,
        suggestions: [],
      };
    }

    // Expand query with synonyms
    const searchTerms = await this.expandQueryWithSynonyms(query);
    console.log('Expanded search terms:', searchTerms);

    const allSuggestions: SearchSuggestion[] = [];
    const searchPromises: Promise<SearchSuggestion[]>[] = [];

    // Search across all requested types
    if (types.includes('doctor')) {
      searchPromises.push(this.searchDoctors(searchTerms, 5));
    }

    if (types.includes('specialty')) {
      searchPromises.push(this.searchSpecialties(searchTerms, 5));
    }

    if (types.includes('disease')) {
      searchPromises.push(this.searchDiseases(searchTerms, 5));
    }

    if (types.includes('clinic')) {
      searchPromises.push(this.searchClinics(searchTerms, 5));
    }

    // Wait for all searches to complete
    const results = await Promise.all(searchPromises);
    results.forEach((suggestions) => allSuggestions.push(...suggestions));

    // Sort by relevance (exact matches first, then fuzzy matches)
    const sortedSuggestions = allSuggestions.sort((a, b) => {
      const aName = a.name.toLowerCase();
      const bName = b.name.toLowerCase();
      const queryLower = query.toLowerCase();

      // Exact matches at the beginning
      const aStartsWith = aName.startsWith(queryLower);
      const bStartsWith = bName.startsWith(queryLower);

      if (aStartsWith && !bStartsWith) return -1;
      if (!aStartsWith && bStartsWith) return 1;

      // Then by type priority
      const typePriority = { doctor: 0, specialty: 1, disease: 2, clinic: 3 };
      return typePriority[a.type] - typePriority[b.type];
    });

    return {
      query,
      types,
      total: sortedSuggestions.length,
      suggestions: sortedSuggestions,
    };
  }

  /**
   * Alternative implementation using MySQL LIKE for better performance
   * This uses MySQL's pattern matching instead of in-memory fuzzy matching
   */
  async mysqlSearch(
    query: string,
    types: string[] = ['doctor', 'specialty', 'disease', 'clinic'],
  ): Promise<SearchResponse> {
    if (!query || query.trim().length === 0) {
      return {
        query,
        types,
        total: 0,
        suggestions: [],
      };
    }

    // Expand query with synonyms
    const searchTerms = await this.expandQueryWithSynonyms(query);
    console.log('Expanded search terms for MySQL:', searchTerms);

    const allSuggestions: SearchSuggestion[] = [];
    const searchPromises: Promise<SearchSuggestion[]>[] = [];

    // Search doctors using MySQL LIKE
    if (types.includes('doctor')) {
      searchPromises.push(
        this.prisma.doctor
          .findMany({
            where: {
              OR: searchTerms.flatMap((term) => [
                { firstName: { contains: term, mode: 'insensitive' } },
                { lastName: { contains: term, mode: 'insensitive' } },
                { medicalCode: { contains: term, mode: 'insensitive' } },
                {
                  specialty: { name: { contains: term, mode: 'insensitive' } },
                },
              ]),
            },
            include: { specialty: true },
            take: 5,
          })
          .then((doctors) =>
            doctors.map((doctor) => ({
              type: 'doctor' as const,
              id: doctor.id,
              name: `${doctor.firstName || ''} ${doctor.lastName || ''}`.trim(),
              display: `${doctor.firstName || ''} ${doctor.lastName || ''} - ${doctor.specialty?.name || 'Unknown'} (Doctor)`,
            })),
          ),
      );
    }

    // Search specialties using MySQL LIKE
    if (types.includes('specialty')) {
      searchPromises.push(
        this.prisma.specialty
          .findMany({
            where: {
              OR: searchTerms.map((term) => ({
                name: { contains: term, mode: 'insensitive' },
              })),
            },
            take: 5,
          })
          .then((specialties) =>
            specialties.map((specialty) => ({
              type: 'specialty' as const,
              id: specialty.id,
              name: specialty.name,
              display: `${specialty.name} (Specialty)`,
            })),
          ),
      );
    }

    // Search diseases using MySQL LIKE
    if (types.includes('disease')) {
      try {
        searchPromises.push(
          this.prisma.disease
            .findMany({
              where: {
                OR: searchTerms.map((term) => ({
                  name: { contains: term, mode: 'insensitive' },
                })),
              },
              take: 5,
            })
            .then((diseases) =>
              diseases.map((disease) => ({
                type: 'disease' as const,
                id: disease.id,
                name: disease.name,
                display: `${disease.name} (Disease)`,
              })),
            ),
        );
      } catch (error) {
        // If Disease table doesn't exist, skip
        console.warn('Disease table not available for MySQL search:', error);
        searchPromises.push(Promise.resolve([]));
      }
    }

    // Search clinics using MySQL LIKE
    if (types.includes('clinic')) {
      searchPromises.push(
        this.prisma.clinic
          .findMany({
            where: {
              OR: searchTerms.flatMap((term) => [
                { name: { contains: term, mode: 'insensitive' } },
                { description: { contains: term, mode: 'insensitive' } },
              ]),
            },
            take: 5,
          })
          .then((clinics) =>
            clinics.map((clinic) => ({
              type: 'clinic' as const,
              id: clinic.id,
              name: clinic.name || 'Unnamed Clinic',
              display: `${clinic.name} (Clinic)`,
            })),
          ),
      );
    }

    // Wait for all searches to complete
    const results = await Promise.all(searchPromises);
    results.forEach((suggestions) => allSuggestions.push(...suggestions));

    // Remove duplicates based on type and id
    const uniqueSuggestions = allSuggestions.filter(
      (suggestion, index, self) =>
        index ===
        self.findIndex(
          (s) => s.type === suggestion.type && s.id === suggestion.id,
        ),
    );

    return {
      query,
      types,
      total: uniqueSuggestions.length,
      suggestions: uniqueSuggestions,
    };
  }
}
