<script>
  import { usuario } from '../lib/sesion.js';
  import { publicados } from '../lib/equipos.js';
  import { formatoPrecio } from '../lib/datos.js';

  const categorias = ['Construcción', 'Elevación', 'Compactación', 'Transporte', 'Otra'];

  let nombre = '';
  let categoria = 'Construcción';
  let ubicacion = '';
  let precio = '';
  let telefono = '';
  let descripcion = '';
  let specsTexto = '';
  let imagen = '';
  let error = '';
  let ok = '';

  $: misEquipos = $usuario
    ? $publicados.filter((e) => e.propietario === $usuario.correo)
    : [];

  function leerImagen(archivo) {
    return new Promise((resolve, reject) => {
      const lector = new FileReader();
      lector.onload = () => {
        const img = new Image();
        img.onload = () => {
          const max = 800;
          const escala = Math.min(1, max / Math.max(img.width, img.height));
          const c = document.createElement('canvas');
          c.width = Math.round(img.width * escala);
          c.height = Math.round(img.height * escala);
          c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
          resolve(c.toDataURL('image/jpeg', 0.7));
        };
        img.onerror = reject;
        img.src = lector.result;
      };
      lector.onerror = reject;
      lector.readAsDataURL(archivo);
    });
  }

  async function elegirFoto(e) {
    const archivo = e.target.files[0];
    if (!archivo) return;
    try {
      imagen = await leerImagen(archivo);
    } catch {
      error = 'No se pudo leer la imagen.';
    }
  }

  function publicar() {
    error = '';
    ok = '';

    if (!nombre.trim() || !ubicacion.trim() || !precio || !telefono.trim()) {
      error = 'Completa nombre, ubicación, precio y teléfono.';
      return;
    }
    if (Number(precio) <= 0) {
      error = 'El precio debe ser mayor a 0.';
      return;
    }

    const nuevo = {
      id: Date.now(),
      propietario: $usuario.correo,
      nombre: nombre.trim(),
      categoria,
      ubicacion: ubicacion.trim(),
      precio: Number(precio),
      imagen: imagen || '/img/excavadora.jpg',
      proveedor: $usuario.nombre,
      telefono: telefono.replace(/\D/g, ''),
      descripcion: descripcion.trim() || 'Sin descripción.',
      specs: specsTexto.split('\n').map((s) => s.trim()).filter(Boolean)
    };

    publicados.update((lista) => [...lista, nuevo]);

    nombre = '';
    ubicacion = '';
    precio = '';
    telefono = '';
    descripcion = '';
    specsTexto = '';
    imagen = '';
    ok = 'Equipo publicado. Ya aparece en el catálogo.';
  }

  function eliminar(id) {
    if (confirm('¿Eliminar este equipo?')) {
      publicados.update((lista) => lista.filter((e) => e.id !== id));
    }
  }
</script>

{#if !$usuario}
  <section class="detail">
    <p>Inicia sesión para entrar a tu panel.</p>
    <a class="back" href="#/acceso">Ir a iniciar sesión →</a>
  </section>
{:else if $usuario.rol !== 'proveedor'}
  <section class="detail">
    <p>Esta sección es solo para proveedores. Crea una cuenta con la opción "Ofrezco maquinaria".</p>
    <a class="back" href="#/">← Volver al inicio</a>
  </section>
{:else}
  <section class="page-header">
    <p class="section-tag">PANEL DEL PROVEEDOR</p>
    <h2>Hola, {$usuario.nombre}</h2>
  </section>

  <section class="panel-layout">
    <div class="panel-form">
      <h3>Publicar un equipo</h3>

      <label for="p-nombre">Nombre del equipo</label>
      <input id="p-nombre" type="text" bind:value={nombre} placeholder="Ej. Excavadora CAT 320" />

      <label for="p-cat">Categoría</label>
      <select id="p-cat" bind:value={categoria}>
        {#each categorias as c}<option>{c}</option>{/each}
      </select>

      <label for="p-ubi">Ubicación</label>
      <input id="p-ubi" type="text" bind:value={ubicacion} placeholder="Ej. Mérida, Yucatán" />

      <label for="p-precio">Precio por día (MXN)</label>
      <input id="p-precio" type="number" min="1" bind:value={precio} placeholder="2500" />

      <label for="p-tel">WhatsApp (con código de país)</label>
      <input id="p-tel" type="text" bind:value={telefono} placeholder="529991234567" />

      <label for="p-desc">Descripción</label>
      <textarea id="p-desc" rows="3" bind:value={descripcion}></textarea>

      <label for="p-specs">Especificaciones (una por línea)</label>
      <textarea id="p-specs" rows="3" bind:value={specsTexto} placeholder={'Peso: 20 ton\nOperador incluido: Sí'}></textarea>

      <label for="p-foto">Foto</label>
      <input id="p-foto" type="file" accept="image/*" on:change={elegirFoto} />
      {#if imagen}<img class="preview" src={imagen} alt="Vista previa" />{/if}

      {#if error}<p class="auth-error">{error}</p>{/if}
      {#if ok}<p class="ok-msg">{ok}</p>{/if}

      <button class="auth-submit" on:click={publicar}>Publicar equipo</button>
    </div>

    <div>
      <h3>Mis equipos ({misEquipos.length})</h3>

      {#if misEquipos.length === 0}
        <p class="empty">Aún no has publicado equipos.</p>
      {:else}
        <div class="my-list">
          {#each misEquipos as e (e.id)}
            <div class="my-item">
              <img src={e.imagen} alt={e.nombre} />
              <div>
                <strong>{e.nombre}</strong>
                <p>{e.ubicacion} · {formatoPrecio(e.precio)}</p>
              </div>
              <a href={`#/maquina/${e.id}`}>Ver</a>
              <button on:click={() => eliminar(e.id)}>Eliminar</button>
            </div>
          {/each}
        </div>
      {/if}
    </div>
  </section>
{/if}
