import { Query, Resolver } from 'type-graphql'
import { Comment } from '../models/Comment'

@Resolver()
class CommentResolver {
  @Query(() => Comment)
  comment() {
    return 'Hello'
  }
}
