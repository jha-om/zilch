"use client"
import { useUsername } from "@/hooks/use-username";
import { client } from "@/lib/client";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const { username } = useUsername();

  const { mutate: createRoom } = useMutation({
    mutationFn: async () => {
      const res = await client.room.create.post();

      if (res.status === 200) {
        router.push(`/room/${res.data?.roomId}`)
      }
    }
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <h1 className="relative text-3xl font-bold w-fit mx-auto tracking-tight cursor-pointer group">
            <span className="text-green-500 selection:bg-green-100">zilch</span>
            <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-3 py-1.5 text-xs bg-[#fefae0] text-[#b0875f] border border-dashed border-[#b0875f]/50 shadow-[2px_2px_0px_0px_rgba(176,135,95,0.4)] whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              analyze
            </span>
          </h1>
          <p className="text-zinc-500 text-sm selection:bg-[#14213d] selection:text-white">
            A zero proof, self-destructable chat room.
          </p>
        </div>
        <div className="border border-zinc-800 bg-zinc-900/50 p-6 backdrop-blur-md">
          <div className="space-y-5">
            <div className="space-y-2">
              <label className="flex items-center text-zinc-500">Your Identity</label>

              <div className="flex items-center gap-3">
                <div className="flex-1 bg-zinc-950 border border-zinc-800 p-3 text-sm text-zinc-400 font-mono selection:bg-[#14213d] selection:text-white">
                  {username}
                </div>
              </div>
            </div>
            <button onClick={() => createRoom()} className="w-full bg-zinc-100 text-black p-3 text-sm font-bold hover:bg-zinc-50 hover:text-black transition-colors mt-2 cursor-pointer disabled:opacity-50">
              CREATE SECURE ROOM
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
