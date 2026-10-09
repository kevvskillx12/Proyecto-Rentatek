<script>
  import Inicio from './pages/Inicio.svelte';
  import Catalogo from './pages/Catalogo.svelte';
  import Detalle from './pages/Detalle.svelte';
  import Acceso from './pages/Acceso.svelte';
  import Panel from './pages/Panel.svelte';
  import { usuario } from './lib/sesion.js';

  let ruta = window.location.hash || '#/';

  function actualizar() {
    ruta = window.location.hash || '#/';
    window.scrollTo(0, 0);
  }

  function cerrarSesion() {
    usuario.set(null);
    window.location.hash = '#/';
  }

  $: partes = ruta.replace('#/', '').split('/');
  $: pagina = partes[0];
  $: parametro = decodeURIComponent(partes[1] || '');
</script>

<svelte:window on:hashchange={actualizar} />

<svelte:head>
  <title>Rentatek - Maquinaria en renta</title>
</svelte:head>

<nav class="navbar">
  <a class="logo" href="#/">RENTA<span>TEK</span></a>

  <div class="nav-links">
    <a href="#/">Inicio</a>
    <a href="#/catalogo">Catálogo</a>
    {#if $usuario && $usuario.rol === 'proveedor'}
      <a href="#/panel">Mi panel</a>
    {/if}
  </div>

  {#if $usuario}
    <div class="user-box">
      <span>Hola, {$usuario.nombre}</span>
      <button class="login-button" on:click={cerrarSesion}>Salir</button>
    </div>
  {:else}
    <a class="login-button" href="#/acceso">Iniciar sesión</a>
  {/if}
</nav>

<main>
  {#if pagina === 'catalogo'}
    {#key parametro}
      <Catalogo busquedaInicial={parametro} />
    {/key}
  {:else if pagina === 'maquina'}
    <Detalle id={parametro} />
  {:else if pagina === 'acceso'}
    <Acceso />
  {:else if pagina === 'panel'}
    <Panel />
  {:else}
    <Inicio />
  {/if}
</main>

<footer>
  <div class="footer-logo">RENTA<span>TEK</span></div>
  <p>Plataforma para conectar proveedores y clientes de maquinaria.</p>
  <p class="copyright">© 2026 Rentatek</p>
</footer>
