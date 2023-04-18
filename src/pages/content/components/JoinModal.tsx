import { Dialog, DialogOverlay, DialogPanel, DialogTitle, Transition, TransitionChild } from "solid-headless";
import type { VoidProps } from "solid-js";
import { For, Suspense, createEffect, createResource, createSelector, createSignal } from "solid-js";
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

  const isSelected = createSelector(selectedBlock, (id: string, source?: Block) => source?.id == id);

  const [blocks] = createResource(
    isOpen,
    // eslint-disable-next-line solid/reactivity
    () => fetchSessionsForDate(props.date)
  );

  createEffect(() => {
    setIsOpen(props.open ?? false);
  });

  createEffect((prev?: boolean) => {
    if (!prev && isOpen()) setSelectedBlock(undefined);
    return isOpen();
  });

  return (
    <Transition show={props.open}>
      <Portal>
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
            <div class="flex min-h-full items-center justify-center p-4 text-center">
              <TransitionChild
                as="div"
                enter="ease-[cubic-bezier(.15,.3,.2,1)] duration-[400ms]"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-[cubic-bezier(.23,.01,.92,.72)] duration-[250ms]"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <DialogPanel class="pointer-events-auto flex max-h-[80vh] w-full max-w-xl transform flex-col overflow-hidden rounded-xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <DialogTitle as="h3" class="text-lg font-semibold leading-6 text-gray-900">
                    Join Block
                  </DialogTitle>
                  <div class="mt-2">
                    <p class="text-sm text-gray-500">Choose a block in the list to flex into.</p>
                  </div>
                  <div class="mt-4 flex max-w-md flex-auto flex-col gap-3 overflow-y-auto rounded-xl p-4">
                    <Suspense fallback={<SkeletonCard class="!min-h-0 min-w-[20rem]" />}>
                      <For
                        each={blocks?.latest?.sessions ?? blocks()?.sessions}
                        fallback={
                          <div class="text-md mx-3 my-10 text-center text-gray-600">
                            Oops! Looks like there aren't any blocks available to flex into for today.
                          </div>
                        }
                      >
                        {(block) => (
                          <div
                            class="min-w-[20rem] cursor-pointer rounded-xl opacity-70 ring-0 ring-blue-500/50 transition duration-150"
                            classList={{
                              "!opacity-100 ring-4": isSelected(block.id),
                            }}
                            onClick={[setSelectedBlock, block]}
                          >
                            <BlockCard block={parseSession(block)} class="!min-h-0"></BlockCard>
                          </div>
                        )}
                      </For>
                    </Suspense>
                  </div>

                  <div class="mt-4 space-x-2">
                    <button
                      type="button"
                      class="btn bg-red-100 font-semibold text-red-900 hover:bg-red-200"
                      onClick={() => props.onClose()}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      disabled={!selectedBlock()}
                      class="btn bg-blue-100 font-semibold text-blue-900 hover:bg-blue-200"
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
      </Portal>
    </Transition>
  );
}
