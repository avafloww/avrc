# Base Dockerfile for development.
FROM node:18-alpine

# Development files are mounted into the container directly at /app.
# We run the application from /app, with modules installed within
# the container image itself, so that we don't depend on the host
# platform's modules, which may be different (i.e. native modules).
WORKDIR /app

# Install modules and start the application in dev mode.
CMD ["npm", "run", "dev:container"]
