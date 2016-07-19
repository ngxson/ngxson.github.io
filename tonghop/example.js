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
					posttext += ' - Link facebook: <a href=\''+fb+'\' target=\'_blank\'>'+fb+'</a></br>';
					if(need != undefined) posttext += ' - Yêu cầu đối tượng: '+need+'</br>';
					if(deadline != undefined) posttext += ' - Deadline tuyển người: '+deadline+'</br>';
					if(benefit != undefined) posttext += ' - Quyền lợi cơ bản: </br>'+benefit+'</br>';
					if(deadline != undefined) posttext += '</br> == phần không copy ==</br>';
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
