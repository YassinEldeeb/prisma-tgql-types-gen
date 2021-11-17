import { Query, Resolver } from 'type-graphql'
import { Follower } from '../models/Follower'

@Resolver()
class FollowerResolver {
  @Query(() => Follower)
  follower() {
    return 'Hello'
  }
}
