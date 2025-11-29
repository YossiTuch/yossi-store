import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import {
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetProductByIdQuery,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";

const AdminProductUpdate = () => {
  const params = useParams();

  const { data: productData } = useGetProductByIdQuery(params._id);

  const [image, setImage] = useState(productData?.image || "");
  const [imagePreview, setImagePreview] = useState(productData?.image || "");
  const [name, setName] = useState(productData?.name || "");
  const [description, setDescription] = useState(
    productData?.description || "",
  );
  const [price, setPrice] = useState(productData?.price || "");
  const [category, setCategory] = useState(productData?.category || "");
  const [quantity, setQuantity] = useState(productData?.quantity || "");
  const [brand, setBrand] = useState(productData?.brand || "");
  const [stock, setStock] = useState(productData?.countInStock || 0);
  const [selectedImageName, setSelectedImageName] = useState("");

  const navigate = useNavigate();

  const { data: categories = [] } = useFetchCategoriesQuery();

  const [uploadProductImage, { isLoading: isUploading }] =
    useUploadProductImageMutation();

  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();

  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();

  useEffect(() => {
    if (productData && productData._id) {
      const categoryValue =
        typeof productData.category === "string"
          ? productData.category
          : productData.category?._id || "";

      setName(productData.name);
      setDescription(productData.description);
      setPrice(productData.price);
      setCategory(categoryValue);
      setQuantity(productData.quantity);
      setBrand(productData.brand);
      setImage(productData.image);
      setImagePreview(productData.image);
      setStock(productData.countInStock || 0);
      if (productData.image) {
        const imageNameFromUrl = productData.image.split("/").pop();
        setSelectedImageName(imageNameFromUrl || "");
      }
    }
  }, [productData]);

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    const file = e.target.files?.[0];
    if (!file) return;
    formData.append("image", file);
    setSelectedImageName(file.name);
    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success("Image uploaded successfully");
      setImage(res.image);
      setImagePreview(res.image);
    } catch (err) {
      toast.error("Image upload failed. Try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("quantity", quantity);
      formData.append("brand", brand);
      formData.append("countInStock", stock);

      const data = await updateProduct({
        productId: params._id,
        formData,
      }).unwrap();

      if (data?.error) {
        toast.error(data.error);
      } else {
        toast.success(`Product successfully updated`);
        navigate("/admin/productlist");
      }
    } catch (err) {
      toast.error("Product update failed. Try again.");
    }
  };

  const handleDelete = async () => {
    try {
      let answer = window.confirm(
        "Are you sure you want to delete this product?",
      );
      if (!answer) return;

      const data = await deleteProduct(params._id).unwrap();
      toast.success(`"${data.name}" is deleted`);
      navigate("/admin/productlist");
    } catch (err) {
      toast.error("Delete failed. Try again.");
    }
  };

  return (
    <section className="min-h-screen w-full bg-slate-100 py-3 dark:bg-slate-900 sm:py-6">
      <div className="container px-3 sm:mx-0 sm:px-6 md:px-8 xl:mx-[9rem]">
        <div className="flex flex-col md:flex-row">
          <div className="w-full rounded-xl border border-slate-200 bg-white p-3 shadow-lg dark:border-slate-700 dark:bg-slate-900 sm:rounded-2xl sm:p-5 md:w-3/4">
            <div className="mb-3 text-xl font-semibold sm:mb-0 sm:h-12 sm:text-2xl">
              Update / Delete Product
            </div>

            {imagePreview && (
              <div className="text-center">
                <img
                  src={imagePreview}
                  alt="product"
                  className="mx-auto block max-h-[150px] sm:max-h-[200px]"
                />
              </div>
            )}

            <div className="mb-4 sm:mb-6">
              <label className="block w-full cursor-pointer rounded-lg border border-dashed border-slate-300 bg-slate-100 px-3 py-6 text-center text-sm font-semibold transition hover:scale-101 hover:border-blue-400 hover:bg-white hover:shadow-lg dark:border-slate-600 dark:bg-slate-800 dark:hover:border-amber-400 dark:hover:bg-slate-950 sm:rounded-xl sm:px-4 sm:py-11 sm:text-base">
                {selectedImageName ||
                  (image ? "Replace Image" : "Upload Image")}
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
                    min="1"
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
                id="description"
                className="mb-2 w-full resize-none rounded-md border border-slate-200 bg-white p-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-gray-100 dark:focus:border-amber-500 dark:focus:ring-amber-500/20 sm:mb-3 sm:rounded-lg sm:p-4"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              <div className="grid gap-3 md:grid-cols-2 sm:gap-6">
                <div>
                  <label className="text-xs font-medium sm:text-sm" htmlFor="stock">
                    Count In Stock
                  </label>
                  <br />
                  <input
                    type="number"
                    min="0"
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
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    {categories?.map((c) => (
                      <option key={c._id} value={c._id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-4 flex flex-col gap-2 sm:mt-6 sm:flex-row sm:gap-3">
                <button
                  onClick={handleSubmit}
                  disabled={isUpdating || isDeleting}
                  className="w-full rounded-lg bg-green-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700 focus:ring-2 focus:ring-green-300 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60 dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-500/40 sm:w-auto sm:rounded-xl sm:px-10 sm:py-4 sm:text-lg"
                >
                  {isUpdating ? "Updating..." : "Update"}
                </button>
                <button
                  onClick={handleDelete}
                  disabled={isUpdating || isDeleting}
                  className="w-full rounded-lg bg-pink-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-pink-700 focus:ring-2 focus:ring-pink-300 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60 dark:bg-rose-600 dark:hover:bg-rose-700 dark:focus:ring-rose-500/40 sm:w-auto sm:rounded-xl sm:px-10 sm:py-4 sm:text-lg"
                >
                  {isDeleting ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminProductUpdate;
