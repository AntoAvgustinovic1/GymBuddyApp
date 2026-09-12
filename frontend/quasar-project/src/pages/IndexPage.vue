
<template>
  <q-page class="flex flex-center">
    <div>
      <q-btn
        label="+"
        @click="addWorkoutListDialog=true"/>
    </div>
    <div>
      <q-card
      v-for= "workout in workoutList"
      :key="workout.id"
      >
      <q-card-section>
       <q-btn
       flat
       @click="$router.push('/plan')"
       >
       <div>{{ workout.WorkoutName}}</div></q-btn> 
      </q-card-section>
        
      </q-card>
    </div>
  </q-page>
  <div>
  <q-dialog v-model="addWorkoutListDialog">
    <q-card>
      <q-card-section>
        <q-input v-model="WorkoutListName" label="Name of workouts:"></q-input>
        <q-input v-model="WorkoutDescription" label="Descripte the workout:"></q-input>
        <q-select v-model="NumberOfWeeks" label="Number of weeks:" :options="WeekOptions"></q-select>
      </q-card-section>
      <q-card-actions>
        <q-btn label="create" @click="addWorkout1"></q-btn>
        <q-btn label="close" v-close-popup></q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>
  </div>
</template>

<script setup>
import {onMounted, ref} from 'vue'
//import {axios} from 'axios'
import { test, getLists, addWorkout } from '../../../../backend/index.js';

onMounted(async()=>{
workoutList.value= await getLists()

}
)

const addWorkoutListDialog = ref(false);
const NumberOfWeeks= ref(1)
const WeekOptions=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]

const WorkoutListName = ref([])
const WorkoutDescription=ref([])
const workoutList = ref([])


async function addWorkout1(){
  await addWorkout(WorkoutListName.value, WorkoutDescription.value, NumberOfWeeks.value)
  addWorkoutListDialog.value=false;
  workoutList.value=await getLists();
}

console.log(test());
</script>