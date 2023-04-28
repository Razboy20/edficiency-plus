import { A } from "solid-start";

export default function NotFound() {
  return (
    <main class="fixed h-screen w-screen flex flex-col items-center justify-center bg-zinc-800 space-y-2">
      <h1 class="text-7xl font-bold text-zinc-300">404.</h1>
      <h2 class="text-lg font-normal text-zinc-300">
        Page not found. Click{" "}
        <A class="link" href="/">
          here
        </A>{" "}
        to go back.
      </h2>
    </main>
  );
}
