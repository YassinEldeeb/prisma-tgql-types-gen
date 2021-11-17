import { Query, Resolver } from 'type-graphql'
import { Notification } from '../models/Notification'

@Resolver()
class NotificationResolver {
  @Query(() => Notification)
  notification() {
    return 'Hello'
  }
}
