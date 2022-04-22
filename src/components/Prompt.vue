<template>
  <div class="min-w-[300px] sm:min-w-[400px] min-h-[250px] bg-gray-light shadow-md p-4 rounded-md flex flex-col items-center" >
    <h2 class="text-center">Please Enter frequncy in seconds...</h2>
    <input
    ref="inputTime"
    v-model="customTime" 
    type="text" 
    class="mt-10 px-2 w-[250px] h-[40px] text-black focus:outline-none focus:shadow-inner"
    @keyup.enter="get_time"
    >
    <p class="mt-10">{{msg}}</p>
    <button
    @click="get_time" 
    class="mt-4 rounded-md bg-primary text-white font-semibold p-2 w-[100px]">Go
    </button>
  </div>
</template>

<script>
export default {
  name:'Prompt',
  data(){
    return{
      customTime:null,
      msg:''
    }
  },
  methods:{
    // accept custom time
    get_time(){
      const reg = function (str){
        return /^\d+$/.test(str)
      }
      if(!this.customTime){
        this.msg = 'Please enter a digit number to resume the game.'
        this.customTime = ''
        this.$refs.inputTime.focus()
      }else if(!reg(this.customTime) || +this.customTime === 0){
        this.msg = 'Please enter digit only and ensure it is greater than 0'
        this.customTime = ''
        this.$refs.inputTime.focus()
      }else{
        this.msg = ''
        this.$emit('get_time',this.customTime)
      }
    },

  }
}
</script>

<style>

</style>