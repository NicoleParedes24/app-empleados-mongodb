const Empleado = require('../models/Empleado');

const empleadoCtrl = {};

// =======================
// GET todos (OPTIMIZADO)
// =======================
empleadoCtrl.getEmpleados = async (req, res) => {
  try {
    const empleados = await Empleado
      .find()
      .lean(); // 🚀 MUY IMPORTANTE

    res.json(empleados);
  } catch (error) {
    console.error('Error al obtener empleados:', error);
    res.status(500).json({ error: 'Error al obtener empleados' });
  }
};

// =======================
// POST crear (DEVUELVE EL OBJETO)
// =======================
empleadoCtrl.createEmpleado = async (req, res) => {
  try {
    const nuevoEmpleado = new Empleado(req.body);
    const empleadoGuardado = await nuevoEmpleado.save();

    // 🔥 devolvemos el empleado creado
    res.json(empleadoGuardado);
  } catch (error) {
    console.error('Error al crear empleado:', error);
    res.status(500).json({ error: 'Error al crear empleado' });
  }
};

// =======================
// GET uno por ID
// =======================
empleadoCtrl.getEmpleado = async (req, res) => {
  try {
    const empleado = await Empleado.findById(req.params.id).lean();
    res.json(empleado);
  } catch (error) {
    res.status(404).json({ error: 'Empleado no encontrado' });
  }
};

// =======================
// PUT actualizar
// =======================
empleadoCtrl.editEmpleado = async (req, res) => {
  try {
    const { id } = req.params;

    const empleadoActualizado = await Empleado.findByIdAndUpdate(
      id,
      req.body,
      { new: true, lean: true }
    );

    res.json(empleadoActualizado);
  } catch (error) {
    console.error('Error al actualizar empleado:', error);
    res.status(500).json({ error: 'Error al actualizar empleado' });
  }
};

// =======================
// DELETE eliminar
// =======================
empleadoCtrl.deleteEmpleado = async (req, res) => {
  try {
    await Empleado.findByIdAndDelete(req.params.id);
    res.json({ mensaje: 'Empleado eliminado' });
  } catch (error) {
    console.error('Error al eliminar empleado:', error);
    res.status(500).json({ error: 'Error al eliminar empleado' });
  }
};

module.exports = empleadoCtrl;
