import { AuthService } from 'src/app/auth/services';
import * as fromAuthStore from 'src/app/auth/store';
import { Store } from '@ngrx/store';

// An app initializer to refresh token when the application first load
export function appInitializer(
  authService: AuthService,
  store: Store<fromAuthStore.AuthenticationState>
) {
  return () => {
    // Attempt to refresh the token on app start up to auto authenticate if token is found
    const token = authService.getToken();
    if (token) {
      // We dispatch the action to refresh the token
      store.dispatch(fromAuthStore.RefreshTokenRequest({ token }));
    }
  };
}
