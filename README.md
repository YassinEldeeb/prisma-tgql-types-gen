# TypeGraphQL-Prisma-Types-Generator

## **Prisma**

> [Prisma](https://www.prisma.io/) is Database ORM Library for Node.js, Typescript.

Prisma basically generate each models type definition defined in [`schema.prisma`](https://www.prisma.io/docs/concepts/components/prisma-schema).
Therefore, it does not require additional entry classes or repository layers.

However, there are limitations because of these characteristics, in order to use TypeGraphQL with Prisma you've to write the same types as classes and enums in TypeGraphQL and maintain both of them (Prisma & TypeGraphQL) to be synced
