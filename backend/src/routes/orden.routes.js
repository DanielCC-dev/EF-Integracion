const express = require('express');
const { getOrden, addOrden, updateOrden, deleteOrden } = require('../controllers/ordenC');

const router = express.Router();

router.get("/api/orden/:id", getOrden);
router.post("/api/orden", addOrden);
router.put("/api/orden/:id", updateOrden);
router.delete("/api/orden/:id", deleteOrden);

module.exports = router;
