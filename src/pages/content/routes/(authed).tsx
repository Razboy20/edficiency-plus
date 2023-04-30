import { Suspense } from "solid-js";
import { Outlet, useNavigate, useRouteData } from "solid-start";
import { AuthProvider } from "../components/AuthProvider";
import Navbar from "../components/Navbar";
import { FastSpinner } from "../components/Spinner";

export function routeData() {
  // if (!window.loggedIn) {
  //   const navigate = useNavigate();
  //   navigate("/login", {
  //     replace: true,
  //   });
  // }
}

export default function AuthHandler() {
  useRouteData<typeof routeData>();

  if (!window.loggedIn) {
    const navigate = useNavigate();
    navigate("/login", {
      replace: true,
      state: {
        returnTo: location.pathname,
      },
    });

    // eslint-disable-next-line solid/components-return-once
    return;
  }

  return (
    // <UrqlProvider>
    <div class="h-screen w-full flex flex-col">
      <Navbar />
      <div class="h-full w-full flex-1 overflow-auto">
        <Suspense
          // fallback={<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform">Loading...</div>}
          fallback={
            <div>
              <FastSpinner
                class="fixed left-1/2 top-1/2 h-6 w-6 stroke-2 text-blue-500 -translate-x-1/2 -translate-y-1/2"
                show
              />
            </div>
          }
        >
          <AuthProvider>
            <Outlet />
          </AuthProvider>
        </Suspense>
      </div>
    </div>
    // </UrqlProvider>
  );
}
