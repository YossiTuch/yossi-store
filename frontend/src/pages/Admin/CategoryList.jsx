import { useState } from "react";
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useFetchCategoriesQuery,
} from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";
import CategoryForm from "../../components/CategoryForm";
import Modal from "../../components/Modal";

const CategoryList = () => {
  const { data: categories, refetch } = useFetchCategoriesQuery();
  const [name, setName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [updatingName, setUpdatingName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const handleCreateCategory = async (e) => {
    e.preventDefault();

    if (!name) {
      toast.error("Category name is required");
      return;
    }

    try {
      const result = await createCategory({ name }).unwrap();
      if (result.error) {
        toast.error(result.error);
      } else {
        setName("");
        toast.success(`${result.name} was created.`);
      }
      refetch();
    } catch (error) {
      toast.error("Creating category failed, try again.");
    }
  };

  const handleUpdateCategory = async (e) => {
    e.preventDefault();

    if (!updatingName) {
      toast.error("Category name is required");
      return;
    }

    try {
      const result = await updateCategory({
        categoryId: selectedCategory._id,
        updatedCategory: {
          name: updatingName,
        },
      }).unwrap();

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(`${result.name} was updated`);
        setSelectedCategory(null);
        setUpdatingName("");
        setModalVisible(false);
      }
      refetch();
    } catch (error) {
    }
  };

  const handleDeleteCategory = async () => {
    try {
      const result = await deleteCategory(selectedCategory._id).unwrap();

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(`${result.name} was deleted.`);
        setSelectedCategory(null);
        setModalVisible(false);
      }
      refetch();
    } catch (error) {
      toast.error("Category deletion failed. Try again.");
    }
  };

  return (
    <div className="flex flex-col px-3 sm:px-6 md:ml-[10rem] md:flex-row">
      <div className="w-full p-2 md:w-3/4 sm:p-3">
        <div className="mb-3 text-center text-xl font-semibold md:text-left sm:mb-4 sm:h-12 sm:text-2xl">
          Manage Categories
        </div>
        <CategoryForm
          value={name}
          setValue={setName}
          handleSubmit={handleCreateCategory}
        />
        <br className="hidden sm:block" />
        <hr className="my-2 sm:my-0" />

        <div className="mt-2 flex flex-wrap gap-2 sm:mt-4 sm:gap-3">
          {categories?.map((category) => (
            <div key={category._id} className="sm:w-auto">
              <button
                className="focus:ring-opacity-50 w-full rounded-md border border-blue-700 bg-white px-2 py-1.5 text-left text-sm hover:bg-blue-500 hover:text-white focus:ring-2 focus:ring-blue-300 focus:outline-none sm:w-auto sm:rounded-lg sm:px-4 sm:py-2 sm:text-base dark:border-amber-600 dark:bg-slate-800 dark:hover:bg-amber-500"
                onClick={() => {
                  {
                    setModalVisible(true);
                    setSelectedCategory(category);
                    setUpdatingName(category.name);
                  }
                }}
              >
                {category.name}
              </button>
            </div>
          ))}
        </div>

        <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
          <CategoryForm
            value={updatingName}
            setValue={(value) => setUpdatingName(value)}
            handleSubmit={handleUpdateCategory}
            buttonText="Update"
            handleDelete={handleDeleteCategory}
          />
        </Modal>
      </div>
    </div>
  );
};

export default CategoryList;
