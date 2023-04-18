import type { BlockData } from "@src/pages/content/utils/api";
import { fetchBlockData, fetchProfileData } from "@src/pages/content/utils/api";
import type { Resource } from "solid-js";
import { createContext, createResource, useContext, type JSX } from "solid-js";
import type { Profile } from "../types/globals";

const authContext = createContext<{
  profile: Resource<Profile>;
  block_info: Resource<BlockData>;
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
  const [blocks] = createResource(() => fetchBlockData());

  return <authContext.Provider value={{ profile, block_info: blocks }} children={props.children} />;
};
