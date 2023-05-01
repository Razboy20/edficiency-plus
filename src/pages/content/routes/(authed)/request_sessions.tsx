import { createEffect, createSignal, For } from "solid-js";
import ChevronLeftIcon from "~icons/heroicons/chevron-left-20-solid";
import ChevronRightIcon from "~icons/heroicons/chevron-right-20-solid";
import { useSession } from "../../components/AuthProvider";
import CalendarDay from "../../components/CalendarDay";
import Legend from "../../components/Legend";
import { parseRoster } from "../../utils/block";
import { getWeekNumber, sameDay } from "../../utils/date";

function generateDates(currentDate: Date): Date[] {
  return new Array(5).fill(undefined).map((_, i) => {
    const date = new Date(currentDate);
    // change overflow date to saturday (e.g., don't show previous week)
    date.setDate(date.getDate() + 1);

    date.setDate(date.getDate() - date.getDay() + i + 1);
    return date;
  });
}

export default function Home() {
  const { block_info } = useSession();

  const currentDate = new Date();

  const [dates, setDates] = createSignal<Date[]>(generateDates(currentDate));
  const [weekOffset, setWeekOffset] = createSignal(0);
  const roster = () => {
    return parseRoster(block_info.latest);
  };

  // show all the days of the week, including previous days of the week

  createEffect(() => {
    const offsetDate = new Date(currentDate);
    offsetDate.setDate(offsetDate.getDate() + weekOffset() * 7);
    setDates(generateDates(offsetDate));
  });

  return (
    <div class="h-0 max-h-3xl min-h-full p-6">
      <div class="h-full flex flex-col overflow-auto rounded-xl bg-white shadow-md dark:bg-gray-700">
        <div class="w-fit flex items-center rounded-t-xl px-2 pt-1 text-zinc-600">
          <button
            class="mx-0.5 my-1 cursor-pointer border-0 p-0 px-0.5 ring-offset-0 active:scale-90 hover:bg-zinc-200/80 btn"
            onClick={() => {
              setWeekOffset(weekOffset() - 1);
            }}
          >
            <ChevronLeftIcon class="h-8 w-8" />
          </button>
          <button
            class="mx-0.5 my-1 cursor-pointer border-0 p-0 px-0.5 ring-offset-0 active:scale-90 hover:bg-zinc-200/80 focusable btn"
            onClick={() => {
              setWeekOffset(weekOffset() + 1);
            }}
          >
            <ChevronRightIcon class="h-8 w-8" />
          </button>
          <h3
            class="ml-2 rounded-xl bg-zinc-200/50 px-3 text-lg text-zinc-800 outline-0 outline-blue-300 outline transition-all duration-50"
            classList={{ "outline-2 -outline-offset-2 !bg-blue-100/50": weekOffset() == 0 }}
          >
            <span class="font-semibold tracking-tight uppercase">
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
            </span>
            &nbsp;&nbsp;
            <span>Week {getWeekNumber(dates()[0])}</span>
          </h3>
        </div>
        <div class="grid grid-rows-5 w-full grow md:grid-cols-5 md:grid-rows-0 md:grid-rows-1 divide-y divide-zinc-300 md:divide-x md:divide-y-0">
          <For each={dates()}>
            {(date) => <CalendarDay date={date} selectedBlock={roster()?.find((block) => sameDay(block.date, date))} />}
          </For>
        </div>
        <Legend />
      </div>
    </div>
  );
}
