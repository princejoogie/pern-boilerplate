# Awesome Project Build with TypeORM

## Steps to run this project:

1. Run `npm i` command
2. Setup database settings inside `ormconfig.json` file
3. Run `npm run dev` command

## Generating Access and Refresh token secrets
run `node -e "console.log(require('crypto').randomBytes(256).toString('base64'));"`

## Error Guide
| Code / Subclass                                                   | Description                                                                                                                               |
|-------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------|
| GRAPHQL_PARSE_FAILED - SyntaxError                                | The GraphQL operation string contains a syntax error.                                                                                     |
| GRAPHQL_VALIDATION_FAILED - ValidationError                       | The GraphQL operation is not valid against the server's schema.                                                                           |
| BAD_USER_INPUT - UserInputError                                   | The GraphQL operation includes an invalid value for a field argument.                                                                     |
| UNAUTHENTICATED - AuthenticationError                             | The server failed to authenticate with a required data source, such as a REST API.                                                        |
| FORBIDDEN - ForbiddenError                                        | The server was unauthorized to access a required data source, such as a REST API.                                                         |
| PERSISTED_QUERY_NOT_FOUND - PersistedQueryNotFoundError           | A client sent the hash of a query string to execute via automatic persisted queries, but the query was not in the APQ cache.              |
| PERSISTED_QUERY_NOT_SUPPORTED - PersistedQueryNotSupportedError   | A client sent the hash of a query string to execute via automatic persisted queries, but the server has disabled APQ.                     |
| INTERNAL_SERVER_ERROR - None                                      | An unspecified error occurred. This is the default error code returned by any ApolloError instance that doesn't specify a different code. |
