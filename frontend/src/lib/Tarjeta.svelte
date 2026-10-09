<script>
  import { formatoPrecio } from './datos.js';
  export let maquina;
</script>

<article class="machinery-card">
  <div class="image-container">
    <img src={maquina.imagen} alt={maquina.nombre} />
    <span class="available">Disponible</span>
  </div>

  <div class="card-content">
    <p class="category">{maquina.categoria}</p>
    <h3>{maquina.nombre}</h3>
    <p class="location">📍 {maquina.ubicacion}</p>

    <div class="card-footer">
      <strong>{formatoPrecio(maquina.precio)}</strong>
      <a class="btn-detalle" href={`#/maquina/${maquina.id}`}>Ver detalles</a>
    </div>
  </div>
</article>
