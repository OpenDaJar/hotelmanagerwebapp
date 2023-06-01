import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';

import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { of, throwError } from 'rxjs';

describe('AuthService', () => {
  // const AUTH_API = 'http://localhost:6868/api/auth/';
  let authService: AuthService;
  let httpClientSpy: { post: jasmine.Spy };

  // let httpClient: HttpClient;
  // let httpTestingController: HttpTestingController;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);

    TestBed.configureTestingModule({
      imports: [],
      providers: [
        AuthService,
        { provide: HttpClient, useValue: httpClientSpy },
      ],
    });
    authService = TestBed.inject(AuthService);
    // httpClient = TestBed.inject(HttpClient);
    // httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('service created', () => {
    expect(authService).toBeTruthy();
  });

  //login
  it('should login - 200', (done: DoneFn) => {
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

    const testMsg = {
      status: 200,
      message: testData,
    };

    httpClientSpy.post.and.returnValue(of(testMsg.message));
    authService.login(testUser.username, testUser.password).subscribe({
      next: (res) => {
        expect(res).toBe(testMsg.message);
        done();
      },
      error: done.fail,
    });
    expect(httpClientSpy.post.calls.count()).toBe(1);
  });

  it('should login - 404 not found', (done: DoneFn) => {
    const testUser = {
      username: 'admin',
      password: '123456',
    };
    const testMsg = {
      status: 404,
      message: 'User Not found.',
    };
    const errorResponse = new HttpErrorResponse({
      error: `test ${testMsg.status} error`,
      status: testMsg.status,
      statusText: testMsg.message,
    });

    httpClientSpy.post.and.returnValue(throwError(() => errorResponse));
    authService.login(testUser.username, testUser.password).subscribe({
      error: (e) => {
        expect(e.message).toContain(testMsg.message);
        done();
      },
    });
    expect(httpClientSpy.post.calls.count()).toBe(1);
  });

  it('should login - 401 invalid password', (done: DoneFn) => {
    const testUser = {
      username: 'admin',
      password: '1111x',
    };
    const testMsg = {
      status: 401,
      message: 'Invalid Password!',
    };
    const errorResponse = new HttpErrorResponse({
      error: `test ${testMsg.status} error`,
      status: testMsg.status,
      statusText: testMsg.message,
    });

    httpClientSpy.post.and.returnValue(throwError(() => errorResponse));
    authService.login(testUser.username, testUser.password).subscribe({
      error: (e) => {
        expect(e.message).toContain(testMsg.message);
        done();
      },
    });
    expect(httpClientSpy.post.calls.count()).toBe(1);
  });

  it('should login - 403 user account is Disabled', (done: DoneFn) => {
    const testUser = {
      username: 'admin',
      password: '123456',
    };
    const testMsg = {
      status: 403,
      message: 'User account is Disabled',
    };
    const errorResponse = new HttpErrorResponse({
      error: `test ${testMsg.status} error`,
      status: testMsg.status,
      statusText: testMsg.message,
    });

    httpClientSpy.post.and.returnValue(throwError(() => errorResponse));
    authService.login(testUser.username, testUser.password).subscribe({
      error: (e) => {
        expect(e.message).toContain(testMsg.message);
        done();
      },
    });
    expect(httpClientSpy.post.calls.count()).toBe(1);
  });
  //register
  it('should register - 200', (done: DoneFn) => {
    const testData = {
      username: 'admin',
      password: '123456',
      email: 'admin@admin.com',
      role: 'admin',
    };
    const testMsg = {
      status: 200,
      message: 'User registered successfully!',
    };

    httpClientSpy.post.and.returnValue(of(testMsg.message));
    authService
      .register(
        testData.username,
        testData.email,
        testData.password,
        testData.role
      )
      .subscribe({
        next: (res) => {
          expect(res).toBe(testMsg.message);
          done();
        },
        error: done.fail,
      });
    expect(httpClientSpy.post.calls.count()).toBe(1);
  });

  it('should register - 400 username already exists',(done:DoneFn)=>{
    const testData = {
      username: 'admin',
      password: '123456',
      email: 'admin@admin.com',
      role: 'admin',
    };
    const testMsg = {
      status: 400,
      message: "Failed! Username is already in use!",
    };
    const errorResponse = new HttpErrorResponse({
      error: `test ${testMsg.status} error`,
      status: testMsg.status,
      statusText: testMsg.message,
    });
    httpClientSpy.post.and.returnValue(throwError(() => errorResponse));
    authService.register(testData.username,testData.email, testData.password,testData.role).subscribe({
      error: (e) => {
        expect(e.message).toContain(testMsg.message);
        done();
      },
    });
    expect(httpClientSpy.post.calls.count()).toBe(1);

  })
  it('should register - 400 email already exists',(done:DoneFn)=>{
    const testData = {
      username: 'admin',
      password: '123456',
      email: 'admin@admin.com',
      role: 'admin',
    };
    const testMsg = {
      status: 400,
      message: "Failed! Email is already in use!",
    };
    const errorResponse = new HttpErrorResponse({
      error: `test ${testMsg.status} error`,
      status: testMsg.status,
      statusText: testMsg.message,
    });
    httpClientSpy.post.and.returnValue(throwError(() => errorResponse));
    authService.register(testData.username,testData.email, testData.password,testData.role).subscribe({
      error: (e) => {
        expect(e.message).toContain(testMsg.message);
        done();
      },
    });
    expect(httpClientSpy.post.calls.count()).toBe(1);
  })
  // //logout
  it('should signout - 200',(done:DoneFn)=>{
    const testMsg={
      status:200,
      message:"You've been signed out!"
    }
    httpClientSpy.post.and.returnValue(of(testMsg.message))
    authService.logout().subscribe({
      next: (res) => {
        expect(res).toBe(testMsg.message);
        done();
      },
      error: done.fail,
    })
    expect(httpClientSpy.post.calls.count()).toBe(1);
  })
});
