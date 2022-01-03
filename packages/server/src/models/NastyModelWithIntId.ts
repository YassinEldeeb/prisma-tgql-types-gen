import { Field, ID, ObjectType, Int } from 'type-graphql'

@ObjectType()
export class NastyModelWithIntIdScalars {
  @Field((_type) => Int)
  id: number
}

@ObjectType()
export class NastyModelWithIntId extends NastyModelWithIntIdScalars {
  // skip overwrite 👇
}
