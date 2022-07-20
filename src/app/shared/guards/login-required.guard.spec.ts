import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { UserData } from 'src/app/auth/models/user.model';

import { LoginRequiredGuard } from './login-required.guard';

describe('LoginRequiredGuard', () => {
  let guard: LoginRequiredGuard;
  let store: MockStore<{ user: UserData }>;
  const initialState: { user: UserData } = {
    user: {
      userId: 'g9y43gh3n809',
      name: 'TestUser',
      email: 'test@email.com',
      role: 'user',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [provideMockStore({ initialState })],
    });
    guard = TestBed.inject(LoginRequiredGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
