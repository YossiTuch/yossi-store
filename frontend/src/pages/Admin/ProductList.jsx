import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useCreateProductMutation,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";

const ProductList = () => {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [brand, setBrand] = useState("");
  const [stock, setStock] = useState(0);
  const [imageUrl, setImageUrl] = useState(null);
  const navigate = useNavigate();

  const [uploadProductImage] = useUploadProductImageMutation();
  const [createProduct] = useCreateProductMutation();
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

      const { data } = await createProduct(productData);

      if (data.error) {
        toast.error("Product create failed. Try Again.");
      } else {
        toast.success(`${data.name} is created`);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      toast.error("Product create failed. Try Again.");
    }
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);

    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
      setImageUrl(res.image);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <section className="min-h-screen w-full bg-slate-100 py-6 dark:bg-slate-950">
      <div className="container px-4 sm:mx-0 sm:px-6 md:px-8 xl:mx-[9rem]">
        <div className="flex flex-col md:flex-row">
          <div className="w-full rounded-2xl border border-slate-200 bg-white p-5 shadow-lg md:w-3/4 dark:border-slate-700 dark:bg-slate-900">
            <div className="h-12 text-2xl font-semibold">Create Product</div>

            {imageUrl && (
              <div className="text-center">
                <img
                  src={imageUrl}
                  alt="product"
                  className="mx-auto block max-h-[200px]"
                />
              </div>
            )}

            <div className="mb-6">
              <label className="block w-full cursor-pointer rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-11 text-center font-semibold transition hover:scale-101 hover:border-blue-400 hover:bg-slate-950 hover:shadow-lg dark:border-slate-600 dark:bg-slate-800 dark:hover:border-amber-400">
                {image ? image.name : "Upload Image"}

                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={uploadFileHandler}
                  className={!image ? "hidden" : ""}
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
                type="text"
                id="description"
                className="mb-3 w-full resize-none rounded-lg border border-slate-200 bg-white p-4 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-gray-100 dark:focus:border-amber-500 dark:focus:ring-amber-500/20"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>

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

              <button
                onClick={handleSubmit}
                className="mt-6 rounded-xl bg-blue-500 px-10 py-4 text-lg font-semibold text-white transition hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 focus:outline-none dark:bg-amber-600 dark:hover:bg-amber-800 dark:focus:ring-amber-500/50"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductList;
