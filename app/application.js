jQuery(function($){
  window.App = Spine.Controller.create({
    el: $("body"),
    
    elements: {
      "#sidebar": "sidebarEl",
      "#contacts": "contactsEl"
    },
    
    init: function(){
      this.sidebar = Sidebar.init({el: this.sidebarEl});
      this.contact = Contacts.init({el: this.contactsEl});

      this.routes({
          "": function() {
            // Triggers the showing of the first list item in the contacts detail area
					  this.sidebar.list.clickFirst();
          },

          "/contact/:id": function(id){
            var contact = Contact.find( id );
            this.App.trigger("show:contact", contact);
          }
      });

    // Fetch the records from Local Storage (will trigger rendering of the contact list)
      Contact.fetch();

    // Set up the routes and execute whatever route is already in the browser location
    Spine.Route.setup();
    }
  }).init();
});