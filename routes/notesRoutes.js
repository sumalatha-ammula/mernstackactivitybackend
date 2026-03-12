import express from "express";
import {signup,signin} from "../controllers/authcontoller.js";
import {addContact,getContacts,deleteContact,updateContact} from "../controllers/contactcontoller.js";
import { protect } from "../middleware/authmiddleware.js";
import rateLimiter from "../middleware/ratelimiter.js";




 const router  = express.Router();
 router.post("/signup", signup);
router.post("/signin",rateLimiter, signin);
router.post("/addContact",protect, addContact);
router.get("/",protect, getContacts);
router.put("/:id",protect, updateContact);
router.delete("/deleteContact/:id",protect,deleteContact);
 export default router;
