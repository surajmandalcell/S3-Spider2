import { z } from "zod";

// Default JWT secret for development - MUST be overridden in production
const DEFAULT_JWT_SECRET = "dev-only-secret-change-in-production-min-32-chars";

export const ConfigModelSchema = z.object({
    s3xplorer_admin: z.string().min(1).default("admin@s3spider.local"),
    s3xplorer_admin_pass: z.string().min(8).default("admin1234"),
    port: z.coerce.number().safe().positive().default(5000),
    db_user: z.string().min(1).default("postgres"),
    db_pass: z.string().min(1).default("postgres"),
    db_host: z.string().min(1).default("localhost"),
    db_port: z.coerce.number().safe().positive().default(5432),
    db_name: z.string().min(1).default("s3explorer"),
    env: z.string().default("development"),
    jwt_secret: z.string().min(32).default(DEFAULT_JWT_SECRET),
    frontend_url: z.string().default("*"),
    cache_enabled: z.coerce.boolean().default(false),
    cache_host: z.string().optional(),
    cache_user: z.string().optional(),
    cache_pass: z.string().optional(),
    cache_port: z.coerce.number().safe().positive().optional(),
});

export type ConfigModel = z.infer<typeof ConfigModelSchema>;

export type EnvironmentVars = keyof ConfigModel;