install:
	npm ci
	cd frontend && npm install --production=false --legacy-peer-deps

build:
	rm -rf frontend/dist
	cd frontend && npm run build

start:
	npx start-server -s ./frontend/dist

lint:
	npm run lint --prefix frontend