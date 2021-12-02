import { Field, ID, ObjectType } from 'type-graphql'
import { User } from './User'

@ObjectType()
export class NotificationFromUserScalars {
  @Field((_type) => ID)
  id: string

  @Field()
  userId: string

  @Field()
  userWhoFiredId: string
}

export class NotificationFromUser extends NotificationFromUserScalars {
  @Field((_type) => User)
  user: User

  @Field((_type) => User)
  userWhoFired: User

  // skip overwrite 👇
}
