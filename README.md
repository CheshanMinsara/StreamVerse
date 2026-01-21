# StreamVerse

This is a Next.js project for streaming movies and TV shows, created in Firebase Studio.

## Getting Started

To get started, run the development server:

```bash
npm run dev
```

Open [http://localhost:9002](http://localhost:9002) with your browser to see the result.

You can start editing the page by modifying `src/app/page.tsx`.

## Deploying on Cloudflare Pages

Yes, this application is ready to be hosted on Cloudflare Pages. As a standard Next.js app, it's fully compatible.

Follow these steps to deploy:

1.  **Push to Git:** Make sure your project is pushed to a GitHub, GitLab, or Bitbucket repository.
2.  **Create a Cloudflare Pages Project:**
    *   Log in to your Cloudflare dashboard.
    *   Go to **Workers & Pages** and select the **Pages** tab.
    *   Click **Create a project** and connect to your Git provider.
    *   Select your project's repository.
3.  **Configure Build Settings:**
    *   In the "Set up builds and deployments" section, Cloudflare should automatically detect Next.js and select it as the **Framework preset**.
    *   This will pre-fill the build settings correctly. It should look like this:
        *   **Build command:** `next build`
        *   **Build output directory:** `.next`
4.  **Add Environment Variables:**
    *   For a production build, you should use your own TMDB API key.
    *   In your Cloudflare project settings, add an environment variable:
    *   **Variable name:** `TMDB_API_KEY`
    *   **Value:** `your_tmdb_api_key_here`
5.  **Deploy:**
    *   Click **Save and Deploy**. Cloudflare will build and deploy your site.

For local development, you can create a `.env.local` file in the root of the project and add your `TMDB_API_KEY` there. If this variable is not set, the app will fall back to using a default sample key.

Hosting on Cloudflare will give you the benefits of their global CDN for performance and their security features.
