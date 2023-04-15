import { createEffect, createMemo, createSignal } from "solid-js";
import { isServer } from "solid-js/web";
import { A, useLocation } from "solid-start";
import styles from "./Navbar.module.scss";

export default function Navbar() {
  const location = useLocation();

  const routeLocations = ["/", "/request_sessions", "/settings"];
  const buttons: HTMLAnchorElement[] = [];
  const [linkContainer, setLinkContainer] = createSignal<HTMLDivElement>();
  const [indicatorEl, setIndicatorEl] = createSignal<HTMLDivElement>();

  const getPathIndex = createMemo(() => routeLocations.findIndex((ref) => ref.match(location.pathname)));

  // when page changes, transition navbar_indicator properties
  const [indicatorDirection, setIndicatorDirection] = createSignal(Direction.RIGHT);

  createEffect<number>((prevIndex) => {
    setIndicatorDirection((prevIndex ?? getPathIndex()) < getPathIndex() ? Direction.RIGHT : Direction.LEFT);

    const el = indicatorEl();
    if (!el) throw new Error();

    el.style.transition = `left 350ms ${
      indicatorDirection() === Direction.LEFT ? "cubic-bezier(1,0,.3,1) -140ms" : "cubic-bezier(.75,0,.24,1) -40ms"
    },right 350ms ${
      indicatorDirection() === Direction.RIGHT ? "cubic-bezier(1,0,.3,1) -140ms" : "cubic-bezier(.75,0,.24,1) -40ms"
    }`;

    return getPathIndex();
  });

  const updateIndicator = () => {
    const el = indicatorEl();
    if (!el) throw new Error();

    el.style.left = `${buttons[getPathIndex()]?.offsetLeft}px`;
    el.style.right = `${
      linkContainer()!.clientWidth - (buttons[getPathIndex()]?.offsetLeft + buttons[getPathIndex()]?.offsetWidth)
    }px`;
  };

  createEffect(updateIndicator);

  if (!isServer && document.fonts)
    // eslint-disable-next-line solid/reactivity
    void document.fonts.ready.then(updateIndicator);

  return (
    <div class={styles.navbar_sizer}>
      <div class={styles.navbar}>
        <div class={styles.title}>Flextime Manager</div>
        <div
          class={styles.links}
          classList={{
            [styles.loading]: isServer,
          }}
          ref={setLinkContainer}
        >
          <A href="/" end activeClass={styles.active} ref={(e) => buttons.push(e)}>
            Home
          </A>
          <A href="/request_sessions" activeClass={styles.active} ref={(e) => buttons.push(e)}>
            Request Sessions
          </A>
          <A href="/settings" activeClass={styles.active} ref={(e) => buttons.push(e)}>
            Settings
          </A>
          <div
            class="absolute bottom-0 h-1 select-none rounded-full bg-blue-400"
            ref={setIndicatorEl}
            style={{
              visibility: `${isServer ? "hidden" : "visible"}`,
            }}
          />
        </div>
        <div class="flex flex-1 justify-end">
          <button
            class={styles.logout_button}
            onClick={async () => {
              // await authClient.logout({ redirectTo: "/login" });
            }}
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}

enum Direction {
  LEFT = "left",
  RIGHT = "right",
}