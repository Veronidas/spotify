import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AuthPageComponent } from './auth-page.component';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

describe('AuthPageComponent', () => {
  let component: AuthPageComponent;
  let fixture: ComponentFixture<AuthPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,
      RouterTestingModule],
      declarations: [AuthPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AuthPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  //AAA:
  //Arrange, arrancar
  //Act
  //Assert, verificar

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('Form should return invalid', () => {

    const mockCredentials = {
      email: '0x0x0x0x',
      password: '111111111111111111111111111111'
    }
  
    const emailForm: any = component.formLogin.get('email')
    const passwordForm: any = component.formLogin.get('password')

    emailForm.setValue(mockCredentials.email)
    passwordForm.setValue(mockCredentials.password)

    expect(component.formLogin.invalid).toEqual(true);
  });

  it('Form should return valid', () => {

    const mockCredentials = {
      email: 'test@test.com',
      password: '12345678'
    }
  
    const emailForm: any = component.formLogin.get('email')
    const passwordForm: any = component.formLogin.get('password')

    emailForm.setValue(mockCredentials.email)
    passwordForm.setValue(mockCredentials.password)

    expect(component.formLogin.valid).toEqual(true);
  });

  it('Button should say "Iniciar sesión"', () => {
    const elementRef = fixture.debugElement.query(By.css('.form-action button')).nativeElement
    const getInnerText = elementRef.innerText
    expect(getInnerText).toEqual('Iniciar sesión')
  })

});
