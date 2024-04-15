<template>
    <header class="header py-2 u-shadow-md">
        <div class="header-brand">
            <div class="nav-item no-hover">
                <NuxtLink to="/"><h6>easydocs</h6></NuxtLink>
            </div>
            <div class="nav-item nav-btn" :class="{'active': menuActive}" @click="menuActive = !menuActive">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
        <div class="header-nav" v-if="hideSignin">
            <div class="nav-item">
                <NuxtLink to="/app/dashboard">Dashboard</NuxtLink>
            </div>
        </div>
        <div class="header-nav nav-right" :class="{'active': menuActive}" role="button">
            <div class="nav-item" v-if="!hideSignin">
                <NuxtLink to="signon">Sign in</NuxtLink>
            </div>
            <div class="nav-item no-hover" v-if="!hideSignin">
                <NuxtLink class="btn btn-link" to="onboard">Create an account</NuxtLink>
            </div>
            <div class="nav-item" v-if="hideSignin">
                <button class="btn btn-info u-pull-right" @click="signOut">Sign out</button>
            </div>
        </div>
    </header>
</template>

<script setup>
    import {Client, Account} from 'appwrite'
    defineProps(["hideSignin"])
    const menuActive = useState("menuActive", () => false)

    /**
     * Signs the user out of the application and navigates to the home page.
     */
    function signOut() {
        const client = new Client()
        client
            .setEndpoint('https://cloud.appwrite.io/v1')
            .setProject('65a5d2f3452da7d00e0b')
        const account = new Account(client)
        account.deleteSessions().then(res => navigateTo('/'))
    }
</script>