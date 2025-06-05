// src/auth/owner-or-admin.guard.ts
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';


@Injectable()
export class OwnerOrAdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {

    const request = context.switchToHttp().getRequest<any>();
    console.log('>>> Guard OwnerOrAdminGuard, request.user =', request.user);
    const user = request.user as any;


    const requestedId = parseInt(request.params.id, 10);



    const userRole   = (user.role  !== undefined) ? user.role  : null;
    const userSub    = (user.sub   !== undefined) ? user.sub   : null;
    const userId     = (user.id    !== undefined) ? user.id    : null;
    const userIsAdmin= (user.isAdmin!== undefined) ? user.isAdmin : null;

    if (user.role === 'ADMIN') {
      return true;
    }

    if (user.sub === requestedId) {
      return true;
    }


    throw new ForbiddenException('No tienes permiso para ver este recurso.');
  }
}
