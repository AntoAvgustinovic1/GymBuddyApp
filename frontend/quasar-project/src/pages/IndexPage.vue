<template>
  <q-page class="flex flex-center">
    <div>
      <q-btn
        label="+"
        @click="AddWorkoutList=true"/>
    </div>
    <div>
      <q-card>
        placeholder
      </q-card>
    </div>
  </q-page>
  <div>
  <q-dialog v-model="AddWorkoutList">
    <q-card>
      <q-card-section>
        <q-input v-model="WorkoutListName" label="Name of workouts:"></q-input>
        <q-input v-model="WorkoutDescription" label="Descripte the workout:"></q-input>
        <q-select v-model="NumberOfWeeks" label="Number of weeks:" :options="WeekOptions"></q-select>
      </q-card-section>
      <q-card-actions>
        <q-btn label="save" @click="placeholder"></q-btn>
        <q-btn label="close" v-close-popup></q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>
  </div>
</template>

<script setup>
import {ref} from 'vue'

const AddWorkoutList = ref(false);
const WeekOptions=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]
</script>