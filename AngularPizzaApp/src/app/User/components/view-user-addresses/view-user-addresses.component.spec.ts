import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewUserAddressesComponent } from './view-user-addresses.component';

describe('ViewUserAddressesComponent', () => {
  let component: ViewUserAddressesComponent;
  let fixture: ComponentFixture<ViewUserAddressesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewUserAddressesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewUserAddressesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
