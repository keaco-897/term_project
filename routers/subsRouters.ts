import express from "express";
import * as database from "../controller/postController";
const router = express.Router();

router.get("/list", async (req, res) => {
  // getSubs already only retrieves subs with at least one post
  const subnames = await database.getSubs();
  subnames.sort((a, b) => a.localeCompare(b))
  res.render("subs", {subnames});
});

router.get("/show/:subname", async (req, res) => {
  const subname = req.params.subname
  const posts = await database.getPosts(20, subname)
  res.render("sub", { posts });
});

export default router;
