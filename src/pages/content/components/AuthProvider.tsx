import { createContext, createSignal, onMount, useContext, type Accessor, type JSX } from "solid-js";

const authContext = createContext<{
  user: Accessor<undefined | null>;
  getUser: () => Promise<void>;
  loading: Accessor<boolean>;
}>();

export const useSession = () => {
  const ctx = useContext(authContext);
  if (!ctx) {
    throw new Error("useSession must be used within an AuthProvider");
  }
  return () => {
    const user = ctx.user();
    const loading = ctx.loading();
    return {
      user,
      loading,
    };
  };
};

export const useSessionRefetch = () => {
  const ctx = useContext(authContext);
  if (!ctx) {
    throw new Error("useSession must be used within an AuthProvider");
  }
  return async () => {
    await ctx.getUser();
  };
};

export const AuthProvider = (props: { children: JSX.Element }) => {
  const [user, setUser] = createSignal<undefined | null>();
  const [loading, setLoading] = createSignal(true);
  onMount(getUser);

  async function getUser() {
    setLoading(true);
    try {
      const session = await sessionStorage.getSession(document.cookie);
      // const myUser = session.get("user") as User;
      // setUser(myUser ?? null);
    } catch {
      setUser(null);
    }
    setLoading(false);
  }

  return <authContext.Provider value={{ user, getUser, loading }} children={props.children} />;
};
