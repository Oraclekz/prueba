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

function renderProductosTienda() {
  const grid = document.getElementById("lista-productos");
  if (!grid) return;

  grid.innerHTML = products.map(p => `
    <article class="card">
      <img src="${p.img}" alt="${p.name}" style="cursor:pointer;" onclick="verDetalle(${p.id})">
      <h3>${p.name}</h3>
      <p class="price">$${p.price.toLocaleString("es-CL")}</p>
      <button class="btn" onclick="verDetalle(${p.id})">Detalle</button>
      <button class="btn" onclick="addToCart(${p.id})">Añadir al carrito</button>
    </article>
  `).join("");
}


function openModal(id) {
  const product = products.find(p => p.id === id);
  document.getElementById("modal-body").innerHTML = `
    <img src="${product.img}" alt="${product.name}" style="width:200px">
    <h2>${product.name}</h2>
    <p><strong>Precio:</strong> $${product.price.toLocaleString("es-CL")}</p>
    <p>${product.desc}</p>
    <button class="btn">Añadir al carrito</button>
  `;
  document.getElementById("modal").style.display = "flex";
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}

document.addEventListener("DOMContentLoaded", renderProducts);
