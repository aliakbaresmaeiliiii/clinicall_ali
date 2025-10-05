# Elasticsearch-like Search Service Implementation

This document describes the implementation of an Elasticsearch-like search service using Prisma and MySQL with autocomplete, fuzzy matching, and synonym support.

## Overview

The search service provides two main implementations:

1. **Fuzzy Search** - Uses Levenshtein distance algorithm for typo tolerance (slower but more accurate)
2. **MySQL Search** - Uses MySQL LIKE queries with synonym expansion (faster, good performance)

## Database Schema Changes

### New Tables Added

#### Keyword Table
```prisma
model Keyword {
  id        Int      @id @default(autoincrement())
  term      String   @unique
  synonyms  String   // JSON array of synonyms
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("keywords")
}
```

#### Disease Table
```prisma
model Disease {
  id          Int      @id @default(autoincrement())
  name        String   @unique
  description String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@map("diseases")
}
```

## API Endpoints

### 1. Autocomplete Search (Recommended)
**Endpoint:** `GET /search-enhanced/autocomplete?q={query}&types={types}`

**Parameters:**
- `q` (required): Search query
- `types` (optional): Comma-separated list of types to search (doctor, specialty, disease, clinic)

**Example:**
```bash
GET /search-enhanced/autocomplete?q=dentis&types=doctor,specialty,clinic
```

**Response:**
```json
{
  "query": "dentis",
  "types": ["doctor", "specialty", "clinic"],
  "total": 3,
  "suggestions": [
    {
      "type": "specialty",
      "id": 21,
      "name": "Dentistry",
      "display": "Dentistry (Specialty)"
    },
    {
      "type": "doctor",
      "id": 45,
      "name": "Dr. John Smith",
      "display": "Dr. John Smith - Dentistry (Doctor)"
    },
    {
      "type": "clinic",
      "id": 12,
      "name": "Dental Care Center",
      "display": "Dental Care Center (Clinic)"
    }
  ]
}
```

### 2. Fuzzy Search
**Endpoint:** `GET /search-enhanced/fuzzy?q={query}&types={types}`

**Parameters:** Same as autocomplete

**Note:** This uses in-memory fuzzy matching and is slower but more accurate for typos.

### 3. Synonym Testing
**Endpoint:** `GET /search-enhanced/test-synonyms?q={query}`

**Example:**
```bash
GET /search-enhanced/test-synonyms?q=tooth
```

**Response:**
```json
{
  "originalQuery": "tooth",
  "expandedTerms": ["tooth", "dentist", "dentistry", "dental", "teeth", "oral"]
}
```

## Features

### 1. Synonym Expansion
- Queries are automatically expanded with related terms
- Example: "tooth" → ["dentist", "dentistry", "dental", "teeth", "oral"]
- Synonyms are stored in the Keyword table

### 2. Fuzzy Matching
- **Levenshtein distance** algorithm for typo tolerance
- Example: "dentis" matches "Dentistry", "Dentist"
- Configurable threshold for similarity

### 3. Autocomplete
- Partial matches supported
- Results sorted by relevance (exact matches first)
- Limit of 5 results per type

### 4. Multi-type Search
- Search across multiple entity types simultaneously
- Supported types: doctor, specialty, disease, clinic
- Results merged into unified response

## Implementation Details

### SearchEnhancedService

#### Key Methods:

1. **`expandQueryWithSynonyms(query: string)`**
   - Expands search query using synonyms from Keyword table
   - Gracefully handles missing Keyword table

2. **`mysqlSearch(query: string, types: string[])`**
   - Uses MySQL LIKE queries for performance
   - Supports case-insensitive search
   - Returns unified results

3. **`elasticSearch(query: string, types: string[])`**
   - Uses in-memory fuzzy matching
   - More accurate for typos but slower
   - Good for smaller datasets

#### Fuzzy Matching Algorithm:
```typescript
private isFuzzyMatch(str1: string, str2: string, threshold: number = 2): boolean
```
- Uses Levenshtein distance
- Configurable threshold (default: 2 character differences)
- Considers string length for relative matching

## Setup Instructions

### 1. Database Migration
```bash
# Generate and run migration for new tables
npx prisma migrate dev --name add-keyword-disease-tables
```

### 2. Seed Keywords
```bash
# Run the keyword seed script
npx ts-node prisma/seed-keywords.ts
```

### 3. Test the Implementation
```bash
# Start the server
npm run start:dev

# Test search endpoints
curl "http://localhost:3000/search-enhanced/autocomplete?q=dentis"
curl "http://localhost:3000/search-enhanced/test-synonyms?q=tooth"
```

## Performance Considerations

### Use Cases:

1. **For Production (Large datasets):** Use `mysqlSearch` (autocomplete endpoint)
   - Better performance with database indexing
   - Suitable for real-time search

2. **For Development/Small datasets:** Use `elasticSearch` (fuzzy endpoint)
   - Better typo tolerance
   - More accurate matching

### Optimization Tips:

1. Add database indexes on searchable fields:
   - `name` fields in all tables
   - `firstName`, `lastName` in Doctor table

2. Consider MySQL FULLTEXT indexes for better text search

3. Cache frequently searched terms

## Example Usage Scenarios

### Scenario 1: Dental Search
```
Query: "dentis"
Expanded: ["dentis", "dentist", "dentistry", "dental", "tooth", "teeth", "oral"]
Results: Dentistry specialty, Dentist doctors, Dental clinics
```

### Scenario 2: Heart-related Search
```
Query: "heart"
Expanded: ["heart", "cardiac", "cardiovascular", "chest"]
Results: Cardiology specialty, Cardiologist doctors
```

### Scenario 3: Typo Tolerance
```
Query: "dermatolgy" (typo)
Matches: "Dermatology" (specialty), Dermatologist doctors
```

## Troubleshooting

### Common Issues:

1. **Keyword table not found:** Service gracefully falls back to basic search
2. **No results:** Check if entities exist in database
3. **Slow performance:** Use MySQL search instead of fuzzy search

### Debugging:

1. Use the test-synonyms endpoint to verify query expansion
2. Check console logs for expanded search terms
3. Verify database tables and seed data

## Future Enhancements

1. **MySQL FULLTEXT Search:** Implement native MySQL full-text search
2. **Search Ranking:** Add relevance scoring based on multiple factors
3. **Search Analytics:** Track popular searches and results
4. **Caching:** Implement Redis caching for frequent queries
5. **Advanced Synonyms:** Support for phrase synonyms and context-aware expansion
