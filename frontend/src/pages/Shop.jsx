import React, { useEffect, useState, useMemo, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { skipToken } from "@reduxjs/toolkit/query/react";
import { useGetFilteredProductsQuery, useGetAllProductsForShopQuery } from "../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../redux/api/categoryApiSlice";

import {
  setCategories,
  setProducts,
  setChecked,
  setRadio,
} from "../redux/features/shop/shopSlice";
import Loader from "../components/Loader";
import ProductCard from "./Products/ProductCard";
import { useDebouncedValue } from "../hooks/useDebouncedValue";

const Shop = () => {
  const dispatch = useDispatch();
  const { categories, products, checked, radio } = useSelector(
    (state) => state.shop
  );

  const categoriesQuery = useFetchCategoriesQuery();
  const [priceFilter, setPriceFilter] = useState("");
  const debouncedPriceFilter = useDebouncedValue(priceFilter, 300);
  const lastDispatchedRef = useRef("");

  const hasFilters = checked.length > 0 || radio.length > 0;

  const allProductsQuery = useGetAllProductsForShopQuery();
  const filteredProductsQuery = useGetFilteredProductsQuery(
    hasFilters ? { checked, radio } : skipToken
  );

  const productsData = useMemo(() => {
    if (hasFilters) {
      if (!filteredProductsQuery.data) return [];
      return filteredProductsQuery.data.products || [];
    } else {
      if (!allProductsQuery.data) return [];
      return Array.isArray(allProductsQuery.data) ? allProductsQuery.data : [];
    }
  }, [hasFilters, filteredProductsQuery.data, allProductsQuery.data]);

  const uniqueBrands = useMemo(() => {
    if (!productsData.length) return [];
    return Array.from(
      new Set(
        productsData
          .map((product) => product.brand)
          .filter((brand) => brand !== undefined)
      )
    );
  }, [productsData]);

  useEffect(() => {
    if (!categoriesQuery.isLoading && categoriesQuery.data) {
      dispatch(setCategories(categoriesQuery.data));
    }
  }, [categoriesQuery.data, categoriesQuery.isLoading, dispatch]);

  useEffect(() => {
    if (!productsData.length) {
      const emptyKey = "empty";
      if (lastDispatchedRef.current !== emptyKey) {
        dispatch(setProducts([]));
        lastDispatchedRef.current = emptyKey;
      }
      return;
    }

    let filtered = productsData;

    if (debouncedPriceFilter) {
      filtered = filtered.filter((product) => {
        const priceStr = product.price?.toString() || "";
        const filterNum = parseInt(debouncedPriceFilter, 10);
        return priceStr.includes(debouncedPriceFilter) || product.price === filterNum;
      });
    }

    const newKey = filtered.map(p => p._id).sort().join(',');
    
    if (lastDispatchedRef.current !== newKey) {
      dispatch(setProducts(filtered));
      lastDispatchedRef.current = newKey;
    }
  }, [hasFilters, productsData, debouncedPriceFilter, dispatch]);

  // Memoize handlers to prevent unnecessary re-renders
  const handleBrandClick = useCallback(
    (brand) => {
      if (!productsData.length) return;
      const productsByBrand = productsData.filter(
        (product) => product.brand === brand
      );
      dispatch(setProducts(productsByBrand));
    },
    [productsData, dispatch]
  );

  const handleCheck = useCallback(
    (value, id) => {
      const updatedChecked = value
        ? [...checked, id]
        : checked.filter((c) => c !== id);
      dispatch(setChecked(updatedChecked));
    },
    [checked, dispatch]
  );

  const handlePriceChange = useCallback((e) => {
    setPriceFilter(e.target.value);
  }, []);

  const handleReset = useCallback(() => {
    dispatch(setChecked([]));
    dispatch(setRadio([]));
    setPriceFilter("");
    if (productsData.length) {
      dispatch(setProducts(productsData));
    }
  }, [dispatch, productsData]);

  return (
    <div className="min-h-[calc(100vh-100px)] bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row">
          {/* Filters Sidebar */}
          <aside className="w-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800 lg:w-80 lg:sticky lg:top-6 lg:h-fit">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Filters
              </h2>
              <button
                onClick={handleReset}
                className="text-sm font-medium text-pink-600 transition-colors hover:text-pink-800 dark:text-amber-400 dark:hover:text-amber-300"
              >
                Reset
              </button>
            </div>

            {/* Categories Filter */}
            <div className="mb-6">
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-700 dark:text-gray-300">
                Categories
              </h3>
              <div className="space-y-2">
                {categories?.map((c) => (
                  <label
                    key={c._id}
                    className="flex cursor-pointer items-center space-x-3 rounded-lg p-2 transition-colors hover:bg-slate-50 dark:hover:bg-slate-700/50"
                  >
                    <input
                      type="checkbox"
                      checked={checked.includes(c._id)}
                      onChange={(e) => handleCheck(e.target.checked, c._id)}
                      className="h-4 w-4 cursor-pointer rounded border-gray-300 text-pink-600 focus:ring-2 focus:ring-pink-500 focus:ring-offset-0 dark:border-slate-600 dark:bg-slate-700 dark:text-amber-500 dark:focus:ring-amber-500"
                    />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {c.name}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Brands Filter */}
            {uniqueBrands.length > 0 && (
              <div className="mb-6">
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-700 dark:text-gray-300">
                  Brands
                </h3>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {uniqueBrands.map((brand) => (
                    <label
                      key={brand}
                      className="flex cursor-pointer items-center space-x-3 rounded-lg p-2 transition-colors hover:bg-slate-50 dark:hover:bg-slate-700/50"
                    >
                      <input
                        type="radio"
                        id={brand}
                        name="brand"
                        onChange={() => handleBrandClick(brand)}
                        className="h-4 w-4 cursor-pointer border-gray-300 text-pink-600 focus:ring-2 focus:ring-pink-500 focus:ring-offset-0 dark:border-slate-600 dark:bg-slate-700 dark:text-amber-500 dark:focus:ring-amber-500"
                      />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {brand}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Price Filter */}
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-700 dark:text-gray-300">
                Price
              </h3>
              <input
                type="text"
                placeholder="Enter price..."
                value={priceFilter}
                onChange={handlePriceChange}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm placeholder-gray-400 transition-colors focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500/20 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:placeholder-gray-500 dark:focus:border-amber-500 dark:focus:ring-amber-500/20"
              />
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="mb-6 flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
                Products
              </h1>
              <span className="rounded-full bg-pink-100 px-4 py-1.5 text-sm font-semibold text-pink-800 dark:bg-amber-900 dark:text-white">
                {products?.length || 0} {products?.length === 1 ? "item" : "items"}
              </span>
            </div>

            {products.length === 0 ? (
              <div className="flex min-h-[400px] items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white dark:border-slate-700 dark:bg-slate-800">
                <div className="text-center">
                  <Loader />
                  <p className="mt-4 text-gray-500 dark:text-gray-400">
                    {(hasFilters ? filteredProductsQuery.isLoading : allProductsQuery.isLoading)
                      ? "Loading products..."
                      : "No products found"}
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {products.map((p) => (
                  <ProductCard key={p._id} p={p} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Shop);