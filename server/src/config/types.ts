import { z } from "zod";

export const ConfigModelSchema = z.object({
    s3xplorer_admin: z.string().min(1),
    s3xplorer_admin_pass: z.string().min(8, { message: "Admin password must be at least 8 characters" }),
    port: z.coerce.number().safe().positive(),
    db_user: z.string().min(1),
    db_pass: z.string().min(1),
    db_host: z.string().min(1),
    db_port: z.coerce.number().safe().positive(),
    db_name: z.string().min(1),
    env: z.string().min(1).optional(),
    jwt_secret: z.string().min(32, { message: "JWT_SECRET must be at least 32 characters for security" }),
    frontend_url: z.string().optional(),
    cache_enabled: z.coerce.boolean().optional(),
    cache_host: z.string().min(1).optional(),
    cache_user: z.string().min(1).optional(),
    cache_pass: z.string().min(1).optional(),
    cache_port: z.coerce.number().safe().positive().optional(),
});

export type ConfigModel = z.infer<typeof ConfigModelSchema>;

export type EnvironmentVars = keyof ConfigModel;