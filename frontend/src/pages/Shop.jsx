import React, {
  useEffect,
  useState,
  useMemo,
  useCallback,
  useRef,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { skipToken } from "@reduxjs/toolkit/query/react";
import {
  useGetFilteredProductsQuery,
  useGetAllProductsForShopQuery,
} from "../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../redux/api/categoryApiSlice";

import {
  setCategories,
  setProducts,
  setChecked,
  setRadio,
  setSelectedBrand,
} from "../redux/features/shop/shopSlice";
import Loader from "../components/Loader";
import ProductCard from "./Products/ProductCard";
import { useDebouncedValue } from "../hooks/useDebouncedValue";

const Shop = () => {
  const dispatch = useDispatch();
  const { categories, products, checked, radio, selectedBrand } = useSelector(
    (state) => state.shop,
  );

  const categoriesQuery = useFetchCategoriesQuery();
  const [priceFilter, setPriceFilter] = useState("");
  const debouncedPriceFilter = useDebouncedValue(priceFilter, 300);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebouncedValue(searchTerm, 300);
  const lastDispatchedRef = useRef("");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const hasCategoryFilters = checked.length > 0 || radio.length > 0;
  const hasFilters = hasCategoryFilters || selectedBrand !== null;

  const allProductsQuery = useGetAllProductsForShopQuery();
  const filteredProductsQuery = useGetFilteredProductsQuery(
    hasCategoryFilters ? { checked, radio } : skipToken,
  );

  const productsData = useMemo(() => {
    if (hasCategoryFilters) {
      if (!filteredProductsQuery.data) return [];
      return filteredProductsQuery.data.products || [];
    } else {
      if (!allProductsQuery.data) return [];
      return Array.isArray(allProductsQuery.data) ? allProductsQuery.data : [];
    }
  }, [hasCategoryFilters, filteredProductsQuery.data, allProductsQuery.data]);

  const uniqueBrands = useMemo(() => {
    if (!productsData.length) return [];
    return Array.from(
      new Set(
        productsData
          .map((product) => product.brand)
          .filter((brand) => brand !== undefined && brand !== null),
      ),
    );
  }, [productsData]);

  useEffect(() => {
    if (!categoriesQuery.isLoading && categoriesQuery.data) {
      dispatch(setCategories(categoriesQuery.data));
    }
  }, [categoriesQuery.data, categoriesQuery.isLoading, dispatch]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setFiltersOpen(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

    if (debouncedSearchTerm) {
      const searchLower = debouncedSearchTerm.toLowerCase().trim();
      filtered = filtered.filter((product) => {
        const nameMatch = product.name?.toLowerCase().includes(searchLower);
        const descriptionMatch = product.description?.toLowerCase().includes(searchLower);
        const brandMatch = product.brand?.toLowerCase().includes(searchLower);
        return nameMatch || descriptionMatch || brandMatch;
      });
    }

    if (selectedBrand) {
      filtered = filtered.filter((product) => product.brand === selectedBrand);
    }

    if (debouncedPriceFilter) {
      const rangeMatch = debouncedPriceFilter.match(
        /^(\d+(?:\.\d+)?)\s*(?:-|to)\s*(\d+(?:\.\d+)?)$/i,
      );

      if (rangeMatch) {
        const minPrice = parseFloat(rangeMatch[1]);
        const maxPrice = parseFloat(rangeMatch[2]);

        if (
          !isNaN(minPrice) &&
          !isNaN(maxPrice) &&
          isFinite(minPrice) &&
          isFinite(maxPrice)
        ) {
          const actualMin = Math.min(minPrice, maxPrice);
          const actualMax = Math.max(minPrice, maxPrice);

          filtered = filtered.filter((product) => {
            if (!product.price) return false;
            const productPrice = parseFloat(product.price);
            return (
              !isNaN(productPrice) &&
              productPrice >= actualMin &&
              productPrice <= actualMax
            );
          });
        }
      } else {
        const filterNum = parseFloat(debouncedPriceFilter);
        const isValidNumber = !isNaN(filterNum) && isFinite(filterNum);

        if (isValidNumber && filterNum > 0) {
          const tolerance = Math.max(filterNum * 0.1, 5);
          const minPrice = filterNum - tolerance;
          const maxPrice = filterNum + tolerance;

          filtered = filtered.filter((product) => {
            if (!product.price) return false;
            const productPrice = parseFloat(product.price);
            return (
              !isNaN(productPrice) &&
              productPrice >= minPrice &&
              productPrice <= maxPrice
            );
          });
        } else {
          filtered = filtered.filter((product) => {
            if (!product.price) return false;
            const priceStr = product.price.toString();
            return priceStr.includes(debouncedPriceFilter);
          });
        }
      }
    }

    const newKey = filtered
      .map((product) => product._id)
      .sort()
      .join(",");

    if (lastDispatchedRef.current !== newKey) {
      dispatch(setProducts(filtered));
      lastDispatchedRef.current = newKey;
    }
  }, [hasFilters, productsData, debouncedPriceFilter, debouncedSearchTerm, selectedBrand, dispatch]);

  const handleBrandClick = useCallback(
    (brand) => {
      const newBrand = selectedBrand === brand ? null : brand;
      dispatch(setSelectedBrand(newBrand));
    },
    [selectedBrand, dispatch],
  );

  const handleCategoryClick = useCallback(
    (categoryId) => {
      const newChecked = checked.includes(categoryId) ? [] : [categoryId];
      dispatch(setChecked(newChecked));
    },
    [checked, dispatch],
  );

  const handlePriceChange = useCallback((e) => {
    setPriceFilter(e.target.value);
  }, []);

  const handleReset = useCallback(() => {
    dispatch(setChecked([]));
    dispatch(setRadio([]));
    dispatch(setSelectedBrand(null));
    setPriceFilter("");
    setSearchTerm("");
  }, [dispatch]);

  const toggleFilters = useCallback(() => {
    setFiltersOpen((prev) => !prev);
  }, []);

  return (
    <div className="min-h-[calc(100vh-100px)] bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row">
          <aside className="w-full rounded-2xl border border-slate-200 bg-white shadow-sm lg:sticky lg:top-6 lg:h-fit lg:w-80 dark:border-slate-700 dark:bg-slate-800">
            <div className="flex items-center justify-between border-b border-slate-200 p-6 lg:border-b-0 lg:pb-6 dark:border-slate-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Filters
              </h2>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleReset}
                  className="text-sm font-medium text-pink-600 transition-colors hover:text-pink-800 dark:text-amber-400 dark:hover:text-amber-300"
                >
                  Reset
                </button>
                <button
                  onClick={toggleFilters}
                  className="flex items-center justify-center rounded-lg p-2 text-gray-600 transition-colors hover:bg-slate-100 hover:text-gray-900 lg:hidden dark:text-gray-400 dark:hover:bg-slate-700 dark:hover:text-white"
                  aria-label="Toggle filters"
                >
                  <svg
                    className={`h-5 w-5 transition-transform duration-200 ${
                      filtersOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                filtersOpen ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
              } lg:max-h-none lg:opacity-100`}
            >
              <div className="p-6 pt-0 lg:pt-0">
                <div className="mb-6">
                  <h3 className="mb-4 text-sm font-semibold tracking-wide text-gray-700 uppercase dark:text-gray-300">
                    Categories
                  </h3>
                  <div className="space-y-2">
                    <label className="flex cursor-pointer items-center space-x-3 rounded-lg p-2 transition-colors hover:bg-slate-50 dark:hover:bg-slate-700/50">
                      <input
                        type="radio"
                        id="all-categories"
                        name="category"
                        checked={checked.length === 0}
                        onChange={() => dispatch(setChecked([]))}
                        className="h-4 w-4 cursor-pointer border-gray-300 text-pink-600 focus:ring-2 focus:ring-pink-500 focus:ring-offset-0 dark:border-slate-600 dark:bg-slate-700 dark:text-amber-500 dark:focus:ring-amber-500"
                      />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        All Categories
                      </span>
                    </label>
                    {categories?.map((c) => (
                      <label
                        key={c._id}
                        className="flex cursor-pointer items-center space-x-3 rounded-lg p-2 transition-colors hover:bg-slate-50 dark:hover:bg-slate-700/50"
                      >
                        <input
                          type="radio"
                          id={c._id}
                          name="category"
                          checked={checked.includes(c._id)}
                          onChange={() => handleCategoryClick(c._id)}
                          className="h-4 w-4 cursor-pointer border-gray-300 text-pink-600 focus:ring-2 focus:ring-pink-500 focus:ring-offset-0 dark:border-slate-600 dark:bg-slate-700 dark:text-amber-500 dark:focus:ring-amber-500"
                        />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {c.name}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {uniqueBrands.length > 0 && (
                  <div className="mb-6">
                    <h3 className="mb-4 text-sm font-semibold tracking-wide text-gray-700 uppercase dark:text-gray-300">
                      Brands
                    </h3>
                    <div className="max-h-64 space-y-2 overflow-y-auto">
                      <label className="flex cursor-pointer items-center space-x-3 rounded-lg p-2 transition-colors hover:bg-slate-50 dark:hover:bg-slate-700/50">
                        <input
                          type="radio"
                          id="all-brands"
                          name="brand"
                          checked={selectedBrand === null}
                          onChange={() => handleBrandClick(null)}
                          className="h-4 w-4 cursor-pointer border-gray-300 text-pink-600 focus:ring-2 focus:ring-pink-500 focus:ring-offset-0 dark:border-slate-600 dark:bg-slate-700 dark:text-amber-500 dark:focus:ring-amber-500"
                        />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          All Brands
                        </span>
                      </label>
                      {uniqueBrands.map((brand) => (
                        <label
                          key={brand}
                          className="flex cursor-pointer items-center space-x-3 rounded-lg p-2 transition-colors hover:bg-slate-50 dark:hover:bg-slate-700/50"
                        >
                          <input
                            type="radio"
                            id={brand}
                            name="brand"
                            checked={selectedBrand === brand}
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

                <div>
                  <h3 className="mb-4 text-sm font-semibold tracking-wide text-gray-700 uppercase dark:text-gray-300">
                    Price
                  </h3>
                  <input
                    type="text"
                    placeholder="Single price (50), or a range (10-100)"
                    value={priceFilter}
                    onChange={handlePriceChange}
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm placeholder-gray-400 transition-colors focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 focus:outline-none dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:placeholder-gray-500 dark:focus:border-amber-500 dark:focus:ring-amber-500/20"
                  />
                </div>
              </div>
            </div>
          </aside>

          <div className="flex-1">
            <div className="mb-6">
              <div className="mb-4 flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl dark:text-white">
                  Products
                </h1>
                <span className="rounded-full bg-pink-100 px-4 py-1.5 text-sm font-semibold text-pink-800 dark:bg-amber-900 dark:text-white">
                  {products?.length || 0}{" "}
                  {products?.length === 1 ? "item" : "items"}
                </span>
              </div>
              
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-400 dark:text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search products by name, description, or brand..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 bg-white pl-10 pr-4 py-2.5 text-sm placeholder-gray-400 transition-colors focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 focus:outline-none dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:placeholder-gray-500 dark:focus:border-amber-500 dark:focus:ring-amber-500/20"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
                    aria-label="Clear search"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                )}
              </div>
            </div>

            {products.length === 0 ? (
              <div className="flex min-h-[400px] items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white dark:border-slate-700 dark:bg-slate-800">
                <div className="text-center">
                  {(hasCategoryFilters && filteredProductsQuery.isLoading) ||
                  (!hasCategoryFilters && allProductsQuery.isLoading) ? (
                    <>
                      <Loader />
                      <p className="mt-4 text-gray-500 dark:text-gray-400">
                        Loading products...
                      </p>
                    </>
                  ) : (
                    <p className="text-gray-500 dark:text-gray-400">
                      No products found
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
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
