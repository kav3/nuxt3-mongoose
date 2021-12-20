import type { IncomingMessage, ServerResponse } from 'http'
import { anyUser, createUser } from '../../services/user.service'
import { useQuery, useBody } from 'h3'

export default async (req: IncomingMessage, res: ServerResponse) => {
    if (req.method === "GET") {
        let q = await useQuery(req)
        if (q && q.username)
            return (await anyUser({ username: q.username.toString().toLowerCase() })) ? "true" : "false";
    } else if (req.method === "POST") {
        let b = await useBody(req)
        const { username, name, password } = b;
        if (username && name && password)
            return await createUser(b)
    }

}