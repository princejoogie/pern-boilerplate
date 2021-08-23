# CLIENT

## Realtime sync with server

- use `pollInterval`

```js
// example
const { loading, error, data } = useQuery(GET_USERS, {
  pollInterval: 500,
});
```

## GraphQL codegen

- run `npx graphql-codegen init` and add a script to package.json

```json
// package.json
{
  "scripts": {
    "gen": "graphql-codegen --config codegen.yml"
  }
}
```

- then run `npm run gen`
