var PersonCard = Vue.extend({
  template: "#person-card",
  props: ["person"],
  data: function () {
    return {
      state: false
    };
  },
  computed: {
    getLabel() {
      if (this.state) {
        return this.person.phone;
      }
      return "Click me";
    }
  },
  methods: {
    onClick() {
      this.state = true;
      this.$forceUpdate();
    }
  }
});

Vue.component("person-card", PersonCard);

const vm = new Vue({
  el: "#app",
  data() {
    return {
      personsList: {}
    };
  },
  beforeMount() {
    this.getPersonsData();
  },
  components: { PersonCard },
  methods: {
    async getPersonsData() {
      let persons;
      let res;
      try {
        const res = await fetch("https://randomuser.me/api/?results=7");
        persons = await res.json();
      } catch {
        console.log("can't fetch data. code: " + res.status);
      }
      this.personsList = persons.results;
    }
  }
});