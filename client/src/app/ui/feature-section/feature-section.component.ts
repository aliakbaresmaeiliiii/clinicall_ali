/**
 * FEATURE SECTION COMPONENT
 * Main landing page component that showcases healthcare services and features
 * Includes hero section, services grid, statistics, and doctor search functionality
 */
import { AfterViewInit, Component, inject, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import AOS from 'aos';
import { interval, takeWhile } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import Swiper from 'swiper';
import { AmazonService } from '../shared-ui/services/amazon.service';
import { SearchService, SearchResult } from './search.service';

@Component({
  selector: 'app-feature-section',
  templateUrl: './feature-section.component.html',
  styleUrl: './feature-section.component.scss',
  standalone: false,
})
export class FeatureSectionComponent implements OnInit, AfterViewInit {
  
  // Counter for statistics animation
  counter: number = 0;
  maxCounter: number = 20;
  
  // Loading state
  isLoading = false;
  
  // Dependency injection
  router = inject(Router);
  awsService = inject(AmazonService);
  searchService = inject(SearchService);
  
  // Exchange rate for pricing (if applicable)
  exchangeRate = 42000;

  // SEARCH FUNCTIONALITY PROPERTIES
  // Form control for search input
  searchControl = new FormControl('');
  
  // Search results array
  searchResults: SearchResult[] = [];
  
  // Popular searches for suggestions
  popularSearches: SearchResult[] = [];
  
  // Loading state for search
  isSearching = false;
  
  // Visibility state for suggestions dropdown
  showSuggestions = false;

  // AWS file management properties
  fileUrls: string[] = [];
  imageUrl: any;
 
  // Service cards data for features grid
  cartInfo = [
    {
      title: 'Online medical & hospital consultation',
      image: '/assets/images/hospital.jpg',
      subtitle: '',
      description: 'Rapidiously reinvent long-term impact collaboration',
      paragraph: '180 Doctors',
    },
    {
      title: 'In-person doctor visit',
      image: '/assets/images/online.jpg',
      subtitle: '',
      description: 'Seamlessly schedule appointments with nearby doctors.',
      paragraph: '120 Clinics Available',
    },
    {
      title: 'Order prescription medicines',
      image: '/assets/images/ui/fragile-x-drug-combination.jpg',
      subtitle: '',
      description: 'Get your medicines delivered right to your doorstep.',
      paragraph: '500+ Medications Available',
    },
    {
      title: 'Health check-up packages',
      image: '/assets/images/ui/discount.jpg',
      subtitle: '',
      description: 'Comprehensive health check-up plans for your wellbeing.',
      paragraph: '40% Discount on Packages',
    },
  ];

  /**
   * Component initialization lifecycle hook
   * Sets up counter animation, search functionality, and popular searches
   */
  ngOnInit() {
    this.incrementCounter();
    this.setupSearch();
    this.loadPopularSearches();
    // AOS.init({ disable: 'mobile' });
  }

  /**
   * After view initialization lifecycle hook
   * Initializes AOS (Animate On Scroll) library for scroll animations
   */
  ngAfterViewInit(): void {
    AOS.init()
    AOS.refresh();
  }
 
  /**
   * Fetches image from AWS S3 storage
   * Converts blob response to object URL for display
   */
  getImageFromAWS() {
    this.awsService.listFolderContents().subscribe({
      next: (blob: Blob) => {
        this.imageUrl = URL.createObjectURL(blob); // Convert Blob to Object URL
      },
      error: err => {
        console.error('Error fetching the image:', err);
      },
    });
  }

  // Sample doctor data for display
  doctors = [
    {
      name: 'Dr. Sarah Johnson',
      specialty: 'Cardiologist',
      rating: 4.9,
      experience: 12,
      location: 'Downtown Medical Center',
      image: '../../../assets/images/ui/doctors/1.jpg'
    },
    {
      name: 'Dr. Michael Chen',
      specialty: 'Neurologist',
      rating: 4.8,
      experience: 15,
      location: 'City General Hospital',
      image: '../../../assets/images/ui/doctors/2.jpg'
    },
    {
      name: 'Dr. Emily Rodriguez',
      specialty: 'Pediatrician',
      rating: 4.9,
      experience: 8,
      location: 'Childrens Health Center',
      image: '../../../assets/images/ui/doctors/3.jpg'
    },
    {
      name: 'Dr. Robert Kim',
      specialty: 'Orthopedic Surgeon',
      rating: 4.7,
      experience: 20,
      location: 'Sports Medicine Institute',
      image: '../../../assets/images/ui/doctors/4.jpg'
    }
  ];

  /**
   * Increments counter with animation effect
   * Uses RxJS interval to create counting animation
   */
  incrementCounter(): void {
    interval(80)
      .pipe(takeWhile(() => this.counter < this.maxCounter))
      .subscribe(() => {
        this.counter++;
      });
  }

  /**
   * Scrolls to services section smoothly
   * Uses native scrollIntoView API with smooth behavior
   */
  scrollToServices(): void {
    const element = document.getElementById('services');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  /**
   * Returns service icon based on index
   * @param index - Index of the service card
   * @returns Emoji icon string
   */
  getServiceIcon(index: number): string {
    const icons = ['🏥', '👨‍⚕️', '💊', '📋'];
    return icons[index] || '🏥';
  }

  /**
   * Sets up search functionality with RxJS operators
   * - debounceTime: Waits 300ms after user stops typing
   * - distinctUntilChanged: Only emits when value changes
   * - switchMap: Cancels previous requests on new input
   */
  private setupSearch(): void {
    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => {
        this.isSearching = true;
        this.showSuggestions = true;
      }),
      switchMap(query => this.searchService.search(query || ''))
    ).subscribe({

      next: (results) => {
        this.searchResults = results;
        this.isSearching = false;
        console.log('Search results:', results);
      },
      error: (error) => {
        console.error('Search error:', error);
        this.isSearching = false;
        this.searchResults = [];
      }
    });
  }

  /**
   * Loads popular searches for suggestions
   * Used when search input is empty or no results found
   */
  private loadPopularSearches(): void {
    this.searchService.getPopularSearches().subscribe({
      next: (results) => {
        this.popularSearches = results;
      },
      error: () => {
        this.popularSearches = [];
      }
    });
  }

  /**
   * Handles search input focus event
   * Shows suggestions if input is empty and popular searches are available
   */
  onSearchFocus(): void {
    if (!this.searchControl.value && this.popularSearches.length > 0) {
      this.showSuggestions = true;
    }
  }

  /**
   * Handles search input blur event
   * Delays hiding suggestions to allow for click events on dropdown items
   */
  onSearchBlur(): void {
    // Delay hiding suggestions to allow for click events
    setTimeout(() => {
      this.showSuggestions = false;
    }, 200);
  }

  /**
   * Handles selection of a search result
   * Sets search input value, hides suggestions, and navigates based on result type
   * @param result - Selected search result
   */
  selectSearchResult(result: SearchResult): void {
    this.searchControl.setValue(result.name);
    this.showSuggestions = false;
    
    // Navigate based on result type
    switch (result.type) {
      case 'doctor':
        this.router.navigate(['/doctors'], { queryParams: { search: result.name } });
        break;
      case 'specialty':
        this.router.navigate(['/doctors'], { queryParams: { specialty: result.name } });
        break;
      case 'disease':
        this.router.navigate(['/doctors'], { queryParams: { condition: result.name } });
        break;
      case 'clinic':
        this.router.navigate(['/clinics'], { queryParams: { search: result.name } });
        break;
    }
  }

  /**
   * Clears search input and results
   * Resets search state and hides suggestions
   */
  clearSearch(): void {
    this.searchControl.setValue('');
    this.searchResults = [];
    this.showSuggestions = false;
  }

  /**
   * Returns appropriate icon for search result type
   * @param type - Type of search result (doctor, specialty, disease, clinic)
   * @returns Emoji icon string
   */
  getTypeIcon(type: string): string {
    switch (type) {
      case 'doctor': return '👨‍⚕️';
      case 'specialty': return '🏥';
      case 'disease': return '🩺';
      case 'clinic': return '🏢';
      default: return '🔍';
    }
  }

  /**
   * Returns color code for search result type
   * Used for visual categorization in UI
   * @param type - Type of search result
   * @returns Hex color code
   */
  getTypeColor(type: string): string {
    switch (type) {
      case 'doctor': return '#4f46e5'; // Indigo
      case 'specialty': return '#10b981'; // Emerald
      case 'disease': return '#ef4444'; // Red
      case 'clinic': return '#f59e0b'; // Amber
      default: return '#6b7280'; // Gray
    }
  }

  /**
   * Groups search results by type for organized display
   * @param results - Array of search results
   * @returns Array of grouped results with type name and items
   */
  getGroupedResults(results: SearchResult[]): any[] {
    const grouped = results.reduce((acc, result) => {
      if (!acc[result.type]) {
        acc[result.type] = [];
      }
      acc[result.type].push(result);
      return acc;
    }, {} as Record<string, SearchResult[]>);

    return Object.keys(grouped).map(type => ({
      name: type,
      results: grouped[type]
    }));
  }

  /**
   * Returns display name for search result type
   * @param type - Type of search result
   * @returns Human-readable display name
   */
  getTypeDisplayName(type: string): string {
    switch (type) {
      case 'doctor': return 'Doctors';
      case 'specialty': return 'Specialties';
      case 'disease': return 'Conditions';
      case 'clinic': return 'Clinics';
      default: return type;
    }
  }

  /**
   * Provides default description for search results when none is available
   * @param result - Search result object
   * @returns Default description string
   */
  getDefaultDescription(result: SearchResult): string {
    switch (result.type) {
      case 'doctor':
        return `Medical professional specializing in ${result.specialty || 'healthcare'}`;
      case 'specialty':
        return `Medical specialty focusing on ${result.name.toLowerCase()}`;
      case 'disease':
        return `Medical condition requiring professional care`;
      case 'clinic':
        return `Healthcare facility providing medical services`;
      default:
        return 'Healthcare service provider';
    }
  }

  /**
   * Converts numeric rating to star display
   * @param rating - Numeric rating (0-5)
   * @returns String of star emojis representing the rating
   */
  getStarRating(rating: number): string {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    
    return '⭐'.repeat(fullStars) + (halfStar ? '⭐' : '') + '☆'.repeat(emptyStars);
  }

}
