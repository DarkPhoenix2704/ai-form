import {
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { Profile } from 'passport';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  async checkIfProviderAccountExists(OAuthUserData: Profile) {
    const provider = await this.prismaService.account.findUnique({
      where: {
        verify_provider_account: {
          provider: OAuthUserData.provider,
          providerAccountId: OAuthUserData.id,
        },
      },
    });

    if (!provider) return null;

    return provider;
  }

  async createProviderAccount(
    user: User,
    profile: Profile,
    accessToken: string,
    refreshToken: string,
  ) {
    try {
      const createdProviderAccount = await this.prismaService.account.create({
        data: {
          provider: profile.provider,
          providerAccountId: profile.id,
          providerAccessToken: accessToken,
          providerRefreshToken: refreshToken,
          user: {
            connect: {
              uid: user.uid,
            },
          },
        },
      });

      return createdProviderAccount;
    } catch (error) {
      return null;
    }
  }

  async generateAuthToken(uid: string) {
    const payload = {
      iss: this.configService.get('API_BASE_URL'),
      sub: uid,
      iat: new Date().getTime(),
    };

    const accessToken = await this.jwtService.signAsync(payload);
    const refreshToken = await this.generateRefreshToken(uid);

    return {
      accessToken,
      refreshToken,
    };
  }

  async generateRefreshToken(uid: string) {
    const payload = {
      sub: uid,
      iss: this.configService.get('API_BASE_URL'),
      iat: new Date().getTime(),
    };
    const refreshToken = await this.jwtService.signAsync(payload);

    const hashedRefreshToken = await bcrypt.hash(
      refreshToken,
      this.configService.get('SALT_ROUNDS'),
    );

    const updatedUser = await this.userService.updateRefreshToken(
      uid,
      hashedRefreshToken,
    );

    if (!updatedUser) throw new Error('REFRESH_TOKEN_NOT_UPDATED');

    return refreshToken;
  }

  async refreshAuthToken(user: User, hashedToken: string) {
    if (!user) throw new Error('USER_NOT_FOUND');

    const isRefreshTokenValid = await bcrypt.compare(
      hashedToken,
      user.refreshToken,
    );

    if (!isRefreshTokenValid)
      throw new Error('AFTER_GENERATION_INVALID_REFRESH_TOKEN');

    const newAccessToken = await this.generateAuthToken(user.uid);

    return newAccessToken;
  }

  async getProviderAccounts(email: string, provider: string) {
    const accounts = await this.prismaService.account.findMany({
      where: {
        provider: provider,
        user: {
          email: {
            equals: email,
            mode: 'insensitive',
          },
        },
      },
    });
    return accounts;
  }
}
