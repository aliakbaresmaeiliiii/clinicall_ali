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
export class SearchSimpleService {
  constructor(private prisma: PrismaService) {}

  /**
   * Expand search query with hardcoded synonyms
   */
  private expandQueryWithSynonyms(query: string): string[] {
    const searchTerms = [query.toLowerCase()];

    // Hardcoded synonyms for medical/healthcare terms
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

    const lowerQuery = query.toLowerCase();

    // Add synonyms for exact matches
    if (hardcodedSynonyms[lowerQuery]) {
      searchTerms.push(...hardcodedSynonyms[lowerQuery]);
    }

    // Add synonyms for partial matches
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

    // Remove duplicates and return
    return [...new Set(searchTerms)].filter((term) => term.length > 0);
  }

  /**
   * Main search function that implements Elasticsearch-like autocomplete
   */
  async search(
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
    const searchTerms = this.expandQueryWithSynonyms(query);
    console.log('Expanded search terms:', searchTerms);

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

    // Search diseases - using placeholder since Disease table might not exist
    if (types.includes('disease')) {
      // For now, return placeholder disease suggestions
      const diseaseSuggestions: SearchSuggestion[] = [
        {
          type: 'disease' as const,
          id: 1,
          name: 'Diabetes',
          display: 'Diabetes (Disease)',
        },
        {
          type: 'disease' as const,
          id: 2,
          name: 'Hypertension',
          display: 'Hypertension (Disease)',
        },
        {
          type: 'disease' as const,
          id: 3,
          name: 'Asthma',
          display: 'Asthma (Disease)',
        },
        {
          type: 'disease' as const,
          id: 4,
          name: 'Arthritis',
          display: 'Arthritis (Disease)',
        },
        {
          type: 'disease' as const,
          id: 5,
          name: 'Migraine',
          display: 'Migraine (Disease)',
        },
      ]
        .filter((disease) =>
          searchTerms.some((term) =>
            disease.name.toLowerCase().includes(term.toLowerCase()),
          ),
        )
        .slice(0, 5);

      searchPromises.push(Promise.resolve(diseaseSuggestions));
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

    // Sort by relevance (exact matches first)
    const sortedSuggestions = uniqueSuggestions.sort((a, b) => {
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
   * Test synonym expansion
   */
  async testSynonyms(query: string) {
    const expandedTerms = this.expandQueryWithSynonyms(query);

    return {
      originalQuery: query,
      expandedTerms,
    };
  }
}
