import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { IndentedTextInput } from "../forms/IndentedTextInput";
import { UserInput } from "../forms/UserInput";
import { checkValidTag } from "../../utils/constraints";

export default function AddTagModal({
  type,
  placeholder = "",
  open,
  setOpen,
  handleSubmit,
}) {
  const cancelButtonRef = useRef(null);
  const [errors, setError] = useState({});

  const [tagName, setTagName] = useState("");

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                <form action="" autoComplete="off">
                  <div className="sm:flex sm:items-start">
                    <div className="w-full font-nunito text-center sm:ml-1 sm:text-left">
                      {/* <Dialog.Title
                        as="h3"
                        className="text-xl font-patrick font-bold tracking-wide leading-6 text-gray-400"
                      >
                        Add Tag
                      </Dialog.Title> */}
                      <div className="">
                        <UserInput
                          label={type + " Tag Name"}
                          type={"text"}
                          value={tagName}
                          checkValue={checkValidTag}
                          placeholder={
                            placeholder?.length !== 0
                              ? placeholder
                              : "My tag..."
                          }
                          handleEdit={setTagName}
                          handleError={setError}
                          fullSize={true}
                          required={false}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                    <button
                      type="submit"
                      className="inline-flex w-full justify-center rounded-md disabled:opacity-50 border border-transparent bg-sajah px-4 py-2 text-sm font-patrick font-extrabold text-white shadow-sm hover:bg-sajahfocus:outline-none focus:ring-2 focus:ring-sajah focus:ring-offset-2 sm:ml-3 sm:w-auto"
                      disabled={errors || tagName?.length === 0}
                      onClick={(e) => {
                        e.preventDefault();
                        handleSubmit(tagName);
                        setOpen(false);
                        setTagName("");
                      }}
                    >
                      {type}
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-200 bg-gray-100 px-4 py-2 text-sm font-patrick font-bold text-gray-700 shadow-sm hover:bg-gray-100 sm:mt-0 sm:w-auto"
                      onClick={() => setOpen(false)}
                      ref={cancelButtonRef}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
