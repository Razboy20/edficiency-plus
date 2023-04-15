import clsx from "clsx";
import type { JSX } from "solid-js";
import { Show, splitProps } from "solid-js";
import styles from "./SkeletonCard.module.scss";

interface SkeletonCardProps extends JSX.HTMLAttributes<HTMLDivElement> {
  empty?: boolean;
}

export default function SkeletonCard(props: SkeletonCardProps) {
  const [localProps, rest] = splitProps(props, ["class", "empty"]);

  return (
    <div class={clsx(styles.block_card, localProps.class)} {...rest}>
      <Show when={!localProps.empty}>
        <div class={styles.top}>
          <p class={styles.title}>
            <span>-</span>
          </p>
          <p class={styles.subtitle}>
            <span>-</span>
          </p>
        </div>
        <p class={styles.description}>
          <span>-</span>
        </p>
      </Show>
    </div>
  );
}
