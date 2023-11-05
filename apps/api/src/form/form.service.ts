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
                }, orderBy: {
                    createdAt: 'desc'
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


    async getForm({formId}: { formId: string}) {
        try {
            const form = await this.prismaService.form.findUnique({
                where: {
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
                        },
                        orderBy: {
                            createdAt: 'asc'
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
                    options: fieldInfo.options ? fieldInfo.options.join(','): ''
                },
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

    async submitForm({formId, body}: {formId: string, body: any}) {
        const form = await this.prismaService.form.findUnique({
            where: {
                id: formId
            },
            select: {
                id: true
            }
        })

        if(!form) return UnauthorizedException

        const fields = await this.prismaService.field.findMany({
            where: {
                formId: formId
            },
            select: {
                id: true,
                type: true,
                required: true,
                options: true
            }
        })

        const bodyKeys = Object.keys(body);

        const missingRequiredFields = fields.filter(field => field.required && !bodyKeys.includes(field.id));

        if(missingRequiredFields.length > 0) {
            return {
                error: 'Missing required fields',
                missingFields: missingRequiredFields.map(field => field.id)
            }
        }

        const invalidFields = fields.filter(field => {
            if(!bodyKeys.includes(field.id)) return false;
            const value = body[field.id];
            if(field.type === FieldType.Checkbox) {
                if(typeof value !== 'boolean') return true;
            } else if(field.type === FieldType.SingleSelect) {
                if(typeof value !== 'string') return true;
                if(!field.options.includes(value)) return true;
            }
            return false;
        })

        if(invalidFields.length > 0) {
            return {
                error: 'Invalid fields',
                invalidFields: invalidFields.map(field => field.id)
            }
        }

        return await this.prismaService.response.create({
            data: {
                formId: formId,
                data: JSON.stringify(body)
            }
        })
    }

    async getResponses({formId, userId}: {formId: string, userId: string}){
        const form = await this.prismaService.form.findUnique({
            where: {
                id: formId,
                userId: userId
            }
        })

        if(!form) return UnauthorizedException

        const responses = await this.prismaService.response.findMany({
            where: {
                formId
            }
        })


        return responses ?? []
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