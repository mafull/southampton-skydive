import express          from "express";

import authRoutes       from "./auth";
import committeeRoutes  from "./committee";
import rigRoutes        from "./rigs";
import userRoutes       from "./users";

const router = express.Router();


router.use("", authRoutes);
router.use("/committee", committeeRoutes);
router.use("/rigs", rigRoutes);
router.use("/users", userRoutes);


export default router;
