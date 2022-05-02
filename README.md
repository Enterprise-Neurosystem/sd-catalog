# sd-catalog

**_This project is a work in progress._**
Most planned features are not yet implemented, and we are coming up with a list of features and a plan/roadmap for their implementation.

This repository contains the source and demonstrations for the catalog of self-describing assets, a contribution from the Central Intelligence Platform Team.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Development recommended pre-requisites

Prettier is used for handling styling automatically.
This tool runs on all code in a pre-commit step.
It is recommended to also use prettier in your IDE so you see those prettier-related changes in your code prior to commit.
The vscode-related config is already included in this project, but it requires the extension to be installed with the following command:

```
code --install-extension esbenp.prettier-vscode
```

You could also enable `Format on save` in vscode settings, which would ensure syntax changes this extension will make automatically appear on save.

## Getting Started

### Install dependencies

```bash
npm install
```

### Development mode start

When in development mode, the app uses environment variables found in `env.development`.
The app requires a back-end API available, and a mock version of this API server is included in the project.
Below are steps to start the mock API server, update the back-end state, and then see changes in a web client.

1. in terminal 1, start mock API server:

```bash
NODE_ENV=development npm run start-mock-api
```

2. in terminal 2, start front-end server:

```bash
npm run dev
```

3. Continue with steps in the [this section](#validate) below.

### Production mode start

The following steps assume you are running the app in production on your local laptop.
The steps would be slightly different regarding hostname and `.env` handling when deploying
to a cloud provider or other remote server.

1. `localhost` cannot be used when in production mode.
   Instead add a new hostname for your laptop to `/etc/hosts`:

```bash
echo '127.0.0.1 laptop.internal' | sudo tee -a /etc/hosts
```

2. Copy the dev `.env` file for production:

```bash
cp .env.development .env.production.local
sed -i 's/localhost/laptop.internal/' .env.production.local
```

If on a mac, the `sed` command above will fail. Follow these steps:

```bash
brew install gnu-sed
gsed -i 's/localhost/laptop.internal/' .env.production.local
```

3. in terminal 1, start mock API server in production mode:

```bash
NODE_ENV=production npm run start-mock-api
```

4. in terminal 2, start front-end server in production mode:

```bash
npm run build
npm start
```

5. Continue with steps in the [this section](#validate) below.

### Validate

The environment is ready for validation after following either development or production steps above.

1. in browser view initial static content: http://localhost:3000
2. in terminal 3, update data in mock API server:

```
curl -X POST \
-H "Content-Type: text/plain" \
-d "{\"date\":\"2022-04-01T15:49:35.759Z\",\"title\":\"publish fix\",\"content\":\"some content\"}" \
http://localhost:3001/posts
```

3. mock server calls front-end server webhook (automatic)
4. front-end requests data from mock API server and regenerates static content (automatic)
5. refresh page to see new static content

## Learn More

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Team

Below are links to the team.
For now the easiest way to reach out to us (and the broader team) is to create an issue on this repo.
We'll update this list and steps to contact our group as it changes.

https://github.com/archana-ravindar

https://github.com/dasanind

https://github.com/dineshverma

https://github.com/edelsohn

https://github.com/jankivora

https://github.com/jriviere0316

https://github.com/rahulbatra85

https://github.com/shirley336

https://github.com/vuldin
