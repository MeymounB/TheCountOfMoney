import { AuthGuard } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AccessGuard extends AuthGuard('jwt-at') {}
