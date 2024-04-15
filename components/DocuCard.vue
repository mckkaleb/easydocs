<template>
    <div class="tile u-items-center w-80p u-shadow-sm p-2">
        <div class="tile__icon">
            <figure class="avatar bg-light"><img src="/file-text.svg" style="margin-top: 14px; margin-left: 15px;"></figure>
        </div>
        <div class="tile__container u-overflow-hidden">
            <p class="tile__title m-0 u-text-no-wrap"><b>{{ title }}</b></p>
            <span class="info">Created on {{ timestamp }} <div class="tag tag--info u-pull-righ" v-if="public">Public</div></span>
        </div>
        <div class="tile__buttons m-0">
            <button class="btn-primary btn--sm uppercase" @click="openEditor">Open</button>
        </div>
    </div>
</template>

<script setup>
    const props = defineProps(["title", "id", "public", "timestamp"])

    /**
     * Opens the editor for the document with the specified ID.
     *
     * @param {string} props.id - The ID of the document to open in the editor.
     */
    function openEditor() {
        navigateTo('/app/editor/' + props.id)
    }
</script>