import { registerEnumType } from 'type-graphql'

export enum NotificationType {
  newPosts = 'newPosts',
  newComments = 'newComments',
  newFollowers = 'newFollowers',
  reply = 'reply',
  heartOnPost = 'heartOnPost',
  heartOnComment = 'heartOnComment',
  heartOnReply = 'heartOnReply',
}
registerEnumType(NotificationType, {
  name: 'NotificationType',
})
