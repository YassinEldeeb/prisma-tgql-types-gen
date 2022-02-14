import 'reflect-metadata'
import { buildSchema } from 'type-graphql'
import path from 'path'
import { ApolloServer } from 'apollo-server'
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'

const main = async () => {
  const schema = await buildSchema({
    resolvers: [path.join(__dirname, './resolvers/**/*.{ts,js}')],
  })

  const server = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground],
  })

  server.listen(4000, () => {
    console.log(`
      Server is running 🚀
      Listening on port 4000
    `)
  })
}

main()
