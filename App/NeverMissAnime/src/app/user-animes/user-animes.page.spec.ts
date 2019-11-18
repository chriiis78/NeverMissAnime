import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UserAnimesPage } from './user-animes.page';

describe('UserAnimesPage', () => {
  let component: UserAnimesPage;
  let fixture: ComponentFixture<UserAnimesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAnimesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UserAnimesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
