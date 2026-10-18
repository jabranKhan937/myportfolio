import * as THREE from "three";

const PATH_LENGTH = 150;
const LOOK_AHEAD = 12;

const sections = [
  "top",
  "impact",
  "stx-wallet",
  "localshows",
  "you-waggle",
  "skills",
  "experience",
  "contact",
] as const;

type Station = {
  id: (typeof sections)[number];
  group: THREE.Group;
  anchor: number;
};

function random(seed: number) {
  let value = seed >>> 0;
  return () => {
    value = (value + 0x6d2b79f5) | 0;
    let next = Math.imul(value ^ (value >>> 15), 1 | value);
    next = (next + Math.imul(next ^ (next >>> 7), 61 | next)) ^ next;
    return ((next ^ (next >>> 14)) >>> 0) / 4294967296;
  };
}

function pathX(z: number) {
  return 2.4 + Math.sin(z * 0.045) * 2.1;
}

function sprite(text: string, color: string, width = 2.2, fontSize = 86) {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 256;
  const context = canvas.getContext("2d");
  if (!context) return new THREE.Sprite();
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = color;
  context.font = `700 ${fontSize}px "Space Grotesk", system-ui, sans-serif`;
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillText(text, canvas.width / 2, canvas.height / 2);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  const material = new THREE.SpriteMaterial({ map: texture, transparent: true, depthWrite: false });
  const item = new THREE.Sprite(material);
  item.scale.set(width, width * 0.5, 1);
  return item;
}

function buildingTexture() {
  const roll = random(7);
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 128;
  const context = canvas.getContext("2d");
  if (!context) return new THREE.CanvasTexture(canvas);
  context.fillStyle = "#07111c";
  context.fillRect(0, 0, canvas.width, canvas.height);
  for (let y = 6; y < 122; y += 9) {
    for (let x = 5; x < 60; x += 8) {
      if (roll() > 0.62) continue;
      context.globalAlpha = 0.45 + roll() * 0.55;
      context.fillStyle = roll() > 0.82 ? "#38d9f5" : "#ffb547";
      context.fillRect(x, y, 3, 5);
    }
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

function metricRing(label: string) {
  const group = new THREE.Group();
  const amber = new THREE.MeshBasicMaterial({ color: 0xffb547 });
  const cyan = new THREE.MeshBasicMaterial({ color: 0x38d9f5 });
  const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 1.45, 10), cyan);
  pole.position.y = 0.72;
  const ring = new THREE.Mesh(new THREE.TorusGeometry(0.82, 0.06, 14, 42), amber);
  ring.position.y = 1.7;
  ring.rotation.y = Math.PI / 2;
  ring.rotation.x = 0.42;
  const halo = new THREE.Mesh(new THREE.TorusGeometry(0.56, 0.02, 10, 36), cyan);
  halo.position.y = 1.7;
  halo.rotation.y = Math.PI / 2;
  halo.rotation.x = 0.42;
  const labelSprite = sprite(label, "#fff4dc", 1.45, 84);
  labelSprite.position.y = 1.7;
  const foot = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.2, 0.05, 12), cyan);
  foot.position.y = 0.03;
  group.add(foot, pole, ring, halo, labelSprite);
  return { group, ring, halo };
}

function slab(width: number, height: number, depth: number, color: number) {
  return new THREE.Mesh(new THREE.BoxGeometry(width, height, depth), new THREE.MeshBasicMaterial({ color }));
}

function impactStation() {
  const group = new THREE.Group();
  const rings: THREE.Mesh[] = [];
  const halos: THREE.Mesh[] = [];
  ["5+", "20+", "iOS", "3"].forEach((label, index) => {
    const marker = metricRing(label);
    marker.group.position.set((index - 1.5) * 2.6, 0, (index - 1.5) * 0.15);
    rings.push(marker.ring);
    halos.push(marker.halo);
    group.add(marker.group);
  });
  return { group, rings, halos };
}

function walletStation() {
  const group = new THREE.Group();
  const chains = [
    ["STX", 0x38d9f5],
    ["BNB", 0xffb547],
    ["ETH", 0x9ad7ff],
    ["SOL", 0x7dffc3],
  ] as const;
  const nodes: THREE.Mesh[] = [];
  chains.forEach(([label, color], index) => {
    const node = new THREE.Mesh(
      new THREE.SphereGeometry(0.28, 20, 16),
      new THREE.MeshBasicMaterial({ color }),
    );
    node.position.set(index * 1.35 - 2, 1.15, index % 2 === 0 ? 0 : 0.7);
    const tag = sprite(label, "#f4fbff", 1.1, 72);
    tag.position.set(node.position.x, 1.75, node.position.z);
    nodes.push(node);
    group.add(node, tag);
  });
  const bases = nodes.map((node) => node.position.clone());
  const thread = new THREE.Line(
    new THREE.BufferGeometry().setFromPoints(bases),
    new THREE.LineBasicMaterial({ color: 0x38d9f5, transparent: true, opacity: 0.8 }),
  );
  const halo = new THREE.Mesh(
    new THREE.TorusGeometry(2.55, 0.02, 8, 72),
    new THREE.MeshBasicMaterial({ color: 0x38d9f5, transparent: true, opacity: 0.55 }),
  );
  halo.rotation.x = Math.PI / 2;
  halo.position.y = 0.18;
  const title = sprite("4 CHAINS", "#ffb547", 2.2, 64);
  title.position.y = 2.4;
  group.add(thread, halo, title);
  return { group, nodes, bases, thread, halo };
}

function posterTexture(title: string, accent: string) {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 360;
  const context = canvas.getContext("2d");
  if (!context) return new THREE.CanvasTexture(canvas);
  context.fillStyle = "#0b1622";
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = accent;
  context.fillRect(0, 0, canvas.width, 16);
  context.fillRect(0, canvas.height - 16, canvas.width, 16);
  for (let row = 0; row < 4; row += 1) {
    context.globalAlpha = 0.85;
    context.fillStyle = row % 2 === 0 ? "#38d9f5" : "#ffb547";
    context.fillRect(36, 58 + row * 34, 184 - row * 16, 12);
  }
  context.globalAlpha = 1;
  context.fillStyle = "#f4fbff";
  context.font = "700 36px Space Grotesk, system-ui, sans-serif";
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillText(title, canvas.width / 2, 292);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function showsStation() {
  const group = new THREE.Group();
  const cards: THREE.Object3D[] = [];
  const stage = new THREE.Mesh(
    new THREE.CylinderGeometry(2.15, 2.15, 0.045, 40),
    new THREE.MeshBasicMaterial({ color: 0x38d9f5, transparent: true, opacity: 0.28 }),
  );
  stage.position.y = 0.03;
  group.add(stage);
  [
    ["EVENTS", "#38d9f5"],
    ["FEEDS", "#ffb547"],
    ["PROFILES", "#7dffc3"],
  ].forEach(([label, accent], index) => {
    const poster = new THREE.Group();
    const frame = slab(1.12, 1.62, 0.05, 0x143044);
    const face = new THREE.Mesh(
      new THREE.PlaneGeometry(1.0, 1.46),
      new THREE.MeshBasicMaterial({ map: posterTexture(label, accent) }),
    );
    face.position.z = 0.03;
    const pin = new THREE.Mesh(
      new THREE.SphereGeometry(0.07, 12, 10),
      new THREE.MeshBasicMaterial({ color: accent }),
    );
    pin.position.set(0, 0.92, 0.05);
    poster.add(frame, face, pin);
    poster.rotation.y = -Math.PI / 2;
    poster.position.set(index === 1 ? 0.35 : 0, 0.95, (index - 1) * 1.35);
    poster.userData.baseY = 0.95;
    poster.userData.phase = index;
    cards.push(poster);
    group.add(poster);
  });
  const title = sprite("LOCALSHOWS", "#ffb547", 2.8, 52);
  title.position.set(0.2, 2.15, 0);
  group.add(title);
  return { group, cards };
}

function phoneScreen(accent: string, caption: string) {
  const canvas = document.createElement("canvas");
  canvas.width = 180;
  canvas.height = 340;
  const context = canvas.getContext("2d");
  if (!context) return new THREE.CanvasTexture(canvas);
  context.fillStyle = "#071018";
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = accent;
  context.fillRect(62, 16, 56, 8);
  context.font = "700 22px Space Grotesk, system-ui, sans-serif";
  context.textAlign = "center";
  context.fillStyle = "#f4fbff";
  context.fillText("ITEMS", 90, 58);
  for (let row = 0; row < 4; row += 1) {
    context.fillStyle = row % 2 === 0 ? accent : "#163044";
    context.fillRect(22, 84 + row * 48, 28, 28);
    context.fillStyle = "#d7e6f2";
    context.fillRect(62, 92 + row * 48, 96 - row * 10, 8);
  }
  context.fillStyle = accent;
  context.font = "700 16px Space Grotesk, system-ui, sans-serif";
  context.fillText(caption, 90, 308);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function phoneStation() {
  const group = new THREE.Group();
  const screens: THREE.Mesh[] = [];
  const stage = new THREE.Mesh(
    new THREE.CylinderGeometry(1.7, 1.7, 0.04, 32),
    new THREE.MeshBasicMaterial({ color: 0x38d9f5, transparent: true, opacity: 0.28 }),
  );
  stage.position.y = 0.03;
  group.add(stage);
  [
    ["#38d9f5", "iOS"],
    ["#ffb547", "ANDROID"],
  ].forEach(([accent, caption], index) => {
    const handset = new THREE.Group();
    const body = slab(0.86, 1.72, 0.08, 0x0c1824);
    body.position.y = 0.98;
    const screen = new THREE.Mesh(
      new THREE.PlaneGeometry(0.7, 1.42),
      new THREE.MeshBasicMaterial({ map: phoneScreen(accent, caption) }),
    );
    screen.position.set(0, 0.98, 0.045);
    const rim = slab(0.9, 0.035, 0.09, accent === "#38d9f5" ? 0x38d9f5 : 0xffb547);
    rim.position.y = 1.86;
    handset.add(body, screen, rim);
    handset.rotation.y = -Math.PI / 2;
    handset.position.set(index === 0 ? 0 : 0.28, 0, index === 0 ? -0.72 : 0.72);
    handset.userData.phase = index;
    handset.userData.baseY = 0;
    screens.push(screen);
    group.add(handset);
  });
  const title = sprite("YOU WAGGLE", "#ffb547", 2.8, 52);
  title.position.set(0.15, 2.25, 0);
  group.add(title);
  return { group, screens };
}

function skillsStation() {
  const group = new THREE.Group();
  const blocks: THREE.Object3D[] = [];
  ["MOBILE", "AI", "BACKEND"].forEach((label, index) => {
    const stack = new THREE.Group();
    const block = slab(1.5, 0.28, 0.7, index % 2 === 0 ? 0x10283a : 0x1a1408);
    block.position.y = 0.14;
    const tag = sprite(label, index % 2 === 0 ? "#38d9f5" : "#ffb547", 1.7, 48);
    tag.position.y = 0.55;
    stack.add(block, tag);
    stack.position.set(index * 0.35, 0.4 + index * 0.38, index * 0.45);
    stack.userData.baseY = stack.position.y;
    stack.userData.phase = index;
    blocks.push(stack);
    group.add(stack);
  });
  return { group, blocks };
}

function careerStation() {
  const group = new THREE.Group();
  const rings: THREE.Mesh[] = [];
  const halos: THREE.Mesh[] = [];
  [
    ["2025", "RAPIDDEV"],
    ["2023", "KRYPTOMIND"],
    ["2021", "AMMAG"],
  ].forEach(([year, name], index) => {
    const marker = metricRing(year);
    marker.group.position.set((index - 1) * 2.8, 0, 0);
    const tag = sprite(name, "#d7e6f2", name.length > 8 ? 2.5 : 1.8, name.length > 8 ? 42 : 52);
    tag.position.set(marker.group.position.x, 2.35, marker.group.position.z);
    rings.push(marker.ring);
    halos.push(marker.halo);
    group.add(marker.group, tag);
  });
  return { group, rings, halos };
}

function contactStation() {
  const group = new THREE.Group();
  const amber = new THREE.MeshBasicMaterial({ color: 0xffb547 });
  const left = slab(0.14, 2.5, 0.14, 0xffb547);
  left.position.set(-1.25, 1.25, 0);
  left.material = amber;
  const right = slab(0.14, 2.5, 0.14, 0xffb547);
  right.position.set(1.25, 1.25, 0);
  right.material = amber;
  const beam = slab(2.7, 0.14, 0.14, 0xffb547);
  beam.position.y = 2.5;
  beam.material = amber;
  const title = sprite("CONTACT", "#ffb547", 2.3, 64);
  title.position.y = 3;
  const count = 120;
  const positions = new Float32Array(count * 3);
  const seeds = new Float32Array(count);
  const roll = random(21);
  for (let index = 0; index < count; index += 1) {
    positions[index * 3] = (roll() - 0.5) * 2.1;
    positions[index * 3 + 1] = roll() * 2.3;
    positions[index * 3 + 2] = (roll() - 0.5) * 0.6;
    seeds[index] = roll();
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  const points = new THREE.Points(
    geometry,
    new THREE.PointsMaterial({ color: 0xffb547, size: 0.08, transparent: true, depthWrite: false }),
  );
  group.add(left, right, beam, title, points);
  return { group, points, seeds, beam };
}

export function mountWorld(canvas: HTMLCanvasElement) {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    powerPreference: "high-performance",
    preserveDrawingBuffer: false,
  });
  renderer.setClearColor(0x000000, 0);
  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x05080e, 16, 62);
  const camera = new THREE.PerspectiveCamera(52, 1, 0.1, 180);
  const roll = random(4);
  const disposables: Array<{ dispose: () => void }> = [];
  const track = <T extends { dispose: () => void }>(item: T) => {
    disposables.push(item);
    return item;
  };

  const windows = track(buildingTexture());
  const buildingMaterial = track(new THREE.MeshBasicMaterial({ map: windows }));
  const buildingGeometry = track(new THREE.BoxGeometry(1, 1, 1));
  buildingGeometry.translate(0, 0.5, 0);
  const buildings = new THREE.InstancedMesh(buildingGeometry, buildingMaterial, 110);
  buildings.frustumCulled = false;
  const dummy = new THREE.Object3D();
  for (let index = 0; index < 110; index += 1) {
    const z = -8 + roll() * (PATH_LENGTH + 36);
    const side = roll() > 0.42 ? 1 : -1;
    const gap = side > 0 ? 7.2 + roll() * 14 : 14 + roll() * 16;
    const x = pathX(z) + side * gap;
    const height = 2 + roll() * (roll() > 0.85 ? 16 : 8);
    dummy.position.set(x, 0, z);
    dummy.scale.set(0.8 + roll() * 1.8, height, 0.8 + roll() * 1.8);
    dummy.rotation.set(0, 0, 0);
    dummy.updateMatrix();
      buildings.setMatrixAt(index, dummy.matrix);
  }
  buildings.instanceMatrix.needsUpdate = true;
  scene.add(buildings);

  const ground = new THREE.Mesh(
    track(new THREE.PlaneGeometry(240, 240)),
    track(new THREE.MeshBasicMaterial({ color: 0x05080e })),
  );
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -0.03;
  scene.add(ground);

  const gridUniforms = { uCam: { value: new THREE.Vector3() }, uTime: { value: 0 } };
  const grid = new THREE.Mesh(
    track(new THREE.PlaneGeometry(180, 180, 1, 1)),
    track(
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        uniforms: gridUniforms,
        vertexShader: `
          varying vec3 vPos;
          void main() {
            vec4 world = modelMatrix * vec4(position, 1.0);
            vPos = world.xyz;
            gl_Position = projectionMatrix * viewMatrix * world;
          }
        `,
        fragmentShader: `
          varying vec3 vPos;
          uniform vec3 uCam;
          uniform float uTime;
          void main() {
            vec2 cell = vPos.xz;
            vec2 grid = abs(fract(cell) - 0.5);
            float line = min(grid.x, grid.y);
            float major = min(abs(fract(cell / 5.0) - 0.5).x, abs(fract(cell / 5.0) - 0.5).y);
            float fine = 1.0 - smoothstep(0.0, fwidth(line) * 1.6, line);
            float bold = 1.0 - smoothstep(0.0, fwidth(major) * 1.8, major);
            float away = distance(vPos, uCam);
            float fade = 1.0 - smoothstep(6.0, 46.0, away);
            float scan = 1.0 - smoothstep(0.0, 7.0, abs(mod(vPos.z - uTime * 8.0, 42.0) - 21.0));
            float alpha = (fine * 0.28 + bold * 0.5 + scan * 0.45) * fade;
            if (alpha < 0.03) discard;
            vec3 color = mix(vec3(0.22, 0.78, 0.9), vec3(1.0, 0.72, 0.28), scan * 0.65);
            gl_FragColor = vec4(color, alpha);
          }
        `,
      }),
    ),
  );
  grid.rotation.x = -Math.PI / 2;
  scene.add(grid);

  const segmentCount = Math.ceil((PATH_LENGTH + 28) / 1.6);
  const pathGeometry = track(new THREE.BoxGeometry(3.15, 0.045, 1.45));
  const pathMaterial = track(new THREE.MeshBasicMaterial({ color: 0x071018 }));
  const path = new THREE.InstancedMesh(pathGeometry, pathMaterial, segmentCount);
  path.frustumCulled = false;
  const plateGeometry = track(new THREE.BoxGeometry(0.7, 0.02, 0.42));
  const plateMaterial = track(new THREE.MeshBasicMaterial({ color: 0xd5e4f0 }));
  const plates = new THREE.InstancedMesh(plateGeometry, plateMaterial, segmentCount);
  plates.frustumCulled = false;
  const edgeGeometry = track(new THREE.BoxGeometry(0.09, 0.07, 1.5));
  const edgeMaterial = track(new THREE.MeshBasicMaterial({ color: 0x38d9f5 }));
  const edges = new THREE.InstancedMesh(edgeGeometry, edgeMaterial, segmentCount * 2);
  edges.frustumCulled = false;
  for (let index = 0; index < segmentCount; index += 1) {
    const z = index * 1.6;
    const x = pathX(z);
    const yaw = Math.atan2(pathX(z + 1.6) - x, 1.6);
    dummy.position.set(x, 0.03, z);
    dummy.scale.set(1, 1, 1);
    dummy.rotation.set(0, yaw, 0);
    dummy.updateMatrix();
    path.setMatrixAt(index, dummy.matrix);
    dummy.position.y = 0.06;
    plates.setMatrixAt(index, dummy.matrix);
    dummy.position.set(x + Math.cos(yaw) * 1.52, 0.05, z - Math.sin(yaw) * 1.52);
    edges.setMatrixAt(index * 2, dummy.matrix);
    dummy.position.set(x - Math.cos(yaw) * 1.52, 0.05, z + Math.sin(yaw) * 1.52);
    edges.setMatrixAt(index * 2 + 1, dummy.matrix);
  }
  path.instanceMatrix.needsUpdate = true;
  plates.instanceMatrix.needsUpdate = true;
  edges.instanceMatrix.needsUpdate = true;
  scene.add(path, plates, edges);

  const strips: THREE.Mesh[] = [];
  for (const z of [9, 17, 25]) {
    const booth = new THREE.Group();
    const body = new THREE.Mesh(track(new THREE.BoxGeometry(0.7, 1.05, 0.7)), buildingMaterial);
    body.position.y = 0.52;
    const strip = slab(0.76, 0.05, 0.76, 0x38d9f5);
    const stripMaterial = strip.material as THREE.MeshBasicMaterial;
    stripMaterial.transparent = true;
    strip.position.y = 1.08;
    strips.push(strip);
    booth.add(body, strip);
    booth.position.set(pathX(z) + 1.7, 0, z);
    scene.add(booth);
  }

  const packets: THREE.Mesh[] = [];
  for (let index = 0; index < 8; index += 1) {
    const packet = new THREE.Mesh(
      track(new THREE.SphereGeometry(0.1, 12, 10)),
      track(new THREE.MeshBasicMaterial({ color: index % 2 === 0 ? 0x38d9f5 : 0xffb547 })),
    );
    packets.push(packet);
    scene.add(packet);
  }

  const moteCount = 260;
  const motePositions = new Float32Array(moteCount * 3);
  const moteSeeds = new Float32Array(moteCount);
  const moteRoll = random(33);
  for (let index = 0; index < moteCount; index += 1) {
    const z = moteRoll() * (PATH_LENGTH + 24) - 6;
    motePositions[index * 3] = pathX(z) + (moteRoll() - 0.5) * 26;
    motePositions[index * 3 + 1] = 0.4 + moteRoll() * 7.5;
    motePositions[index * 3 + 2] = z;
    moteSeeds[index] = moteRoll();
  }
  const moteGeometry = track(new THREE.BufferGeometry());
  moteGeometry.setAttribute("position", new THREE.BufferAttribute(motePositions, 3));
  const motes = new THREE.Points(
    moteGeometry,
    track(
      new THREE.PointsMaterial({
        color: 0x9ae7ff,
        size: 0.07,
        transparent: true,
        opacity: 0.75,
        depthWrite: false,
      }),
    ),
  );
  motes.frustumCulled = false;
  scene.add(motes);

  const impact = impactStation();
  const wallet = walletStation();
  const shows = showsStation();
  const phones = phoneStation();
  const skills = skillsStation();
  const career = careerStation();
  const contact = contactStation();
  const rings = [...impact.rings, ...career.rings];
  const halos = [...impact.halos, ...career.halos];
  const stations: Station[] = [
    { id: "top", group: new THREE.Group(), anchor: 0 },
    { id: "impact", group: impact.group, anchor: 0 },
    { id: "stx-wallet", group: wallet.group, anchor: 0 },
    { id: "localshows", group: shows.group, anchor: 0 },
    { id: "you-waggle", group: phones.group, anchor: 0 },
    { id: "skills", group: skills.group, anchor: 0 },
    { id: "experience", group: career.group, anchor: 0 },
    { id: "contact", group: contact.group, anchor: 0 },
  ];
  stations.forEach((station) => scene.add(station.group));

  const placeStations = () => {
    const height = document.documentElement.scrollHeight;
    const max = height - window.innerHeight;
    stations.forEach((station, index) => {
      const element = document.getElementById(station.id);
      const top = element ? element.getBoundingClientRect().top + window.scrollY : (index / (stations.length - 1)) * height;
      const progress = max > 0 ? Math.min(Math.max(top, 0), max) / max : index / (stations.length - 1);
      station.anchor = progress * PATH_LENGTH;
      const z = station.anchor + LOOK_AHEAD;
      station.group.position.set(pathX(z) + 1.1, 0, z);
    });
  };

  const resize = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    camera.aspect = width / Math.max(height, 1);
    camera.updateProjectionMatrix();
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, width < 800 ? 1.15 : 1.5));
    renderer.setSize(width, height, false);
    placeStations();
  };

  let target = 0;
  const readScroll = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    target = max > 0 ? window.scrollY / max : 0;
    placeStations();
  };

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let current = 0;
  let frame = 0;
  let last = performance.now();
  let time = 0;

  const draw = () => {
    frame = window.requestAnimationFrame(draw);
    if (document.documentElement.classList.contains("is-quick")) return;
    const now = performance.now();
    const delta = Math.min((now - last) / 1000, 0.05);
    last = now;
    time += delta;
    current = reduced ? target : current + (target - current) * Math.min(1, delta * 4.2);
    const focus = current * PATH_LENGTH;
    const narrow = window.innerWidth < 760;
    const ahead = focus + LOOK_AHEAD;
    if (narrow) {
      camera.position.set(pathX(focus) - 1.4, 3.4, focus + 2);
      camera.lookAt(pathX(ahead) + 0.8, 2.4, ahead);
    } else {
      camera.position.set(pathX(focus) - 8.6, 4.8, focus);
      camera.lookAt(pathX(ahead) + 2.2, 1.35, ahead);
    }
    gridUniforms.uCam.value.copy(camera.position);
    gridUniforms.uTime.value = time;

    stations.forEach((station) => {
      if (station.id === "top") {
        station.group.visible = false;
        return;
      }
      const distance = Math.abs(focus - station.anchor);
      const visibility = 1 - THREE.MathUtils.smoothstep(distance, 3, 11);
      station.group.visible = visibility > 0.05;
      const emphasis = station.id === "impact" || station.id === "experience" ? 1 : 1.7;
      station.group.scale.setScalar((0.86 + visibility * 0.14) * emphasis);
    });

    if (!reduced) {
      windows.offset.y = (time * 0.02) % 1;
      edgeMaterial.transparent = true;
      edgeMaterial.opacity = 0.62 + Math.sin(time * 2.2) * 0.28;
      rings.forEach((ring, index) => {
        ring.rotation.z = Math.sin(time * 1.3 + index) * 0.2;
        const pulse = 1 + Math.sin(time * 2.1 + index) * 0.05;
        ring.scale.setScalar(pulse);
      });
      halos.forEach((halo, index) => {
        halo.rotation.z = -time * 0.8 - index;
      });
      wallet.nodes.forEach((node, index) => {
        const base = wallet.bases[index];
        const angle = time * 0.8 + index * 1.4;
        node.position.x = base.x + Math.cos(angle) * 0.14;
        node.position.z = base.z + Math.sin(angle) * 0.14;
        node.position.y = base.y + Math.sin(time * 1.8 + index) * 0.18;
      });
      const chain = wallet.thread.geometry.getAttribute("position") as THREE.BufferAttribute;
      wallet.nodes.forEach((node, index) => {
        chain.setXYZ(index, node.position.x, node.position.y, node.position.z);
      });
      chain.needsUpdate = true;
      wallet.halo.rotation.z = time * 0.45;
      shows.cards.forEach((card) => {
        const phase = Number(card.userData.phase);
        const lift = Math.sin(time * 1.4 + phase) * 0.12;
        card.position.y = Number(card.userData.baseY) + lift;
      });
      phones.group.children.forEach((child) => {
        if (!(child instanceof THREE.Group)) return;
        const phase = Number(child.userData.phase);
        child.position.y = Number(child.userData.baseY) + Math.sin(time * 1.5 + phase) * 0.1;
      });
      skills.blocks.forEach((block) => {
        const phase = Number(block.userData.phase);
        block.position.y = Number(block.userData.baseY) + Math.sin(time * 1.6 + phase) * 0.1;
        block.rotation.y = Math.sin(time * 0.7 + phase) * 0.12;
      });
      const beamMaterial = contact.beam.material as THREE.MeshBasicMaterial;
      beamMaterial.transparent = true;
      beamMaterial.opacity = 0.7 + Math.sin(time * 3) * 0.3;
      const attribute = contact.points.geometry.getAttribute("position") as THREE.BufferAttribute;
      for (let index = 0; index < contact.seeds.length; index += 1) {
        attribute.setY(index, (contact.seeds[index] * 2.3 + time * 0.85) % 2.3);
      }
      attribute.needsUpdate = true;
      packets.forEach((packet, index) => {
        const z = (time * 7 + index * 18) % (PATH_LENGTH + 8);
        packet.position.set(pathX(z), 0.42 + Math.sin(time * 3 + index) * 0.12, z);
      });
      const moteAttribute = moteGeometry.getAttribute("position") as THREE.BufferAttribute;
      for (let index = 0; index < moteCount; index += 1) {
        const seed = moteSeeds[index];
        moteAttribute.setY(index, motePositions[index * 3 + 1] + Math.sin(time * 0.6 + seed * 12) * 0.35);
      }
      moteAttribute.needsUpdate = true;
      strips.forEach((strip, index) => {
        const material = strip.material as THREE.MeshBasicMaterial;
        material.opacity = 0.4 + Math.sin(time * 3.2 + index) * 0.45;
      });
    }

    renderer.render(scene, camera);
  };

  resize();
  readScroll();
  canvas.classList.add("is-ready");
  draw();
  window.addEventListener("scroll", readScroll, { passive: true });
  window.addEventListener("resize", resize);

  return () => {
    window.cancelAnimationFrame(frame);
    window.removeEventListener("scroll", readScroll);
    window.removeEventListener("resize", resize);
    disposables.forEach((item) => item.dispose());
    renderer.dispose();
  };
}
