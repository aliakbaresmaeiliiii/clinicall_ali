import { TestBed } from '@angular/core/testing';

import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { NavItemsService } from './nav-items.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('NavItemsService', () => {
  let service: NavItemsService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [NoopAnimationsModule],
    providers: [NavItemsService, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});

    service = TestBed.inject(NavItemsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });
  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // describe('#getNavItems', () => {
  //   it('should return expected navigation items', () => {
  //     const mockNavItems: NavItem[] = [
  //       { menu_id: 56, menu_name: 'sdf', url: '/', },
  //       { menu_id: 8, menu_name: 'Abodsfsdfut', url: '/about' }
  //     ];
  //     service.getNavItems().subscribe(nav => {
  //       expect(nav).toEqual(mockNavItems);
  //     });
  //     const req = httpTestingController.expectOne(
  //       `${service.apiEndPoint}navItem`
  //     );
  //     expect(req.request.method).toEqual('GET');
  //     req.flush(mockNavItems)
  //   });
  // });
  describe('#getNavItems', () => {
    it('should return expected navigation items', () => {
      // Define mock data that the service is expected to return
      const mockNavItems= [
        { id: 1, ali: 'Home', url: '/' },
        { id: 2, aslkjf: 'About', url: '/about' }
      ];

      // Call the getNavItems method and subscribe to the result
      service.getNavItems().subscribe(navItems => {
        // Verify that the result matches the mock data
        // expect(navItems).toContain(mockNavItems);
      });

      // Expect that a GET request was made to the correct URL
      const req = httpTestingController.expectOne(`${service.config}navItem`);
      expect(req.request.method).toEqual('GET');

      // Respond with the mock data
      // req.flush(mockNavItems);
    });
  });
});
