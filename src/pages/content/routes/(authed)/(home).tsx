import { Show, Suspense } from "solid-js";
import { useSession } from "../../components/AuthProvider";
import BlockCard from "../../components/BlockCard";
import SkeletonCard from "../../components/skeletons/SkeletonCard";
import type { Block } from "../../types/globals";

// export const routeData = ({
//   data,
// }: RouteDataArgs): [data: Resource<User>, currentBlock: Resource<OperationResult<Today_BlockQuery, AnyVariables>>] => {
//   const currentBlock = createQuery(() => ({
//     query: Today_BlockDocument,
//   }));

//   return [data as Resource<User>, currentBlock];
// };

export default function Home() {
  // const [user, blockQuery] = useRouteData<typeof routeData>();
  const user = useSession();

  return (
    <>
      <main class="flex h-full w-full items-center justify-center p-4">
        <div class="-mt-12 flex h-fit max-w-2xl flex-col gap-x-8 gap-y-6 overflow-auto rounded-xl bg-white p-4 shadow-md dark:bg-gray-700 sm:flex-row">
          <div class="flex flex-col">
            <h1 class="mx-4 my-2 text-center text-4xl font-bold">Welcome, {user.profile()?.firstname}!</h1>
            <h3 class="mb-2 text-center text-lg font-normal text-gray-500">Today:</h3>
            <Suspense fallback={<SkeletonCard />}>
              <Show
                when={window.siteData.homeFlex as Block}
                fallback={
                  <div class="flex h-full flex-col items-center justify-center">
                    <p class="text-center text-gray-500">You have no flex block today.</p>
                  </div>
                }
              >
                {(block) => <BlockCard block={block()} />}
              </Show>
            </Suspense>
          </div>
          <div class="min-h-[10rem] border-t-2 border-slate-100 sm:border-l-2 sm:border-t-0 sm:pl-8 sm:pr-4">
            <h3 class="text-md my-2 mt-4 text-center font-semibold uppercase tracking-wide text-gray-500">
              Announcements
            </h3>
          </div>
        </div>
      </main>
    </>
  );
}
