<template>
    <div class="row">
        <div class="col-6 p-12">
            <div class="tile">
                <div class="tile__container">
                    <h3 class="tile__title">Sign in to easydocs</h3>
                    <p class="tile__subtitle mt-2">Don't have an account? <NuxtLink to="onboard">Create one</NuxtLink></p>

                    <div>
                        <label for="email">Email</label>
                        <input type="email" name="email" placeholder="Email" v-model="email">
                        <label for="password">Password</label>
                        <input type="password" name="password" placeholder="Password" v-model="pass">
                        <button class="btn btn-primary w-100p mt-2" :class="{'animated loading hide-text': loading}" @click="signin">Submit</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-6 p-12" style="margin-top: -40px;">
            <img src="/undraw_login_re_4vu2.svg">    
        </div>
    </div>
</template>

<script setup>
    import {Client, Account} from 'appwrite'
    const client = new Client()
    client
        .setEndpoint('https://cloud.appwrite.io/v1')
        .setProject('65a5d2f3452da7d00e0b')

    
    
    const email = useState('email', () => '')
    const pass = useState('pass', () => '')
    const loading = useState('loading', () => false)

    /**
     * Attempts to sign in the user with the provided email and password.
     * If the sign-in is successful, the user is navigated to the dashboard page.
     * If the sign-in fails, an alert is shown indicating that the username or password is incorrect.
     */
    function signin() {
        loading.value = true
        const account = new Account(client)
        const promise = account.createEmailSession(email.value, pass.value)
        promise.then((res) => navigateTo('/app/dashboard')).catch((err) => {
            alert('incorrect username or password')
            loading.value = false
        })
    }
</script>