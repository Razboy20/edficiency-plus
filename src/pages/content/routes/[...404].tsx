import { A } from "solid-start";

export default function NotFound() {
  return (
    <main class="fixed flex h-screen w-screen flex-col items-center justify-center space-y-2 bg-zinc-800">
      <h1 class="text-7xl font-bold text-zinc-300">404.</h1>
      <h2 class="font-regular text-lg text-zinc-300">
        Page not found. Click{" "}
        <A class="link" href="/">
          here
        </A>{" "}
        to go back.
      </h2>
    </main>
  );
}
