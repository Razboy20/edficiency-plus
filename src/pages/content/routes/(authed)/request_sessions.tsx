import { createEffect, createSignal, For } from "solid-js";
import ChevronLeftIcon from "~icons/heroicons/chevron-left-20-solid";
import ChevronRightIcon from "~icons/heroicons/chevron-right-20-solid";
import CalendarDay from "../../components/CalendarDay";
import Legend from "../../components/Legend";

function generateDates(currentDate: Date): Date[] {
  return new Array(5).fill(undefined).map((_, i) => {
    const date = new Date(currentDate);
    date.setDate(date.getDate() - date.getDay() + i + 1);
    return date;
  });
}

export default function Home() {
  const currentDate = new Date();

  const [dates, setDates] = createSignal<Date[]>(generateDates(currentDate));
  const [weekOffset, setWeekOffset] = createSignal(0);

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
          <For each={dates()}>{(date) => <CalendarDay date={date} blocks={[]} selectedBlock={undefined} />}</For>
        </div>
        <Legend />
        {/* <button
          class={clsx("m-3 flex w-fit items-center rounded-md bg-gray-700 px-3 py-2 text-white transition-colors", {
            "!bg-gray-600": loading(),
          })}
          disabled={loading()}
          onClick={async () => {
            await refetch();
          }}
        >
          <Show when={!isServer && loading()}>
            <svg
              class="-ml-1 mr-2 h-5 w-5 animate-spin text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </Show>
          Refetch
        </button> */}
      </div>
    </div>
  );
}
