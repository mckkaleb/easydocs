<template>
    <h3 class="p-4 bg-primary text-white">Hello, {{ user?.name }}</h3>
    <div class="row p-4">
        <div class="col-6">
            <div class="level pr-6">
                <h5>My Documents</h5>
                <button class="outline btn-primary mr-12" @click="newDoc">New Document</button>
            </div>
            <div v-for="doc in documentList">
                <DocuCard :title="doc.name" :timestamp="doc.$createdAt" :id="doc.$id" :public="doc.public"></DocuCard>
            </div>

        </div>
        <div class="col-6">
            <img src="/undraw_hello_re_3evm.svg" class="w-60p mx-12 my-5">
        </div>
    </div>
</template>

<script setup>
    import {Client, Account, Databases, Query} from 'appwrite'

    definePageMeta({
        layout: 'signedin'
    })

    const user = useState('user', () => null)
    const documentList = useState('documentList', () => null)
    
    
    // Initializes an Appwrite client, retrieves the current user account, and handles any errors by navigating to the sign-on page.
    const client = new Client()
    client
        .setEndpoint('https://cloud.appwrite.io/v1')
        .setProject('65a5d2f3452da7d00e0b')

    const account = new Account(client)
    const acc = account.get();
    acc.then((res) => {
        user.value = res
        getList()
    }).catch((err) => navigateTo('/signon'))
    
    /**
     * Retrieves a list of documents from the Appwrite database and updates the `documentList` state.
     *
     * This function connects to the Appwrite client, creates a new Databases instance, and then lists the documents
     * from the '65a5d3f606364222bf86' collection in the '65a5d40ecaf694b4edd2' database. It filters the documents
     * to only include those where the `owner` field matches the current user's `$id`. The resulting documents are
     * then stored in the `documentList` state.
     *
     * @returns {void}
     */
    function getList() {
        const db = new Databases(client)
        let docs = db.listDocuments('65a5d3f606364222bf86', '65a5d40ecaf694b4edd2', [Query.select(['name', 'public', '$id', '$createdAt']), Query.equal('owner', user.value.$id)])
        docs.then((res) => documentList.value = res.documents)
    }

    /**
     * Navigates the user to the '/app/editor/new' route, which is the route for creating a new document.
     */
    function newDoc() {
        navigateTo('/app/editor/new')
    }
</script>