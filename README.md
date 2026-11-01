# Cake n Roll

A mobile-first cake e-commerce web application built with Next.js, TypeScript, Prisma, and Supabase. Cake n Roll allows customers to browse cakes, explore product variants, manage a shopping cart, and place orders through a responsive storefront.

## Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **UI:** React, Tailwind CSS, shadcn/ui
- **Database:** Supabase PostgreSQL
- **ORM:** Prisma
- **Storage:** Supabase Storage
- **Validation:** Zod
- **Icons:** Lucide React

## Features

### Implemented

- Product catalog with category organization
- Product detail pages with variant selection
- Responsive storefront layouts
- Shopping cart with quantity management
- Checkout form with input validation
- Server-side order creation and persistence
- Order items and totals stored in the database
- Product images served through Supabase Storage
- About Us page introducing the Cake n Roll brand
- Product seeding for initial catalog data

### Future Enhancements

- Order confirmation page improvements, if needed
- PayMongo hosted checkout integration
- Order tracking and status management
- Administrative product and order management

**Current scope:** Customer registration, login, and user accounts are excluded from the initial MVP. Authentication and account management may be introduced in a future iteration.

Payments are not yet integrated with a payment gateway. Orders are created through the checkout flow, with payment handled separately.

## Getting Started

### Prerequisites

- Node.js and npm
- A Supabase project with PostgreSQL and Storage enabled
- Environment variables configured locally

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file in the project root and configure the required database and Supabase credentials.

Refer to the project's environment configuration and `lib/env.ts` for the required variable names.

**Security:** Never commit `.env.local` or expose service-role keys and other server-only secrets in client-side code.

### 3. Generate the Prisma Client

```bash
npx prisma generate
```

### 4. Apply Database Migrations

For local development:

```bash
npx prisma migrate dev
```

To apply existing migrations in a deployment environment:

```bash
npx prisma migrate deploy
```

### 5. Seed the Product Catalog

```bash
npx prisma db seed
```

The seed script populates the initial product catalog with categories, products, variants, and image references. Ensure the referenced product images exist in Supabase Storage.

### 6. Start the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Build the application for production |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Check TypeScript types |
| `npm run db:generate` | Generate Prisma Client |
| `npm run db:migrate` | Run development migrations |
| `npm run db:deploy` | Apply existing migrations |
| `npm run db:seed` | Seed the database |
| `npm run db:studio` | Open Prisma Studio |
| `npm run db:reset` | Reset the development database and rerun migrations |

*Note: Confirm the commands against `package.json` before using this table as the definitive script reference.*

## Project Structure

```text
cake-roll-remastered/
├── app/                  # Next.js routes, layouts, and global styles
│   ├── about/            # About Us page
│   ├── products/         # Product catalog and detail routes
│   ├── cart/             # Shopping cart
│   └── ...               # Other routes, including checkout
├── components/           # Reusable UI components
│   └── ui/               # Shared UI primitives
├── lib/                  # Database clients, utilities, and helpers
├── prisma/
│   ├── schema.prisma     # Database schema
│   ├── migrations/       # Database migration history
│   └── seed-data/        # Initial catalog data
├── generated/
│   └── prisma/           # Generated Prisma Client
├── prisma.config.ts      # Prisma CLI configuration
├── .env.local            # Local environment variables (not committed)
└── README.md
```

*The route and directory names above are representative; adjust them to match the actual project structure.*

## Development Guidelines

- Use Server Components by default and Client Components when browser interactivity is needed.
- Validate input on the client for usability and on the server for security.
- Calculate prices and totals on the server; never trust prices submitted by the client.
- Store monetary amounts as integer centavos.
- Keep secrets and privileged database operations on the server.
- Use responsive layouts and accessible UI components.
- Test changes with linting, type checking, and a production build.

The application currently supports order creation without an integrated online payment gateway. User accounts, administrative tools, and automated payment processing remain outside the initial MVP scope.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
