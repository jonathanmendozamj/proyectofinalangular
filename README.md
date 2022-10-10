# Gestión de cursos e inscripciones
> Este es un proyecto realizado para el curso de Angular de CODERHOUSE, comisión 32310. Se trata de un sistema de gestión de cursos, inscripciones a los mismos, estudiantes y usuarios.

## Instalación mediante git clone
Si querés clonar este proyecto de forma local, tendrás que ejecutar los siguientes comandos en la terminal de forma secuencial: 
```sh
git clone https://github.com/jonathanmendozamj/proyectofinalangular
npm install 
npm start
```

## Dependencias
Se instalaron las siguientes dependencias en este proyecto.
- bootstrap (v. 5.2.0): contiene estilos responsivos.
- rxjs (v. 7.5.0)
- ngrx/store (v. 14.3.1)
- ngrx/store-devtools (v. 14.3.1)
- angular material (v. 14.1.1)

## Funcionamiento
Primero, entramos a la dirección indicada, donde se mostrará un formulario de login. En el mismo, cargamos nuestro nombre de usuario y contraseña. Luego, hacemos clic en el botón de "Iniciar Sesión". Si los datos son correctos, nos redirigirá hacia la pantalla principal. 
Hay dos roles a considerar como tipos de usuarios: Admin y User.
En ella se muestra un Navbar y Toolbar al costado izquierdo de la pantalla, donde se mostrarán todas las opciones.
Hay varias opciones, en las cuales se mencionan "Inicio", "Estudiantes", "Inscripciones", "Cursos", "Usuarios" y "Cerrar Sesión".
El tipo de usuario "User" puede ver los datos de los estudiantes, inscripciones y cursos, pero no puede acceder a la sección "Usuarios".
El tipo de usuario "Admin" puede realizar alta, baja y modificaciones de los estudiantes, inscripciones, cursos y usuarios. También puede desinscribir a un estudiante de un curso desde la sección del detalle del curso, y desinscribir a un curso desde la sección del detalle de estudiante.
