# Prisma TypeGraphQL Types Generator

![Banner](https://github.com/YassinEldeeb/Prisma-TypeGraphQL-Types-Generator/blob/main/images/bannerImg.png)

## Prisma

> [Prisma](https://www.prisma.io/) is Database ORM Library for Node.js, Typescript.

Prisma basically generate each model type definition defined in [`schema.prisma`](https://www.prisma.io/docs/concepts/components/prisma-schema).
Therefore, it's different from other ORMs so It does not require any additional entry classes or repository layers to model your data.

However, there are limitations to prisma solution, if you're building GraphQL APIs with TypegraphQL and Prisma you've to write the same types as classes and enums in TypeGraphQL and maintain both of Prisma definitions and TypegraphQL classes and enums to be synced as you iterate over them and that's not very cool in my opinion.

So I created a Prisma generator to help us with generating all of the TypegraphQL models and enums by introspecting the type definitions in `prisma.schema` file and do all of the work for you, so you don't have to constantly go back and forth between your TypegraphQL class types and `prisma.schema` file when you decide to make changes.

## How this differs from [`typegraphql-prisma`](https://github.com/MichalLytek/typegraphql-prisma) from the legend himself @MichalLytek?

### Features

- Doesn't generate CRUD resolvers as [`typegraphql-prisma`](https://github.com/MichalLytek/typegraphql-prisma) does.
- Generates TypegraphQL class types and enums from your `prisma.schema` file.
- The Generated output is very human readable and doesn't look like generated code what so ever.
- The Generated output can be edited so you can iterate over the generated output and the next generation won't overwrite your changes but iterate over it.
- I like to think of it as the pilot and you're the copilot cause you can change whatever you want in the generated files and when you mess up the generator will correct you.
- make the fields hide(only specific to the database) or private(require authentication).
- specify the locations to tell where do you want to output the models and the enums.
- only installs [`graphql-scalars`](https://github.com/Urigo/graphql-scalars) automatically if any custom scalar types were used in `prisma.schema` like Json or Bytes
- option to use `yarn` for installing [`graphql-scalars`](https://github.com/Urigo/graphql-scalars) (default is npm).

## Usage

Define Generator in `schema.prisma` and **that's it**

```prisma
generator PrismaTypeGraphQLTypesGenerator {
  provider     = "npx prisma-typegraphql-types-generator"
  modelsOutput = "./src/models" // Optional defaults to "./src/generated/models"
  enumsOutput  = "./src/types" // Optional defaults to "./src/generated/enums"
  useYarn      = true // Optional if you want `graphql-scalars` installation to be done via yarn defaults to "npm"
}
```

If this is the `prisma.schema` 👇

> ℹ you can set the `modelsOutput` and the `enumsOutput` paths to be wherever you want and the class models files will figure out their way to get to the enums path **no problem**.

```prisma
generator client {
  provider = "prisma-client-js"
}

generator PrismaTypeGraphQLTypesGenerator {
  provider     = "npx prisma-typegraphql-types-generator"
  modelsOutput = "./src/models"
  enumsOutput  = "./src/types"
  useYarn      = true
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id                            String                 @id @default(cuid())
  name                          String                 @db.VarChar(255)
  // @private
  email                         String                 @unique
  // @hide
  password                      String?
  bio                           String?                @db.VarChar(160)
  // @hide
  tokenVersion                  Int                    @default(0)
  // @hide
  confirmed                     Boolean                @default(false)
  profilePic                    String?
  posts                         Post[]
  githubId                      String?                @unique
  lastTimelineVisit             DateTime?
  createdAt                     DateTime               @default(now())
  updatedAt                     DateTime               @updatedAt
}

model Post {
  id             String    @id @default(cuid())
  title          String
  body           String
  tags           String[]
  published      Boolean   @default(false)
  // @hide
  authorId       String
  author         User      @relation(fields: [authorId], references: [id], onDelete: Cascade)
  readingTimeTxt String
  readingTimeMin Float
  coverImg       String?
  createdAt      DateTime  @default(now())
  updatedAt      DateTime  @updatedAt
}
```

The generated output will be like this 😎

```typescript
// src/models/User.ts
import { Field, ID, ObjectType } from 'type-graphql'
import { Post } from './Post'

@ObjectType()
export class User {
  @Field((_type) => ID)
  id: string

  @Field()
  name: string

  @Field({ nullable: true })
  email: string

  @Field({ nullable: true })
  bio?: string

  @Field({ nullable: true })
  profilePic?: string

  @Field((_type) => [Post])
  posts: Post[]

  @Field({ nullable: true })
  githubId?: string

  @Field({ nullable: true })
  lastTimelineVisit?: Date

  @Field()
  createdAt: Date

  @Field()
  updatedAt: Date

  // skip overwrite 👇
}
```

```typescript
// src/models/Post.ts
import { Field, ID, ObjectType } from 'type-graphql'
import { User } from './User'
import { Language } from '../src/types/enums/Language'

@ObjectType()
export class Post {
  @Field((_type) => ID)
  id: string

  @Field()
  title: string

  @Field()
  body: string

  @Field((_type) => [String])
  tags: string[]

  @Field()
  published: boolean

  @Field((_type) => User)
  author: User

  @Field()
  readingTimeTxt: string

  @Field()
  readingTimeMin: number

  @Field({ nullable: true })
  coverImg?: string

  @Field((_type) => Language)
  language: Language

  @Field()
  createdAt: Date

  @Field()
  updatedAt: Date

  // skip overwrite 👇
}
```

```typescript
// src/types/enums/Language.ts
import { registerEnumType } from 'type-graphql'

export enum Language {
  Typescript = 'Typescript',
  Javascript = 'Javascript',
  Go = 'Go',
  Rust = 'Rust',
  Python = 'Python',
  Java = 'Java',
  Swift = 'Swift',
}
registerEnumType(Language, {
  name: 'Language',
})
```

## What's the `// @hide` and `// @private` do in `prisma.schema` file?

`// @hide` before a field in your `prisma.schema` file means you're telling the generator that this field is just specific to the database and won't be queryable by graphql clients, so it skips adding it to the class type.

`// @private` before a field in your `prisma.schema` file means you're telling the generator that this field can be queryable but it depends on who's asking, so an email as an example won't be exposed to anyone just authenticated user can show his email, so It marks that field as `nullable: true` to assure that you won't get the email of the user if you're not that user himself.

## How to edit the Generated Code without being overwritten by the generator?

You've probably noticed the `// skip overwrite 👇` comment at the very end of any generated class model and this's a part of what I like to call **Safe Areas** where you can write code without being overwritten by the generator.

### So there's three **Safe Areas**:

1- above the class where you can add your own logic here and import other files/libraries

> ℹ when you try messing up by removing imports that a class needs, the generator will correct you and add it again

> ⚠ a file can only has a single class otherwise you're gonna confuse the generator

```diff
// src/models/User.ts
import { Field, ID, ObjectType } from 'type-graphql'
import { Post } from './Post'
+ import { addTwoNumbers } from '../utils/sillyStuff'
+
+ console.log(addTwoNumbers(1, 4))
+
@ObjectType()
export class User {
  @Field((_type) => ID)
  id: string
  ...
```

2- Field Config object

```diff
// src/models/User.ts
@ObjectType()
export class User {
-  @Field(_type) => ID)
+  @Field((_type) => ID, {
+    description: 'This field is looking kinda sussy',
+    simple: true,
+    complexity: 5,
+  })
+  id: string
  ...
```

3- below the `// skip overwrite 👇` comment

```diff
// src/models/User.ts
@ObjectType()
export class User {
  ...
  // skip overwrite 👇
+ @Field()
+ sayHello: string
}
```

## Known Issues

1- Can't use the object shorthand syntax in the field config object.

Won't work 👇

```diff
...
import { complexity } from '../shared/complexity'

@ObjectType()
export class User {
+ @Field((_type) => ID, { complexity })
  id: string
  ...
}
```
