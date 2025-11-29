import { useState } from "react";
import { useNavigate } from "react-router";
import {
  useCreateProductMutation,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";

const CreateProduct = () => {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [brand, setBrand] = useState("");
  const [stock, setStock] = useState(0);
  const [imageUrl, setImageUrl] = useState(null);
  const [selectedImageName, setSelectedImageName] = useState("");
  const navigate = useNavigate();

  const [uploadProductImage, { isLoading: isUploading }] =
    useUploadProductImageMutation();
  const [createProduct, { isLoading: isCreating }] = useCreateProductMutation();
  const { data: categories } = useFetchCategoriesQuery();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const productData = new FormData();
      productData.append("image", image);
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("category", category);
      productData.append("quantity", quantity);
      productData.append("brand", brand);
      productData.append("countInStock", stock);

      const product = await createProduct(productData).unwrap();

      toast.success(`${product.name} is created`);
      navigate("/");
    } catch (error) {
      const errorMessage = error?.data?.details
        ? error.data.details.join(", ")
        : error?.data?.message || "Product create failed. Try Again.";
      toast.error(errorMessage);
    }
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    const file = e.target.files?.[0];
    if (!file) return;
    formData.append("image", file);
    setSelectedImageName(file.name);

    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
      setImageUrl(res.image);
    } catch (error) {
      toast.error(error?.data?.message || error?.message || "Upload failed");
    }
  };

  return (
    <section className="min-h-screen w-full bg-slate-100 py-3 dark:bg-slate-950 sm:py-6">
      <div className="container px-3 sm:mx-0 sm:px-6 md:px-8 xl:mx-[9rem]">
        <div className="flex flex-col md:flex-row">
          <div className="w-full rounded-xl border border-slate-200 bg-white p-3 shadow-lg dark:border-slate-700 dark:bg-slate-900 sm:rounded-2xl sm:p-5 md:w-3/4">
            <div className="mb-3 text-xl font-semibold sm:mb-0 sm:h-12 sm:text-2xl">Create Product</div>

            {imageUrl && (
              <div className="text-center">
                <img
                  src={imageUrl}
                  alt="product"
                  className="mx-auto block max-h-[150px] sm:max-h-[200px]"
                />
              </div>
            )}

            <div className="mb-4 sm:mb-6">
              <label className="block w-full cursor-pointer rounded-lg border border-dashed border-slate-300 bg-slate-100 px-3 py-6 text-center text-sm font-semibold transition hover:scale-101 hover:border-blue-400 hover:bg-white hover:shadow-lg dark:border-slate-600 dark:bg-slate-800 dark:hover:border-amber-400 dark:hover:bg-slate-950 sm:rounded-xl sm:px-4 sm:py-11 sm:text-base">
                {selectedImageName || (image ? "Change Image" : "Upload Image")}
                {isUploading && (
                  <span className="ml-2 text-xs text-slate-500">
                    Uploading...
                  </span>
                )}

                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={uploadFileHandler}
                  className="hidden"
                />
              </label>
            </div>

            <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800/50 sm:rounded-2xl sm:p-5">
              <div className="grid gap-3 md:grid-cols-2 sm:gap-6">
                <div>
                  <label className="text-xs font-medium sm:text-sm" htmlFor="name">
                    Name
                  </label>
                  <br />
                  <input
                    type="text"
                    className="mt-1 w-full rounded-md border border-slate-200 bg-white p-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-gray-100 dark:focus:border-amber-500 dark:focus:ring-amber-500/20 sm:mt-2 sm:rounded-lg sm:p-4"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-xs font-medium sm:text-sm" htmlFor="price">
                    Price
                  </label>
                  <br />
                  <input
                    type="number"
                    className="mt-1 w-full rounded-md border border-slate-200 bg-white p-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-gray-100 dark:focus:border-amber-500 dark:focus:ring-amber-500/20 sm:mt-2 sm:rounded-lg sm:p-4"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
              </div>
              <div className="mt-3 grid gap-3 md:grid-cols-2 sm:mt-6 sm:gap-6">
                <div>
                  <label className="text-xs font-medium sm:text-sm" htmlFor="quantity">
                    Quantity
                  </label>
                  <br />
                  <input
                    type="number"
                    className="mt-1 w-full rounded-md border border-slate-200 bg-white p-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-gray-100 dark:focus:border-amber-500 dark:focus:ring-amber-500/20 sm:mt-2 sm:rounded-lg sm:p-4"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-xs font-medium sm:text-sm" htmlFor="brand">
                    Brand
                  </label>
                  <br />
                  <input
                    type="text"
                    className="mt-1 w-full rounded-md border border-slate-200 bg-white p-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-gray-100 dark:focus:border-amber-500 dark:focus:ring-amber-500/20 sm:mt-2 sm:rounded-lg sm:p-4"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                  />
                </div>
              </div>

              <label
                htmlFor="description"
                className="my-3 block text-xs font-medium sm:my-5 sm:text-sm"
              >
                Description
              </label>
              <textarea
                type="text"
                id="description"
                className="mb-2 w-full resize-none rounded-md border border-slate-200 bg-white p-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-gray-100 dark:focus:border-amber-500 dark:focus:ring-amber-500/20 sm:mb-3 sm:rounded-lg sm:p-4"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>

              <div className="grid gap-3 md:grid-cols-2 sm:gap-6">
                <div>
                  <label className="text-xs font-medium sm:text-sm" htmlFor="stock">
                    Count In Stock
                  </label>
                  <br />
                  <input
                    type="nubmer"
                    className="mt-1 w-full rounded-md border border-slate-200 bg-white p-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-gray-100 dark:focus:border-amber-500 dark:focus:ring-amber-500/20 sm:mt-2 sm:rounded-lg sm:p-4"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-xs font-medium sm:text-sm" htmlFor="category">
                    Category
                  </label>
                  <br />
                  <select
                    placeholder="Choose Category"
                    className="mt-1 w-full rounded-md border border-slate-200 bg-white p-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-gray-100 dark:focus:border-amber-500 dark:focus:ring-amber-500/20 sm:mt-2 sm:rounded-lg sm:p-4"
                    onChange={(e) => setCategory(e.target.value)}
                  >
                  <option value="" disabled>Choose Category</option>
                    {categories?.map((c) => (
                      <option key={c._id} value={c._id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                onClick={handleSubmit}
                disabled={isCreating || isUploading}
                className="mt-4 w-full rounded-lg bg-blue-500 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60 dark:bg-amber-600 dark:hover:bg-amber-800 dark:focus:ring-amber-500/50 sm:mt-6 sm:w-auto sm:rounded-xl sm:px-10 sm:py-4 sm:text-lg"
              >
                {isCreating ? "Submitting..." : "Submit"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreateProduct;
