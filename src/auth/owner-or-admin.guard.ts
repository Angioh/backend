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
    const user = request.user as any;

    const userRole = (user.role || '').toLowerCase(); 
    const userId   = user.id;                         

    const requestedId = parseInt(request.params.id, 10);


    if (userRole === 'admin') {
      return true;
    }


    if (userId === requestedId) {
      return true;
    }


    throw new ForbiddenException('No tienes permiso para ver este recurso');
  }
}
