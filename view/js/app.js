var vue = new Vue({
  el: '#app',
  data:{
    status: 'signup',
    newAccount: {
      name: '',
      surname: '',
      email: '',
      password: '',
      amount:null,
      country:'',
      receivedTransactions:[],
      sentTransactions:[],
      iban:''
    },
    userLogin: {email:'',password:''},
    showProfile:false,
    currentAccount: null,
    logIn:false,
    signUp:false,
    accounts: [],
    is404: false,
    is401: false,
    systemMessage:null,
    transaction:false,
    newTransaction:{payer:'',beneficiary:'',amount:null,date:null}
  },
  methods:{
    signup: function() {
      this.$http.post('http://localhost:3001/signup', this.newAccount)
      .then(function(response){
        console.log("response:", response)
        this.systemMessage = 'signedUp';
        this.signUp = !this.signUp;

      })
      .catch(function(err){
        if(err.body.status == 404){
          this.is404=true;
        }
        else if(err.body.status ==401){
          this.is401=true;
        }

        console.log(err);
      })
    },
    login: function() {
      this.systemMessage=null;
      this.$http.post('http://localhost:3001/login', {email: this.userLogin.email, password: this.userLogin.password})
      .then(function(response){
        localStorage.setItem('token', response.body.token);
        this.systemMessage="logged";
        this.me();
        this.logIn= ! this.logIn;
      })
      .catch(function(err){
        if(err.body.status == 404){
          this.is404=true;
        }
        else if(err.body.status ==401){
          this.is401=true;
        }
      })
    },
    logout: function() {
      this.currentAccount = null;
      localStorage.removeItem('token');
    },
    me: function() {
      this.$http.get(`http://localhost:3001/me?token=${localStorage.getItem('token')}`)
      .then(function(response){
        console.log("response:", response);
        this.currentAccount = response.body;
      }).catch(function(err){console.log(err);})
    },
    getAllUsers: function() {
      this.$http.get(`http://localhost:3001/accounts?token=${localStorage.getItem('token')}`)
      .then(function(response){
        this.accounts = response.body;
      })
    },
    addTransaction: function() {
      this.systemMessage = null;
      this.$http.post(`http://localhost:3001/transactions/send/${this.newAccount.iban}?token=${localStorage.getItem('token')}`, this.newTransaction)
      .then(response=>{
        this.systemMessage= 'transactionAdded'
      });
    },
    created(){
      if (localStorage.getItem('token')) {
        this.me();
        this.getAllUsers();
      }
    }
  }
})
