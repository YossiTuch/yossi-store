import { initThemeMode } from "flowbite-react";
import { StrictMode, lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Route, RouterProvider, createRoutesFromElements } from "react-router";
import { createBrowserRouter } from "react-router";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import Loader from "./components/Loader.jsx";

const Home = lazy(() => import("./pages/Home.jsx"));
const ProductDetails = lazy(() => import("./pages/Products/ProductDetails.jsx"));
const Shop = lazy(() => import("./pages/Shop.jsx"));
const PrivateRoute = lazy(() => import("./components/PrivateRoute.jsx"));
const Login = lazy(() => import("./pages/Auth/Login.jsx"));
const Register = lazy(() => import("./pages/Auth/Register.jsx"));
const Profile = lazy(() => import("./pages/User/Profile.jsx"));
const Favorites = lazy(() => import("./pages/Products/Favorites.jsx"));
const Cart = lazy(() => import("./pages/Cart.jsx"));
const AdminRoute = lazy(() => import("./pages/Admin/AdminRoute.jsx"));
const UserList = lazy(() => import("./pages/Admin/UserList.jsx"));
const CategoryList = lazy(() => import("./pages/Admin/CategoryList.jsx"));
const CreateProduct = lazy(() => import("./pages/Admin/CreateProduct.jsx"));
const ProductUpdate = lazy(() => import("./pages/Admin/ProductUpdate.jsx"));
const ProductList = lazy(() => import("./pages/Admin/ProductList.jsx"));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route index={true} path="/" element={<Home />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/shop" element={<Shop />} />

      {/* Auth Required Routes */}
      <Route path="" element={<PrivateRoute />}>
        <Route path="/profile" element={<Profile />} />
        <Route path="/favorite" element={<Favorites />} />
        <Route path="/cart" element={<Cart />} />
      </Route>

      {/* Admin Routes */}
      <Route path="/admin" element={<AdminRoute />}>
        <Route path="userlist" element={<UserList />} />
        <Route path="categorylist" element={<CategoryList />} />
        <Route path="createproduct" element={<CreateProduct />} />
        <Route path="productlist" element={<ProductList />} />
        <Route path="product/update/:_id" element={<ProductUpdate />} />
      </Route>
    </Route>,
  ),
);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <Suspense fallback={<Loader />}>
        <RouterProvider router={router} />
      </Suspense>
    </Provider>
  </StrictMode>,
);

initThemeMode();
