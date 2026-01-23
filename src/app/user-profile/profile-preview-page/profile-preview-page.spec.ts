import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePreviewPage } from './profile-preview-page';

describe('ProfilePreviewPage', () => {
  let component: ProfilePreviewPage;
  let fixture: ComponentFixture<ProfilePreviewPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfilePreviewPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilePreviewPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
