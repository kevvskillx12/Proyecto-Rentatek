<script>
  import { todos } from '../lib/equipos.js';
  import { formatoPrecio } from '../lib/datos.js';

  export let id;

  $: maquina = $todos.find((m) => m.id === Number(id));
  $: mensaje = maquina
    ? encodeURIComponent(`Hola, me interesa rentar: ${maquina.nombre} (vi el anuncio en Rentatek).`)
    : '';
</script>

{#if maquina}
  <section class="detail">
    <a class="back" href="#/catalogo">← Volver al catálogo</a>

    <div class="detail-grid">
      <img src={maquina.imagen} alt={maquina.nombre} />

      <div>
        <p class="category">{maquina.categoria}</p>
        <h2>{maquina.nombre}</h2>
        <p class="location">📍 {maquina.ubicacion}</p>
        <p class="detail-price">{formatoPrecio(maquina.precio)}</p>
        <p class="detail-desc">{maquina.descripcion}</p>

        {#if maquina.specs.length}
          <h4>Especificaciones</h4>
          <ul>
            {#each maquina.specs as s}<li>{s}</li>{/each}
          </ul>
        {/if}

        <div class="provider">
          <p>Proveedor</p>
          <strong>{maquina.proveedor}</strong>
        </div>

        <a class="contact-btn" target="_blank" rel="noreferrer"
          href={`https://wa.me/${maquina.telefono}?text=${mensaje}`}>
          Contactar por WhatsApp
        </a>
      </div>
    </div>
  </section>
{:else}
  <section class="detail">
    <p>No encontramos esa maquinaria.</p>
    <a class="back" href="#/catalogo">← Volver al catálogo</a>
  </section>
{/if}
