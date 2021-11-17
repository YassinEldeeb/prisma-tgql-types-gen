import { Field, ID, ObjectType } from 'type-graphql'
import { User } from './User'

@ObjectType()
export class NotificationFromUser {
  @Field((_type) => ID)
  id: string

  @Field((_type) => User)
  user: User

  @Field((_type) => User)
  userWhoFired: User

  @Field()
  userId: string

  @Field()
  userWhoFiredId: string

  // skip overwrite 👇
}