import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

function init() {
    posts = [];
}

app.get("/", (req, res) => {
    init();
    res.render("index.ejs");
});

app.get("/addpost", (req, res) => {
    res.render("blogPostForm.ejs", {
        action: "/addpost",
        buttonName: "Post"
    });
});

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

app.get("/posts", (req, res) => {
    res.render("posts.ejs", {
        postObjects: posts
    });
});

// For edit link click
app.get("/edit/:postIndex", (req, res) => {
    const postIndex = parseInt(req.params.postIndex);
    const post = posts[postIndex];
    res.render("blogPostForm.ejs", {
        action: `/edit/${postIndex}`, // For edit form submit.
        buttonName: "Update",
        postObject: post
    });
  });
  
  app.post("/edit/:postIndex", (req, res) => {
    var postDate = new Date;
    var modifiedPost = {
        title: req.body["postTitle"],
        author: req.body["authorName"],
        content: req.body["postContent"],
        date: `${month[postDate.getMonth()]} ${postDate.getFullYear()}`
    };
    const postIndex = parseInt(req.params.postIndex);
    posts[postIndex] = modifiedPost;
    res.redirect('/posts');
  });

  app.get("/delete/:postIndex", (req, res) => {
    const index = req.params.postIndex;
    posts.splice(index, 1);
    res.redirect("/posts");
  });

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

let posts = [];

const month = ["Jan","Feb","Mar","Apr","May","June","July","Aug","Sept","Oct","Nov","Dec"];