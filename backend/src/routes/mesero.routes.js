const express = require('express');
const { addMesero, getAllMeseros, updateMesero, deleteMesero, login } = require('../controllers/meseroC');

const router = express.Router();

router.post("/api/mesero", addMesero); // Crear mesero
router.get("/api/meseros", getAllMeseros); // Obtener todos los meseros
router.put("/api/mesero/:id", updateMesero); // Actualizar mesero
router.delete("/api/mesero/:id", deleteMesero); // Eliminar mesero (lógica)
router.post("/api/auth", login); // Logeo

module.exports = router;
