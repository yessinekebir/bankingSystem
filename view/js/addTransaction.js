Vue.component('addTransaction', {
  props:['transaction', 'fn','add'],
  template: `
  <div class="form margin-top">
  <p class="form-title">Invia denaro</p>
  <div class="form-group col-md-9 offset-md-1">
    <label for="inputIBAN">IBAN</label>
    <input  type="text" class="form-control" id="inputIBAN" placeholder="Inserisci l'IBAN">
      <div class="col-md-3 offset-md-4 margin-top">
        <button type="button" @click='fn' class="btn btn-success">Invia denaro</button>
        </div>
  </div>
  </div>
  `
})
