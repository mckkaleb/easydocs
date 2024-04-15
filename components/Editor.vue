<template>
    <div class="row">
        <div class="input-control col-6">
            <input type="text" placeholder="Give your document a name" name="name" v-model="title">
        </div>
        <div class="form-ext-control col-3">
            <label class="form-ext-toggle__label mt-2"><span>Make public?</span>
                <div class="form-ext-toggle">
                    <input name="toggleCheckbox" type="checkbox" class="form-ext-input" @click="isPublic = !isPublic" :checked="isPublic"/>
                    <div class="form-ext-toggle__toggler"><i></i></div>
                </div>
            </label>
        </div>
        <div class="col-3">
            <div class="list-dropdown dropdown-right ml-3">
                <button class="btn-dark btn-dropdown m-0">Manage Document</button>
                <ul class="menu">
                    <li class="menu-item" v-if="isPublic"><a href="#" @click="viewLink = true">Sharable link</a></li>
                    <li class="menu-item"><a href="#" class="text-danger" @click="viewDelete = true">Delete</a></li>
                </ul>
            </div>
            <button class="btn btn-success u-pull-right" :class="{'animated loading hide-text': loadingSave}" @click="saveData">Save</button>
        </div>
    </div>
    <div id="editor" class="bg-light u-overflow-y-scroll u-z-0" style="max-height: 540px;"></div>
    <div class="toast toast--success u-z-1 u-fixed w-auto animated fadeIn alternating" :class="{'u-none': !saveSuccess}" style="bottom: 10px;">
        <p>Changes saved successfully!</p>
    </div>
    <div class="modal" :class="{'modal--visible' : viewLink}">
        <a href="#" class="modal-overlay close-btn" aria-label="close" @click="viewLink = false"></a>
        <div class="modal-content">
            <div class="modal-header u-flex u-justify-space-between">
                <div class="modal-title">Sharable link</div>
                <button class="button-transparent ml-12" aria-label="close" @click="viewLink = false">&#x2716</button>
            </div>
            <div class="modal-body">
                <pre><code>{{ link }}</code></pre>
            </div>
            <div class="modal-footer">
                <button class="btn-dark" @click="viewLink = false">Close</button>
            </div>
        </div>
    </div>
    <div class="modal" :class="{'modal--visible' : viewDelete}">
        <a href="#" class="modal-overlay close-btn" aria-label="close" @click="viewDelete = false"></a>
        <div class="modal-content">
            <div class="modal-header u-flex u-justify-space-between">
                <div class="modal-title">Confirm action</div>
                <button class="button-transparent ml-12" aria-label="close" @click="viewDelete = false">&#x2716</button>
            </div>
            <div class="modal-body">
                <p>Are you sure you want to delete this document?</p>
            </div>
            <div class="modal-footer">
                <button class="btn-dark" @click="viewDelete = false">Cancel</button>
                <button class="btn-danger ml-2" @click="deleteDoc">Delete</button>
            </div>
        </div>
    </div>
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
    import {Account, Client, Databases, ID} from 'appwrite'
    
    useHead({
        title: "Editing document - easydocs"
    })

    const props = defineProps(["id"])

    const title = useState("title", () => props.title)
    const isPublic = useState("isPublic", () => props.public === 'true' || false)
    const content = useState('content', () => null)
    const loadingSave = useState('loadingSave', () => false)
    const saveSuccess = useState('saveSuccess', () => false)
    const user = useState('user', () => null)
    const viewDelete = useState('viewDelete', () => false)
    const viewLink = useState('viewLink', () => false)
    const link = 'https://easydocs.fly.dev/share/' + props.id

    let editor;

    const client = new Client()
    client
        .setEndpoint('https://cloud.appwrite.io/v1')
        .setProject('65a5d2f3452da7d00e0b')
    const account = new Account(client)
    const acc = account.get()
    acc.then(res => user.value = res).catch((err) => navigateTo('/signon'))
    const db = new Databases(client)
    if (props.id != 'new') {
        let doc = db.getDocument('65a5d3f606364222bf86', '65a5d40ecaf694b4edd2', props.id)
        doc.then((res) => {
            title.value = res.name
            isPublic.value = res.public
            content.value = res.content
    
            editor = new EditorJs({
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
            placeholder: "Start writing here...",
            data: JSON.parse(content.value) || {}
        })
        })
    } else {
        editor = new EditorJs({
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
            placeholder: "Start writing here...",
            data: JSON.parse(content.value) || {}
        })
    }
    
    function saveData() {
        loadingSave.value = true
        editor.save().then((data) => {
            if (props.id != 'new' && props.id) {
                db.updateDocument('65a5d3f606364222bf86', '65a5d40ecaf694b4edd2', props.id, {
                    "name": title.value,
                    "public": isPublic.value,
                    "content": JSON.stringify(data)
                }).then((res) => {
                    displaySave()
                })
            } else {
                db.createDocument('65a5d3f606364222bf86', '65a5d40ecaf694b4edd2', ID.unique(), {
                    "name": title.value,
                    "public": isPublic.value,
                    "content": JSON.stringify(data),
                    "owner": user.value.$id
                }).then(res => displaySave())
            }
        })
    }
    function displaySave() {
        loadingSave.value = false
        saveSuccess.value = true
        setTimeout(() => {
            saveSuccess.value = false
        }, 3000)
    }
    function deleteDoc() {
        const db = new Databases(client)
        db.deleteDocument('65a5d3f606364222bf86', '65a5d40ecaf694b4edd2', props.id)
            .then(res => {
                name.value = ''
                content.value = ''
                isPublic.value = false
                navigateTo('/app/dashboard')
            })
    }
</script>