import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class OwnerOrAdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const user = request.user as { sub: number; role: string }; 
    // En muchos ejemplos el payload del JWT se asigna a `request.user`.
    // Por defecto, si usas @nestjs/jwt, request.user tendrá { sub: 7, username: 'juan', role: 'USER', ... }

    // Obtenemos el `:id` de la ruta (viene como string, lo parseamos a number).
    const requestedId = parseInt(request.params.id, 10);

    // 1) Si es ADMIN, puede acceder a cualquier `:id`
    if (user.role === 'ADMIN') {
      return true;
    }

    // 2) Si no es ADMIN, solo puede acceder al recurso si su propio sub === requestedId
    if (user.sub === requestedId) {
      return true;
    }

    // 3) En cualquier otro caso, prohibido.
    throw new ForbiddenException('No tienes permiso para ver este recurso');
  }
}
