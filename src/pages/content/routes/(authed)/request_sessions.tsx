import { createEffect, createMemo, createSignal, For } from "solid-js";
import ChevronLeftIcon from "~icons/heroicons/chevron-left-20-solid";
import ChevronRightIcon from "~icons/heroicons/chevron-right-20-solid";
import { useSession } from "../../components/AuthProvider";
import CalendarDay from "../../components/CalendarDay";
import Legend from "../../components/Legend";
import { parseRoster } from "../../utils/block";
import { sameDay } from "../../utils/date";

function generateDates(currentDate: Date): Date[] {
  return new Array(5).fill(undefined).map((_, i) => {
    const date = new Date(currentDate);
    date.setDate(date.getDate() - date.getDay() + i + 1);
    return date;
  });
}

export default function Home() {
  const { block_info } = useSession();

  const currentDate = new Date();

  const [dates, setDates] = createSignal<Date[]>(generateDates(currentDate));
  const [weekOffset, setWeekOffset] = createSignal(0);
  const roster = createMemo(() => parseRoster(block_info()));

  // show all the days of the week, including previous days of the week

  createEffect(() => {
    const offsetDate = new Date(currentDate);
    offsetDate.setDate(offsetDate.getDate() + weekOffset() * 7);
    setDates(generateDates(offsetDate));

    console.log(dates()[0].getMonth());
  });

  return (
    <div class="h-0 min-h-full p-6">
      <div class="flex h-full flex-col overflow-auto rounded-xl bg-white shadow-md dark:bg-gray-700">
        <div class="flex w-fit items-center rounded-t-xl px-2 pt-1 text-zinc-600">
          <button
            class="focusable btn mx-0.5 my-1 border-0 p-0 px-0.5 ring-offset-0 hover:bg-zinc-200/80 active:scale-90"
            ref={(el) =>
              el.addEventListener("click", () => {
                // setWeekOffset(weekOffset() - 1);
              })
            }
            onClick={() => {
              console.log("clicked");
              setWeekOffset(weekOffset() - 1);
            }}
          >
            <ChevronLeftIcon class="h-8 w-8" />
          </button>
          <button
            class="focusable btn mx-0.5 my-1 border-0 p-0 px-0.5 ring-offset-0 hover:bg-zinc-200/80 active:scale-90"
            onClick={() => {
              setWeekOffset(weekOffset() + 1);
            }}
            ref={(el) =>
              el.addEventListener("click", () => {
                // setWeekOffset(weekOffset() + 1);
              })
            }
          >
            <ChevronRightIcon class="h-8 w-8" />
          </button>
          <h2 class="ml-2 rounded-xl bg-zinc-200/50 px-3 text-lg font-semibold uppercase text-zinc-800">
            {
              [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
              ][dates()[0].getMonth()]
            }
          </h2>
        </div>
        <div class="md:grid-rows-0 grid w-full grow grid-rows-5 divide-y divide-zinc-300 md:grid-cols-5 md:grid-rows-1 md:divide-x md:divide-y-0">
          <For each={dates()}>
            {(date) => <CalendarDay date={date} selectedBlock={roster()?.find((block) => sameDay(block.date, date))} />}
          </For>
        </div>
        <Legend />
      </div>
    </div>
  );
}
