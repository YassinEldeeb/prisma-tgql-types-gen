import { Field, ObjectType, Int } from 'type-graphql'
import { Post } from './Post'
import { Comment } from './Comment'
import { Follower } from './Follower'
import { Notification } from './Notification'

@ObjectType()
export class UserScalars {
  @Field((_type) => Int)
  id: number

  @Field()
  name: string

  @Field({ nullable: true })
  username?: string

  @Field({ nullable: true })
  email: string

  @Field({ nullable: true })
  bio?: string

  @Field({ nullable: true })
  profilePic?: string

  @Field((_type) => Int)
  followers_count: number

  @Field((_type) => Int)
  following_count: number

  @Field({ nullable: true })
  githubId?: string

  @Field({ nullable: true })
  lastTimelineVisit?: Date

  @Field()
  createdAt: Date

  @Field()
  updatedAt: Date
}

@ObjectType()
export class User extends UserScalars {
  @Field((_type) => [Post])
  posts: Post[]

  @Field((_type) => [Comment])
  comments: Comment[]

  @Field((_type) => [Follower])
  followers: Follower[]

  @Field((_type) => [Follower])
  following: Follower[]

  @Field((_type) => [Notification])
  notifications: Notification[]

  // skip overwrite 👇
}
