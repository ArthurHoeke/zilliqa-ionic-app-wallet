import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ImportSetpinPage } from './import-setpin.page';

describe('ImportSetpinPage', () => {
  let component: ImportSetpinPage;
  let fixture: ComponentFixture<ImportSetpinPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportSetpinPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ImportSetpinPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
