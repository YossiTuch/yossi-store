const ProgressSteps = ({ step1, step2, step3 }) => {
  const Step = ({
    label,
    isActive,
    isCompleted,
    showConnector,
    connectorActive,
  }) => (
    <>
      <div className="flex flex-col items-center">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-300 sm:h-12 sm:w-12 ${
            isCompleted
              ? "border-green-500 bg-green-500 text-white dark:border-green-400 dark:bg-green-400"
              : isActive
                ? "border-pink-500 bg-pink-500 text-white dark:border-amber-500 dark:bg-amber-500"
                : "border-slate-300 bg-white text-slate-400 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-500"
          }`}
        >
          {isCompleted ? (
            <svg
              className="h-5 w-5 sm:h-6 sm:w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          ) : (
            <span className="text-sm font-semibold sm:text-base">
              {label === "Login" ? "1" : label === "Shipping" ? "2" : "3"}
            </span>
          )}
        </div>
        <span
          className={`mt-2 text-xs font-medium transition-colors sm:text-sm ${
            isActive || isCompleted
              ? "text-gray-900 dark:text-white"
              : "text-slate-400 dark:text-slate-500"
          }`}
        >
          {label}
        </span>
      </div>
      {showConnector && (
        <div
          className={`mx-2 h-0.5 flex-1 transition-colors sm:mx-4 ${
            connectorActive
              ? "bg-green-500 dark:bg-green-400"
              : "bg-slate-300 dark:bg-slate-600"
          }`}
        />
      )}
    </>
  );

  return (
    <div className="flex items-center justify-center px-4 sm:px-6">
      <div className="flex w-full max-w-2xl items-center">
        <Step
          label="Login"
          isActive={step1 && !step2}
          isCompleted={step1}
          showConnector={true}
          connectorActive={step1 && step2}
        />
        <Step
          label="Shipping"
          isActive={step2 && !step3}
          isCompleted={step1 && step2}
          showConnector={true}
          connectorActive={step1 && step2 && step3}
        />
        <Step
          label="Summary"
          isActive={step3}
          isCompleted={step1 && step2 && step3}
          showConnector={false}
          connectorActive={false}
        />
      </div>
    </div>
  );
};

export default ProgressSteps;
