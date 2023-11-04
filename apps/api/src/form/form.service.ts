import { Injectable } from '@nestjs/common';
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
}
