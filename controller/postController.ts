import * as db from "../fake-db";

async function getPost(id: string) {
  return db.getPost(id);
}

async function getPosts(n = 5, sub: string | undefined = undefined) {
  return db.getPosts(n, sub);
}
async function getSubs() {
  return db.getSubs();
}

async function addPost(title: string, link: string, creator: string, description: string, subgroup: string) {
  return db.addPost(title, link, creator, description, subgroup);
}

async function editPost(post_id: string, changes = {}) {
  return db.editPost(post_id, changes);
}

async function addComment(post_id: string, creator: string, description: string) {
  return db.addComment(post_id, creator, description);
}



export { getPost, getPosts, getSubs, addPost, editPost, addComment };
