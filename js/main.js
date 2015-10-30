document.addEventListener("DOMContentLoaded", function() { 

	(function(){

		var path = 'http://api.nytimes.com/svc/mostpopular/v2/mostviewed/movies/30.json?api-key=52c786f7d5fcb689e304bcbd58687057%3A5%3A73132144';

		function getJSONData(path, callback) {
		    var http = new XMLHttpRequest();
		    http.onreadystatechange = function() {
		        if (http.readyState === 4 && http.status === 200) {
	                var data = JSON.parse(http.responseText);
	                if (callback) callback(data);
		        }
		    };

		    http.open('GET', path);
		    http.send(); 
		}

		function render(data){

			function createHtml(data) {
				var html = 
					'<img src="'+data.media[0]["media-metadata"][0].url+'"/>'+
					'<span class="title">'+data.title+'</span>'+
					'<div class="art-info">'+
						'<button class="back">Back</button>'+	
						'<div class="content">'+data.abstract+
							'<span class="type">'+ data.type+'</span>'+
							'<a href='+ data.url+'>link</a>'
						'</div>'
					'</div>';

					return html;
			}

			data.forEach(function (data) {
				var wrap = document.createElement('div');
					wrap.className = 'wrap';

				wrap.innerHTML = createHtml(data);
				main.appendChild(wrap);

				wrap.addEventListener('click', function(e) {
		        	if(this.className == 'wrap'){
			        	this.className += ' show';
				        this.parentNode.className +=' hide';
		        	}
		        	if(e.target.type == 'submit'){
						this.className = 'wrap';
						this.parentNode.className = '';
	        		}
	    		}, false);
	    		
			});
		}

		getJSONData(path, function(data){
			render(data.results)
		});

	}());
    

});