import { writable } from 'svelte/store';

const CLAVE = 'rentatek_usuario';

function cargar() {
  try {
    return JSON.parse(localStorage.getItem(CLAVE));
  } catch {
    return null;
  }
}

export const usuario = writable(cargar());

usuario.subscribe((valor) => {
  try {
    if (valor) localStorage.setItem(CLAVE, JSON.stringify(valor));
    else localStorage.removeItem(CLAVE);
  } catch {}
});

export function obtenerUsuarios() {
  try {
    return JSON.parse(localStorage.getItem('rentatek_usuarios')) || [];
  } catch {
    return [];
  }
}

export function guardarUsuarios(lista) {
  localStorage.setItem('rentatek_usuarios', JSON.stringify(lista));
}
