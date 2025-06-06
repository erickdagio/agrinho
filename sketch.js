// Variáveis para os elementos da cena
let buildings = [];
const NUM_BUILDINGS = 5; // Quantidade de prédios

let cars = [];
const NUM_CARS = 3; // Quantidade de carros

let trees = [];
const NUM_TREES = 4; // Quantidade de árvores na cidade

function setup() {
  createCanvas(800, 600); // Cria o canvas 800x600 pixels
  centerCanvas(); // Centraliza o canvas na página para melhor visualização

  // Inicializa os prédios
  for (let i = 0; i < NUM_BUILDINGS; i++) {
    buildings.push(new Building(i)); // Passa o índice para ajudar na distribuição
  }

  // Inicializa os carros
  for (let i = 0; i < NUM_CARS; i++) {
    cars.push(new Car());
  }

  // Inicializa as árvores (para a cena da cidade)
  for (let i = 0; i < NUM_TREES; i++) {
    trees.push(new CityTree()); // Usa uma classe de árvore diferente para a cidade
  }
}

function draw() {
  drawCitySky(); // Desenha o céu da cidade
  drawRoad();    // Desenha a rua
  drawSidewalk(); // Desenha a calçada

  // Desenha os prédios
  for (let i = 0; i < buildings.length; i++) {
    buildings[i].display();
  }

  // Desenha as árvores
  for (let i = 0; i < trees.length; i++) {
    trees[i].display();
  }

  // Desenha e move os carros
  for (let i = 0; i < cars.length; i++) {
    cars[i].display();
    cars[i].move();
  }
}

/**
 * Desenha o céu da cidade (um azul mais pálido ou cinzento).
 */
function drawCitySky() {
  background(173, 216, 230); // Azul claro, similar ao céu
}

/**
 * Desenha a rua.
 */
function drawRoad() {
  fill(80, 80, 80); // Cinza escuro para a rua
  noStroke();
  rect(0, height * 0.6, width, height * 0.25); // Rua ocupa uma parte da tela

  // Linhas da rua
  stroke(255, 255, 0); // Amarelo
  strokeWeight(3);
  for (let x = 0; x < width; x += 40) {
    line(x, height * 0.725, x + 20, height * 0.725); // Linhas tracejadas
  }
  noStroke(); // Volta a não ter borda para os próximos elementos
}

/**
 * Desenha a calçada.
 */
function drawSidewalk() {
  fill(150, 150, 150); // Cinza claro para a calçada
  noStroke();
  rect(0, height * 0.55, width, height * 0.05); // Calçada acima da rua
}

/**
 * Classe para criar e gerenciar prédios individuais.
 */
class Building {
  constructor(index) {
    this.width = random(80, 150); // Largura aleatória do prédio
    this.height = random(150, 350); // Altura aleatória do prédio
    // Posiciona os prédios lado a lado, com um pequeno espaçamento
    this.x = (index * (width / NUM_BUILDINGS)) + random(-20, 20); // Distribui e adiciona um pouco de aleatoriedade
    this.y = height * 0.55 - this.height; // Posiciona no topo da calçada
    this.color = color(random(80, 120), random(80, 120), random(80, 120)); // Cor cinza variada
    this.windowColor = color(200, 200, 255, 200); // Azul claro para janelas
    this.numWindowsX = floor(this.width / 30); // Número de janelas na largura
    this.numWindowsY = floor(this.height / 40); // Número de janelas na altura
  }

  // Método para desenhar o prédio
  display() {
    fill(this.color);
    noStroke();
    rect(this.x, this.y, this.width, this.height);

    // Desenha as janelas
    fill(this.windowColor);
    for (let i = 0; i < this.numWindowsX; i++) {
      for (let j = 0; j < this.numWindowsY; j++) {
        let windowX = this.x + 10 + (i * (this.width / this.numWindowsX));
        let windowY = this.y + 10 + (j * (this.height / this.numWindowsY));
        rect(windowX, windowY, this.width / this.numWindowsX - 10, this.height / this.numWindowsY - 10);
      }
    }
  }
}

/**
 * Classe para criar e gerenciar carros individuais.
 */
class Car {
  constructor() {
    this.x = random(-width, 0); // Posição X inicial aleatória (começa fora da tela à esquerda)
    this.y = height * 0.65 + random(0, height * 0.1); // Posição Y aleatória na rua
    this.width = random(60, 90); // Largura aleatória do carro
    this.height = random(30, 45); // Altura aleatória do carro
    this.speed = random(2, 5); // Velocidade aleatória
    this.color = color(random(0, 255), random(0, 255), random(0, 255)); // Cor aleatória
  }

  // Método para desenhar o carro
  display() {
    fill(this.color);
    noStroke();
    rect(this.x, this.y, this.width, this.height); // Corpo do carro

    fill(50); // Cor das rodas
    ellipse(this.x + this.width * 0.25, this.y + this.height, this.width * 0.2, this.width * 0.2); // Roda dianteira
    ellipse(this.x + this.width * 0.75, this.y + this.height, this.width * 0.2, this.width * 0.2); // Roda traseira
  }

  // Método para mover o carro e reposicioná-lo se sair da tela
  move() {
    this.x += this.speed;

    // Se o carro sair da tela pela direita, reposiciona no lado esquerdo
    if (this.x > width + this.width) {
      this.x = -this.width; // Reposiciona fora da vista no início da tela
      this.y = height * 0.65 + random(0, height * 0.1); // Nova altura aleatória na rua
      this.speed = random(2, 5); // Nova velocidade aleatória
      this.color = color(random(0, 255), random(0, 255), random(0, 255)); // Nova cor aleatória
    }
  }
}

/**
 * Classe para criar e gerenciar árvores no contexto da cidade.
 * São menores e mais simples que as árvores do campo.
 */
class CityTree {
  constructor() {
    this.x = random(width); // Posição X aleatória
    this.y = random(height * 0.55 - 50, height * 0.55); // Posição Y aleatória na calçada
    this.size = random(30, 60); // Tamanho aleatório
  }

  // Método para desenhar a árvore
  display() {
    // Tronco
    fill(139, 69, 19); // Marrom
    rect(this.x - this.size * 0.1, this.y, this.size * 0.2, this.size * 0.8);

    // Copa
    fill(34, 139, 34); // Verde floresta
    ellipse(this.x, this.y, this.size, this.size);
  }
}

/**
 * Função auxiliar para centralizar o canvas na página.
 */
function centerCanvas() {
  let x = (windowWidth - width) / 2;
  let y = (windowHeight - height) / 2;
  select('canvas').position(x, y);
}

// Garante que o canvas seja centralizado se a janela for redimensionada
function windowResized() {
  centerCanvas();
}
