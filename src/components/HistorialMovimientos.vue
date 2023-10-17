<template>
    <div>
      <div v-for="transaccion in transacciones" :key="transaccion._id" class="item-transaccion">
          <h2>TRANSACCION REALIZADA EL DIA: {{ transaccion.datetime }}</h2>
          <button @click="verDetalles(transaccion._id)" class="boton-ver">Ver</button>
          <button @click="editarTransaccion(transaccion._id)" class="boton-editar">Editar</button>
          <button @click="confirmacionEliminar(transaccion._id)" class="boton-eliminar">Eliminar</button>
          <hr>
      </div>
     
      <div v-if="transaccionSeleccionada" class="detalles-transaccion">
        <h3>Detalles de la Transacción</h3>  
        <p>Criptomoneda: {{ transaccionSeleccionada.crypto_code }}</p>
        <p>Cantidad: {{ transaccionSeleccionada.crypto_amount }}</p>
        <p>Dinero (ARS): {{ transaccionSeleccionada.money }}</p>
        <p>Acción: {{ transaccionSeleccionada.action }}</p>
        <button @click="cerrarDetalles" class="boton-cerrar">Cerrar</button>
      </div>
        
      <div v-if="edicionTransaccion" class="edicion-formulario">
        <h3>Editar Transacción</h3>
        <form @submit.prevent="guardarTransaccionEditada">
          <label for="fecha-hora">Fecha y Hora:</label>
          <input type="text" v-model="transaccionEditada.datetime" id="fecha-hora" name="fecha-hora" required>
  
          <label for="cryptoTipo">Criptomoneda:</label>
          <input type="text" v-model="transaccionEditada.crypto_code" id="cryptoTipo" name="cryptoTipo" required>
  
          <label for="cryptoCantidad">Cantidad:</label>
          <input type="number" v-model="transaccionEditada.crypto_amount" id="cryptoCantidad" name="cryptoCantidad" required>
  
          <label for="dinero ">Dinero (ARS):</label>
          <input type="number" v-model="transaccionEditada.money" id="dinero" name="dinero" required>
  
          <label for="accion">Acción:</label>
          <input type="text" v-model="transaccionEditada.action" id="accion" name="accion" required>
  
          <button class="botOk-cambios" type="submit" >Guardar Cambios</button>
          <button class="boton-cancelar" @click="cerrarFormulario">Cancelar</button>
        </form>
      </div> 
    </div>
    </template>
    
    <script>
    import apiClient from '@/services/apiClient';
    
    export default {
      data() {
        return {
          transacciones: [],
          edicionTransaccion: null,
          transaccionEditada: {},
          transaccionSeleccionada: null,
        }
      },
    
      created() {
        this.cargarHistorial();
      },

      methods: {
        async cargarHistorial() {
          try {
            const response = await apiClient.get(`/transactions?q={"user_id": "${this.$store.state.userId}"}`);
            this.transacciones = response.data;
            console.log('Datos cargados:', this.transacciones);
          } catch (error) {
            console.error('Error al cargar el historial de movimientos:', error);
          }
        },
        
        async editarTransaccion(transaccionId) {
         const transaccion = this.transacciones.find(t => t._id === transaccionId);
         if (transaccion) {
         this.transaccionEditada = { ...transaccion };
         this.edicionTransaccion = transaccion._id;
         console.log('Transacción editada:', this.transaccionEditada);
          }
        },
 
      async guardarTransaccionEditada() {
        try {
          await apiClient.patch(`/transactions/${this.edicionTransaccion}`, this.transaccionEditada);
          this.cerrarFormulario();
          console.log('Transacción editada y guardada con éxito:', this.transaccionEditada);
        } catch (error) {
          console.error('Error al guardar los cambios:', error);
        }
      },

      cerrarFormulario() {
        this.edicionTransaccion = null;
        this.transaccionEditada = {};
      },
    
      async eliminarTransaccion(transaccionId) {
        try {
          await apiClient.delete(`/transactions/${transaccionId}`);
          this.cargarHistorial();
        } catch (error) {
          console.error('Error al eliminar la transacción:', error);
        }
      },

      verDetalles(transaccionId) {
      this.transaccionSeleccionada = this.transacciones.find(t => t._id === transaccionId);   
      },
 
      cerrarDetalles() {
        this.transaccionSeleccionada = null;
      },
 
    async confirmacionEliminar(transaccionId) {
      if (window.confirm('¿Estás seguro de que quieres eliminar esta transacción?')) {
        await this.eliminarTransaccion(transaccionId);
      }
    }, 
    },
  };
  </script>
    
  <style scoped>
  .item-transaccion {
    border: 1px solid #ccc;
    padding: 20px;
    margin: 10px;
    background-color: #f9f9f9;
  }
  .item-transaccion:hover{
    transform: scale(1.03);
    box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2);
  } 
  .detalles-transaccion{
    border: 1px solid #443e3e;
    background-color: #f0f0f0;
    padding: 20px;
    position: fixed;
    top: 30%;
    left: 50%;
    transform: translate(-50%, -50%); 
    width: 30%;
  }
  .edicion-formulario {
    border: 1px solid #443e3e;
    background-color: #f0f0f0;
    padding: 20px;
    position: fixed;
    top: 30%;
    left: 50%;
    transform: translate(-50%, -50%); 
    width: 30%;
  }
  .edicion-formulario label {
    display: block; 
    margin-top: 10px; 
  }
  .edicion-formulario button {
    display: block; 
    margin-top: 10px;
  }
  button {
    padding: 5px 10px;
    margin: 5px;
    cursor: pointer;
    border: none; 
  }
  .botOk-cambios {
    background-color: green;
    color: white;
    margin: 0 auto;
  }
  .boton-cancelar {
    background-color: red; 
    color: white;
    margin: 0 auto;
  }
  .boton-cerrar {
    background-color: #007bff;
    color: white;
  }
  button.boton-editar {
    background-color: #007bff;
    color: white;
  }
  button.boton-eliminar {
    background-color: #dc3545;
    color: white;
  }
  button:hover {
    filter: brightness(1.2);
  }
  .boton-ver {
    background-color: #28a745; 
    color: white;
  }
  </style>
    