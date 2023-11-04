import {
  Controller,
  Get,
  Post,
  Request,
  Response,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { cookieHandler } from './cookieHandler';
import { RefreshGuard } from './guards/refresh.guard';
import { GoogleAuthGuard } from './guards/google-oauth.guard';
import { Response as ExpressResponse } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/google')
  @UseGuards(GoogleAuthGuard)
  async googleOAuth() {
    console.log('googleOAuth');
  }

  @Get('/google/callback')
  @UseGuards(GoogleAuthGuard)
  async googleOAuthCallback(@Request() req, @Response() res: ExpressResponse) {
    const authToken = await this.authService.generateAuthToken(req.user.uid);
    cookieHandler(res, authToken, true);
  }

  @Post('/logout')
  async logout(@Response() res: ExpressResponse) {
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');
    res['user'] = null;

    return res.status(200).json({
      message: 'Success',
    });
  }

  @Get('/refresh')
  @UseGuards(RefreshGuard)
  async refresh(@Request() req, @Response() res: ExpressResponse) {
    const genToken = await this.authService.refreshAuthToken(
      req.user,
      req.cookies['refresh_token'],
    );

    cookieHandler(res, genToken, false);
  }

}
