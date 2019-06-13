var app = new Vue({
  el: '#admin',
  created() {
    this.getItems();
  },
  data: {
    title: "",
    selected:  "",
    addItem: null,
    photos: [
      {name: 'baseball', id: 1, path: 'images/baseball.jpg'},
      {name: 'batman', id: 2, path: 'images/batman.png'},
      {name: 'printer', id: 3, path: 'images/printer.jpg'},
      {name: 'tuna', id: 4, path: 'images/Tuna.jpg'},
    ],
    items: [],
    findTitle: "",
    findItem: null,
  },
  methods: {
    async addNewItem(){
      try {
        let result = await axios.post('/api/items', {
          title: this.title,
          path: this.selected.path
        });
        this.addItem = result.data;
      } catch (error) {
        console.log(error);
      }
    },
    async getItems() {
      try {
        let response = await axios.get("/api/items");
        this.items = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    selectItem(item) {
      this.findTitle = "";
      this.findItem = item;
    },
    async deleteItem(item) {
      try {
        let response = await axios.delete("/api/items/" + item.id);
        this.findItem = null;
        this.getItems();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async editItem(item) {
      try {
        let response = await axios.put("/api/items/" + item.id, {
          title: this.findItem.title,
        });
        this.findItem = null;
        this.getItems();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  },
  computed: {
    suggestions() {
      return this.items.filter(item => item.title.toLowerCase().startsWith(this.findTitle.toLowerCase()));
    }
  },
});
