import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { CenterService } from '@app/services/servicecenter/center.service';

export const authGuard: CanActivateFn = (route, state) => {

  const centerService = inject(CenterService);

  return centerService.authCheck();
};
