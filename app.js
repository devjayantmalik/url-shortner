const express = require("express");

// create an app
const app = express();

// configure the middlewares
app.use(express.json());
app.use(express.static("public"));

const db = [];

function create_url(url, slug) {
  const item = {
    base_url: url,
    slug: slug,
  };

  // check if slug already exists
  const isExists = db.find((item) => item.slug === slug);
  if (isExists) throw new Error("Slug already exists.");

  // insert item in database
  db.push(item);
  return item;
}

// configure the routes
app.get("/shorten", (req, res) => {
  const { url, slug } = req.query;

  // validate the inputs
  if (!url || !slug) throw new Error("Please provide url and slug.");

  // shorten the slug
  const item = create_url(url, slug);
  return res.json(item);
});

app.get("/resolve/:slug", (req, res) => {
  // check if slug exists
  const item = db.find((item) => item.slug === req.params.slug);
  if (!item) throw new Error("Provided slug does not exists!");

  return res.json(item);
});

app.use((error, req, res, next) => {
  return res.status(400).json({ message: error.message });
});

// start the app
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server started at: http://localhost:${port}`);
});
