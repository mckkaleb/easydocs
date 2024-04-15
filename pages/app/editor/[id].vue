<template>
    <div class="row">
        <div class="col-9">
            <ClientOnly>
                <Editor :id="$route.params.id"></Editor>
            </ClientOnly>
        </div>
        <div class="col-3">
            <div class="tab-container">
                <ul>
                    <li :class="{'selected': tab == 1}">
                        <div class="tab-item-content" @click="tab = 1">Using the editor</div>
                    </li>
                    <li :class="{'selected': tab == 2}">
                        <div class="tab-item-content" @click="tab = 2">Notes & definitions</div>
                    </li>
                </ul>
            </div>
            <div class="mt-2 p-1 u-round-sm" v-if="tab == 2">
                <h6>Public documents</h6>
                <p>
                    When you elect to make a document public, a link will be generated that anyone can use to view the
                    document.
                    Only you will be able to edit the document.
                </p>
                <h6>Saving changes</h6>
                <p>
                    No changes will be recorded until you click the "Save" button, if you navigate away from the page
                    without clicking "Save",
                    all changes will be lost
                </p>
                <h6>Document names</h6>
                <p>
                    Every document <strong>must</strong> have a name. This name does not need to be unique.
                </p>
            </div>
            <div class="mt-2 p-1 u-round-sm u-overflow-y-scroll u-overflow-x-hidden" style="max-height: 540px;" v-if="tab == 1">
                <h6>Adding images</h6>
                <p>
                    To add an image, simply paste a valid URL that serves the image.
                </p>
                <p>
                    You can upload images for free by creating an account on <NuxtLink class="u u-C" to="https://imgcdn.dev/" target="_blank">imgcdn</NuxtLink> (opens in new tab)
                </p>
                <div class="toast toast--warning">
                    <p>If you upload to imgcdn as a guest, your images will be deleted after two weeks</p>
                </div>
                <h6>Inline toolbar</h6>
                <p>Other tools can be found by clicking the "plus" icon to the left of the editor</p>
                <h6>Blocks</h6>
                <p>
                    The editor is orgonaized into blocks. Only one type of content per block.
                    Blocks may be reordered from the inline toolbar
                </p>
                <h6>Highlighting, underlining, bold</h6>
                <p>These  options are avialable by Highlighting the text you want to modeify with your mouse</p>
            </div>
        </div>
    </div>
</template>

<script setup>
definePageMeta({
    layout: 'signedin'
})

const tab = useState('tab', () => 2)
</script>