import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { LoginComponent } from './login.component';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from 'src/app/_services/auth.service';
import { By } from '@angular/platform-browser';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [HttpClientTestingModule,ReactiveFormsModule],
      // imports: [ReactiveFormsModule],
      providers:[AuthService],
      schemas:[CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    debugElement = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should submit',()=>{
  //   const submitForm = debugElement.query(
  //     By.css('[data-testid="submit-form"]')
  //   );
  //   submitForm.triggerEventHandler('ngSubmit', null);
  // })
});
