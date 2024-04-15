<template>
    <div class="hero bg-primary fullscreen" style="margin-top: -15px;">
        <div class="hero-body">
            <div class="content">
                <h1 class="title text-white">Welcome to easydocs</h1>
                <h3 class="subtitle text-gray-200">Easily create and share web-based documents in your browser</h3>
                <NuxtLink to="onboard" class="u u-LR text-white" style="font-size: 3rem;">Get started &rarr;</NuxtLink>
            </div>
        </div>
    </div>
</template>

<script setup>
    import {Client, Account} from 'appwrite'
    useHead({
        title: "easydocs - Home"
    })

    /**
    * Initializes an Appwrite client and retrieves the current user account.
    * If the user is authenticated, redirects to the dashboard page.
    */
    const client = new Client()
    client
        .setEndpoint('https://cloud.appwrite.io/v1')
        .setProject('65a5d2f3452da7d00e0b')

    const account = new Account(client)
    const acc = account.get();
    acc.then((res) => {
        navigateTo('/app/dashboard')
    })
</script>