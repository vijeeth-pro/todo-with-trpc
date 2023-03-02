import { z } from "zod";
import { procedure, router } from "../trpc";

interface Todo {
    id: number,
    text: string
}

let todo: Todo[] = []

export const appRouter = router({
    hello: procedure.input(
        z.object({
            text: z.string(),
        })
    ).mutation(({ input }) => {
        todo.push(
            {
                id: Date.now(),
                text: input.text
            }
        )
        return {
            success: true
        }
    }),
    getHello: procedure.query(() => {
        return todo
    }),
    deleteHello: procedure.input(
        z.object({
            id: z.number()
        })
    ).mutation(({input}) => {
        const array =  todo.filter((val) => input.id !== val.id )
        todo = array
    })

})

export type AppRouter = typeof appRouter