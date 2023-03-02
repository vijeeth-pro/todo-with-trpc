import { AppRouter } from "@/server/router/_app";
import { createTRPCNext } from "@trpc/next";
import { httpBatchLink } from "@trpc/client";


function getBaseUrl(){
    if(typeof window !== 'undefined') return ''
    // reference for vercel.com
    if (process.env.VERCEL_URL)
    return `https://${process.env.VERCEL_URL}`;
    // reference for render.com
    if (process.env.RENDER_INTERNAL_HOSTNAME)
    return `http://${process.env.RENDER_INTERNAL_HOSTNAME}:${process.env.PORT}`;
    // assume localhost
    return `http://localhost:${process.env.PORT ?? 3000}`;
}

export const trpc = createTRPCNext<AppRouter>({
    config({}) {
        return {
            links: [
                httpBatchLink({
                    url: `${getBaseUrl()}/api/trpc`
                })
            ]
        }
    }
})