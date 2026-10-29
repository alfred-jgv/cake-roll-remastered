import { z } from "zod";

const envSchema = z.object({
    DATABASE_URL: z.string().min(1),
    DIRECT_URL: z.string().min(1).optional(),
    NEXT_PUBLIC_SUPABASE_URL: z.url(),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
    SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),
    NEXT_PUBLIC_SUPABASE_PRODUCT_BUCKET: z.string().min(1).default("product-images"),
    NEXT_PUBLIC_SITE_URL: z.url().optional(),
    PAYMONGO_SECRET_KEY: z.string().optional(),
    PAYMONGO_WEBHOOK_SECRET: z.string().optional(),
    ADMIN_EMAILS: z.string().optional(),
});

export type ServerEnv = z.infer<typeof envSchema>;

export function getServerEnv(): ServerEnv {
    const parsed = envSchema.safeParse(process.env);

    if (!parsed.success) {
        throw new Error(`Invalid environment variables: ${parsed.error.message}`);
    }

    return parsed.data;
}
