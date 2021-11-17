import { Query, Resolver } from 'type-graphql'
import { User } from '../models/User'

@Resolver()
class UserResolver {
  @Query(() => User)
  user() {
    return 'Hello'
  }
}
