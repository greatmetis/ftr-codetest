<template>
  <div class="relative bg-gray-light shadow-md p-4 rounded-md h-[500px] w-full flex flex-col justify-between">
    <!-- dialogue window-->
    <div class="h-full flex flex-col overflow-y-scroll overflow-x-hidden pb-10">
      <div v-for="(input,index) in inputs" :key="index" class="flex items-center mt-4" :class="{'ml-auto' : input.type=='user'}">
        <div class="w-[50px] h-[50px] rounded-full flex justify-center items-center" 
        :class="[input.type=='user' ? ['bg-secondary','order-2','ml-2']:['bg-primary','mr-2']]">
          <span class="text-white font-bold uppercase text-sm ">{{input.type}}</span>
        </div>
          <p class="bg-white p-4 rounded-md">{{input.msg}}</p>
      </div>
    </div>
    <!-- input text -->
    <div class=" w-fullbg-gray-light gap-5 flex jusitfy-end relative top-0 left-0">
      <input
      v-model="inputText"
      class="w-full h-[50px] text-right px-4 focus:outline-none focus:shadow-inner" type="text"
      @keyup.enter="submitText"
      >
      <button
      ref="submitBtn"
      @click="submitText" 
      class="p-2 bg-secondary text-white rounded-md"
      :class="[emptyInput ? ['opacity-70'] :'opacity-100']"
      >Submit
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name:'Dialogue',
  data(){
    return{
      inputText:'',
    }
  },
  props:['inputs'],
  methods:{
    submitText(){
      this.$emit('submitText',this.inputText)
      this.inputText = ''
    }
  },
  computed:{
    emptyInput(){
      return this.inputText === '' ? true : false
    },
  },
}
</script>

<style>

</style>