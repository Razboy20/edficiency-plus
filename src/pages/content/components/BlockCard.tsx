import clsx from "clsx";
import { Show, createMemo } from "solid-js";

import type { Block } from "../types/globals";
import { BlockType } from "../types/globals";
import styles from "./BlockCard.module.scss";

interface BlockCardProps {
  block: Block;
  class?: string;
  showTotal?: boolean;
  focusable?: boolean;
}

const colorMap: Record<BlockType, string> = {
  [BlockType.CtePriority]: styles["color__cte-priority"],
  [BlockType.Mandatory]: styles["color__mandatory"],
  [BlockType.PepRally]: styles["color__pep-rally"],
  [BlockType.Normal]: "",
};

export default function BlockCard(props: BlockCardProps) {
  const block = createMemo(() => props.block);

  const colorClass = () => (block().waitlisted ? styles.color__waitlist : colorMap[block().type]);

  return (
    <div class={clsx(styles.block_card, colorClass(), props.class)} tabIndex={props.focusable ? 0 : undefined}>
      <Show when={props.showTotal}>
        <div class={styles.count}>
          <span
            classList={{
              "text-orange-700": block().openSeats <= 5 && block().openSeats > 0,
            }}
          >
            {block().openSeats}
          </span>
          <span class="font-normal"> {block().openSeats == 1 ? "seat" : "seats"}</span>
        </div>
      </Show>
      <div class={styles.top}>
        <p class={styles.title}>{block().name}</p>
        <p class={styles.subtitle}>
          {block().location}
          <span class="px-1 text-zinc-500">&ndash;</span>
          {block().teacher.name}
        </p>
      </div>
      <p class={styles.description}>{block().description}</p>
    </div>
  );
}
