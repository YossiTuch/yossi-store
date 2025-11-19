const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div className="relative w-1/5 rounded-lg border border-gray-200 bg-white p-4 shadow-lg max-md:w-4/5 dark:border-gray-700 dark:bg-slate-900">
        <div className="mb-4 flex justify-end">
          <button
            className="font-semibold text-black transition hover:text-gray-500 focus:outline-none dark:text-white"
            onClick={onClose}
            aria-label="Close modal"
          >
            X
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
