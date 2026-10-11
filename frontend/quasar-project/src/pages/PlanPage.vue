<template>
    placeholder
    <div v-if="workout">
        <div>{{ workout.id }}</div>
        <div>{{ workout.NumberWeeks }}</div>
    </div>
    <q-card v-for="abc in varijabla"
    :key="abc.id">
        <q-btn><div>{{ abc.Day }}</div></q-btn>
    </q-card>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router';
import { FetchWorkout, GetTemplates } from '../../../../backend';

//onMounted(async()=>{workout.value= await FetchWorkout(router.query.planId)})
onMounted(async()=>{
    await Inicijalno(route)
    await templateFunkcija(workout.value)
})

const route=useRoute()
const workout = ref(null)
const varijabla= ref([])
//const idvar= ref(null)
//const currentPlanId= ref()

async function Inicijalno(router){
workout.value= await FetchWorkout(router.query.planId)}

async function templateFunkcija(workout){
const idvar = workout.id
varijabla.value = await GetTemplates(idvar)
}


</script>
