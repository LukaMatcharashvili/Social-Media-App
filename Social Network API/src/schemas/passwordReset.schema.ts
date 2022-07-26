import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { randomBytes } from 'crypto';

export type PasswordResetDocument = PasswordReset & Document;

@Schema()
export class PasswordReset {
  @Prop({ index: true, required: true, type: String })
  userId: string;

  @Prop({
    type: String,
    required: true,
    index: true,
    unique: true,
    default: () => randomBytes(20).toString('hex'),
  })
  token: string;
}

export const PasswordResetSchema = SchemaFactory.createForClass(PasswordReset);
