<template>
    placeholder
    <div v-if="workout">
        <div>{{ workout.id }}</div>
        <div>{{ workout.NumberWeeks }}</div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router';
import { FetchWorkout } from '../../../../backend';

onMounted(async()=>{workout.value= await FetchWorkout(router.query.planId)})

const router=useRoute()
const workout = ref(null)
//const currentPlanId= ref()
</script>
