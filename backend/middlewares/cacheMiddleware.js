const cacheMiddleware = (req, res, next) => {
  if (req.method === "GET") {
    if (req.path.startsWith("/api/products")) {
      res.set("Cache-Control", "public, max-age=300");
    } else if (req.path.startsWith("/api/category")) {
      res.set("Cache-Control", "public, max-age=600");
    } else if (req.path.startsWith("/api/orders") && !req.path.includes("/mine")) {
      res.set("Cache-Control", "private, max-age=60");
    }
  }
  next();
};

export default cacheMiddleware;
