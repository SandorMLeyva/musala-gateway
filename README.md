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





