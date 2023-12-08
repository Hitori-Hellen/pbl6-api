import { Controller, HttpCode, HttpStatus, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { AuthEntity } from './entity/auth.entity';
import { VerifyDto } from './dto/verify.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() dto: LoginDto) {
    return this.authService.sendEmailLogin(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('verify')
  @ApiOkResponse({ type: AuthEntity })
  async verifyLogin(@Body() dto: VerifyDto) {
    return this.authService.verifyLogin(dto);
  }
}
