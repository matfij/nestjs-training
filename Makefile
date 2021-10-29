.ONESHELL:

migration.create:
	npm run typeorm migration:generate -- -n schema-v -o

migration.apply:
	npm run typeorm migration:run

migrate.dev:
	npm run typeorm migration:generate -- -n schema-v -o
	npm run typeorm migration:run

migrate.prod:
	npm run typeorm:prod migration:generate -- -n schema-v -o

generate.client:
	mv clients/generate-client.ts src/generate-client.ts
	npm run client:gen
	mv src/generate-client.ts clients/generate-client.ts
	rm db.gen.sqlite
	py clients/clean-client.py
