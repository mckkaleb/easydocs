<template>
    <h2 class="u-text-center">{{ name }}</h2>
    <div id="editor"></div>
</template>

<script setup>
import EditorJs from '@editorjs/editorjs'
import Header from '@editorjs/header'
import NestedList from '@editorjs/nested-list'
import Checklist from '@editorjs/checklist'
import Paragraph from '@editorjs/paragraph'
import Quote from '@editorjs/quote'
import Delimiter from '@editorjs/delimiter'
import SimpleImage from '@editorjs/simple-image'
import Link from '@editorjs/link'
import Table from '@editorjs/table'
import Code from '@editorjs/code'
import Marker from '@editorjs/marker'
import Underline from '@editorjs/underline'
import { Client, Databases, Query } from 'appwrite'

const route = useRoute()
const name = useState('name', () => '')

/**
 * Fetches a document from the Appwrite database and renders its content using the EditorJS library.
 *
 * The code first creates a new Appwrite client and database instance, then fetches a document from the database
 * based on the current route's `id` parameter. If a document is found and its `public` field is `true`, the
 * document's `name` is set as the page's title, and the document's `content` is parsed and rendered using the
 * EditorJS library. If no document is found, the user is redirected to the `/share/notfound` route.
 */
const client = new Client()
client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('65a5d2f3452da7d00e0b')
let db = new Databases(client)
db.listDocuments('65a5d3f606364222bf86', '65a5d40ecaf694b4edd2', [Query.equal('$id', [route.params.id]), Query.equal('public', [true])])
    .then(res => {
        if (res.documents.length == 1) {
            name.value = res.documents[0].name
            new EditorJs({
                holder: "editor",
                tools: {
                    header: {
                        class: Header,
                        inlineToolbar: true
                    },
                    list: {
                        class: NestedList,
                        inlineToolbar: true
                    },
                    checklist: {
                        class: Checklist,
                        inlineToolbar: true
                    },
                    paragraph: {
                        class: Paragraph,
                        inlineToolbar: true
                    },
                    quote: {
                        class: Quote,
                        inlineToolbar: true
                    },
                    delimiter: {
                        class: Delimiter,
                        inlineToolbar: true
                    },
                    image: SimpleImage,
                    link: {
                        class: Link,
                        inlineToolbar: true
                    },
                    table: {
                        class: Table,
                        inlineToolbar: true
                    },
                    code: {
                        class: Code,
                        inlineToolbar: true
                    },
                    marker: {
                        class: Marker,
                        shortcut: "CMD+SHIFT+M"
                    },
                    underline: {
                        class: Underline
                    }
                },
                data: JSON.parse(res.documents[0].content),
                readOnly: true
            })
        } else {
            navigateTo('/share/notfound')
        }
    })
</script>