# Control-Gastos

Sistema web para la gestión y control de gastos personales, desarrollado como proyecto académico aplicando el **Ciclo de Vida del Desarrollo de Software (SDLC)**.

El sistema permite administrar usuarios, categorías, ingresos y gastos mediante una arquitectura separada en **frontend, backend y base de datos**.

---

## Tecnologías utilizadas

### Frontend

* Angular
* TypeScript
* HTML
* SCSS
* Angular Router

### Backend

* Node.js
* TypeScript
* Express
* JWT
* API REST

### Base de datos

* PostgreSQL

### Gestión del proyecto

* Git
* GitHub
* pnpm
* Trello

---

## Estructura del proyecto

```text
Control-Gastos-2025403/

├── backend/
│   ├── src/
│   │   ├── config/
│   │   └── modules/
│   │       ├── auth/
│   │       ├── category/
│   │       ├── expense/
│   │       └── income/
│   ├── .env.example
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/
│   ├── src/
│   │   └── app/
│   │       ├── core/
│   │       ├── features/
│   │       │   ├── auth/
│   │       │   ├── categories/
│   │       │   ├── dashboard/
│   │       │   ├── expenses/
│   │       │   ├── income/
│   │       │   ├── movements/
│   │       │   └── reports/
│   │       └── layout/
│   ├── package.json
│   └── angular.json
│
├── database/
│   ├── init.sql
│   └── migrations/
│
├── .gitignore
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
└── README.md
```

---

## Funcionalidades

Actualmente el sistema cuenta con:

* Registro de usuarios.
* Inicio de sesión.
* Autenticación mediante JWT.
* Protección de rutas mediante `authGuard`.
* Gestión de categorías.
* Registro, edición y eliminación de ingresos.
* Registro, edición y eliminación de gastos.
* Control del fondo disponible.
* Validación para evitar gastos mayores al dinero disponible.
* Consulta de movimientos.
* Dashboard financiero.
* Reportes.
* Información del usuario en el perfil.
* Conexión entre Angular, Node.js y PostgreSQL.

### Control del fondo

Los ingresos funcionan como el dinero disponible del usuario.

```text
Ingresos
   ↓
Fondo disponible
   ↓
Gastos
   ↓
Fondo restante
```

Si el usuario intenta registrar un gasto mayor al fondo disponible, el sistema evita la operación y muestra un mensaje indicando que no hay fondos suficientes.

---

## Autenticación

El sistema utiliza **JWT** para manejar la autenticación.

Las rutas internas están protegidas mediante un guard de Angular.

```text
Usuario
   ↓
Registro / Login
   ↓
Backend
   ↓
PostgreSQL
   ↓
JWT
   ↓
Dashboard
```

Cuando el usuario no está autenticado, las rutas protegidas redirigen al Login.

---

## Base de datos

La aplicación utiliza PostgreSQL.

Base de datos:

```text
control_gastos
```

Principales tablas:

```text
users
categories
expenses
incomes
```

Los gastos e ingresos están relacionados con el usuario que los registra, permitiendo que cada usuario maneje su propia información.

---

## Configuración del Backend

Crear:

```text
backend/.env
```

Tomando como referencia:

```text
backend/.env.example
```

Ejemplo:

```env
PORT=3000

DB_HOST=localhost
DB_PORT=5432
DB_NAME=control_gastos
DB_USER=postgres
DB_PASSWORD=tu_contraseña

JWT_SECRET=tu_clave_secreta
```

El archivo `.env` no debe subirse al repositorio.

---

## Instalación

Clonar el repositorio:

```bash
git clone https://github.com/efolgar-2025403/Control-Gastos-2025403.git
```

Ingresar al proyecto:

```bash
cd Control-Gastos-2025403
```

Instalar dependencias:

```bash
pnpm install
```

---

## Ejecución

### Backend

```bash
cd backend
pnpm run dev
```

Servidor:

```text
http://localhost:3000
```

### Frontend

En otra terminal:

```bash
cd frontend
pnpm start
```

Aplicación:

```text
http://localhost:4200
```