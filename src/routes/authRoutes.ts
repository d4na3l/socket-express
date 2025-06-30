import express, { Router } from "express";
import { guest, logout, signIn, signUp } from "../controllers/authController";

const router: Router = express.Router();

router.route('/guest').post(guest);

router.route('/signin').post(signIn);
router.route('/signup').post(signUp);
router.route('/logout').post(logout);

export default router