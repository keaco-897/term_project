import * as db from "../fake-db";

async function getPost(id: String) {
  return db.getPost(id);
}

async function getPosts(n = 5, sub: string | undefined = undefined) {
  return db.getPosts(n, sub);
}
async function getSubs() {
  return db.getSubs();
}

async function addComment(post_id: Number, creator: Number, description: String) {
  return db.addComment(post_id, creator, description);
}



export { getPost, getPosts, getSubs, addComment };
