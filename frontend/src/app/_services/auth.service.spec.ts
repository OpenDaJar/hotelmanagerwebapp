import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';

import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

fdescribe('AuthService', () => {
  const AUTH_API = 'http://localhost:6868/api/auth/';
  let authService: AuthService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });
    authService = TestBed.inject(AuthService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('service created', () => {
    expect(authService).toBeTruthy();
  });

  it('login API', () => {
    const testData = {
      id: 1,
      username: 'admin',
      email: 'admin@admin.com',
      role: 'admin',
      isDisabled: false,
    };
    const testUser = {
      username: 'admin',
      password: '123456',
    };
    authService
      .login(testUser.username, testUser.password)
      .subscribe((data) => {
        expect(data).toEqual(testData);
      });
    const req = httpTestingController.expectOne(AUTH_API + 'signin');
    expect(req.request.method).toEqual('POST');
    req.flush(testData);
    httpTestingController.verify();
  });

  it('register API', () => {
    const testData = {
      username: 'admin',
      password: '123456',
      email: 'admin@admin.com',
      role: 'admin',
      isDisabled: false,
    };
    const testMsg = { message: 'User registered successfully!' };
    authService
      .register(
        testData.username,
        testData.email,
        testData.password,
        testData.role
      )
      .subscribe((data) => {
        expect(data).toEqual(testMsg);
      });
    const req = httpTestingController.expectOne(AUTH_API + 'signup');
    expect(req.request.method).toEqual('POST');
    req.flush(testMsg);
    httpTestingController.verify();
  });

  it('signout API', () => {
    const testMsg = {"message": "You've been signed out!"}
    authService.logout().subscribe((data)=>{
      expect(data).toEqual(testMsg)
    })
    const req = httpTestingController.expectOne(AUTH_API + 'signout');
    expect(req.request.method).toEqual('POST');
    req.flush(testMsg);
    httpTestingController.verify()
  });
});
