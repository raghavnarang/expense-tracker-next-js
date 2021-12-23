This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Expense Tracker (Next.JS)

Install the dependecies:

```bash
npm install
```

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## ENV variables required for Firebase Auth

```env
NEXT_PUBLIC_apiKey
NEXT_PUBLIC_authDomain
NEXT_PUBLIC_projectId
NEXT_PUBLIC_storageBucket
NEXT_PUBLIC_messagingSenderId
NEXT_PUBLIC_appId
```

NEXT_PUBLIC_ is used for availability of vars to frontend app.

Change the Development & Production server URL from `.env.development` and `.env.production` respectively

## Links

- Live Demo: [https://eager-fermi-101ff4.netlify.app/](https://eager-fermi-101ff4.netlify.app/)
- Backend Repo: [https://github.com/raghavnarang/expense-tracker](https://github.com/raghavnarang/expense-tracker)
