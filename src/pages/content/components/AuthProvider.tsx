import type { UpcomingRequest } from "@src/pages/content/utils/api";
import { fetchBlockData, fetchProfileData } from "@src/pages/content/utils/api";
import type { Resource } from "solid-js";
import { createContext, createResource, useContext, type JSX } from "solid-js";
import type { Profile } from "../types/globals";

const authContext = createContext<{
  profile: Resource<Profile>;
  block_info: Resource<UpcomingRequest>;
  refetchBlockInfo: (info?: unknown) => UpcomingRequest | Promise<UpcomingRequest>;
}>();

export const useSession = () => {
  const ctx = useContext(authContext);
  if (!ctx) {
    throw new Error("useSession must be used within an AuthProvider");
  }
  return ctx;
};

export const AuthProvider = (props: { children: JSX.Element }) => {
  const [profile] = createResource(() => fetchProfileData());
  const [blocks, { refetch }] = createResource(() => fetchBlockData());

  return (
    <authContext.Provider
      value={{ profile, block_info: blocks, refetchBlockInfo: refetch }}
      children={props.children}
    />
  );
};
