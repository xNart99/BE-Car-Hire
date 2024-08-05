import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
  @Prop({
    required: true,
  })
  username: string;

  @Prop({
    required: true,
  })
  password: string;

  @Prop({
    required: true,
    enum: ['ADMIN', 'STAFF', 'MANAGER'],
  })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
