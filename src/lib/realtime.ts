import { redis } from "@/lib/redis";
import { InferRealtimeEvents, Realtime } from "@upstash/realtime";
import z from "zod";

const message = z.object({
    id: z.string(),
    sender: z.string(),
    text: z.string(),
    timestamp: z.number(),
    roomId: z.string(),
    token: z.string().optional(),
});
const destroy = z.object({
    isDestroyed: z.literal(true),
});

const schema = {
    chat: {
        message,
        destroy,
    }
}

export const realtime = new Realtime({ schema, redis });
export type RealtimeEvents = InferRealtimeEvents<typeof realtime>
export type Message = z.infer<typeof message>