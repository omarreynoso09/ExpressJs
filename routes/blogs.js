var express = require("express");
var router = express.Router();

var blogs = require("../public/javascripts/sampleBlogs");
const blogPosts = blogs.blogPosts;

const { blogsDB } = require("../mongo");
const { Db } = require("mongodb");

/* GET Blogs listing. */

router.get("/", async function (req, res, next) {
  try {
    const collection = await blogsDB().collection("blogs50");
    const blogs50 = await collection.find({}).toArray();
    res.json(blogs50);
  } catch (error) {
    res.status(500).send("Error fetching posts." + error);
  }
});

// QUERY PARAM

router.get("/allAuthors", async function (req, res) {
  try {
    const collection = await blogsDB().collection("blogs50");
    const authors = await collection.distinct("author");
    console.log(authors);
    res.json(authors);
  } catch (error) {
    res.status(500).send("Error: " + error);
  }
});

router.get("/all", async function (req, res, next) {
  try {
    let sortField = req.query.sortField;
    let sortOrder = req.query.sortOrder;
    if (sortOrder === "asc") {
      // Setting the order to 1 will order in numerical order.
      sortOrder = 1;
    }
    if (sortOrder === "desc") {
      // Setting order to -1 will reverse the numerical order.
      sortOrder = -1;
    }
    const collection = await blogsDB().collection("blogs50");
    const blogs50 = await collection
      .find({})
      .sort({
        [sortField]: sortOrder,
      })
      .toArray();
    console.log(blogs50);
    res.json(blogs50);
  } catch (error) {
    res.status(500).send("Error fetching posts." + error);
  }
});

// Display Blogs Router
router.get("/displayBlogs", (req, res, next) => {
  res.render("displayBlogs");
});

// Display Single Blog Router
router.get("/displaySingleBlog", (req, res, next) => {
  res.render("displaySingleBlog");
});

// Route Param
router.get("/blogsByAuthor/:author", async function (req, res) {
  try {
    let author = req.params.author;
    console.log("original author " + author);
    author = author.replaceAll("-", " ");
    console.log("what is the author" + author);
    const blogs = await blogsDB()
      .collection("blogs50")
      .find({ author: author })
      .toArray();
    res.json(blogs);
  } catch (error) {
    res.status(500).send("error fetching posts by author." + error);
  }
});

// Display Single blog by id router
router.get("/singleBlog/:blogId", async function (req, res) {
  try {
    const blogId = Number(req.params.blogId);
    const collection = await blogsDB().collection("blogs50");
    const foundBlog = await collection.findOne({ id: blogId });
    console.log(foundBlog);

    if (!foundBlog) {
      const noBlog = {
        title: "",
        text: "This blog does not exist.",
        author: "",
        id: "",
      };
      res.json(noBlog);
    } else {
      res.json(foundBlog);
    }
  } catch (error) {
    res.status(500).send("Error fetching post." + error);
  }
});

// Delete Single Blog Router
router.delete("/deleteBlog/:blogId", async function (req, res, next) {
  try {
    const blogId = Number(req.params.blogId);
    const collection = await blogsDB().collection("blogs50");
    const blogToDelete = await collection.deleteOne({ id: blogId });
    console.log(blogToDelete.deletedCount);

    if (blogToDelete.deletedCount === 1) {
      res.status(200).send("Successfully Deleted.");
    } else {
      res.send("This blog does not exist.").status(204);
    }
  } catch (error) {
    res.status(500).send("Error deleting blog." + error);
  }
});

router.get("/postBlog", function (req, res, next) {
  res.render("postBlog");
});

router.post("/submit", async function (req, res, next) {
  try {
    const collection = await blogsDB().collection("blogs50");
    const sortedBlogArray = await collection.find({}).sort({ id: 1 }).toArray();
    const lastBlog = sortedBlogArray[sortedBlogArray.length - 1];

    let blog = req.body;

    blog = {
      ...blog,
      createdAt: new Date(),
      lastModified: new Date(),
      id: Number(lastBlog.id + 1),
    };

    await collection.insertOne(blog);
    res.status(200).send("Post has been submitted");
  } catch (error) {
    res.status(500).send("Error posting blog." + error);
  }
});

router.put("/updateBlog/:blogId", async function (req, res) {
  try {
    const collection = await blogsDB().collection("blogs50");
    const blogId = Number(req.params.blogId);
    console.log(blogId);
    const originalBlog = await collection.findOne({ id: blogId });
    // const originalBlog = blogs[blogId];
    console.log(originalBlog);

    if (!originalBlog) {
      res.send("does not exist.").status(204);
    } else {
      let updateBlog = req.body;
      const blogTitle = updateBlog.title
        ? updateBlog.title
        : originalBlog.title;
      const blogText = updateBlog.text ? updateBlog.text : originalBlog.text;
      const blogAuthor = updateBlog.author
        ? updateBlog.author
        : originalBlog.author;
      const blogCategory = updateBlog.category
        ? updateBlog.category
        : originalBlog.category;

      updateBlog = {
        lastModified: new Date(),
        title: blogTitle,
        text: blogText,
        author: blogAuthor,
        category: blogCategory,
      };

      await collection.updateOne({ id: blogId }, { $set: updateBlog });
      res.status(200).send("Successfully Updated Blog Id: " + blogId);
    }
  } catch (error) {
    res.status(500).send("Error updating post." + error);
  }
});

module.exports = router;
