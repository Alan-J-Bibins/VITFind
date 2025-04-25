import { betterAuth } from "better-auth"
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "generated/prisma";

const prisma = new PrismaClient

export const auth = betterAuth({
    emailAndPassword: {
        enabled: true,
        autoSignIn: true,
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            mapProfileToUser: (profile) => {
                return {
                    name: profile.name,
                    email: profile.email,
                    image: profile.picture
                };
            },
        }
    },
    database: prismaAdapter(prisma, {
        provider: "cockroachdb"
    }),
})
