const express = require("express");
const exphbs = require("express-handlebars");

// create an app
const app = express();

// configure the middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

// configure handlebars
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

const db = [];

// configure page routes
app.get("/", (req, res) => {
  return res.render("shorten");
});

// configure the routes
app.post("/", (req, res) => {
  const { url, slug } = req.body;

  // validate the inputs
  if (!url || !slug)
    return res.render("shorten", { error: "Please provide url and slug." });

  if (slug.length > 20)
    return res.render("shorten", {
      error: "Slug should be less than 20 characters.",
    });

  if (url.length > 2000)
    return res.render("shorten", {
      error: "URL should be less than 2000 characters.",
    });

  // create item object to hold base_url and slug
  const item = {
    base_url: url,
    slug: slug,
  };

  // check if slug already exists
  const isExists = db.find((item) => item.slug === slug);
  if (isExists) return res.render("shorten", { error: "Slug already exists." });

  // insert item in database
  db.push(item);

  // shorten the slug
  return res.render("shorten", { result: item });
});

app.get("/:slug", (req, res) => {
  // check if slug exists
  const item = db.find((item) => item.slug === req.params.slug);
  if (!item)
    return res.render("resolve", { error: "Provided slug does not exist!" });

  return res.render("resolve", { result: item });
});

app.use((error, req, res, next) => {
  return res.render("error", { error: error.message });
});

// start the app
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server started at: http://localhost:${port}`);
});
