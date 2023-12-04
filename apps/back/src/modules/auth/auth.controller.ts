import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RequestUser } from '../../decorators/request-user.decorator';
import { LocalGuard } from '../../guards/passport/local.guard';
import { logInDto, signUpDto } from '@timeismoney/dto';
import { Request, Response } from 'express';
import { UserInterceptor } from '../../interceptors/user.interceptor';
import { IRequestUser } from '../../types/passport/request-user';
import { RefreshGuard } from '../../guards/passport/jwt-rt.guard';
import { AccessGuard } from '../../guards/passport/jwt-at.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseInterceptors(UserInterceptor)
  @HttpCode(HttpStatus.CREATED)
  @Post('/register')
  async register(@Body() body: signUpDto) {
    return this.authService.registerUser(body);
  }

  @UseGuards(LocalGuard)
  @Post('/login')
  async login(
    @RequestUser() user: IRequestUser,
    @Body() body: logInDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const tokens = await this.authService.login(user.userId, body.app);

    response.cookie('access_token', tokens.accessToken, {
      sameSite: 'strict',
      httpOnly: true,
    });
    response.cookie('refresh_token', tokens.refreshToken, {
      sameSite: 'strict',
      httpOnly: true,
    });

    return user;
  }

  @UseGuards(RefreshGuard)
  @Post('/refresh')
  async refresh(
    @RequestUser() user: IRequestUser,
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const refreshToken = request.cookies['refresh_token'];

    if (!refreshToken) {
      throw new UnauthorizedException();
    }
    const tokens = await this.authService.refreshSession(
      user.userId,
      user.app,
      refreshToken,
    );

    response.cookie('access_token', tokens.accessToken, {
      sameSite: 'strict',
      httpOnly: true,
    });
    response.cookie('refresh_token', tokens.refreshToken, {
      sameSite: 'strict',
      httpOnly: true,
    });

    return user;
  }

  @UseGuards(AccessGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('/logout')
  async logout(
    @RequestUser() user: IRequestUser,
    @Res({ passthrough: true }) response: Response,
  ) {
    await this.authService.removeUserRefresh(user.userId);

    response.clearCookie('access_token');
    response.clearCookie('refresh_token');

    return;
  }
}
