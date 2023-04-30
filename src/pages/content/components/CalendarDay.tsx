import clsx from "clsx";
import type { VoidProps } from "solid-js";
import { Show, Suspense, createSignal, lazy } from "solid-js";
import { sameDay } from "../utils/date";

import type { Block } from "../types/globals";
import { BlockType } from "../types/globals";
import BlockCard from "./BlockCard";
import styles from "./CalendarDay.module.scss";
// import JoinModal from "./JoinModal";
import { joinBlock } from "../utils/api";
import { useSession } from "./AuthProvider";
import SkeletonCard from "./skeletons/SkeletonCard";
const JoinModal = lazy(() => import("./JoinModal"));

const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const weekdays_short = ["Sun.", "Mon.", "Tue.", "Wed.", "Thu.", "Fri.", "Sat."];

interface CalendarDayProps {
  date: Date;
  selectedBlock?: Block;
}

export default function CalendarDay(props: VoidProps<CalendarDayProps>) {
  const { block_info, refetchBlockInfo } = useSession();

  const currentDate = new Date();

  const [modalOpen, setModalOpen] = createSignal(false);

  const emptyDay = () =>
    block_info.state !== "pending" &&
    !block_info.latest?.roster?.find((e) => sameDay(props.date, e.date.replaceAll("-", "/")));

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
      <Show
        when={
          block_info.loading ||
          !props.selectedBlock ||
          (props.selectedBlock &&
            props.selectedBlock.type != BlockType.CtePriority &&
            props.selectedBlock.type != BlockType.Mandatory)
        }
      >
        <button
          class={styles.join_button}
          title={emptyDay() ? "No flex blocks are available today." : ""}
          disabled={currentDate.getTime() > props.date.getTime() || sameDay(currentDate, props.date) || emptyDay()}
          onClick={[setModalOpen, true]}
        >
          Join Flex
        </button>
      </Show>
      <Suspense fallback={<SkeletonCard />}>
        <Show when={props.selectedBlock}>{(block) => <BlockCard block={block()} />}</Show>
        <Show when={!props.selectedBlock}>
          <SkeletonCard class="invisible" empty />
        </Show>

        <Suspense>
          {/* <Transition show={modalOpen()}> */}
          <JoinModal
            open={modalOpen()}
            date={props.date}
            activeBlock={props.selectedBlock}
            onClose={() => setModalOpen(false)}
            // eslint-disable-next-line solid/reactivity
            selectBlock={async (block) => {
              await joinBlock(props.date, block.id);
              await refetchBlockInfo();
            }}
          ></JoinModal>
          {/* </Transition> */}
        </Suspense>
      </Suspense>
    </div>
  );
}
