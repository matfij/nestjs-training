migration.create:
	npm run typeorm migration:generate -- -n schema-v -o

migration.apply:
	npm run typeorm migration:run
