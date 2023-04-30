import uFuzzy from "@leeoniya/ufuzzy";
import { createScrollPosition } from "@solid-primitives/scroll";
import { Dialog, DialogOverlay, DialogPanel, DialogTitle, Transition, TransitionChild } from "solid-headless";
import type { VoidProps } from "solid-js";
import {
  For,
  Suspense,
  createEffect,
  createMemo,
  createResource,
  createSelector,
  createSignal,
  on,
  untrack,
} from "solid-js";
import { Portal } from "solid-js/web";
import type { Block } from "../types/globals";
import { fetchSessionsForDate } from "../utils/api";
import { parseSession } from "../utils/block";
import BlockCard from "./BlockCard";
import SkeletonCard from "./skeletons/SkeletonCard";

interface JoinModalProps {
  // children: JSX.Element[];
  open?: boolean;
  date: Date;
  activeBlock?: Block;
  selectBlock: (block: Block) => void;
  onClose: () => void;
}

export default function JoinModal(props: VoidProps<JoinModalProps>) {
  const [isOpen, setIsOpen] = createSignal(false);
  const [selectedBlock, setSelectedBlock] = createSignal<Block>();
  const [search, setSearch] = createSignal("");
  const [scrollContainer, setScrollContainer] = createSignal<HTMLDivElement>();
  const scroll = createScrollPosition(scrollContainer);

  const isSelected = createSelector(selectedBlock, (id: string, source?: Block) => source?.id == id);

  const [blocks] = createResource(
    isOpen,
    // eslint-disable-next-line solid/reactivity
    () => fetchSessionsForDate(props.date),
    {
      initialValue: undefined,
    }
  );

  const [scrollBottom, setScrollBottom] = createSignal(0);
  createEffect(
    on(blocks, () => {
      const container = scrollContainer();
      if (!container) return;

      requestAnimationFrame(() =>
        setScrollBottom(container.scrollHeight - container.clientHeight - container.scrollTop)
      );
    })
  );

  createEffect(() => {
    setIsOpen(props.open ?? false);
  });

  createEffect((prev?: boolean) => {
    if (!prev && isOpen()) setSelectedBlock(undefined);
    return isOpen();
  });

  // search functionality
  const fuzzy = new uFuzzy();

  function SearchResults() {
    const searchableBlocks = createMemo(() => {
      // trigger suspense boundary on only the first render
      const sessions = blocks.latest?.sessions ?? blocks()?.sessions;

      if (!sessions) return;

      return sessions.map(
        (block) => `${block.name}¦${block.lastname}, ${block.firstname}¦${block.location}¦${block.detail}`
      );
    });

    const result = createMemo(() => {
      if (!searchableBlocks()) return;

      const haystack = searchableBlocks();
      const searchValue = search();

      if (searchValue.length == 0) return blocks.latest.sessions;
      const indexes = fuzzy.filter(haystack, searchValue);
      if (indexes != null && indexes.length > 0) {
        const info = fuzzy.info(indexes, haystack, searchValue);
        return fuzzy.sort(info, haystack, searchValue).map((i) => untrack(() => blocks.latest.sessions[info.idx[i]]));
      }
    });

    return (
      <>
        <For
          each={result()?.map((e) => parseSession(e))}
          fallback={
            <div class="text-md mx-3 my-11 text-center text-gray-600">
              Oops! Looks like there aren't any blocks available to flex into for today.
            </div>
          }
        >
          {(block) => (
            <div
              class="min-w-[20rem] cursor-pointer rounded-xl opacity-70 outline-4 ring-0 ring-blue-500/50 duration-150 btn-transition active:scale-[0.97] hover:opacity-100 focus:outline-blue-400"
              tabIndex={0}
              classList={{
                "!opacity-100 ring-4": isSelected(block.id),
              }}
              onClick={[setSelectedBlock, block]}
              onKeyPress={(e) => {
                if (e.key == "Enter") {
                  setSelectedBlock(block);
                }
              }}
            >
              <BlockCard block={block} class="!min-h-0" showTotal></BlockCard>
            </div>
          )}
        </For>
      </>
    );
  }

  return (
    <Portal>
      <Transition show={props.open}>
        <Dialog isOpen onClose={props.onClose} class="relative z-50">
          <TransitionChild
            as="div"
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <DialogOverlay class="fixed inset-0 bg-black bg-opacity-25" />
          </TransitionChild>

          <div class="pointer-events-none fixed inset-0 overflow-y-auto">
            <div class="min-h-full flex items-center justify-center p-4 text-center">
              <TransitionChild
                as="div"
                enter="ease-[cubic-bezier(.15,.3,.2,1)] duration-[400ms]"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-[cubic-bezier(.23,.01,.92,.72)] duration-[250ms]"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <DialogPanel class="pointer-events-auto max-h-[80vh] max-w-xl w-full flex flex-col transform overflow-hidden rounded-xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <DialogTitle as="h3" class="text-lg font-semibold leading-6 text-gray-900">
                    Join Block
                  </DialogTitle>
                  <div class="mt-2">
                    <p class="text-sm text-gray-500">Choose a block in the list to flex into.</p>
                  </div>
                  <input
                    class="my-4 h-10 w-full flex-shrink-0 border border-gray-300 rounded-lg px-4 outline-none ring-blue-500/50 transition focus-visible:border-blue-500 hover:border-gray-400"
                    value={search()}
                    onInput={(e) => setSearch(e.currentTarget.value)}
                    placeholder="Search blocks..."
                    type="text"
                  />
                  <div
                    class="pointer-events-none z-1 h-10 w-full flex-shrink-0 shadow -mt-10"
                    style={{
                      "--un-shadow": "0 14px 14px -14px rgb(0 0 0 / 0.3)",
                      opacity: scroll.y > 1 ? `${Math.max(0, Math.min(scroll.y * 4, 100))}%` : "0",
                    }}
                  ></div>
                  <div
                    class="relative mx-2 w-[clamp(1px,24rem,24rem)] flex flex-auto flex-col translate-x-0 gap-3 overflow-y-auto rounded-xl p-1 py-1.5"
                    ref={setScrollContainer}
                  >
                    <Suspense
                      fallback={
                        <>
                          <SkeletonCard class="min-w-[20rem] !min-h-0" />
                          <SkeletonCard class="min-w-[20rem] !min-h-0" />
                        </>
                      }
                    >
                      <SearchResults />
                    </Suspense>
                  </div>

                  <div
                    class="pointer-events-none z-1 h-10 w-full flex-shrink-0 shadow -mb-10"
                    style={{
                      "--un-shadow": "0 -14px 14px -14px rgb(0 0 0 / 0.3)",
                      opacity:
                        (console.log(scrollBottom(), scroll.y),
                        scroll.y < scrollBottom() - 1
                          ? `${Math.max(0, Math.min((scrollBottom() - scroll.y) * 4, 100))}%`
                          : "0"),
                    }}
                  ></div>

                  <div class="mt-4 space-x-2">
                    <button
                      type="button"
                      class="bg-red-100 font-semibold text-red-900 hover:bg-red-200 btn"
                      onClick={() => props.onClose()}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      disabled={!selectedBlock()}
                      class="bg-blue-100 font-semibold text-blue-900 hover:bg-blue-200 btn"
                      onClick={() => {
                        props.selectBlock(selectedBlock()!);
                        props.onClose();
                      }}
                    >
                      Choose Block
                    </button>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </Portal>
  );
}
