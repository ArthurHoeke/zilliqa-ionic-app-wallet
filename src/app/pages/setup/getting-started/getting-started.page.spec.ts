import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GettingStartedPage } from './getting-started.page';

describe('GettingStartedPage', () => {
  let component: GettingStartedPage;
  let fixture: ComponentFixture<GettingStartedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GettingStartedPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GettingStartedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
