import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import * as mockRaw from '../../../data/user.json';
import { AuthService } from './auth.service';
import { CookieService } from 'ngx-cookie-service';
import { of } from 'rxjs/internal/observable/of';

describe('AuthService', () => {
  let service: AuthService;
  let mockUser: any = (mockRaw as any).default
  let mockCookieService;
  let httpClientSpy: { post: jasmine.Spy }

  beforeEach(() => {
    mockCookieService = jasmine.createSpyObj('CookieService', ['get','check', 'set', 'delete']);
    mockCookieService.check.and.returnValue(true);
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        { provide: CookieService, useValue: mockCookieService }
      ]
    });
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post'])
    service = new AuthService(httpClientSpy as any, mockCookieService);
  });

  it('component should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Should return object with data and token session', 
  (done: DoneFn) => {
    const user: any = mockUser.userOk
    const mockResponse = {
      data: {},
      tokenSession: '0x0x0x'
    }

    httpClientSpy.post.and.returnValue(
      of(mockResponse)
    )

    service.sendCredentials(user.email, user.password)
    .subscribe(responseApi => {
      const getProperties = Object.keys(responseApi)
      expect(getProperties).toContain('data')
      expect(getProperties).toContain('tokenSession')
      done()
    })
  });
});
