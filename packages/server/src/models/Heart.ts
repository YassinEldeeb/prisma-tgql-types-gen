import { Field, ObjectType, Int } from 'type-graphql'
import { User } from './User'
import { Post } from './Post'
import { Comment } from './Comment'

@ObjectType()
export class HeartScalars {
  @Field((_type) => Int)
  id: number

  @Field()
  createdAt: Date

  @Field()
  updatedAt: Date
}

@ObjectType()
export class Heart extends HeartScalars {
  @Field((_type) => User)
  user: User

  @Field((_type) => Post, { nullable: true })
  post?: Post

  @Field((_type) => Comment, { nullable: true })
  comment?: Comment

  // skip overwrite 👇
}
