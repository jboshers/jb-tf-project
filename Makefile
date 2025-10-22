.PHONY: dev test up down build clean

# Variables
COMPOSE_FILE = docker-compose.yml
NUXT_TEST_COMMAND := npm run test

# Targets
dev: up
	@echo "Development environment is running. Access it at http://localhost:3000"

up:
	docker-compose -f $(COMPOSE_FILE) up -d --build

down:
	docker-compose -f $(COMPOSE_FILE) down

build:
	docker-compose -f $(COMPOSE_FILE) build

test: up
	@echo "Running tests..."
	docker compose run --rm test $(NUXT_TEST_COMMAND) --passWithNoTests --changedSince=HEAD~1 --config=vitest.config.ts

clean: down
	docker-compose -f $(COMPOSE_FILE) rm -f -v
	@echo "Cleaned up Docker resources."