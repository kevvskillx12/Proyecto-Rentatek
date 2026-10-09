export const maquinaria = [
  {
    id: 1,
    nombre: 'Excavadora',
    categoria: 'Construcción',
    ubicacion: 'Mérida, Yucatán',
    precio: 2500,
    imagen: '/img/Excavadora.jpg',
    proveedor: 'Maquinaria del Sureste',
    telefono: '529999000001',
    descripcion: 'Excavadora hidráulica ideal para cimentaciones, zanjas y movimiento de tierra.',
    specs: ['Peso: 20 ton', 'Cucharón: 1.2 m³', 'Operador incluido: Sí']
  },
  {
    id: 2,
    nombre: 'Retroexcavadora',
    categoria: 'Construcción',
    ubicacion: 'Mérida, Yucatán',
    precio: 2000,
    imagen: '/img/Retroexcavadora.jpg',
    proveedor: 'Renta Yucatán',
    telefono: '529999000002',
    descripcion: 'Equipo versátil para excavar, cargar y nivelar terreno en obras medianas.',
    specs: ['Peso: 8 ton', 'Tracción: 4x4', 'Operador incluido: Opcional']
  },
  {
    id: 3,
    nombre: 'Grúa',
    categoria: 'Elevación',
    ubicacion: 'Progreso, Yucatán',
    precio: 3500,
    imagen: '/img/Grua.jpeg',
    proveedor: 'Grúas del Golfo',
    telefono: '529999000003',
    descripcion: 'Grúa para maniobras de carga y montaje de estructuras.',
    specs: ['Capacidad: 25 ton', 'Alcance: 30 m', 'Operador incluido: Sí']
  },
 {
    id: 4,
    nombre: 'Mini cargador',
    categoria: 'Construcción',
    ubicacion: 'Kanasín, Yucatán',
    precio: 1500,
    imagen: '/img/excavadora.jpg',
    proveedor: 'Maquinaria del Sureste',
    telefono: '529999000001',
    descripcion: 'Compacto, perfecto para espacios reducidos y trabajos de limpieza.',
    specs: ['Peso: 3 ton', 'Capacidad: 900 kg', 'Operador incluido: Opcional']
  },
  {
    id: 5,
    nombre: 'Montacargas',
    categoria: 'Elevación',
    ubicacion: 'Mérida, Yucatán',
    precio: 1200,
    imagen: '/img/grua.jpg',
    proveedor: 'Renta Yucatán',
    telefono: '529999000002',
    descripcion: 'Montacargas para bodegas y patios de carga.',
    specs: ['Capacidad: 3 ton', 'Combustible: Gas LP', 'Operador incluido: No']
  },
  {
    id: 6,
    nombre: 'Compactadora',
    categoria: 'Compactación',
    ubicacion: 'Progreso, Yucatán',
    precio: 1800,
    imagen: '/img/retroexcavadora.jpg',
    proveedor: 'Grúas del Golfo',
    telefono: '529999000003',
    descripcion: 'Compactadora de suelo para bases de pavimento y cimentaciones.',
    specs: ['Peso: 10 ton', 'Tipo: Rodillo liso', 'Operador incluido: Sí']
  }
];

export function formatoPrecio(n) {
  return '$' + n.toLocaleString('es-MX') + ' / día';
}
