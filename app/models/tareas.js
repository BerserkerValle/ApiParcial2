module.exports = (sequelize, Sequelize) => {
    const Tareas = sequelize.define('tareas', {
      id_tareas: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      nombre: {
        type: Sequelize.STRING
      },
      estado: {
        type: Sequelize.STRING, 
        defaultValue: 'pendiente' 
      },
      fecha_creacion: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW 
      },
      fecha_vencimiento: {
        type: Sequelize.DATE
      }
    });
    
    return Tareas;
  };
  