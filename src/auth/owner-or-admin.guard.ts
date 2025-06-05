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
    const user = request.user as { sub: number; role: string };


    const requestedId = parseInt(request.params.id, 10);


    if (user.role === 'ADMIN') {
      return true;
    }

    if (user.sub === requestedId) {
      return true;
    }


    throw new ForbiddenException('No tienes permiso para ver este recurso.');
  }
}
