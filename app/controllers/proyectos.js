const db = require('../config/db.config.js');
const Proyectos = db.Proyectos;

exports.create = (req, res) => {
    let proyecto = {};

    try {
        proyecto.nombre = req.body.nombre;
        proyecto.descripcion = req.body.descripcion;

        Proyectos.create(proyecto).then(result => {    
            res.status(200).json({
                message: "Proyecto creado exitosamente con id = " + result.id_proyecto,
                proyecto: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al crear el proyecto",
            error: error.message
        });
    }
};

exports.retrieveAllProyectos = (req, res) => {
    Proyectos.findAll()
        .then(proyectoInfos => {
            res.status(200).json({
                message: "Proyectos obtenidos exitosamente",
                proyectos: proyectoInfos
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "Error al obtener los proyectos",
                error: error
            });
        });
};

exports.updateById = async (req, res) => {
    try {
        let proyectoId = req.params.id;
        let proyecto = await Proyectos.findByPk(proyectoId);

        if (!proyecto) {
            res.status(404).json({
                message: "No se encontró un proyecto con el id = " + proyectoId,
                proyecto: "",
                error: "404"
            });
        } else {    
            let updatedObject = {
                nombre: req.body.nombre,
                descripcion: req.body.descripcion
            };
            let result = await Proyectos.update(updatedObject, { returning: true, where: { id_proyecto: proyectoId } });

            if (!result) {
                res.status(500).json({
                    message: "Error -> No se pudo actualizar el proyecto con id = " + req.params.id,
                    error: "No actualizado",
                });
            }

            res.status(200).json({
                message: "Proyecto actualizado exitosamente con id = " + proyectoId,
                proyecto: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se pudo actualizar el proyecto con id = " + req.params.id,
            error: error.message
        });
    }
};

exports.deleteById = async (req, res) => {
    try {
        let proyectoId = req.params.id;
        let proyecto = await Proyectos.findByPk(proyectoId);

        if (!proyecto) {
            res.status(404).json({
                message: "No existe un proyecto con id = " + proyectoId,
                error: "404",
            });
        } else {
            await proyecto.destroy();
            res.status(200).json({
                message: "Proyecto eliminado exitosamente con id = " + proyectoId,
                proyecto: proyecto,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se pudo eliminar el proyecto con id = " + req.params.id,
            error: error.message,
        });
    }
};
