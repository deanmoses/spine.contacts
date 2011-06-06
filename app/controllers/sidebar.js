jQuery(function($){

// The sidebar controller is responsible for managing the sidebar, which contains the
// list of contacts, the search form, and the add contact button
window.Sidebar = Spine.Controller.create({
  // Map a few HTML elements to instance variables.  These
  // selectors are scoped within the Controller's element,
  // which is set in application.js to the <div id="sidebar"></div>
  // that's embedded in index.html
  elements: {
    ".items": "items",  //  this.items => <ul class="items"></ul>
    "input":  "input" //  this.input => <input />
  },
  
  // Attach event delegation
  events: {
    "click button": "create", // Call this.create() when the <button> element is clicked
    "keyup input":  "filter", // Call this.filter() on keyup in the <input> elemement (it's a search box)
    "click input":  "filter" // Call this.filter() when a mouse clicks in the <input> elemement (it's a search box)
  },
  
  // Ensure these functions are called with the current
  // scope as they're used in event callbacks
  proxied: ["render"],
  
  // Render template each list item
  template: function(items){
    // When jQuery templating's .tmpl() receives an array,
    // it iterates over the array, calling the template
    // for each item in the array
    return($("#contactsTemplate").tmpl(items));
  },
  
  init: function(){

    // Spine.List acts like a list widget, though implementation-wise its a standard Controller
		// It emits a "change" event whenever an item is clicked
    this.list = Spine.List.init({
      el: this.items,

      // Template to render individual list items
      template: this.template
    });

		// When the list changes (like someone clicks on an item)
		// trigger the Contact controller's show function (?)
    this.list.bind("change", this.proxy(function(item){
			// Trigger show() on the Contacts controller, passing the contact
      this.App.trigger("show:contact", item);
    }));

		// When show() or edit() on the Contacts controller is hit, also hit list.change()
		// I don't understand how this doesn't create a loop because of the line above
    this.App.bind("show:contact edit:contact", this.list.change);
    
    // Re-render whenever the Contact model is either populated or changed
		// TODO: figure out if there's a way to not render the ENTIRE list when the list changes
    Contact.bind("refresh change", this.render);
  },

  filter: function(){
    this.query = this.input.val();
    this.render();
  },
  
  render: function(){
    // Filter items by query
    var items = Contact.filter(this.query);
    // Filter by first name
    items = items.sort(Contact.nameSort);
    this.list.render(items);
  },
    
  // Called when 'Create' button is clicked
  create: function(){
    var item = Contact.create();
    this.App.trigger("edit:contact", item);
  }
});
  
});