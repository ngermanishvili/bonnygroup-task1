declare module 'http' {
    interface Server {
        io: Server | undefined;
    }
}

declare module 'socket.io' {
    interface Socket {
        id: string;
    }

    interface Server {
        io: Server | undefined;
    }
}

export interface NextApiRequestWithSocket extends NextApiRequest {
    io: Server | undefined;
}