// @ts-nocheck
import express from "express";
import * as database from "../controller/postController";
import * as userDB from "../controller/userController";
const router = express.Router();
import { ensureAuthenticated } from "../middleware/checkAuth";

router.get("/", async (req, res) => {
  const posts = await database.getPosts(20);
  const user = await req.user;
  res.render("posts", { posts, user });
});

router.get("/create", ensureAuthenticated, (req, res) => {
  res.render("createPosts");
});

router.post("/create", ensureAuthenticated, async (req, res) => {
  const {title, description, link, sub} = req.body;
  if (title === "" || description === "" || sub === "")
    { 
      res.render("createPosts"); 
      return; 
    }
  const user = await req.user;
  const post = await database.addPost(title, link, user.id, description, sub)
  res.redirect(`/posts/show/${post.id}`)
});

router.get("/show/:postid", async (req, res) => {
  const post = await database.getPost(req.params.postid);
  const user = await req.user
  res.render("individualPost", {post, user});
});

router.get("/edit/:postid", ensureAuthenticated, async (req, res) => {
  const post_id = req.params.postid;
  const post = await database.getPost(post_id);
  const user = await req.user;
  if (post.creator.id !== user.id) {
    res.redirect(`/posts/show/${post_id}`);
    return;
  }
  res.render("editPost", { post });
});

router.post("/edit/:postid", ensureAuthenticated, async (req, res) => {
  const post_id = req.params.postid;
  const {title, description, link} = req.body;
  const changes = {
    title: title,
    description: description,
    link: link
  }
  await database.editPost(post_id, changes);
  res.redirect(`/posts/show/${post_id}`);
});

router.get("/deleteconfirm/:postid", ensureAuthenticated, async (req, res) => {
  // ⭐ TODO
});

router.post("/delete/:postid", ensureAuthenticated, async (req, res) => {
  // ⭐ TODO
});

router.post(
  "/comment-create/:postid",
  ensureAuthenticated,
  async (req, res) => {
    // ⭐ TODO
    const post_id = req.params.postid
    const { description } = req.body;
    const creator = await req.user;
    database.addComment(post_id, creator.id, description);
    res.redirect(`/posts/show/${post_id}`);
  }
);

export default router;
