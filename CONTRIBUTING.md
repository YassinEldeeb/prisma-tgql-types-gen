## How do I Contribute 💪

we're excited to have you on board!

- Take a look at the existing [Issues](https://github.com/YassinEldeeb/prisma-tgql-types-gen/issues) or [create a new issue](https://github.com/YassinEldeeb/prisma-tgql-types-gen/issues/new/choose)!
- Fork the Repo. Then, create a branch for any issue that you are working on. Finally, commit your work.
- Create a **[Pull Request](https://github.com/YassinEldeeb/prisma-tgql-types-gen/compare)**, which will be promptly reviewed and given suggestions for improvements.

## Setup
It's a private workspace where you can see two packages:
1. Generator package
2. Server package to test out the changes you've made to the generator

## How to start developing?
```bash
# get into the generator package
$ cd packages/generator

# Run yarn to install the needed dependencies
$ yarn

# start developing
$ yarn dev
```

## How to test the changes I've made to the generator?
```bash
# get into the server package
$ cd packages/server

# Run yarn to install the needed dependencies
$ yarn

# check `./prisma/schema.prisma` file to modify the generator options if needed
# test the generator
$ prisma generate
# then checkout the generated output where you can find it in the specefied output path generator options in `schema.prisma`
```
