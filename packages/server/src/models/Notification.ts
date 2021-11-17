import { Field, ID, ObjectType } from 'type-graphql'
import { User } from './User'
import { NotificationFromUser } from './NotificationFromUser'
import { NotificationType } from '../types/NotificationType'

@ObjectType()
export class Notification {
  @Field((_type) => ID)
  id: string

  @Field((_type) => User)
  notifiedUser: User

  @Field((_type) => [NotificationFromUser])
  fromUsers: NotificationFromUser[]

  @Field()
  seen: boolean

  @Field()
  message: string

  @Field((_type) => NotificationType)
  type: NotificationType

  @Field()
  url: string

  @Field()
  createdAt: Date

  @Field()
  updatedAt: Date

  // skip overwrite 👇
}