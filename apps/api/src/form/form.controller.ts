import { Controller, Get, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { AuthUser } from 'src/auth/decorators/user.decorator';
import { LocalAuthGuard } from 'src/auth/guards/local.guard';
import { FormService } from './form.service';

@Controller('form')
export class FormController {

    constructor(private readonly formService: FormService) {}
    
    @Get()
    @UseGuards(LocalAuthGuard)
    async getForms(@AuthUser() user: User) {
        return this.formService.getForms(user.uid);
    }
}
