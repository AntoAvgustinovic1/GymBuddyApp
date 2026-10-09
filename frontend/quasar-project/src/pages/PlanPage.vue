<template>
    placeholder
    <div>{{ currentPlanId }}</div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router';

onMounted()

const router=useRoute()
const currentPlanId= ref(router.query.planId)
</script>
