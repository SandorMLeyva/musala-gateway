
init:
	npm i

db:
	docker-compose up -d mongo

test_api: db
	npm run nx test api

test_e2e: 
	npm run nx e2e gateway-e2e

server: db
	npm run nx serve api

client:
	npm run nx build gateway
	npm run serve -s dist/apps/gateway/ -l 8080




