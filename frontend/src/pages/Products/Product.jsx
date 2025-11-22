// import { Link } from "react-router-dom";
// import HeartIcon from "./HeartIcon";

// const Product = ({ product }) => {
//   return (
//     <div className="w-full p-3 relative">
//       <div className="relative w-full">
//         <img
//           src={product.image}
//           alt={product.name}
//           className="w-full h-auto rounded object-cover"
//         />
//         <HeartIcon product={product} />
//       </div>

//       <div className="p-4">
//         <Link to={`/product/${product._id}`}>
//           <h2 className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
//             <div className="text-base sm:text-lg text-gray-900 dark:text-amber-400 font-medium break-words">
//               {product.name}
//             </div>
//             <span className="bg-pink-100 text-pink-800 text-sm font-medium px-2.5 py-0.5 rounded-full dark:bg-pink-900 dark:text-pink-300 whitespace-nowrap">
//               $ {product.price}
//             </span>
//           </h2>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default Product;