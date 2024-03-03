"use client";
import Image from "next/image";
import { Console, Effect, Random, pipe } from "effect"

export default function Home() {

  const hoge = () => {
    const task1 = Console.log("Executing task1...")
    const task2 = Effect.succeed("Something went wrong!")
    const task3 = Console.log("Executing task3...")

    const program = task1.pipe(
      Effect.flatMap(() => {
        return task2
      }),
      Effect.flatMap(() => task3) 
    )

    Effect.runPromise(program).then(console.log, console.error)
  }

  const fetchUserId = Effect.succeed(1);
  const fetchUserName = Effect.succeed("AAA")
  const fetch = () => {
    Effect.runSyncExit(Effect.all([fetchUserId, fetchUserName]).pipe(
      Effect.map(([id, user]) => {
        console.log(id, user)
      })
    ))
  }

  return (
    <main>
      <div>
        <button onClick={() => hoge()}>Click</button>
      </div>
      <div>
        <button onClick={() => fetch()}>Fetch</button>
      </div>
    </main>
  );
}
