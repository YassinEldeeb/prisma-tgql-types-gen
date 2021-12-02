import { Field, ID, ObjectType, Int } from 'type-graphql'
import { User } from './User'
import { Post } from './Post'
import { Heart } from './Heart'

@ObjectType()
export class CommentScalars {
  @Field((_type) => ID)
  id: string

  @Field()
  text: string

  @Field((_type) => Int)
  hearts_count: number

  @Field({ nullable: true })
  parentId?: string

  @Field()
  createdAt: Date

  @Field()
  updatedAt: Date
}

export class Comment extends CommentScalars {
  @Field((_type) => User)
  author: User

  @Field((_type) => Post)
  post: Post

  @Field((_type) => [Heart])
  hearts: Heart[]

  // skip overwrite 👇
}
