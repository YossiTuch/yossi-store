const productCacheMiddleware = (req, res, next) => {
  if (req.path.startsWith("/api/products") && req.method === "GET") {
    res.set("Cache-Control", "public, max-age=300");
  }
  next();
};

export default productCacheMiddleware;
