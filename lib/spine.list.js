(function(Spine, $){
  
  Spine.List = Spine.Controller.create({
    events: {
      "click .item": "click"
    },
    
    proxied: ["change"],
    
    init: function(){
      this.bind("change", this.change);
    },
    
    template: function(){ return arguments[0] },
        
    change: function(item){
      if ( !item ) return;
      this.current = item;

      this.children().removeClass("current");
      this.children().forItem(this.current).addClass("current");
    },
        
    render: function(items){
      if (items) this.items = items;
      this.el.html(this.template(this.items));
      this.change(this.current);
      //if ( !this.children(".current").length || !this.current )
      //  this.children(":first").click();
    },
    
    children: function(sel){
      return this.el.children(sel);
    },
    
    click: function(e){
      var item = $(e.target).item();
      this.trigger("change", item);
    },

		// Click the first item in the list, which in turn generates a change event
		clickFirst: function(){
      this.children(":first").click();
		}
  });
  
})(Spine, Spine.$);