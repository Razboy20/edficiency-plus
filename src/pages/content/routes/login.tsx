import { createSignal, Show } from "solid-js";
import { createRouteData, useRouteData } from "solid-start";
import { redirect } from "solid-start/server";
import Spinner from "../components/Spinner";

export const routeData = () => {
  return createRouteData((_, { request }) => {
    // const user = await authenticator.isAuthenticated(request);
    const user = {};
    if (user) return redirect("/");
    return user;
  });
};

const GoogleLogo = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="0.98em"
    height="1em"
    preserveAspectRatio="xMidYMid meet"
    viewBox="0 0 256 262"
    class="h-6 w-6"
  >
    <path
      fill="#4285F4"
      d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
    />
    <path
      fill="#34A853"
      d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
    />
    <path
      fill="#FBBC05"
      d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
    />
    <path
      fill="#EB4335"
      d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
    />
  </svg>
);

export default function Home() {
  const _data = useRouteData<typeof routeData>();
  _data.latest;

  const [loading, setLoading] = createSignal(false);

  return (
    <div class="absolute left-1/2 top-[calc(50%-15px)] w-full max-w-[38em] -translate-x-1/2 -translate-y-1/2 space-y-5 rounded-xl bg-white p-7 shadow-lg">
      <h2 class="text-2xl font-bold">Login to manage your student flexes.</h2>
      <button
        class="focusable flex w-full transform-gpu items-center justify-center gap-2.5 rounded-md border border-blue-500 bg-white p-3 text-base font-bold text-gray-800 transition hover:scale-[1.01] hover:border-sky-500 hover:text-gray-900 active:scale-100 active:border-sky-500 active:bg-sky-50/70 active:hover:shadow disabled:border-gray-400 disabled:bg-gray-50 disabled:text-gray-700"
        disabled={loading()}
        onClick={() => {
          console.log("logging in...");
          setLoading(true);
          try {
            // const test = (await authClient.login("google", {
            //   successRedirect: `${location?.origin}/`,
            //   failureRedirect: `${location?.origin}/`,
            // })) as User;
            // console.log(test);
          } catch (e) {
            setLoading(false);
            console.error(e);
          }
        }}
      >
        <Show when={!loading()}>
          <GoogleLogo />
        </Show>
        <Spinner class="h-6 w-6 text-[#4285F4]" show={loading()} />
        Login via Google
      </button>
    </div>
  );
}
