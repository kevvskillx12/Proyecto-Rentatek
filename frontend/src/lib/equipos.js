import { writable, derived } from 'svelte/store';
import { maquinaria as base } from './datos.js';

const CLAVE = 'rentatek_equipos';

function cargar() {
  try {
    return JSON.parse(localStorage.getItem(CLAVE)) || [];
  } catch {
    return [];
  }
}

export const publicados = writable(cargar());

publicados.subscribe((valor) => {
  try {
    localStorage.setItem(CLAVE, JSON.stringify(valor));
  } catch {}
});

export const todos = derived(publicados, ($p) => [...base, ...$p]);
