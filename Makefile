.ONESHELL:

migration.create:
	npm run typeorm migration:generate -- -n schema-v -o

migration.apply:
	npm run typeorm migration:run

generate.client:
	mv clients/generate-client.ts src/generate-client.ts
	npm run client:gen
	mv src/generate-client.ts clients/generate-client.ts
	rm db.gen.sqlite
	py clients/clean-client.py
