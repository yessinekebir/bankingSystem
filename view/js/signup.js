Vue.component('signup', {
  props:['user', 'fn','sign'],
  template: `
  <div class="form margin-top">
  <p class="form-title">Registrazione</p>
  <div class="form-group col-md-9 offset-md-1">
    <label for="inputName">Nome</label>
    <input v-model='user.name' type="text" class="form-control" id="inputName" placeholder="Il tuo nome..">
    <label for="inputSurname">Cognome</label>
    <input v-model='user.surname' type="text" class="form-control" id="inputSurname" placeholder="Il tuo cognome..">
    <label for="inputCountry">Nazionalita'</label>
    <input v-model='user.country' type="text" class="form-control" id="inputCountry" placeholder="La tua nazione">
    <label for="inputEmail">Email</label>
    <input v-model='user.email' type="email" class="form-control" id="inputEmail" placeholder="La tua email.." required="true">
    <label for="inputPassword">Password</label>
    <input v-model='user.password' type="password" class="form-control" id="inputPassword" pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$" placeholder="Inserisci una password..(a-z+A-Z+0-9)" required>
        <div class="col-md-3 offset-md-4 margin-top">
        <button type="button" @click='fn' class="btn btn-success">Registrati</button>
        </div>
  </div>
  </div>
  `
})
