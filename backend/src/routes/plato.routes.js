const express = require('express');
const { getPlatos, addPlato, updatePlato, deletePlato, getPlato } = require('../controllers/platoC');

const router = express.Router();

router.get("/api/platos", getPlatos);
router.get("/api/plato/:id", getPlato);
router.post("/api/plato", addPlato);
router.put("/api/plato/:id", updatePlato);
router.delete("/api/plato/:id", deletePlato);

module.exports = router;
