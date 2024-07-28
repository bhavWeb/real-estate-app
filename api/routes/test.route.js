import express from "express"
import { shouldBeLoggedIn,shouldBeAdmin } from "../controllers/test.controller.js";

const route = express.Router();

route.get('/should-be-loggedin', (shouldBeLoggedIn));
 
route.get('/isAdmin',shouldBeAdmin)

export default route