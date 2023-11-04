import * as Joi from 'joi';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { AppService } from './app.service';
import { FormModule } from './form/form.module';
;

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        LOKI_URL: Joi.string(),
        DATABASE_URL: Joi.string(),
        ACCESS_TOKEN_VALIDITY: Joi.string(),
        API_BASE_URL: Joi.string(),
        GOOGLE_CLIENT_ID: Joi.string(),
        GOOGLE_CLIENT_SECRET: Joi.string(),
        GOOGLE_CALLBACK_URL: Joi.string(),
        GOOGLE_SCOPE: Joi.string(),
        SALT_ROUNDS: Joi.number(),
      }),
      validationOptions: {
        allowUnknown: true,
        abortEarly: true,
      },
    }),
    AuthModule,
    PrismaModule,
    FormModule,

  ],
  controllers: [AppController],
  providers: [
    AppService,
  ],
})
export class AppModule {}