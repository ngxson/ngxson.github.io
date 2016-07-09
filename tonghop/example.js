$(document).ready(function(){

	var worksheets = [
		'oykbgq3' // defaults to first worksheet without id
		//'or28a5j'
		];

	worksheets.forEach(function(worksheet){
 		$.googleSheetToJSON('1ATL22FlPi6TZC3PK_Hu66vI9vwD1WhD6cyAvY08zSlk', worksheet)
			.done(function(rows){

				var $container = $('<div>');
				//$container.append('<h1>' + (worksheet || 'default') + '</h1>');
				//$container.append('<h1>Output</h1>');
				rows.forEach(function(row){
					$dl = $('<dl>');
					var namee, linkk, target, deadline, datestart, dateend, benefit, describe = '';
					Object.getOwnPropertyNames(row).forEach(function(name){
						var val = [].concat(row[name]).join(' / ');
						//var val = row[name];
						//val.replace("\n", "</br>");
						//val.replace(/\n/g, "<br />");
						val = val.replace(/\n/g, "</br>");
						if(name == 'name') namee = val;
						if(name == 'link') linkk = val;
						if(name == 'target') target = val;
						if(name == 'deadline') deadline = val;
						if(name == 'datestart') datestart = val;
						if(name == 'dateend') dateend = val;
						if(name == 'benefit') benefit = val;
						if(name == 'describe') describe = val;
						//if(name != 'timestamp') $dl.append('<dt>' + name + '</dt><dd>' + val + '</dd>')
						//console.log(val.replace(/\n/g, "</br>"));
					});
					$dl.append('<dt>-- ' + namee + ' --</dt><dd>'+
					'</br>Mô tả: '+describe+'</br></br>'+
					' - Link facebook: <a href=\''+linkk+'\' target=\'_blank\'>'+linkk+'</a></br>'+
					' - Yêu cầu đối tượng: '+target+'</br>'+
					' - Deadline tuyển người: '+deadline+'</br>'+
					' - Ngày bắt đầu: '+datestart+'</br>'+
					' - Ngày kết thúc: '+dateend+'</br>'+
					' - Quyền lợi cơ bản: </br>'+benefit+'</br>'+
					'</dd>');
					$container.append($dl);
				});
				$(document.body).append($container);
			})
			.fail(function(err){
				console.log('error!', err);
			});
	});
});
