import type { JSX } from "solid-js";
import { Show, createEffect, createSignal, on } from "solid-js";
import styles from "./LoadingBar.module.scss";

interface LoadingBarProps {
  show: boolean;
}

export default function LoadingBar(props: LoadingBarProps & JSX.IntrinsicElements["div"]) {
  const [hideElements, setHideElements] = createSignal(!props.show);

  createEffect(
    on(
      () => props.show,
      () => {
        if (!props.show) {
          const int = setTimeout(() => {
            setHideElements(true);
          }, 300);

          return () => {
            clearTimeout(int);
          };
        } else {
          setHideElements(false);
        }
      },
      { defer: true }
    )
  );

  return (
    <Show when={!hideElements()}>
      <div
        class="fixed left-0 top-0 h-1 w-full transition-all duration-300 ease-in-out"
        classList={{
          "-translate-y-full opacity-0": !props.show,
        }}
      >
        <div class={`absolute top-0 left-0 right-full h-full bg-blue-500 ${styles.loading_animation1}`} />
        <div class={`absolute top-0 left-0 right-full h-full bg-blue-500 ${styles.loading_animation2}`} />
      </div>
    </Show>
  );
}
