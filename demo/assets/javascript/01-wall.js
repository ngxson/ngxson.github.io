var wallFluid;

window.addEvent("domready", function(){
// Define The Wall
var colors = ["#730046", "#BFBB11", "#FFC200", "#E88801", "#C93C00"];
var maxLength    = 100; // Max Number images
var counterFluid = 1;
wallFluid = new Wall("wall", {
                "draggable":true,
                "inertia":true,
                "width":150,
                "height":150,
                "rangex":[-100,100],
                "rangey":[-100,100],
                callOnUpdate: function(items){
                    items.each(function(e, i){
						e.node.setStyle("background","#d0d0d0");
                        var a = new Element("div");
						if( counterFluid != 10) {
							a.set("style", "background-image: url(\"img/"+counterFluid+".jpg\");background-size: cover;height:100%;width:100%" );
							e.node.setStyle("background","#d0d0d0");
							a.set('class','nuiimg');
							//a.set('onclick','alert(\'hello\');');
						} else {
							//e.node.setStyle("background",colors[ Math.floor(Math.random()*colors.length) ]);
							e.node.setStyle("width","300px");
							e.node.setStyle("z-index","12");
							e.node.setStyle("line-height","inherit");
							a.set("html", "<h1 class=\"quotes\">hello<br/>sdgsdg</h1>" );
							a.set("style", "height:100%;width:100%;margin:0 0;" );
						}
						a.inject(e.node).fade("hide").fade("in");
                        counterFluid++;
                        // Reset counter
                        if( counterFluid > maxLength ) counterFluid = 1;
                    })
                }
            });
// Init Fluid Wall
wallFluid.initWall();
});