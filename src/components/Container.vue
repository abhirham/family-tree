<template>
    <div class="Container">
        <v-row justify="center">
            <ImageCard />
            <ImageCard />
            <ImageCard />
            <ImageCard />
            <ImageCard />
            <ImageCard />
            <ImageCard />
            <ImageCard />
        </v-row>
    </div>
</template>

<script>
import ImageCard from "./ImageCard.vue";

export default {
    name: "Container",
    components: {
        ImageCard,
    },
};
</script>
