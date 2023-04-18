import clsx from "clsx";
import { createMemo } from "solid-js";

import type { Block } from "../types/globals";
import { BlockType } from "../types/globals";
import styles from "./BlockCard.module.scss";

interface BlockCardProps {
  block: Block;
  class?: string;
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
    <div class={clsx(styles.block_card, colorClass(), props.class)}>
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
