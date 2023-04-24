import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PhoneBookPage } from './phone-book.page';

describe('PhoneBookPage', () => {
  let component: PhoneBookPage;
  let fixture: ComponentFixture<PhoneBookPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PhoneBookPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
