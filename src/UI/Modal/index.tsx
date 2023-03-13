import React from 'react';

interface ModalProps {
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
}

const Modal = ({ title, children, footer, open, setOpenModal }: ModalProps) => {
  return (
    <dialog
      open={open}
      className="fixed top-0 left-0 right-0 z-50 w-full p-4 h-[calc(100%)] md:h-full overflow-x-hidden backdrop-brightness-50 md:inset-0 overflow-y-hidden bg-transparent"
    >
      <div className="relative  mx-auto w-full max-w-2xl md:h-auto">
        <div className="relative bg-white rounded-lg shadow ">
          <div className="flex items-start justify-between p-4 border-b rounded-t">
            <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
            <button
              onClick={() => setOpenModal(false)}
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
              data-modal-hide="defaultModal"
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="p-6 h-[500px] overflow-y-scroll space-y-6">
            {children}
          </div>
          {footer && (
            <div className="flex items-center justify-end p-6 space-x-2 border-t border-gray-200 rounded-b ">
              {footer}
            </div>
          )}
        </div>
      </div>
    </dialog>
  );
};

export default Modal;
