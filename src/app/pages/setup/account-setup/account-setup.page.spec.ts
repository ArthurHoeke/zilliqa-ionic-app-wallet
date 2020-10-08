import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AccountSetupPage } from './account-setup.page';

describe('AccountSetupPage', () => {
  let component: AccountSetupPage;
  let fixture: ComponentFixture<AccountSetupPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountSetupPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AccountSetupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
