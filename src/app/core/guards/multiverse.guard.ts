import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { MultiverseAccessService } from '../services/multiverse-access.service';

export const multiverseGuard: CanActivateFn = (route, state) => {
  const multiverseService = inject(MultiverseAccessService);
  const router = inject(Router);

  if (multiverseService.isPortalGunActive()) {
    return true;
  }

  router.navigate(['/'], {
    queryParams: { portalRequired: true }
  });
  return false;
};
