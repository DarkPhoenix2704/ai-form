import { IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  uid: string;

  @IsString()
  displayName?: string;

  @IsString()
  phoneNumber?: string;

  photoUrl?: string;
}
