import apiClient from '@/services/apiClient';

export default (await import('vue')).defineComponent({
data() {
return {
cryptoCode: 'btc',
cryptoAmount: '',
money: '',
datetime: '',
};
},
methods: {
async nuevaCompra() {

if (this.cryptoAmount <= 0 || this.money <= 0) {
alert('La cantidad de criptomonedas y el monto deben ser mayores a 0.');
return;
}

const datosCompra = {
user_id: this.$store.state.userId,
action: 'purchase',
crypto_code: this.cryptoCode,
crypto_amount: this.cryptoAmount,
money: this.money,
datetime: this.datetime,
};

try {
const respuesta = await apiClient.post('/transactions', datosCompra);
console.log('Compra guardada:', respuesta.data);
} catch (error) {
console.error('Error al guardar la compra:', error);
}
}
},
});
