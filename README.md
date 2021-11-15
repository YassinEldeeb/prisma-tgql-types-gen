# TypeGraphQL-Prisma-Types-Generator

## Prisma

> [Prisma](https://www.prisma.io/) is Database ORM Library for Node.js, Typescript.

Prisma basically generate each model type definition defined in [`schema.prisma`](https://www.prisma.io/docs/concepts/components/prisma-schema).
Therefore, it's different from other ORMs so It does not require any additional entry classes or repository layers to model your data.

However, there are limitations to prisma solution, if you're building GraphQL APIs with TypegraphQL and Prisma you've to write the same types as classes and enums in TypeGraphQL and maintain both of Prisma definitions and TypegraphQL classes and enums to be synced as you iterate over them and that's not very cool in my opinion

So I created a Prisma generator to help us with generating all of the TypegraphQL models and enums by introspecting the type definitions in `prisma.schema` file and do all of the work for you, so you don't have to constantly go back and forth between your TypegraphQL class types and `prisma.schema` file when you decide to make changes.

## Features
- Generate TypegraphQL class types and enums from your `prisma.schema` file.
- The Generated output is very human readable and doesn't look as generated code what so ever.
- The Generated output can be edited so you can iterate over the generated output and the next generation won't overwrite your changes but iterate over it
- so I like to think of it as the pilot and you're the copilot cause you can change whatever you want in the generated files and when you mess up the generator will correct you.
- make the fields hide(only specific to the database) or private(require authentication)
- specify the locations to tell where do you want to output the models and the enums.
- only installs [`graphql-scalars`](https://github.com/Urigo/graphql-scalars) if any custom scalar types were used in `prisma.schema` file
- option to use `yarn` for installing [`graphql-scalars`](https://github.com/Urigo/graphql-scalars) (default is npm)


## Usage

1. **Install**
```prisma
generator PrismaTypeGraphQLTypesGenerator {
    provider = "npx prisma-typegraphql-types-generator"
}
```
