import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

function init() {
    posts = [];
}

// Handler for getting home page.
app.get("/", (req, res) => {
    init();
    res.render("index.ejs");
});

// Handler for getting Add New blog-Post form.
app.get("/addpost", (req, res) => {
    res.render("blogPostForm.ejs", {
        action: "/addpost",
        buttonName: "Post"
    });
});

// Handler for posting the new blog-post (triggered by clicking the Post button on the form).
app.post("/addpost", (req, res) => {
    var postDate = new Date();
    posts.push({
        title: req.body["postTitle"],
        author: req.body["authorName"],
        content: req.body["postContent"],
        date: `${month[postDate.getMonth()]} ${postDate.getFullYear()}`
    });
    res.render("blogPostForm.ejs", {
        action: "/addpost",
        buttonName: "Post"
    });
});

// Handler for viewing the blog-posts.
app.get("/posts", (req, res) => {
    res.render("posts.ejs", {
        postObjects: posts
    });
});

// For edit link click
app.post("/edit", (req, res) => {
    const postIndex = parseInt(req.body["edit"]);
    const post = posts[postIndex];
    res.render("blogPostForm.ejs", {
        action: "/update", // For edit form submit.
        buttonName: "Update",
        buttonTagName: "update",
        buttonTagValue: postIndex.toString(),
        postObject: post
    });
  });
  
  app.post("/update", (req, res) => {
    var postDate = new Date;
    var modifiedPost = {
        title: req.body["postTitle"],
        author: req.body["authorName"],
        content: req.body["postContent"],
        date: `${month[postDate.getMonth()]} ${postDate.getFullYear()}`
    };
    console.log(req.body["update"]);
    const postIndex = parseInt(req.body["update"]);
    posts[postIndex] = modifiedPost;
    res.redirect('/posts');
  });

  app.post("/delete", (req, res) => {
    const index = parseInt(req.body["delete"]);
    posts.splice(index, 1);
    res.redirect("/posts");
  });

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

let posts = [];

const month = ["Jan","Feb","Mar","Apr","May","June","July","Aug","Sept","Oct","Nov","Dec"];