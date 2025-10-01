"use strict";


const products = [
  { id: 1, name: "Nintendo NES", price: 79990, img: "assets/products/nes.avif" },
  { id: 2, name: "Super Nintendo (SNES)", price: 99990, img: "assets/products/snes.jpg" },
  { id: 3, name: "Nintendo 64", price: 119990, img: "assets/products/n64.avif" },
  { id: 4, name: "Virtual Boy", price: 89990, img: "assets/products/vb.png" },
  { id: 5, name: "Game Boy Color", price: 49990, img: "assets/products/gmbcolor.avif" },
  { id: 6, name: "Game Boy Advance", price: 59990, img: "assets/products/gmbadv.jpg" },
  { id: 7, name: "Nintendo GameCube", price: 89990, img: "assets/products/gmcb.avif" },
  { id: 8, name: "Nintendo Wii", price: 49990, img: "assets/products/wii.png" }
];


function renderProductosHome() {
  const grid = document.getElementById("product-grid");
  if (!grid) return;
  const destacados = products.slice(0, 4);
  grid.innerHTML = destacados.map(p => `
    <article class="card">
      <img src="${p.img}" alt="${p.name}" onclick="verDetalle(${p.id})" style="cursor:pointer;">
      <h3>${p.name}</h3>
      <p class="price">$${p.price.toLocaleString("es-CL")}</p>
    </article>
  `).join("");
}


function renderProductosTienda() {
  const contenedor = document.getElementById("lista-productos");
  if (!contenedor) return;
  contenedor.innerHTML = products.map(p => `
    <article class="card">
      <img src="${p.img}" alt="${p.name}" onclick="verDetalle(${p.id})" style="cursor:pointer; width:200px;">
      <h3 onclick="verDetalle(${p.id})" style="cursor:pointer;">${p.name}</h3>
      <p class="price">$${p.price.toLocaleString("es-CL")}</p>
      <div class="actions">
        <button class="btn" onclick="verDetalle(${p.id})">Detalle</button>
        <button class="btn" onclick="addToCart(${p.id})">Añadir al carrito</button>
      </div>
    </article>
  `).join("");
}


function mostrarDetalle() {
  const container = document.getElementById("detalle-producto");
  if (!container) return;
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get("id"));
  const producto = products.find(p => p.id === id);
  if (!producto) {
    container.innerHTML = "<p>Producto no encontrado.</p>";
    return;
  }
  container.innerHTML = `
    <div class="detalle-card">
      <div class="detalle-img"><img src="${producto.img}" alt="${producto.name}"></div>
      <div class="detalle-info">
        <h2>${producto.name}</h2>
        <p class="price"><strong>Precio:</strong> $${producto.price.toLocaleString("es-CL")}</p>
        <p>${producto.desc || "Descripción no disponible."}</p>
        <button class="btn" onclick="addToCart(${producto.id})">Añadir al carrito</button>
        <button class="btn" onclick="window.location.href='productos.html'">Volver</button>
      </div>
    </div>
  `;
}


function addToCart(id) {
  try {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const producto = products.find(p => p.id === id);
    if (!producto) { alert("Producto no encontrado"); return; }
    carrito.push(producto);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    updateCartCount();
    alert(`${producto.name} agregado al carrito 🛒`);
  } catch (e) {
    console.error("Error addToCart:", e);
    alert("Error al añadir al carrito (ver consola).");
  }
}

function mostrarCarrito() {
  const lista = document.getElementById("carrito-lista");
  const total = document.getElementById("total");
  if (!lista || !total) return;
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  if (carrito.length === 0) {
    lista.innerHTML = "<p>El carrito está vacío 🛒</p>";
    total.textContent = "";
    return;
  }
  lista.innerHTML = carrito.map((p, i) => `
    <div class="carrito-item">
      <img src="${p.img}" alt="${p.name}" width="50">
      <span>${p.name} - $${p.price.toLocaleString("es-CL")}</span>
      <button class="small-btn" onclick="removeFromCart(${i})">Eliminar</button>
    </div>
  `).join("");
  const suma = carrito.reduce((acc, p) => acc + p.price, 0);
  total.textContent = `Total: $${suma.toLocaleString("es-CL")}`;
}

function removeFromCart(index) {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  carrito.splice(index, 1);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  mostrarCarrito();
  updateCartCount();
}

function finalizarCompra() {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  if (carrito.length === 0) { alert("El carrito está vacío"); return; }
  alert("Compra finalizada ✅ ¡Gracias por tu compra!");
  localStorage.removeItem("carrito");
  updateCartCount();
  window.location.href = "index.html";
}


function updateCartCount() {
  const countEl = document.getElementById("cart-count");
  if (!countEl) return;
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  countEl.textContent = carrito.length;
}


function verDetalle(id) {
  window.location.href = `detalle.html?id=${id}`;
}

function registrarUsuario() {
  const form = document.getElementById("register-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden ");
      return;
    }

    const nuevoUsuario = {
      run: document.getElementById("run").value,
      nombres: document.getElementById("nombres").value,
      apellidos: document.getElementById("apellidos").value,
      email: document.getElementById("email").value,
      direccion: document.getElementById("direccion").value,
      tipo: document.getElementById("tipo").value,
      region: document.getElementById("region").value,
      comuna: document.getElementById("comuna").value,
      password: password  // ✅ ahora sí guarda la contraseña elegida
    };

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    usuarios.push(nuevoUsuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert("Usuario registrado correctamente ✅");
    window.location.href = "login.html";
  });
}

function loginUsuario() {
  const form = document.getElementById("login-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    let user = usuarios.find(u => u.email === email && u.password === password);

    if (user) {
      localStorage.setItem("usuarioActivo", JSON.stringify(user));
      alert(`Bienvenido ${user.nombres} `);

      if (user.tipo === "Administrador") {
        window.location.href = "admin.html"; 
      } else {
        window.location.href = "productos.html";
      }

    } else {
      alert("Credenciales incorrectas ");
    }
  });
}




document.addEventListener("DOMContentLoaded", () => {
  console.log("main.js cargado");
  try {
    renderProductosHome();
    renderProductosTienda();
    mostrarDetalle();
    mostrarCarrito();
    registrarUsuario();
    loginUsuario();
    updateCartCount();


    const cartBtn = document.getElementById("cart-btn");
    if (cartBtn) {

      cartBtn.addEventListener("click", (e) => {
        window.location.href = "carrito.html";
      });
      console.log("Listener cart-btn agregado");
    } else {
      console.warn("No se encontró #cart-btn en el DOM");
    }
  } catch (err) {
    console.error("Error en init:", err);
  }
});


window.addEventListener("error", (e) => {
  console.error("Error global:", e.error || e.message);
});
