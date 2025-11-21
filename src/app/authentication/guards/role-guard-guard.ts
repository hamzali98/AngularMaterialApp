import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Modalservice } from '@app/services/auth-modal/modalservice';
import { DataServiceService } from '@app/user/user-services/user-profile-data-service/data-service.service';

export const roleGuardGuard: CanActivateFn = (route, state) => {

  const dataService = inject(DataServiceService);
  const modalService = inject(Modalservice);

  if (dataService.getLocalUserRole()?.toString() === 'superadmin' || dataService.getLocalUserRole()?.toString() === 'admin') {
    return true;
  }

  modalService.openUnauthorizedDialog();
  return false;
};
