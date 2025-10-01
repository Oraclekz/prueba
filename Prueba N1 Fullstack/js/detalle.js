const products = [
  { 
    id: 1, 
    name: "Nintendo NES", 
    price: 79990, 
    img: "assets/products/nes.avif", 
    desc: "La Nintendo Entertainment System (NES) marcó un antes y un después en la historia de los videojuegos. Lanzada en los años 80, esta consola de 8 bits trajo clásicos inolvidables como Super Mario Bros, The Legend of Zelda y Metroid, convirtiéndose en la pionera que salvó y revolucionó la industria del gaming."
  },
  { 
    id: 2, 
    name: "Super Nintendo (SNES)", 
    price: 99990, 
    img: "assets/products/snes.jpg", 
    desc: "La Super Nintendo Entertainment System (SNES) fue la sucesora de la NES y una de las consolas más queridas de todos los tiempos. Con gráficos de 16 bits, una gran librería de juegos legendarios como Super Mario World, Donkey Kong Country y The Legend of Zelda: A Link to the Past, la SNES definió la época dorada de los videojuegos."
  },
  { 
    id: 3, 
    name: "Nintendo 64", 
    price: 119990, 
    img: "assets/products/n64.avif", 
    desc: "La Nintendo 64 fue la primera consola de Nintendo en dar el salto a los gráficos 3D. Con títulos revolucionarios como Super Mario 64, The Legend of Zelda: Ocarina of Time y GoldenEye 007, esta consola de 64 bits abrió nuevas posibilidades en jugabilidad y diseño de mundos abiertos."
  },
  { 
    id: 4, 
    name: "Virtual Boy", 
    price: 89990, 
    img: "assets/products/vb.png", 
    desc: "El Virtual Boy fue una de las consolas más experimentales de Nintendo. Lanzada en 1995, ofrecía gráficos 3D monocromáticos en rojo y negro. Aunque no tuvo gran éxito comercial, hoy en día es una pieza de colección muy valorada por los fanáticos de la historia de los videojuegos."
  },
  { 
    id: 5, 
    name: "Game Boy Color", 
    price: 49990, 
    img: "assets/products/gmbcolor.avif", 
    desc: "La Game Boy Color llevó la legendaria portátil de Nintendo a un nuevo nivel con su pantalla a color. Compacta, ligera y con una enorme biblioteca de juegos, fue el hogar de títulos icónicos como Pokémon Oro y Plata, The Legend of Zelda: Oracle of Ages y Tetris DX."
  },
  { 
    id: 6, 
    name: "Game Boy Advance", 
    price: 59990, 
    img: "assets/products/gmbadv.jpg", 
    desc: "La Game Boy Advance fue la evolución portátil de Nintendo, con gráficos de 32 bits que rivalizaban con consolas de sobremesa de generaciones anteriores. Ofreció una gran variedad de títulos como Metroid Fusion, Mario Kart: Super Circuit y Fire Emblem, además de compatibilidad con juegos de Game Boy y Game Boy Color."
  },
  { 
    id: 7, 
    name: "Nintendo GameCube", 
    price: 89990, 
    img: "assets/products/gmcb.avif", 
    desc: "La Nintendo GameCube, con su diseño compacto y en forma de cubo, fue la consola de sexta generación de Nintendo. Ofreció gráficos de 128 bits y un catálogo lleno de joyas como Super Smash Bros. Melee, Metroid Prime y The Legend of Zelda: The Wind Waker, siendo muy apreciada hasta hoy por los jugadores retro."
  },
  { 
    id: 8, 
    name: "Nintendo Wii", 
    price: 49990, 
    img: "assets/products/wii.png", 
    desc: "La Nintendo Wii revolucionó la forma de jugar al introducir los controles por movimiento. Lanzada en 2006, cautivó tanto a jugadores casuales como a veteranos con títulos como Wii Sports, Mario Kart Wii y Super Smash Bros. Brawl. Su éxito global la convirtió en una de las consolas más vendidas de la historia."
  }
];


const params = new URLSearchParams(window.location.search);
const id = parseInt(params.get("id"));
const producto = products.find(p => p.id === id);

if (producto) {
  document.getElementById("detalle-producto").innerHTML = `
    <div class="detalle-card">
      <div class="detalle-img">
        <img src="${producto.img}" alt="${producto.name}">
      </div>
      <div class="detalle-info">
        <h2>${producto.name}</h2>
        <p class="price"><strong>Precio:</strong> $${producto.price.toLocaleString("es-CL")}</p>
        <p>${producto.desc}</p>
        <button class="btn" onclick="addToCart(${producto.id})">Añadir al carrito</button>
        <button class="btn" onclick="window.location.href='productos.html'">Volver</button>
      </div>
    </div>
  `;
}

