import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListAnimesPage } from './list-animes.page';

describe('ListAnimesPage', () => {
  let component: ListAnimesPage;
  let fixture: ComponentFixture<ListAnimesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListAnimesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListAnimesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
