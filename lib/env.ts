import { z } from "zod";

const databaseEnvSchema = z.object({
    DATABASE_URL: z.string().min(1),
    DIRECT_URL: z.string().min(1).optional(),
});

const supabaseEnvSchema = z.object({
    NEXT_PUBLIC_SUPABASE_URL: z.url(),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
    SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),
    NEXT_PUBLIC_SUPABASE_PRODUCT_BUCKET: z
        .string()
        .min(1)
        .default("product-images"),
    NEXT_PUBLIC_SITE_URL: z.url().optional(),
    PAYMONGO_SECRET_KEY: z.string().optional(),
    PAYMONGO_WEBHOOK_SECRET: z.string().optional(),
    ADMIN_EMAILS: z.string().optional(),
});

export type DatabaseEnv = z.infer<typeof databaseEnvSchema>;
export type SupabaseEnv = z.infer<typeof supabaseEnvSchema>;

export function getDatabaseEnv(): DatabaseEnv {
    const parsed = databaseEnvSchema.safeParse(process.env);

    if (!parsed.success) {
        throw new Error(
            `Invalid database environment variables: ${parsed.error.message}`,
        );
    }

    return parsed.data;
}

export function getSupabaseEnv(): SupabaseEnv {
    const parsed = supabaseEnvSchema.safeParse(process.env);

    if (!parsed.success) {
        throw new Error(
            `Invalid Supabase environment variables: ${parsed.error.message}`,
        );
    }

    return parsed.data;
}