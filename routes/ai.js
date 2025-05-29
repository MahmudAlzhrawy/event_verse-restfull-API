// routes/ai.js
const express = require("express");
const router = express.Router();

const suggestTasks = require("../controllers/Ai-Controller"); // ✅ تأكد من المسار

router.post("/suggest-tasks", suggestTasks); // ✅ لازم يكون suggestTasks دالة

module.exports = router;
