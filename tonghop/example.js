$(document).ready(function(){

	var worksheets = [
		'oa0tx2v' // defaults to first worksheet without id
		//'or28a5j'
		];

	worksheets.forEach(function(worksheet){
 		$.googleSheetToJSON('1ATL22FlPi6TZC3PK_Hu66vI9vwD1WhD6cyAvY08zSlk', worksheet)
			.done(function(rows){

				var $container = $('<div>');
				//$container.append('<h1>' + (worksheet || 'default') + '</h1>');
				//$container.append('<h1>Output</h1>');
				rows.reverse().forEach(function(row){
					$dl = $('<dl>');
					var Timestamp, namee, fb, mota, deadline, need, benefit, a1, a2;
					Object.getOwnPropertyNames(row).forEach(function(name){
						var val = [].concat(row[name]).join(' / ');
						//var val = row[name];
						//val.replace("\n", "</br>");
						//val.replace(/\n/g, "<br />");
						val = val.replace(/\n/g, "</br>");
						if(name == 'timestamp') Timestamp = val;
						if(name == 'name') namee = val;
						if(name == 'fb') fb = val;
						if(name == 'mota') mota = val;
						if(name == 'deadline') deadline = val;
						if(name == 'need') need = val;
						if(name == 'benefit') benefit = val;
						if(name == 'questone') a1 = val;
						if(name == 'questtwo') a2 = val;
						//if(name != 'timestamp') $dl.append('<dt>' + name + '</dt><dd>' + val + '</dd>')
						//console.log(val.replace(/\n/g, "</br>"));
					});
					var posttext = '<dt>-- ' + namee + ' --</dt><dd>';

					posttext += '</br> Mô tả dự án: </br>'+mota+'</br></br>'
					posttext += ' + Link facebook: <a href=\''+fb+'\' target=\'_blank\'>'+fb+'</a></br>';
					if(need != undefined) posttext += ' + Yêu cầu đối tượng: '+need+'</br>';
					if(deadline != undefined) posttext += ' + Deadline: '+deadline+'</br>';
					if(benefit != undefined) posttext += ' + Quyền lợi khi tham gia dự án: </br>'+benefit+'</br>';
					if((a1 != undefined)||(a2 != undefined)) posttext += '</br> == phần không copy ==</br>';
					if(a1 != undefined) posttext += ' - Cần share bài ko? '+a1+'</br>';
					if(a2 != undefined) posttext += ' - Góp ý? '+a2+'</br>';

					$dl.append(posttext+'</dd>');
					if(Timestamp != 0) $container.append($dl);
				});
				$(document.body).append($container);
			})
			.fail(function(err){
				console.log('error!', err);
			});
	});
});

function copyTextToClipboard(text) {
  var textArea = document.createElement("textarea");

  //
  // *** This styling is an extra step which is likely not required. ***
  //
  // Why is it here? To ensure:
  // 1. the element is able to have focus and selection.
  // 2. if element was to flash render it has minimal visual impact.
  // 3. less flakyness with selection and copying which **might** occur if
  //    the textarea element is not visible.
  //
  // The likelihood is the element won't even render, not even a flash,
  // so some of these are just precautions. However in IE the element
  // is visible whilst the popup box asking the user for permission for
  // the web page to copy to the clipboard.
  //

  // Place in top-left corner of screen regardless of scroll position.
  textArea.style.position = 'fixed';
  textArea.style.top = 0;
  textArea.style.left = 0;

  // Ensure it has a small width and height. Setting to 1px / 1em
  // doesn't work as this gives a negative w/h on some browsers.
  textArea.style.width = '2em';
  textArea.style.height = '2em';

  // We don't need padding, reducing the size if it does flash render.
  textArea.style.padding = 0;

  // Clean up any borders.
  textArea.style.border = 'none';
  textArea.style.outline = 'none';
  textArea.style.boxShadow = 'none';

  // Avoid flash of white box if rendered for any reason.
  textArea.style.background = 'transparent';


  textArea.value = text;

  document.body.appendChild(textArea);

  textArea.select();

  try {
    var successful = document.execCommand('copy');
    var msg = successful ? 'successful' : 'unsuccessful';
    console.log('Copying text command was ' + msg);
  } catch (err) {
    console.log('Oops, unable to copy');
  }

  document.body.removeChild(textArea);
}


/*var copyBobBtn = document.querySelector('.js-copy-bob-btn'),
  copyJaneBtn = document.querySelector('.js-copy-jane-btn');

copyBobBtn.addEventListener('click', function(event) {
  copyTextToClipboard('Bob');
});


copyJaneBtn.addEventListener('click', function(event) {
  copyTextToClipboard('Jane');
});*/
