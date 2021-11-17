import { Query, Resolver } from 'type-graphql'
import { Post } from '../models/Post'

@Resolver()
class PostResolver {
  @Query(() => Post)
  post() {
    return 'Hello'
  }
}
