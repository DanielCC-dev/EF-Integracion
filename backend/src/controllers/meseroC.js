const Mesero = require('../models/mesero');
const jwt = require('jsonwebtoken');
const config = require('../global/global');
const bcrypt = require('bcryptjs');

// Crear nuevo mesero
const addMesero = async (req, res) => {
  try {
    const { nombre, correo, telefono, contraseña } = req.body;

    const hashedPassword = await bcrypt.hash(contraseña, 12);

    const nuevoMesero = await Mesero.create({
      nombre,
      correo,
      telefono,
      contraseña: hashedPassword,
      activo: true, // Los meseros se crean activos por defecto
    });

    res.status(201).send(nuevoMesero);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Obtener todos los meseros
const getAllMeseros = async (req, res) => {
  try {
    const meseros = await Mesero.find({ activo: true });
    res.status(200).json({ message: "meseros encontrados", data: meseros });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getMesero = async (req, res) => {
  try {
    const { id } = req.params;
    const meseros = await Mesero.findById(id);
    res.status(200).json({ message: "mesero encontrado", data: meseros });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const updateMesero = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, correo, telefono, contraseña } = req.body;

    let updateData = { nombre, correo, telefono };

    if (contraseña) {
      updateData.contraseña = await bcrypt.hash(contraseña, 12);
    }

    const meseroActualizado = await Mesero.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    res.status(200).send(meseroActualizado);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Eliminar mesero (lógica)
const deleteMesero = async (req, res) => {
  try {
    const { id } = req.params;

    const meseroEliminado = await Mesero.findByIdAndUpdate(id, { activo: false });
    res.status(200).send(`Mesero eliminado correctamente: ${meseroEliminado.nombre}`);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const login = async (req, res) => {
  try {
    const { correo, contraseña } = req.body;

    const user = await Mesero.findOne({ correo });
    if (!user) return res.status(400).json({ message: 'Credenciales inválidas' });

    const validPassword = await user.validPassword(contraseña);

    console.log('Contraseña ingresada:', contraseña);
    console.log('Contraseña almacenada:', user.contraseña);

    if (!validPassword) {
      return res.status(401).json({ auth: false, token: null });
    }


    const token = jwt.sign({ id: user._id }, config.secret, {
      expiresIn: 60 * 60 * 24
    })

    res.json({ auth: true, token });
  } catch (error) {
    res.status(500).send(error.message);
  }
}

const agregarMeseroPrueba = async () => {
  try {
    // Comprobar si ya existe el mesero con ese correo
    const meseroExistente = await Mesero.findOne({ correo: 'example@gmail.com' });

    if (!meseroExistente) {
      // Si no existe, crea un nuevo mesero con los datos de prueba
      const contraseñaHasheada = await bcrypt.hash('passwordExample123', 10); // Hash de la contraseña

      const nuevoMesero = new Mesero({
        nombre: 'userExample',
        correo: 'example@gmail.com',
        telefono: '987654321',
        contraseña: contraseñaHasheada,
        activo: true
      });

      await nuevoMesero.save();
      console.log('Mesero de prueba agregado con éxito');
    } else {
      console.log('El mesero ya existe en la base de datos');
    }
  } catch (error) {
    console.error('Error al agregar mesero:', error);
  }
};

module.exports = {
  addMesero,
  getAllMeseros,
  updateMesero,
  deleteMesero,
  getMesero,
  login,
  agregarMeseroPrueba
};
