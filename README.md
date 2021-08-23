# PERN Boilerplate

🚧 `WORK IN PROGRESS` 🚧

`upcoming features:`

- Email confirmation
- Socials Login

## Features

- GraphQL Server
- JWT Authentication
- Auto refresh access tokens on expire
- Schema generation for client side (server schema stays in sync with client schema)

---

## Tech Stack

### Client

- [React](https://reactjs.org/) + [Vite](https://vitejs.dev/)
- [Apollo GraphQL](https://www.apollographql.com/)
- [TailwindCSS](https://tailwindcss.com/) (css utility framework)
- [MobX](https://mobx.js.org/react-integration.html) (state-management)
- [Formik](https://formik.org/) (form handlers)

### Server

- express + [apollo-server-express](https://github.com/apollographql/apollo-server)
- [Postgres](https://www.postgresql.org/) (database)
- [TypeORM](https://typeorm.io/#/) (ORM)
- [class-validator](https://github.com/typestack/class-validator)
- [argon2](https://en.wikipedia.org/wiki/Argon2) (password encryption)
- [GraphQL](https://graphql.org/) endpoints (also compatible with REST)

---

## Prerequisites

1. Node ([Download](https://nodejs.org/en/download/))
2. Postgres ([Download](https://www.postgresql.org/download/))
3. `optional` Yarn ([npm install](https://yarnpkg.com/getting-started/install))

---

## Usage

1. Clone the repository

```bash
    git clone --depth 1 https://github.com/princejoogie/pern-boilerplate.git <project-name>
```

### Server

1. Install dependencies

```bash
    cd ./<project-name>/server && npm install
    # or
    cd ./<project-name>/server && yarn
```

2. Create Postgres database
   - `make sure to add postgres bin to environmental variables`

```bash
    createdb <db-name>
    # or run the recreate sciprt
    npm run schema:drop # !WARNING - this will recreate the database so only run this initially
```

3. Setup `.env` and `.env.development`

```bash
    # Content of .env and .env.development should have these 4 variables
    PORT=4000
    BASE_URL=http://localhost
    ACCESS_TOKEN_SECRET=access_token_secret_here
    REFRESH_TOKEN_SECRET=refresh_token_secret_here
```

4. Setup `ormconfig.json`

```bash
    # replace those with "< >" to how you setup your postgres
    {
        "type": "postgres",
        "host": "localhost",
        "port": 5432,
        "username": <postgres-username>,
        "password": <postgres-password>,
        "database": <db-name>,
        "synchronize": true,
        "logging": true,
        "entities": ["src/entity/**/*.ts"],
        "migrations": ["src/migration/**/*.ts"],
        "subscribers": ["src/subscriber/**/*.ts"],
        "cli": {
            "entitiesDir": "src/entity",
            "migrationsDir": "src/migration",
            "subscribersDir": "src/subscriber"
        }
    }
```

5. Initialize migrations

```bash
    npm run migration:create && npm run migration:run
```

6. Start the server

```bash
    npm run dev
```

### Client

1. Install dependencies

```bash
    cd ./<project-name>/client && npm install
    # or
    cd ./<project-name>/client && yarn
```

---

## Preview

### Client

<img src="./assets/client.png" alt="register_route_client" />
<img src="./assets/client_2.png" alt="home_route_client" />

### Server

<img src="./assets/graphql.png" alt="graphql_playground" />

---

Prince Carlo Juguilon
