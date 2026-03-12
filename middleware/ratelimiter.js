import rateLimit from "express-rate-limit";

const rateLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 15 minutes
  max: 3, // each IP can make 100 requests
  message: {
    message: "Too many requests from this IP, please try again later."
  }
});
 export default rateLimiter;