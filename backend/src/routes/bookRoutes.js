
const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "..", "uploads"); // backend/src/uploads/
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

const {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} = require("../controllers/bookController");

router.get("/", getBooks);
router.get("/:id", getBookById);
router.post(
  "/",
  upload.fields([
    { name: "capa", maxCount: 1 },
    { name: "pdf", maxCount: 1 },
  ]),
  createBook
);
router.put(
  "/:id",
  upload.fields([
    { name: "capa", maxCount: 1 },
    { name: "pdf", maxCount: 1 },
  ]),
  updateBook
);
router.delete("/:id", deleteBook);

module.exports = router;

const express = require("express")

const router = express.Router()

const {
  addBook,
  getBooks
} = require("../controllers/bookController")

router.post("/", addBook)

router.get("/", getBooks)

module.exports = router
