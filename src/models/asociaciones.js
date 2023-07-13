import Usuarios from "./Usuario.models.js";
import Noticias from "./Noticias.models.js";
import Comentarios from "./Comentarios.models.js";
import Reacciones from "./Reacciones.models.js";

//relacion uno a uno de Usuario a Noticias
Usuarios.hasMany(Noticias, {
    foreignKey: 'usuarioId'
});
Noticias.belongsTo(Usuarios);

//relacion uno a uno de Usuario a Reacciones
Usuarios.hasMany(Reacciones, {
    foreignKey: 'usuarioId'
});
Reacciones.belongsTo(Usuarios)

//relacion uno a uno de Usuario a Comentarios
Usuarios.hasMany(Comentarios, {
    foreignKey: 'usuarioId'
});
Comentarios.belongsTo(Usuarios);

//relacion uno a muchos de Noticias a Comentarios
Noticias.hasMany(Comentarios,{
    foreignKey: 'noticiaId'
});
Comentarios.belongsTo(Noticias);

//relacion uno a muchos de Noticias a Reacciones
Noticias.hasMany(Reacciones,{
    foreignKey: 'noticiaId'
});
Reacciones.belongsTo(Noticias);


