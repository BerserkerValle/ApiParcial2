const db = require('../config/db.config.js');
const Tareas = db.Tareas;

exports.create = (req, res) => {
    let tarea = {};

    try {
        tarea.nombre = req.body.nombre;
        tarea.estado = req.body.estado;
        tarea.fecha_vencimiento = req.body.fecha_vencimiento;

        Tareas.create(tarea).then(result => {    
            res.status(200).json({
                message: "Tarea creada exitosamente con id = " + result.id_tareas,
                tarea: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al crear la tarea",
            error: error.message
        });
    }
};

exports.retrieveAllTareas = (req, res) => {
    Tareas.findAll()
        .then(tareaInfos => {
            res.status(200).json({
                message: "Tareas obtenidas exitosamente",
                tareas: tareaInfos
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "Error al obtener las tareas",
                error: error
            });
        });
};

exports.updateById = async (req, res) => {
    try {
        let tareaId = req.params.id;
        let tarea = await Tareas.findByPk(tareaId);

        if (!tarea) {
            res.status(404).json({
                message: "No se encontró una tarea con el id = " + tareaId,
                tarea: "",
                error: "404"
            });
        } else {    
            let updatedObject = {
                nombre: req.body.nombre,
                estado: req.body.estado,
                fecha_vencimiento: req.body.fecha_vencimiento
            };
            let result = await Tareas.update(updatedObject, { returning: true, where: { id_tareas: tareaId } });

            if (!result) {
                res.status(500).json({
                    message: "Error -> No se pudo actualizar la tarea con id = " + req.params.id,
                    error: "No actualizado",
                });
            }

            res.status(200).json({
                message: "Tarea actualizada exitosamente con id = " + tareaId,
                tarea: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se pudo actualizar la tarea con id = " + req.params.id,
            error: error.message
        });
    }
};

exports.deleteById = async (req, res) => {
    try {
        let tareaId = req.params.id;
        let tarea = await Tareas.findByPk(tareaId);

        if (!tarea) {
            res.status(404).json({
                message: "No existe una tarea con id = " + tareaId,
                error: "404",
            });
        } else {
            await tarea.destroy();
            res.status(200).json({
                message: "Tarea eliminada exitosamente con id = " + tareaId,
                tarea: tarea,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se pudo eliminar la tarea con id = " + req.params.id,
            error: error.message,
        });
    }
};
