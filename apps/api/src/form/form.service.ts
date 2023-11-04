import { Injectable, UnauthorizedException } from '@nestjs/common';
import { FieldType } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FormService {
    constructor(private readonly prismaService: PrismaService) {}

    async getForms(uid: string) {
        try {
            const forms = await this.prismaService.form.findMany({
                where: {
                    userId: uid
                }
            });
            return forms;
        } catch (error) {
            console.error(error);
            return [];
        }
            
    }

    async createForm({userId, title, desc}: {userId: string; title: string; desc: string}) {
        try {
            const form = await this.prismaService.form.create({
                data: {
                    userId,
                    title,
                    description: desc,
                }
            });
            return form;
        } catch (error) {
            console.error(error);
            return null;
        }
    }


    async getForm({userId, formId}: {userId: string; formId: string}) {
        try {
            const form = await this.prismaService.form.findUnique({
                where: {
                    userId: userId,
                    id: formId
                },
                select: {
                    title: true,
                    description: true,
                    fields: {
                        select: {
                            title: true,
                            label: true,
                            type: true,
                            required: true,
                            placeholder: true,
                            id: true
                        }
                    }
                }
            })

            if(!form) return UnauthorizedException
            return form
        } catch (err) {
            return UnauthorizedException;
        }
    }

    async updateField({userId, formId, fieldInfo}: {userId: string; formId: string; fieldInfo: FieldInfoDto}) {
        const form = await this.prismaService.form.findUnique({
            where: {
                userId: userId,
                id: formId
            }
        })

        if(!form) return UnauthorizedException

        if(fieldInfo.id) {
            return await this.prismaService.field.update({
                where: {
                    id: fieldInfo.id
                },
                data: {
                    title: fieldInfo.title,
                    type: fieldInfo.type,
                    placeholder: fieldInfo.placeholder,
                    label: fieldInfo.label,
                    required: fieldInfo.required ?? false,
                    options: fieldInfo.options.join(',')
                }
            })
        } else {
            return await this.prismaService.field.create({
                data: {
                    formId: formId,
                    title: fieldInfo.title,
                    type: fieldInfo.type,
                    placeholder: fieldInfo.placeholder,
                    label: fieldInfo.label,
                    required: fieldInfo.required ?? false,
                    options: fieldInfo.options ? fieldInfo.options.join(','): ''

                }
            })
        }
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