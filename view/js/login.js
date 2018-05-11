Vue.component('login', {
  props:['accesso', 'fn','log'],
  template: `
  <div class="form margin-top">
  <p class="form-title">Login</p>
  <div class="form-group col-md-8 offset-md-2">
  <label for="inputEmail">Email</label>
  <input v-model='accesso.email' type="email" class="form-control" id="inputEmail" placeholder="La tua email.." required>
  <label for="inputPassword">Password</label>
  <input v-model='accesso.password' type="password" class="form-control" id="inputPassword" pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$" placeholder="Inserisci una password..(a-z+A-Z+0-9)" required>
  <div class="col-md-3 offset-md-4 margin-top">
  <button type="button" @click='fn()' class="btn btn-success">Accedi</button>
  </div>
  </div>
  </div>
  `
})
