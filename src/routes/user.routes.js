import { Router } from "express";
import { RegisterUser,LoginUser,UpdateDetails,ChnagePassword, checkConnection } from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/register", RegisterUser);
router.post("/login", LoginUser);
router.post("/changePass", verifyToken, ChnagePassword);
router.post("/updateDetails", verifyToken, UpdateDetails);
router.route("/check").get(checkConnection);



export default router;