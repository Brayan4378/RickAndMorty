import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MultiverseAccessService {
  private portalGunActivated = new BehaviorSubject<boolean>(false);
  portalGunActivated$ = this.portalGunActivated.asObservable();

  activatePortalGun(): void {
    this.portalGunActivated.next(true);
  }

  deactivatePortalGun(): void {
    this.portalGunActivated.next(false);
  }

  isPortalGunActive(): boolean {
    return this.portalGunActivated.getValue();
  }
}
