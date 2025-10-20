.PHONY: dev test up down build clean

# Variables
COMPOSE_FILE = docker-compose.yml

# Targets
dev: up
	@echo "Development environment is running. Access it at http://localhost:3000"

up:
	docker-compose -f $(COMPOSE_FILE) up -d --build

down:
	docker-compose -f $(COMPOSE_FILE) down

build:
	docker-compose -f $(COMPOSE_FILE) build

# Need to figure out what nuxt uses for testing. 
# test:

clean: down
	docker-compose -f $(COMPOSE_FILE) rm -f -v
	@echo "Cleaned up Docker resources."