import { Query, Resolver } from 'type-graphql'
import { Heart } from '../models/Heart'

@Resolver()
class HeartResolver {
  @Query(() => Heart)
  heart() {
    return 'Hello'
  }
}
