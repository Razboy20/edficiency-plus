import clsx from "clsx";
import { Transition } from "solid-headless";
import type { VoidProps } from "solid-js";
import { createEffect, createSignal, lazy, Show, Suspense } from "solid-js";
import { sameDay } from "../utils/date";

import type { Block } from "../types/globals";
import { BlockType } from "../types/globals";
import BlockCard from "./BlockCard";
import styles from "./CalendarDay.module.scss";
// import JoinModal from "./JoinModal";
import SkeletonCard from "./skeletons/SkeletonCard";
const JoinModal = lazy(() => import("./JoinModal"));

const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const weekdays_short = ["Sun.", "Mon.", "Tue.", "Wed.", "Thu.", "Fri.", "Sat."];

interface CalendarDayProps {
  date: Date;
  blocks?: Block[];
  selectedBlock?: Block;
}

export default function CalendarDay(props: VoidProps<CalendarDayProps>) {
  const currentDate = new Date();

  const [modalOpen, setModalOpen] = createSignal(false);

  createEffect(() => {
    console.info("[CalendarBlock]:", props.selectedBlock);
  });

  return (
    <div
      class={clsx(styles.calendar_day, {
        [styles.current_day]: sameDay(currentDate, props.date),
      })}
    >
      <h1>
        <span
          class={styles.weekday}
          data-day={weekdays[props.date.getDay()]}
          data-shortday={weekdays_short[props.date.getDay()]}
        ></span>{" "}
        <span class={styles.date}>{props.date.getDate()}</span>
      </h1>
      <div class={styles.separator} />
      <Suspense fallback={<SkeletonCard />}>
        <Show when={props.selectedBlock}>{(block) => <BlockCard block={block()} />}</Show>
        <Show when={!props.selectedBlock}>
          <SkeletonCard class="invisible" empty />
        </Show>
        <Show
          when={
            !props.selectedBlock ||
            (props.selectedBlock &&
              props.selectedBlock.type != BlockType.CtePriority &&
              props.selectedBlock.type != BlockType.Mandatory)
          }
        >
          <button
            class={styles.join_button}
            disabled={currentDate.getTime() > props.date.getTime() || sameDay(currentDate, props.date)}
            onClick={[setModalOpen, true]}
          >
            Join Flex
          </button>
        </Show>
        <Suspense>
          <Transition show={modalOpen()}>
            <JoinModal
              open={modalOpen()}
              date={props.date}
              activeBlock={props.selectedBlock}
              onClose={() => setModalOpen(false)}
              // eslint-disable-next-line solid/reactivity
              selectBlock={async (_block) => {
                // await joinMutation(
                //   {
                //     id: block.id,
                //   },
                //   {
                //     additionalTypenames: ["Block"],
                //   }
                // );
                // // eslint-disable-next-line no-debugger
                // // debugger;
                // await refetchRouteData("gql_me");
              }}
            ></JoinModal>
          </Transition>
        </Suspense>
      </Suspense>
    </div>
  );
}
