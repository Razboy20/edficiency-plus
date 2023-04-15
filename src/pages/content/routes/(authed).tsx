import { Suspense } from "solid-js";
import { Outlet, parseCookie, redirect, useRouteData } from "solid-start";
import Navbar from "../components/Navbar";
import { FastSpinner } from "../components/Spinner";

// export function routeData() {
//   return createServerData$(
//     async (_, { request }) => {
//       // return await authenticator.isAuthenticated(request, {
//       //   failureRedirect: "/login",
//       // });
//       return { id: 1, name: "test" };
//       // return (user ? user : redirect("/login")) as unknown as DbUser;
//     },
//     {
//       deferStream: true,
//       key: "auth_user",
//     }
//   );
// }

export function routeData() {
  // check if phpsessionid is set in cookie
  const sessionId = parseCookie(document.cookie)["PHPSESSID"];
  if (!sessionId) {
    throw redirect("/login");
  }
}

export default function AuthHandler() {
  useRouteData<typeof routeData>();

  return (
    // <UrqlProvider>
    <div class="flex h-screen w-full flex-col">
      <Navbar />
      <div class="h-full w-full flex-1 overflow-auto">
        <Suspense
          // fallback={<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform">Loading...</div>}
          fallback={
            <div>
              <FastSpinner
                class="fixed left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 stroke-2 text-blue-500"
                show
              />
            </div>
          }
        >
          <Outlet />
        </Suspense>
      </div>
    </div>
    // </UrqlProvider>
  );
}