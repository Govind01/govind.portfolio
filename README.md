# MERN Developer Portfolio

A responsive React portfolio and Express API. Portfolio copy and project content are managed in `client/src/profile.js`.

## Run locally

1. Install Node.js 18 or newer and MongoDB Community Server, or create a MongoDB Atlas database.
2. Run `npm install` from the project root.
3. Copy `server/.env.example` to `server/.env` and set `MONGO_URI` to your database connection string.
4. Run `npm run dev` from the project root. The portfolio is at `http://localhost:5173`; the API is at `http://localhost:5000`.

The site can be browsed without MongoDB. The contact form stores messages in MongoDB when a connection is configured. The API health check is available at `/api/health`.

## Personalize

Update the identity, bio, links, project examples, experience, and skills in `client/src/profile.js`. Replace the sample portrait and project image URLs with your own assets. The résumé download is generated from the profile data as a plain-text file.

## Production build

Run `npm run build` to create the client bundle in `client/dist`. Deploy the client and API separately or configure your hosting provider to serve the built client alongside the Express API.

## Deploy the portfolio to GitHub Pages

The GitHub Actions workflow in `.github/workflows/deploy.yml` builds the client and deploys it to GitHub Pages whenever changes are pushed to `main`. In the repository settings, set **Pages → Build and deployment → Source** to **GitHub Actions**. The Vite base path is selected automatically for the repository URL.

GitHub Pages only hosts the static client. The contact form opens a prefilled email draft addressed to the email in `client/src/profile.js`; it does not store messages in the Express API.
