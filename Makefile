launch: 
	docker compose up -d api mongo mongo-express

setup: 
	docker compose exec api node ./Seeders/index.js	