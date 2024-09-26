module.exports = (sequelize, Sequelize) => {
    const Proyectos = sequelize.define('proyectos', {
      id_proyecto: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      nombre: {
        type: Sequelize.STRING
      },
      descripcion: {
        type: Sequelize.STRING
      },
      fecha_creacion: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    });
    
    return Proyectos;
  };
  