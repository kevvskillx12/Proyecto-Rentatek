<script>
  import { todos } from '../lib/equipos.js';
  import Tarjeta from '../lib/Tarjeta.svelte';

  export let busquedaInicial = '';

  let texto = busquedaInicial;
  let categoria = 'Todas';
  let ubicacion = 'Todas';
  let precioMax = 10000;

  $: categorias = ['Todas', ...new Set($todos.map((m) => m.categoria))];
  $: ubicaciones = ['Todas', ...new Set($todos.map((m) => m.ubicacion))];

  $: resultados = $todos.filter((m) =>
    m.nombre.toLowerCase().includes(texto.toLowerCase()) &&
    (categoria === 'Todas' || m.categoria === categoria) &&
    (ubicacion === 'Todas' || m.ubicacion === ubicacion) &&
    m.precio <= precioMax
  );

  function limpiar() {
    texto = '';
    categoria = 'Todas';
    ubicacion = 'Todas';
    precioMax = 10000;
  }
</script>

<section class="page-header">
  <p class="section-tag">CATÁLOGO</p>
  <h2>Toda la maquinaria</h2>
</section>

<section class="catalog-layout">
  <aside class="filters">
    <h3>Filtros</h3>

    <label for="f-texto">Buscar</label>
    <input id="f-texto" type="text" placeholder="Nombre..." bind:value={texto} />

    <label for="f-cat">Categoría</label>
    <select id="f-cat" bind:value={categoria}>
      {#each categorias as c}<option>{c}</option>{/each}
    </select>

    <label for="f-ubi">Ubicación</label>
    <select id="f-ubi" bind:value={ubicacion}>
      {#each ubicaciones as u}<option>{u}</option>{/each}
    </select>

    <label for="f-precio">Precio máx.: ${precioMax.toLocaleString('es-MX')} / día</label>
    <input id="f-precio" type="range" min="500" max="10000" step="100" bind:value={precioMax} />

    <button class="clear" on:click={limpiar}>Limpiar filtros</button>
  </aside>

  <div>
    <p class="results-count">{resultados.length} resultado(s)</p>

    {#if resultados.length === 0}
      <p class="empty">No encontramos maquinaria con esos filtros.</p>
    {:else}
      <div class="machinery-grid two-cols">
        {#each resultados as maquina (maquina.id)}
          <Tarjeta {maquina} />
        {/each}
      </div>
    {/if}
  </div>
</section>

