<script >
import Vue from "vue";
import * as types from "../store/types";
import { mapActions, mapGetters } from "vuex";
export default Vue.extend({
  methods: {
     ...mapActions({
      setRace: types.SET_RACE, 
      updateShowList: types.UPDATE_SHOW_LIST    
    }),
   /**
   *Builder method for making API request
   * @param {String} url 
   * @param {Function} onSuccess
   */
    async doRequest(url, onSuccess) {
      try {
        const response = await fetch(url);
        const data = await response.json();
        if (onSuccess) onSuccess(data);
      } catch (error) {
        console.log("this is the error that we recieved", error);
      }
    },
    /**
     * getting the race object from server and 
     * build the array of races
     * @param {Object} raceObject 
     * @returns Array
     */
    raceListBuilder(raceObject){
      var raceList = []
      for (const key in raceObject) {
        if (Object.hasOwnProperty.call(raceObject, key)) {
          const element = raceObject[key];
          element.advertised_start_seconds = element.advertised_start.seconds;
          raceList.push(element);
        }
      }
      raceList.sort(this.SoringObjectByKey('advertised_start_seconds'));    
      return raceList;
    },   
   /**
   * Sorting the Array Of Object using one Key propery
   * @param {String} property 
   * @returns 
   */
     SoringObjectByKey(property) {
      var sortOrder = 1;
      if(property[0] === "-") {
          sortOrder = -1;
          property = property.substr(1);
      }
      return function (a,b) {      
          var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
          return result * sortOrder;
      }
  }
  },
  computed: {
    ...mapGetters({
      getRaceList: types.GET_RACE_LIST,
      getShowList : types.GET_SHOW_LIST
    })
  }
})

</script>
