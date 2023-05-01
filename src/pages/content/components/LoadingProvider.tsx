import type { Accessor } from "solid-js";
import { createContext, createEffect, createSignal, useContext, type JSX } from "solid-js";
import { useSession } from "./AuthProvider";
import LoadingBar from "./LoadingBar";

const loaderContext = createContext<{
  resources: {
    profile: Accessor<boolean>;
    block_info: Accessor<boolean>;
  };
  updateStatus: (resource: "profile" | "blocks", status: boolean) => void;
}>();

export const useLoader = () => {
  const ctx = useContext(loaderContext);
  if (!ctx) {
    throw new Error("useSession must be used within an AuthProvider");
  }
  return ctx;
};

export const LoadingProvider = (props: { children: JSX.Element }) => {
  const session = useSession();

  const [profile, setProfile] = createSignal(true);
  const [blocks, setBlocks] = createSignal(true);

  createEffect(() => {
    setProfile(session.profile.loading);
  });

  createEffect(() => {
    setBlocks(session.block_info.loading);
  });

  const resources = new Map([
    ["profile", setProfile],
    ["blocks", setBlocks],
  ]);

  const updateStatus = (resource: "profile" | "blocks", status: boolean) => {
    if (resources.has(resource)) {
      resources.get(resource)(status);
    }
  };

  const pending = () => profile() || blocks();

  return (
    <>
      <LoadingBar show={pending()} />
      <loaderContext.Provider
        value={{
          resources: {
            profile,
            block_info: blocks,
          },
          updateStatus,
        }}
        children={props.children}
      />
    </>
  );
};
