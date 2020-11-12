
init:
	yarn

db:
	docker-compose up -d mongo

test_api: db &
	yarn nx test api

test_e2e: 
	yarn nx e2e gateway-e2e

server: db
	yarn nx serve api

client: 
	yarn nx build gateway
	yarn serve -s dist/apps/gateway/ -l 8080




