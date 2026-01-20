# Personal portfolio

[![Site preview](/public/site-preview.png)](https://ev1shoaib.netlify.app)

My design portfolio to showcase a few projects. Built with [Next.js](https://nextjs.org/), [Three.js](https://threejs.org/), and [Framer Motion](https://www.framer.com/motion/). View the [live site](https://ev1shoaib.netlify.app).

## Install & run

Make sure you have nodejs `18.0.0` or higher and npm `8.6.0` or higher installed. Install dependencies with:

```bash
npm install
```

Once it's done start up a local server with:

```bash
npm run dev
```

To create a production build:

```bash
npm run build
```

## Deployment

The site is hosted on [Netlify](https://www.netlify.com/). Deployments happen automatically when you push to the main branch, or you can deploy manually using the Netlify CLI.

### Automatic Deployment
Simply push to the `main` branch and Netlify will build and deploy automatically.

### Manual Deployment
Install the Netlify CLI and deploy:

```bash
npm install -g netlify-cli
netlify login
npm run deploy
```

For preview deployments (without publishing to production):

```bash
npm run deploy:preview
```
