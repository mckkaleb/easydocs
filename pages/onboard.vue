<template>
    <div class="row">
        <div class="col-6 p-12">
            <div class="tile">
                <div class="tile__container">
                    <h3 class="tile__title">Create an account</h3>
                    <p class="tile__subtitle mt-2">Already have an account? <NuxtLink to="/signon">Sign in</NuxtLink></p>

                    <div>
                        <label for="name">Name</label>
                        <input type="text" name="name" placeholder="Your name" v-model="name">
                        <label for="email">Email</label>
                        <input type="email" name="email" placeholder="Email" v-model="email">
                        <label for="password">Password <small>Minimum 8 characters</small></label>
                        <input type="password" name="password" placeholder="Password" v-model="pass">
                        <button class="btn btn-primary w-100p mt-2" :class="{'animated loading hide-text': loading}" @click="onboard">Submit</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-6 p-12" style="margin-top: -20px;">
            <img src="/undraw_sign_up_n6im.svg">
        </div>
    </div>
</template>

<script setup>
    import {Client, Account, ID} from 'appwrite'

    const client = new Client()
    client
        .setEndpoint('https://cloud.appwrite.io/v1')
        .setProject('65a5d2f3452da7d00e0b')

    const name = useState('name', () => '')
    const email = useState('email', () => '')
    const pass = useState('pass', () => '')
    const loading = useState('loading', () => false)

    /**
     * Handles the onboarding process for a new user.
     * 
     * This function is called when the user clicks the "Submit" button on the onboarding form.
     * It creates a new Appwrite account with the provided name, email, and password, and then
     * navigates the user to the dashboard page.
     */
    function onboard() {
        loading.value = true
        const account = new Account(client)
        account.create(ID.unique(), email.value, pass.value, name.value)
            .then((res) => navigateTo('/app/dashboard')).catch(err => {
                alert(err)
                loading.value = false
            })
    }
</script>