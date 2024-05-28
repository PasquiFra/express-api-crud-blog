const express = require("express");
const router = express.Router();
const blogController = require("../controller/blog.js");

// Questo è il router di /posts

router.get("/", blogController.index);
router.get("/:slug", blogController.show);

module.exports = router;