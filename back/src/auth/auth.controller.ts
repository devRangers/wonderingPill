import { Controller, Logger } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  private logger = new Logger(`UserController`);
  constructor(private readonly authService: AuthService) {}
}
