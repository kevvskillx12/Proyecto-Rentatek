<script>
  import { usuario, obtenerUsuarios, guardarUsuarios } from '../lib/sesion.js';

  let modo = 'login'; // 'login' | 'registro'
  let rol = 'cliente'; // 'cliente' | 'proveedor'
  let nombre = '';
  let correo = '';
  let clave = '';
  let error = '';

  function cambiarModo(nuevo) {
    modo = nuevo;
    error = '';
  }

  function enviar() {
    error = '';
    const email = correo.trim().toLowerCase();
    const lista = obtenerUsuarios();

    if (!email || !clave) {
      error = 'Completa todos los campos.';
      return;
    }

    if (modo === 'registro') {
      if (!nombre.trim()) {
        error = 'Escribe tu nombre.';
        return;
      }
      if (clave.length < 6) {
        error = 'La contraseña debe tener al menos 6 caracteres.';
        return;
      }
      if (lista.some((u) => u.correo === email)) {
        error = 'Ese correo ya está registrado.';
        return;
      }
      const nuevo = { nombre: nombre.trim(), correo: email, clave, rol };
      guardarUsuarios([...lista, nuevo]);
      usuario.set({ nombre: nuevo.nombre, correo: nuevo.correo, rol: nuevo.rol });
      window.location.hash = '#/';
    } else {
      const encontrado = lista.find((u) => u.correo === email && u.clave === clave);
      if (!encontrado) {
        error = 'Correo o contraseña incorrectos.';
        return;
      }
      usuario.set({ nombre: encontrado.nombre, correo: encontrado.correo, rol: encontrado.rol });
      window.location.hash = '#/';
    }
  }
</script>

<section class="auth">
  <div class="auth-card">
    <div class="auth-tabs">
      <button class:active={modo === 'login'} on:click={() => cambiarModo('login')}>
        Iniciar sesión
      </button>
      <button class:active={modo === 'registro'} on:click={() => cambiarModo('registro')}>
        Crear cuenta
      </button>
    </div>

    <h2>{modo === 'login' ? 'Bienvenido de nuevo' : 'Crea tu cuenta'}</h2>

    {#if modo === 'registro'}
      <div class="role-picker">
        <button class:active={rol === 'cliente'} on:click={() => (rol = 'cliente')}>
          Busco maquinaria
        </button>
        <button class:active={rol === 'proveedor'} on:click={() => (rol = 'proveedor')}>
          Ofrezco maquinaria
        </button>
      </div>

      <label for="a-nombre">Nombre</label>
      <input id="a-nombre" type="text" bind:value={nombre} placeholder="Tu nombre o empresa" />
    {/if}

    <label for="a-correo">Correo</label>
    <input id="a-correo" type="email" bind:value={correo} placeholder="correo@ejemplo.com" />

    <label for="a-clave">Contraseña</label>
    <input
      id="a-clave"
      type="password"
      bind:value={clave}
      placeholder="Mínimo 6 caracteres"
      on:keydown={(e) => e.key === 'Enter' && enviar()}
    />

    {#if error}<p class="auth-error">{error}</p>{/if}

    <button class="auth-submit" on:click={enviar}>
      {modo === 'login' ? 'Entrar' : 'Registrarme'}
    </button>
  </div>
</section>
