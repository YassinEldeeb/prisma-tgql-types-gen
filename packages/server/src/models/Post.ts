import { Field, ID, ObjectType, Float } from 'type-graphql'
import { User } from './User'
import { Field, ID, ObjectType, Int, Float } from 'type-graphql'
import { Heart } from './Heart'
import { Comment } from './Comment'

@ObjectType()
export class PostScalars {
  @Field((_type) => ID)
  id: string

  @Field()
  title: string

  @Field()
  body: string

  @Field((_type) => [String])
  tags: string[]

  @Field((_type) => [Int])
  test: number[]

  @Field()
  published: boolean

  @Field((_type) => Int)
  hearts_count: number

  @Field((_type) => Int)
  comments_count: number

  @Field()
  readingTimeTxt: string

  @Field((_type) => Float)
  readingTimeMin: number

  @Field({ nullable: true })
  coverImg?: string

  @Field()
  createdAt: Date

  @Field()
  updatedAt: Date
}

@ObjectType()
export class Post extends PostScalars {
  @Field((_type) => [Heart])
  hearts: Heart[]

  @Field((_type) => User)
  author: User

  @Field((_type) => [Comment])
  comments: Comment[]

  // skip overwrite 👇
}
