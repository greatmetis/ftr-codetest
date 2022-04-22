<template>
  <div id="app w-screen h-screen bg-white container">
    <h1 class="text-center text-3xl font-bold mt-20 mb-10">Hello world, this is FTR Coding Test</h1>
    <div class="container flex justify-center items-center w-full">
      <Prompt
      v-if="!isGame"
      @get_time="get_time"/>
      <div 
      v-else
      class="w-full">
        <Dialogue
        id="dialogue"
        :inputs="inputs" 
        @submitText="submit_text"/>
        <div class="text-right mt-4 font-semibold text-gray-dark">The program will display your list of number in {{currentTimer}} sec.</div>
          <div v-if="isGame" class="mt-10 text-right">
            <p>Tips:</p>
            <ul>
              <li>Type <strong>halt</strong> to pause</li>
              <li>Type <strong>resume</strong> to continue</li>
              <li>Type <strong>quit</strong> to quit the program</li>
            </ul>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import Prompt from '@/components/Prompt'
import Dialogue from '@/components/Dialogue'

export default {
  name: 'App',
  components: {
    Prompt,
    Dialogue
  },
  data(){
    return{
      isGame:false,
      time:null,
      timer:null,
      currentTimer:null,
      timerStatus:false,
      inputText:'',
      inputs:[],
      listNumber:{},
      sortedList:[],
    }
  },
  
  methods:{
    
    get_time(sec){
      this.time = +sec
      this.get_currentTimer()
      this.start_timer()
    },
    get_currentTimer(){
      this.currentTimer = this.time
      this.pushFtrMsg(`Your outputting frequency is ${this.currentTimer} seconds`)
    },
    start_timer(){
      if(!this.currentTimer || this.currentTimer>this.time){
        alert('Error! Please re-enter frequncy in seconds')
        this.isGame = false
        return
      }
      this.timerStatus = true
      this.timer = setInterval(this.countdownTimer,1000)
    },
    countdownTimer(){
      if(this.currentTimer>0 && this.timerStatus === true){
        this.currentTimer--
      }
    },
    pause_timer(){
      this.timerStatus = false
      clearInterval(this.timer)
      this.pushUserMsg(`${this.inputText}`)
      this.pushFtrMsg(`Timer has been paused`)
    },
    resume_timer(){
      this.timerStatus = true
      this.start_timer()
      this.pushUserMsg(`${this.inputText}`)
      this.pushFtrMsg(`Timer started again.`)
    },
    async quit_app(){
      this.pushUserMsg(`${this.inputText}`)
      // display the number list && farewell msg
      if(this.currentTimer!==0){
        await this.resetTimer()  
      }else{
        this.create_list()
      }
      this.pushFtrMsg(`Thanks for playing with me. Have a nice day😬`)
      this.inputText = ''
    },
    submit_text(val){
      if(this.timerStatus){
        this.inputText = val
        // check if inputText is a valid number
        const reg = function (str){
          return /^\d+$/.test(str)
        }
        if(reg(val)){
          // create new data in the list for sorting
          let num = this.inputText
          if(this.listNumber === null){
            this.listNumber[`${num}`] = 1
          }else{
            num in this.listNumber ?
            this.listNumber[`${num}`] += 1 : this.listNumber[`${num}`] = 1
            
          }
          // check if the the number is FIB
          if(this.check_fibonacci(val)){
            this.pushUserMsg(`${this.inputText}`)
            this.pushFtrMsg(`FIB`)
            return
          }
          this.pushUserMsg(`${this.inputText}`)
        }
      }
      
      // the number can't be submitted when the timer is paused, only these conditions:

      if(!this.timerStatus && this.currentTimer>0){
        // quit
        if(val ==='quit'){
          this.inputText = val
          return
        }
        // resume
        else if(val === 'resume'){
          this.inputText = val
          return
        }
        this.pushFtrMsg(`Please type 'resume' to start the timer and enter your number.`)
      }
      // second quit to restart the game
      if(!this.timerStatus && this.currentTimer===0){
        this.inputText = val
        this.inputText === 'quit' ? 
        this.reset_game() : this.pushFtrMsg(`Please type 'quit' to reset the timer.`)
      }

    },
    check_fibonacci(num){
      // ==== A number is Fibonacci if and only if one or both of (5*n2 + 4) or (5*n2 – 4) is a perfect square ==== //
      // check if the given number is belonged in FIB
      let n = num && parseInt(num)
      let p1 = 5 * n*n + 4
      let p2 =  5 * n*n - 4
      if(Math.sqrt(p1)%1 ===0 || Math.sqrt(p2)%1 === 0){
        return true
      }
      return false
    },
    resetTimer(){
      this.currentTimer = 0
      this.timerStatus = false
      clearInterval(this.timer)
      
    },
    create_list(){
      // create a sortable array
      for(let num in this.listNumber){
        this.sortedList.push([`${num}`,this.listNumber[`${num}`]])
      }
      // sort the list
      this.sortedList.sort((a,b)=>b[1]-a[1])

      // display the list
      let readableList = ''
      this.sortedList.forEach(list=>{
        readableList += `${list[0]}: ${list[1]}, `
      })
      readableList = readableList.slice(0,-1)
      // let newStr = readableList.slice(0,-1)
      this.pushFtrMsg(`Here is the list of numbers in frequency descending order ${readableList}`)
    },
    dialogueWindowHeight(){
      // FIXME: scroll to the bottom of the div
      if(this.isGame){
        const dialogueWindow = document.querySelector("#dialogue").firstElementChild
        let height = dialogueWindow.scrollHeight
        dialogueWindow.scrollTo({
          top:height,
          behavior:'smooth'
        })

      }
    },
    pushUserMsg(msg){
      this.inputs = [...this.inputs, 
        {
          type:'user',
          msg:msg
        }
      ]
      this.dialogueWindowHeight()
    },
    pushFtrMsg(msg){
      this.inputs = [...this.inputs, 
        {
          type:'ftr',
          msg:msg
        }
      ]
      this.dialogueWindowHeight()
    },
    reset_game(){
      this.isGame = false,
      this.time = null,
      this.timer = null,
      this.currentTimer = null,
      this.timerStatus = false,
      this.inputText = '',
      this.inputs = [],
      this.listNumber = {},
      this.sortedList = [],
      this.height = null
    }
  },
  watch:{
    time(){
      if(this.time || this.time >0){
        this.isGame = true
        return
      } 
      this.isGame = false
    },
    inputText(){
      // quit- can be execute whenever
      if(this.inputText === 'quit'){
        this.quit_app()
      }
      // resume- can only be executed while the timer is paused and currentTime is not 0
      else if(this.inputText === 'resume'){
        this.resume_timer()
      }
      
      else if(this.inputText === 'halt'){
        this.pause_timer()
        return
      }
      else{
        this.submit_text()
        return
      }  

    },
    currentTimer(){
      if(this.currentTimer === 0){
        this.create_list()
        this.timerStatus = false
        clearInterval(this.timer)
      }  
    }
  },
}
</script>

<style lang="scss">

</style>
