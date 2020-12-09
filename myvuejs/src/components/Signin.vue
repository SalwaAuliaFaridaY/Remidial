<template>
<div class="container">
<div v-if="successMessage" class="alert alert-success" role="alert">
  {{successMessage}}
</div>
<div v-if="serverError" class="alert alert-danger" role="alert">
    {{serverError}}
</div>                        
<form @submit.prevent="signin">
  <div class="form-group">
    <label>Email address</label>
    <input type="email" v-model="email" class="form-control" aria-describedby="emailHelp" placeholder="Enter email">
    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div class="form-group">
    <label>Password</label>
    <input type="password"  v-model="password" class="form-control" placeholder="Password">
  </div>
  <button type="submit" class="btn btn-primary">Login</button>
</form>
</div>
</template>

<script>
	export default {
		name: 'Signin',
		props: {
			dataSuccessMessage: {
				type: String,
			}
		},
		data() {
			return {
				email: '',
				password: '',
				serverError: '',
				successMessage: this.dataSuccessMessage
			}
		},
		methods: {
			signin() {
				this.$store.dispatch('login', {
					username: this.email,
					password: this.password
				})
				.then(
                response => {
					this.$router.push({ name: 'Welcome' })
				})
				.catch(error => {
					this.serverError = error.response.data
					this.password = ''
					this.successMessage = ''
				})
			}
		}
	}
</script>