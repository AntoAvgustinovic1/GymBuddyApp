
<template>
  <q-page class="flex flex-center">
    
    <!--gumb za dodavanje novih workout planova-->
    <div>
      <q-btn
        label="+"
        @click="addWorkoutListDialog=true"/>
    </div>

    <!--prikaz postojecih workout planova-->
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
  
    <!--dijalog za dodavanje novih planova-->
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

    <!--dijalog za unos templatea-->
    <div>
      <q-dialog
      v-model="templatedialog">
      <q-card>

        <q-card
        v-for="days in daysList"
        :key="days.id">
        <q-btn @click="dayDialog=true"><div>{{ days.Day }}</div></q-btn>
        </q-card>  

        <q-card-section>
        <q-btn @click="AddDayFunction">
          Add Day +
        </q-btn>
        
        </q-card-section>

      </q-card>
      </q-dialog>
    </div>

    <!--Dijalog za dodavanje vjezbe u dan-->
    <div>
      <q-dialog
      v-model="dayDialog">
      <q-card style="width: 500px; height: 400px;">
        <q-card-section>
          <q-select v-model="selectedExcersise" label="Excersises" :options="ExcersiseOptions"></q-select>
          <q-input v-model="selectedReps" label="reps"></q-input>
          <q-btn style="margin-top: 10px; background-color: orange;" @click="SaveExcercise">+</q-btn>
          <div>{{ AllExercisesInDay }}</div>
        </q-card-section>
        <q-card-actions>
          <q-btn label="cancel" v-close-popup @click="WipeFunction"></q-btn>
          <q-btn label="Save" @click="SaveDayFunction"></q-btn>
        </q-card-actions>
      </q-card>

      </q-dialog>
    </div>

  </q-page>
</template>

<script setup>
import {onMounted, ref} from 'vue'
//import {axios} from 'axios'
import {getLists, addWorkout, AddDay, GetTemplates, SaveDay } from '../../../../backend/index.js';

onMounted(async()=>{
workoutList.value= await getLists()
}
)

//dialog varijable
const addWorkoutListDialog = ref(false);
const templatedialog = ref(false);
const dayDialog = ref(false);

//varijable za stvaranje novog workout plana
const NumberOfWeeks= ref(1)
const WeekOptions=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]
const WorkoutListName = ref([])
const WorkoutDescription=ref([])
const workoutList = ref([])
const currentPlanId = ref([])

//varijable za template dana
const currentDayId=ref([])
const selectedExcersise=ref("")
const selectedReps=ref([])
const AllExercisesInDay=ref("")
const SaveExcerciseVar=ref([])
const ExcersiseOptions=["Bench Press", "Squat", "Deadlift"]

//varijable za stvaranje dana u tjednu za plan
const counter= ref(1)
const daysList = ref([])


async function AddDayFunction(){
currentDayId.value=await AddDay(currentPlanId.value, counter.value)
counter.value++
daysList.value= await GetTemplates(currentPlanId.value)
//console.log("ID received by AddDay:", currentPlanId)
//console.log("counter:",counter.value)
}

async function addWorkout1(){
  currentPlanId.value= await addWorkout(WorkoutListName.value, WorkoutDescription.value, NumberOfWeeks.value)
  addWorkoutListDialog.value=false;
  templatedialog.value=true;
  //workoutList.value=await getLists();
}

async function SaveExcercise(){
  const temp ={
    exercise: selectedExcersise.value,
    reps: selectedReps.value
  }
  SaveExcerciseVar.value.push(temp)
  AllExercisesInDay.value+=selectedExcersise.value + selectedReps.value + "\n"

  selectedExcersise.value=""
  selectedReps.value= null
  console.log("aaaa: ", AllExercisesInDay.value)
}

async function WipeFunction(){
  AllExercisesInDay.value=""
  SaveExcerciseVar.value=null
  selectedExcersise.value=""
  selectedReps.value=null
}

async function SaveDayFunction(){
  await SaveDay(currentPlanId.value, currentDayId.value)
}

</script>