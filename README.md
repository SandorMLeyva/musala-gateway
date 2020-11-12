# Musala-Gateway

This is a test project developed using javascript technologies.

###  Structured with NX

Nx is the preeminent toolkit for Monorepo development, which helps  you to build software smarter and faster. With Nx you can build  full-stack applications with your preferred framework, integrate with  modern tools you’re probably already using, and reinforce best practices for your entire development team or enterprise. Use Nx to build  software at scale, the better way.

- Out of the box integration with Cypress, Jest, Typescript, Prettier + more

  *[More info about NX](https://nx.dev/latest/react/getting-started/why-nx)*

The code of this project is written in Typescript

- Client:  **ReactJS** 

- Server: **ExpressJS**

- Test: **Jest**, **Cypress**

  

## SET UP

```bash
make init
```

## TEST

To check the correct functioning of the api

```bash
make test_api
```

To check the correct functioning of the whole system

```bash
make server
make test_e2e
```

If you want to test the API, we offer you a [Insomnia](https://insomnia.rest/download/) workspace with the [tests](./apps/api/insomnia.json) of all the endpoints

## Build

```bash
make server
make client
```



## Requirements

1. [NodeJS](https://nodejs.org/es/)
2. [docker](https://www.docker.com/)
3. [docker-compose](https://www.docker.com/)

