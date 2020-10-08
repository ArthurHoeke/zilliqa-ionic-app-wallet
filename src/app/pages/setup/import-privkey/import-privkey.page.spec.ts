import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ImportPrivkeyPage } from './import-privkey.page';

describe('ImportPrivkeyPage', () => {
  let component: ImportPrivkeyPage;
  let fixture: ComponentFixture<ImportPrivkeyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportPrivkeyPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ImportPrivkeyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
