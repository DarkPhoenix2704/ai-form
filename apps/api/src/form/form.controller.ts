import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { FieldType, User } from '@prisma/client';
import { AuthUser } from 'src/auth/decorators/user.decorator';
import { FormService } from './form.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('form')
export class FormController {

    constructor(private readonly formService: FormService) {}
    
    @Get()
    @UseGuards(AuthGuard('jwt'))
    async getForms(@AuthUser() user: User) {
        return this.formService.getForms(user.uid);
    }

    @Post()
    @UseGuards(AuthGuard('jwt'))
    async createForm(@AuthUser() user: User, @Body() body: {title: string; desc: string}) {
        return this.formService.createForm({
            userId: user.uid,
            title: body.title,
            desc: body.desc
        });
    }

    @Get('/:formId')
    @UseGuards(AuthGuard('jwt'))
    async getForm(@AuthUser() user: User, @Param('formId') formId: string) {
        return this.formService.getForm({
            userId: user.uid,
            formId
        })

    }



    @Post('/:formId')
    @UseGuards(AuthGuard('jwt'))
    async updateForm(@AuthUser() user: User, @Param('formId') formId: string, @Body() fieldInfo: FieldInfoDto) {
        return this.formService.updateField({
            userId: user.uid,
            formId: formId,
            fieldInfo
        })
    }
}


interface FieldInfoDto {
    id?: string,
    type: FieldType,
    title: string,
    label: string,
    options: Array<string>
    placeholder: string,
    required?: boolean
}