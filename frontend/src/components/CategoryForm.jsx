const CategoryForm = ({
  value,
  setValue,
  handleSubmit,
  buttonText = "Submit",
  handleDelete,
}) => {
  return (
    <div className="p-3">
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          className="w-full rounded-lg border px-4 py-3"
          placeholder="Category name"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />

        <div className="flex justify-between">
          <button className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 dark:bg-amber-600 dark:hover:bg-amber-800">
            {buttonText}
          </button>

          {handleDelete && (
            <button
              onClick={handleDelete}
              className="foucs:ring-red-500 focus:ring-opacity-50 rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-800 focus:ring-2 focus:outline-none"
            >
              Delete
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CategoryForm;
