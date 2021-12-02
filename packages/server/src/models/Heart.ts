import { Field, ID, ObjectType } from 'type-graphql'
import { User } from './User'
import { Post } from './Post'
import { Comment } from './Comment'

@ObjectType()
export class Heart {
  @Field((_type) => ID)
  id: string

  @Field((_type) => User)
  user: User

  @Field((_type) => Post, { nullable: true })
  post?: Post

  @Field((_type) => Comment, { nullable: true })
  comment?: Comment

  @Field()
  createdAt: Date

  @Field()
  updatedAt: Date

  // skip overwrite 👇
}
