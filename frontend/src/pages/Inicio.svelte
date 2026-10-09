<script>
  import { todos } from '../lib/equipos.js';
  import Tarjeta from '../lib/Tarjeta.svelte';

  let busqueda = '';

  function buscar() {
    window.location.hash = '#/catalogo/' + encodeURIComponent(busqueda.trim());
  }
</script>

<section class="hero">
  <div class="hero-content">
    <p class="tag">PLATAFORMA DE MAQUINARIA</p>
    <h1>Encuentra la maquinaria <span>que necesitas</span></h1>
    <p class="hero-description">
      Busca, compara y contacta proveedores de maquinaria para tu próximo proyecto.
    </p>

    <div class="search-box">
      <div class="search-field">
        <label for="q">¿Qué maquinaria buscas?</label>
        <input id="q" type="text" placeholder="Ej. Excavadora, grúa..."
          bind:value={busqueda} on:keydown={(e) => e.key === 'Enter' && buscar()} />
      </div>
      <div class="search-field location-field">
        <label for="u">Ubicación</label>
        <input id="u" type="text" placeholder="Ej. Mérida, Yucatán" />
      </div>
      <button class="search-button" on:click={buscar}>Buscar</button>
    </div>
  </div>
</section>

<section class="catalog">
  <div class="section-header">
    <div>
      <p class="section-tag">EXPLORA</p>
      <h2>Maquinaria destacada</h2>
    </div>
    <a class="view-all" href="#/catalogo">Ver catálogo →</a>
  </div>

  <div class="machinery-grid">
    {#each $todos.slice(0, 3) as maquina}
      <Tarjeta {maquina} />
    {/each}
  </div>
</section>

<section class="how-section" id="como-funciona">
  <div class="how-content">
    <p class="section-tag">RENTA FÁCIL</p>
    <h2>Encuentra. Compara. Contacta.</h2>
    <p>Rentatek conecta clientes que necesitan maquinaria con proveedores que ofrecen equipos disponibles.</p>
  </div>

  <div class="steps">
    <div class="step"><span>01</span><h3>Busca</h3><p>Encuentra la maquinaria que necesitas.</p></div>
    <div class="step"><span>02</span><h3>Compara</h3><p>Revisa diferentes opciones y proveedores.</p></div>
    <div class="step"><span>03</span><h3>Contacta</h3><p>Comunícate directamente con el proveedor.</p></div>
  </div>
</section>
