# 🍔 El Bajón del Vicho

Proyecto académico desarrollado para la asignatura **DSY1104 - Desarrollo Fullstack II**, correspondiente a la **Evaluación Parcial N.º 2**.

"El Bajón del Vicho" es una hamburguesería de estilo urbano diseñada para los verdaderos amantes del bajón y las porciones monumentales. Nuestra plataforma web permite a los clientes explorar un menú contundente, gestionar pedidos ágilmente para delivery o retiro en tienda, también permite reservar mesas en nuestras sucursales. El enfoque del sistema es ofrecer una experiencia de usuario rápida, interactiva y sin rodeos para satisfacer cualquier ataque de hambre.

## 👥 Equipo

- **José Donoso Rivas**
- **Darío Tapia**
- **Profesor:** Javier Esteban Peña Reyes
- **Asignatura:** Desarrollo Fullstack II - DSY1104
- **Entrega EP2:** 18 de octubre de 2026

## 🚀 Tecnologías utilizadas

- React 19
- React DOM
- Vite 8
- Bootstrap 5
- JavaScript ES6+
- HTML5 y CSS3
- localStorage / sessionStorage
- Jasmine
- Karma
- Chrome Headless
- esbuild
- Istanbul / karma-coverage
- Git y GitHub

## ✅ Funcionalidades principales

- Catálogo de productos organizado por categorías.
- Productos reutilizables mediante componentes React.
- Carrito de compras con suma, resta y eliminación de productos.
- Apertura automática del carrito al agregar un producto.
- Cálculo dinámico de subtotal y total.
- Persistencia del carrito mediante `localStorage`.
- Registro simulado de usuarios.
- Validación de contraseña y prevención de correos duplicados.
- Inicio de sesión simulado e ingreso como invitado.
- Selección entre despacho a domicilio y retiro en sucursal.
- Registro y reutilización de dirección de despacho.
- Selección de sucursal para retiro.
- Confirmación final de pedido con número de orden simulado.
- Formulario de reservas con validaciones.
- Persistencia local de reservas.
- Visualización de sucursales y horarios.
- Formulario de contacto mediante cliente de correo (`mailto:`).
- Acceso directo a WhatsApp.
- Panel administrativo simulado para edición de productos, precios y stock.
- Gestión de reservas desde el panel administrativo.
- Diseño responsivo para escritorio, tablet y móvil mediante Bootstrap.

## 🧩 Arquitectura principal

```text
src/
├── components/
│   ├── AddressModal.jsx
│   ├── AdminSection.jsx
│   ├── BranchesSection.jsx
│   ├── Cart.jsx
│   ├── ContactSection.jsx
│   ├── DeliveryOptionsModal.jsx
│   ├── Header.jsx
│   ├── Hero.jsx
│   ├── LoginModal.jsx
│   ├── Menu.jsx
│   ├── OrderSuccessModal.jsx
│   ├── PickupBranchModal.jsx
│   ├── ProductCard.jsx
│   ├── RegisterModal.jsx
│   └── ReservationSection.jsx
├── data/
│   └── products.js
├── App.jsx
├── index.css
└── main.jsx

test/
├── basic.spec.js
├── Cart.spec.js
├── CoverageApp.spec.js
├── FinalComponents.spec.js
├── LoginAddress.spec.js
├── Menu.spec.js
├── OrderModals.spec.js
├── ProductCard.spec.js
├── RegisterModal.spec.js
└── ReservationSection.spec.js
```

## ⚙️ Requisitos para ejecutar el proyecto

Antes de comenzar debes tener instalado:

- **Node.js**
- **npm**
- Un navegador moderno, preferentemente Google Chrome

Entorno utilizado durante el desarrollo y validación:

```text
Node.js: v24.20.0
npm: 11.19.0
```

Puedes verificar tu instalación con:

```powershell
node -v
npm -v
```

## 📥 Instalación y ejecución

### 1. Clonar el repositorio

```powershell
git clone https://github.com/JoseDonosoRivas/el-bajon-del-vicho-react.git
```

### 2. Entrar a la carpeta

```powershell
cd el-bajon-del-vicho-react
```

### 3. Instalar dependencias

```powershell
npm install
```

### 4. Ejecutar en modo desarrollo

```powershell
npm run dev
```

Vite mostrará una dirección local similar a:

```text
http://localhost:5173/
```

Abre esa dirección en el navegador.

## 🧪 Pruebas unitarias

El proyecto utiliza **Jasmine + Karma** y ejecuta las pruebas en **Chrome Headless**.

Ejecutar todas las pruebas:

```powershell
npm test
```

Ejecutar pruebas con generación de cobertura:

```powershell
npm run test:coverage
```

Última ejecución verificada:

```text
TOTAL: 44 SUCCESS
```

Distribución:

- **42 pruebas funcionales**
- **2 pruebas técnicas auxiliares**
- **44/44 exitosas**

Cobertura global de la última ejecución:

| Métrica | Cobertura |
|---|---:|
| Statements | 50,76% (199/392) |
| Branches | 51,95% (93/179) |
| Functions | 48,85% (64/131) |
| Lines | 50,63% (198/391) |

## 🏗️ Build de producción

Para comprobar que el proyecto puede compilarse correctamente:

```powershell
npm run build
```

La compilación final fue validada correctamente con Vite.

Para previsualizar el build generado:

```powershell
npm run preview
```

## 🔍 Análisis estático

Ejecutar:

```powershell
npm run lint
```

Resultado final verificado:

```text
0 errores
2 warnings no bloqueantes
```

Los warnings corresponden al uso de `setState` dentro de `useEffect` en `AddressModal.jsx` y `AdminSection.jsx`. No impiden la compilación, las pruebas ni el funcionamiento del prototipo.

## 🔐 Acceso administrativo

El acceso administrativo se encuentra oculto de la navegación pública para mantener una interfaz más limpia.

Con el proyecto ejecutándose localmente, se puede acceder mediante:

```text
http://localhost:5173/#admin
```

Credenciales académicas del prototipo:

```text
Correo: vicente@admin.cl
Contraseña: admin123
```

> El acceso administrativo es simulado y existe únicamente para fines académicos. No representa un mecanismo seguro de autenticación de producción.

## 💾 Persistencia local

La aplicación utiliza almacenamiento del navegador para simular persistencia:

| Clave | Uso |
|---|---|
| `carritoBajon` | Productos del carrito |
| `userEmail` | Sesión del usuario |
| `userAddress` | Dirección de despacho |
| `bajon_db_usuarios` | Usuarios registrados de forma simulada |
| `bajon_db_productos` | Cambios administrativos en productos |
| `bajon_db_reservas` | Reservas creadas |
| `adminAuth` | Sesión administrativa (`sessionStorage`) |

La contraseña del registro de usuarios **no se almacena** en `localStorage`.

## ⚠️ Alcance y limitaciones

Este proyecto corresponde a un **prototipo académico frontend**.

No incluye:

- Backend real.
- Base de datos de servidor.
- Autenticación segura de producción.
- Hash de contraseñas.
- Pasarela de pago real.
- API de pedidos.
- Servicio backend para envío de correos.

Las funcionalidades de sesión, registro, pedidos y administración se implementan de forma simulada para demostrar los requisitos de la EP2.

## 📚 Conceptos aplicados

Durante el desarrollo se utilizaron, entre otros:

- Componentes reutilizables en React.
- Comunicación mediante `props`.
- Manejo de estado mediante `useState`.
- Sincronización y persistencia mediante `useEffect`.
- Estado compartido centralizado en `App.jsx`.
- Renderizado condicional.
- Formularios controlados.
- Callbacks entre componentes.
- Filtrado y renderizado de listas.
- Diseño responsivo con Bootstrap.
- Pruebas de renderizado, props, state y eventos.
- Spies y mocks con Jasmine.
- Cobertura de código mediante Istanbul y Karma Coverage.

## 📌 Repositorio

Repositorio público del proyecto:

https://github.com/JoseDonosoRivas/el-bajon-del-vicho-react

---

**El Bajón del Vicho - DSY1104 Desarrollo Fullstack II - Evaluación Parcial N.º 2**
