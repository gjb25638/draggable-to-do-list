#-----------------------------------------------------------
# Docker
#-----------------------------------------------------------

# Wake up docker containers
up:
	docker-compose up -d

# Shut down docker containers
down:
	docker-compose down

# Show a status of each container
status:
	docker-compose ps

# Status alias
s: status

# Show logs of each container
logs:
	docker-compose logs

# Restart all containers
restart: down up

# Restart the server container
restart-server:
	docker-compose restart server

# Restart the server container alias
rs: restart-server

# Show the server logs
logs-server:
	docker-compose logs server

# Show the server logs alias
ls: logs-server

# Build and up docker containers
build:
	docker-compose up -d --build

# Build containers with no cache option
build-no-cache:
	docker-compose build --no-cache

# Build and up docker containers
rebuild: down build

# Run terminal of the client container
server:
	docker-compose exec server /bin/sh

remove-all-images:
	docker rmi -f $(docker images -aq)

rai: remove-all-images