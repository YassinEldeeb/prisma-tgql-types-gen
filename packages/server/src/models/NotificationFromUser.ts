import { Field, ObjectType, Int } from 'type-graphql'
import { User } from './User'

@ObjectType()
export class NotificationFromUserScalars {
  @Field((_type) => Int)
  id: number

  @Field((_type) => Int)
  userId: number

  @Field((_type) => Int)
  userWhoFiredId: number
}

@ObjectType()
export class NotificationFromUser extends NotificationFromUserScalars {
  @Field((_type) => User)
  user: User

  @Field((_type) => User)
  userWhoFired: User

  // skip overwrite 👇
}
