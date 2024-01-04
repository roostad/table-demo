# Table Demo

This repo is a quick demo of using TS generics and Svelte's reactivity to flexibly generate
tables based on your data types, reducing boilerplate. The repo also demonstrates how to
connect a Non-TS backend (Python in this case) to a TS frontend.

## Running the project

The codebase can be run locally using docker compose. After downloading the repo, the below
will launch the demo on http://localhost:3000:

```bash
# Build time takes several minutes, first time
docker compose up --build
```

## Stop docker containers / Remove volumes

```bash
docker compose down -v
```

> For more information on docker installation, see: https://docs.docker.com/engine/install/
