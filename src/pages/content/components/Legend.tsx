import clsx from "clsx";
import type { JSX, ParentComponent } from "solid-js";
import MapIcon from "~icons/heroicons/map";

import styles from "./Legend.module.scss";

interface ChipProps {
  class: string;
  children: JSX.Element;
}

const Chip: ParentComponent<ChipProps> = (props: ChipProps) => {
  return <div class={clsx(styles.chip, props.class)}>{props.children}</div>;
};

export default function Legend() {
  return (
    <div class={styles.legend}>
      <div class={styles.label}>
        <MapIcon class="h-6 w-6 text-zinc-500 children:stroke-2" /> Legend
      </div>
      <div class={styles.chips}>
        {/* <Chip class="bg-red-200 text-red-700">Mandatory</Chip>
        <Chip class="bg-purple-300 text-purple-700">CTE Priority</Chip>
        <Chip class="bg-teal-300 text-teal-800">Pep Rally</Chip> */}
        <Chip class="bg-yellow-200 text-yellow-700">Waitlist</Chip>
        <Chip class="bg-zinc-200 text-zinc-600">Default</Chip>
      </div>
    </div>
  );
}
