<template>
<div>
  <div class="form-container">   
   <div>
     <label >Category: </label>
     <select name="categlory" id="category" v-model="category" @change="getCategory()">
       <option v-for="(cat,index) in RACING_CATEGORY_LIST" :key="index" :value="cat.id">{{cat.text}}</option>
       <option value="">All</option>
     </select>
   </div>
  </div>
  <div>
     <div class="common-container header-container" >
        <div v-for="(header,index) in RACE_DATA_FIELD_LIST" :key="index" @click="sortData(header)">         
          {{header.label}}</div>
      </div>
      <div class="content-container">
        <div v-for="(row,rowIndex) in getShowList" :key="rowIndex">
         <div class="common-container" >
          <div v-for="(header,index) in RACE_DATA_FIELD_LIST" :key="index" :class="{[header.startedClass] : row[header.fieldref] ===  COUNT_DOWN_TEXT_START}"
          >{{row[header.fieldref] | countDown(header.filter)}}</div>
         </div>
        </div>
      </div>
  </div>
  </div>
</template>

<script>
import commonMethod from './mixin.vue';
import * as META_DATA from '../assets/metaData';
export default {
  name: 'race',
  data(){
    return{
     RACE_DATA_FIELD_LIST : META_DATA.RACE_DATA_FIELD_LIST,
     RACING_CATEGORY_LIST : META_DATA.RACING_CATEGORY_LIST,
     COUNT_DOWN_TEXT_START: META_DATA.COUNT_DOWN_TEXT_START,
     category:''
    }
  },
  mixins:[commonMethod],
  methods: {
    /**
     * send the API request for getting the 
     * new list of the races from the server
     */
   getRace(){
     this.doRequest(META_DATA.GET_RACE_LIST_API, (data) => {   
          const result = data.data || {};         
          if(result.race_summaries){
            /**making the list of the races using the data from the server */
            const raceList = this.raceListBuilder(result.race_summaries);
            /**saving the list of new races in the 
             * Vuex store
             */
            this.setRace(raceList);  
            /**updaing the show list after new data from the server */ 
            this.updateShowList({category_id: this.category , counts : META_DATA.RACE_COUNT_TO_SHOW});
          }           
        });
   },  
   /**
    * after toggling the select 
    * will pass the new category for 
    * filtering the showing races.
    */
   getCategory(){  
     /**passing category_id and counts of races */ 
     this.builderMethodForGettingRaceOrUpdatingShowList();
   },
   /**
    * checking if we have less than max races 
    * need to get the data from the server
    * oterwise we need to update the show list
    */
   builderMethodForGettingRaceOrUpdatingShowList(){
      /**check if we have less that 5 races 
       * we need to get the new items from the server
       */
      if(this.getShowList.length < 5)
         this.getRace();
         /**update the list of the races 
          * to be shown in the grid every second
          */
        else
         this.updateShowList
         ({category_id: this.category , 
           counts : META_DATA.RACE_COUNT_TO_SHOW ,
           startedText:META_DATA.COUNT_DOWN_TEXT_START});
   }
  },
  mounted(){
    setInterval(() => {
     this.builderMethodForGettingRaceOrUpdatingShowList();
    }, 1000);  
   
  }
}
</script>

<style scoped lang="scss">
  .header-container{
     background: #44A7C4;
      color: #fff;  
      padding: 6px 0; 
      >div{
        display: flex;
        align-items: center;
        justify-content: center;
      }
  }
  .common-container{
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));   
     >div{
        display: flex;
        align-items: center;
        justify-content: center;
      }
  
  }
  .content-container {
    overflow: auto;
    max-height: calc(100vh - 120px);
    >div{
        padding: 3px 0;
      &:nth-child(2n+1){
       background: #f1f1f1;
     }
     &:hover{
       background: #68909B;
       color:#fff;
     }
    }
  }
  .form-container{
    margin: 5px 0;
  }
  /**keyframe for blinking the started race */
  @keyframes blinker {
  50% {
    opacity: 0;
  }
}
/**special class for the started race */
  .blinker{
    color: #22DD22;
    animation: blinker 1s step-start infinite;
  }
</style>
