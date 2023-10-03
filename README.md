# A Very Real Company

This application forms the internal control system for A Very Real Company.

## Development

For development purposes, the application can be run locally using Docker Compose.
Please note that the included `docker-compose.yml` file is _not_ suitable for production deployment, due to
shortfalls including, but not limited to:

- insecure default passwords
- lack of HTTPS support
- lack of persistent database storage
- exposed database ports

It's expected that you'll use this file as a starting point for your own deployment.

### Getting started

```shell
# install dependencies locally to allow your IDE to provide hints
npm install

# start the stack in a detached state
docker compose up -d
```

The seed data will be automatically pulled from the placeholder API and loaded into the development database
whenever the application container is started. You must have a working internet connection to the placeholder
API for the seed data to be loaded.

The application should become available at <http://localhost:3000>.

Your local code is mounted into the container for development purposes, so changes should be reflected almost
immediately with hot-reloading. If you make changes to the `package.json` file, you'll need to restart the
container to reinstall dependencies.

### Other useful commands

```shell
# view logs
docker compose logs -f

# obtain a shell in the application container
docker compose exec app sh

# stop the stack; reminder that data is not persisted!
docker compose down
```

## Testing

The following assumptions were made, and should be taken into account while testing:

- Pagination is not currently implemented in the user interface of contact display.
- The user interface does not currently provide a way to delete contacts.

### Manual test cases

1. Verify that the application is available at <http://localhost:3000>.
2. Verify that the application displays a list of contacts.
3. Verify that the application filters contacts by any of the contact's fields.
4. Verify that clicking "Create" displays a form to create a new contact.
5. Verify that submitting the form with non-empty fields creates a new contact.
6. Verify that submitting the form with empty fields does not create a new contact, and displays errors.

## Production deployment

It is recommended that the application is deployed using a container orchestration platform such as Kubernetes.
You can use the included `Dockerfile.production` file as a starting point for your own deployment.

**Reminder:** The included `docker-compose.yml` file is _not_ suitable for production deployment, due to
the shortfalls listed above.
