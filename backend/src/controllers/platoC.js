const Plato = require('../models/plato');

const getPlatos = async (req, res) => {
    try {
        const platos = await Plato.find(); // Obtiene todos los platos
        res.status(200).json({ message: "Platos encontrados", data: platos });
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los platos", error: error.message });
    }
};

const getPlato = async (req, res) => {
    try {
        const { id } = req.params;
        const plato = await Plato.findById(id);

        if (!plato) {
            return res.status(404).json({ message: "Plato no encontrado" });
        }

        res.status(200).json({ message: "Plato encontrado", data: plato });
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el plato", error: error.message });
    }
};

const addPlato = async (req, res) => {
    try {
        const { nombre, ingredientes, precio, imagen } = req.body;
        const nuevoPlato = await Plato.create({ nombre, ingredientes, precio, imagen });
        res.status(201).send(nuevoPlato);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const updatePlato = async (req, res) => {
    try {
      const { id } = req.params;
      const { nombre, ingredientes, precio } = req.body;
      
      let imagen = req.body.imagen; 
      
      if (req.file) {
        imagen = req.file.path;
      }
  
      const platoActualizado = await Plato.findByIdAndUpdate(
        id,
        { nombre, ingredientes, precio, imagen: imagen || undefined },
        { new: true, runValidators: true }
      );
  
      if (!platoActualizado) {
        return res.status(404).send("Plato no encontrado");
      }
  
      res.status(200).json(platoActualizado);
    } catch (error) {
      res.status(500).send(error.message);
    }
  };
  

const deletePlato = async (req, res) => {
    try {
        const { id } = req.params;
        await Plato.deleteOne({ _id: id });
        res.send("Plato eliminado correctamente.");
    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports = { getPlatos, addPlato, updatePlato, deletePlato, getPlato };
