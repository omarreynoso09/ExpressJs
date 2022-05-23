var express = require("express");
const { route } = require("../app");
var router = express.Router();
var blogs = require("../public/sampleBlogs");
const blogPosts = blogs.blogPosts;

//http://localhost:4000/blogs
router.get("/", function (req, res, next) {
  res.json(blogPosts);
});

//http://localhost:4000/blogs/all
router.get("/all", function (req, res, next) {
  let sort = req.query.sort;
  res.json(sortBlogs(sort));
});

let sortBlogs = (order) => {
  if (order === "asc") {
    return blogPosts.sort(function (a, b) {
      return new Date(a.createdAt) - new Date(b.createdAt);
    });
  } else if (order === "desc") {
    return blogPosts.sort(function (a, b) {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
  } else {
    return blogPosts;
  }
};

//http://localhost:4000/blogs/getblogbyid/?blogid=4  using query params
router.get("/getblogbyid", (req, res) => {
  // extract blogid from query
  const queryBlogId = req.query.blogid;

  const foundBlog = blogPosts.find((blog) => {
    return blog.id === queryBlogId;
  });

  // return blogpost
  res.json(foundBlog);
});

//http://localhost:4000/blogs/singleblog/4  using route params
router.get("/singleblog/:blogId", (req, res) => {
  const routeBlogId = req.params.blogId;

  // find the blogpost that has an id that matches the param blogid
  const foundBlog = blogPosts.find((blog) => {
    return blog.id === routeBlogId;
  });

  // return blogpost
  res.json(foundBlog);
});

// * Create a new route /postblog and use the res.render() method to display this page to the browser.
router.get("/postblog", function (req, res, next) {
  res.render("postBlog");
});

router.post("/submit", function (req, res, next) {
  console.log(req.body);
  console.log("bloglist before ", blogPosts);
  const today = new Date();
  const newPost = {
    title: req.body.title,
    text: req.body.text,
    author: req.body.author,
    createdAt: today.toISOString(),
    id: String(blogPosts.length + 1),
  };
  blogPosts.push(newPost);
  console.log("bloglist after ", blogPosts);

  res.send("OK");
});

router.get("/displayBlogs", function (req, res, next) {
  res.render("displayBlogs");
});

router.get("/displaySingleBlog", function (req, res, next) {
  res.render("displaySingleBlog");
});

router.delete("/deleteBlog/:blogId", (req, res) => {
  const blogToDelete = req.params.blogId;
  console.log(blogToDelete);
  for (let i = 0; i < blogPosts.length; i++) {
    let blog = blogPosts[i];
    if (blog.id === blogToDelete) {
      blogPosts.splice(i, 1);
    }
  }
  res.send("Successfully Deleted");
});

module.exports = router;
