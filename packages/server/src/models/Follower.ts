import { Field, ObjectType, Int } from 'type-graphql'
import { User } from './User'

@ObjectType()
export class FollowerScalars {
  @Field((_type) => Int)
  id: number

  @Field()
  createdAt: Date

  @Field()
  updatedAt: Date
}

@ObjectType()
export class Follower extends FollowerScalars {
  @Field((_type) => User)
  followed_user: User

  @Field((_type) => User)
  follower_user: User

  // skip overwrite 👇
}
