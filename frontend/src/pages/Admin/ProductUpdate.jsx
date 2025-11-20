import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetProductByIdQuery,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";
import AdminMenu from "./AdminMenu";

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
      toast.success("Image uploaded successfully", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
      setImage(res.image);
      setImagePreview(res.image);
    } catch (err) {
      toast.error("Image upload failed. Try again.", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
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
        toast.error(data.error, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        });
      } else {
        toast.success(`Product successfully updated`, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        });
        navigate("/admin/allproductslist");
      }
    } catch (err) {
      console.log(err);
      toast.error("Product update failed. Try again.", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    }
  };

  const handleDelete = async () => {
    try {
      let answer = window.confirm(
        "Are you sure you want to delete this product?",
      );
      if (!answer) return;

      const data = await deleteProduct(params._id).unwrap();
      toast.success(`"${data.name}" is deleted`, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
      navigate("/admin/allproductslist");
    } catch (err) {
      console.log(err);
      toast.error("Delete failed. Try again.", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    }
  };

  return (
    <section className="min-h-screen w-full bg-slate-100 py-6 dark:bg-slate-950">
      <div className="container px-4 sm:mx-0 sm:px-6 md:px-8 xl:mx-[9rem]">
        <div className="flex flex-col md:flex-row">
        <AdminMenu/>
          <div className="w-full rounded-2xl border border-slate-200 bg-white p-5 shadow-lg md:w-3/4 dark:border-slate-700 dark:bg-slate-900">
            <div className="h-12 text-2xl font-semibold">
              Update / Delete Product
            </div>

            {imagePreview && (
              <div className="text-center">
                <img
                  src={imagePreview}
                  alt="product"
                  className="mx-auto block max-h-[200px]"
                />
              </div>
            )}

            <div className="mb-6">
              <label className="block w-full cursor-pointer rounded-xl border border-dashed border-slate-300 bg-slate-100 px-4 py-11 text-center font-semibold transition hover:scale-101 hover:border-blue-400 hover:bg-white hover:shadow-lg dark:border-slate-600 dark:bg-slate-800 dark:hover:border-amber-400 dark:hover:bg-slate-950">
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

            <div className="rounded-2xl bg-slate-50 p-5 dark:bg-slate-800/50">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="text-sm font-medium" htmlFor="name">
                    Name
                  </label>
                  <br />
                  <input
                    type="text"
                    className="mt-2 w-full rounded-lg border border-slate-200 bg-white p-4 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-gray-100 dark:focus:border-amber-500 dark:focus:ring-amber-500/20"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium" htmlFor="price">
                    Price
                  </label>
                  <br />
                  <input
                    type="number"
                    className="mt-2 w-full rounded-lg border border-slate-200 bg-white p-4 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-gray-100 dark:focus:border-amber-500 dark:focus:ring-amber-500/20"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
              </div>

              <div className="mt-6 grid gap-6 md:grid-cols-2">
                <div>
                  <label className="text-sm font-medium" htmlFor="quantity">
                    Quantity
                  </label>
                  <br />
                  <input
                    type="number"
                    min="1"
                    className="mt-2 w-full rounded-lg border border-slate-200 bg-white p-4 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-gray-100 dark:focus:border-amber-500 dark:focus:ring-amber-500/20"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium" htmlFor="brand">
                    Brand
                  </label>
                  <br />
                  <input
                    type="text"
                    className="mt-2 w-full rounded-lg border border-slate-200 bg-white p-4 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-gray-100 dark:focus:border-amber-500 dark:focus:ring-amber-500/20"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                  />
                </div>
              </div>

              <label
                htmlFor="description"
                className="my-5 block text-sm font-medium"
              >
                Description
              </label>
              <textarea
                id="description"
                className="mb-3 w-full resize-none rounded-lg border border-slate-200 bg-white p-4 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-gray-100 dark:focus:border-amber-500 dark:focus:ring-amber-500/20"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="text-sm font-medium" htmlFor="stock">
                    Count In Stock
                  </label>
                  <br />
                  <input
                    type="text"
                    className="mt-2 w-full rounded-lg border border-slate-200 bg-white p-4 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-gray-100 dark:focus:border-amber-500 dark:focus:ring-amber-500/20"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium" htmlFor="category">
                    Category
                  </label>
                  <br />
                  <select
                    placeholder="Choose Category"
                    className="mt-2 w-full rounded-lg border border-slate-200 bg-white p-4 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-gray-100 dark:focus:border-amber-500 dark:focus:ring-amber-500/20"
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

              <div className="mt-6 flex flex-col gap-3 md:flex-row">
                <button
                  onClick={handleSubmit}
                  disabled={isUpdating || isDeleting}
                  className="rounded-xl bg-green-600 px-10 py-4 text-lg font-semibold text-white transition hover:bg-green-700 focus:ring-2 focus:ring-green-300 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60 dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-500/40"
                >
                  {isUpdating ? "Updating..." : "Update"}
                </button>
                <button
                  onClick={handleDelete}
                  disabled={isUpdating || isDeleting}
                  className="rounded-xl bg-pink-600 px-10 py-4 text-lg font-semibold text-white transition hover:bg-pink-700 focus:ring-2 focus:ring-pink-300 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60 dark:bg-rose-600 dark:hover:bg-rose-700 dark:focus:ring-rose-500/40"
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
