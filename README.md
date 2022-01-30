# Entain-vue-test

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### Documentaion

1. There is one main component named race.vue.
 - In the mounted section a method for getting the list
   of the races will be called.
 - we have one grid for showing the races list.
 - one 'Select' for selecting the category and it is 'All' by default and
  user can select form the list and will be applied.
 - There is one interval of 1000ms for calling the method for 
 getting the data from the server or updating the list of show cases.
 - For getting the new data from the server and making as least as possible
   the number of show cases item will be checked and if needed the request will be sent.
 - The countDown of the race after starting will be changed to 'Started' with green and blinking text
  and will be gone after one minute form the list.
 - I have added enough comments for the other sections.
2. There is a mixin.vue component and I have put all the methods that
  can be used by the other component later in it.
  - I have added enough comment for the methods inside it.
3. I have put all the data that needs to be used in the components
 in the assets/metaData.js file so we can change/update them much easier later.
4. I have added Vuex store and one module for race so we can add more modules easily.
 - I have added enough comments for the section inside the race module.
5. I have added one filter for countDowning and it can be found in main.js file.
6. There is one folder for adding the unit testing files and can be used later.
