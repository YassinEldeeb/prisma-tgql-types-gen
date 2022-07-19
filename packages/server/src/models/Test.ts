import { Field, ObjectType, Int } from 'type-graphql'

import GraphQLScalars from 'graphql-scalars'

@ObjectType()
export class TestScalars {
  @Field((_type) => Int)
  id: number

  @Field((_type) => GraphQLScalars.ByteResolver)
  bla: Buffer
}

@ObjectType()
export class Test extends TestScalars {
  // skip overwrite 👇
}
