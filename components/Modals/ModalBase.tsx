import { Dialog, Transition } from "@headlessui/react";
import { Dispatch, FC, Fragment, SetStateAction } from "react";
import { useAppSelector } from "../../state/hooks";

type ModalBaseProps = {
  header: string;
  children: React.ReactNode;
  isOpen: boolean;
  onClose: Dispatch<SetStateAction<boolean>>;
};

export const ModalBase: FC<ModalBaseProps> = ({
  header,
  children,
  isOpen,
  onClose,
}: ModalBaseProps) => {
  const darkMode = useAppSelector((state) => state.settings.darkMode);

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={onClose}
      >
        <div className="flex min-h-full items-center justify-center py-10 px-4 sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 min-h-screen bg-gray-100 bg-opacity-75 dark:bg-black/70 transition-opacity" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block transform overflow-hidden rounded-lg bg-[#F3F3F3] px-8  pt-5 pb-4  align-bottom shadow-sm border border-gray-500 transition-all dark:bg-gray-800 sm:my-8 sm:w-full sm:max-w-md sm:align-middle">
              <div>
                <div className="text-center">
                  <Dialog.Title
                    as="h3"
                    className="text-2xl font-bold leading-6 text-gray-900 dark:text-gray-100"
                  >
                    {header}
                  </Dialog.Title>
                  <div className="mt-6 text-sm text-black dark:text-gray-300 text-left">
                    {children}
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
