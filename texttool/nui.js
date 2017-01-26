function nui_replace() {
	$('#dl-trigger').removeClass('dl-active');$('.dl-menu').removeClass('dl-menuopen');$('.dl-menu').removeClass('dl-subview');$('.dl-menu').addClass('dl-menu-toggle');
	var editor = ace.edit("editor");
	var mytext = editor.getValue();
	bootbox.dialog({
		message: '<p class="text-center">Replace thường</p>'+
			'Replace<br/>'+
			textArea('1')+
			'With<br/>'+
			textArea('2'),
		closeButton: true,
		buttons: {
			/*cancel: {
				label: 'No',
				className: 'btn btn-default nui-btn-1'
			},*/
			confirm: {
				label: 'Replace all',
				className: 'btn btn-primary nui-btn-replace'
			}
		}
	});
	$('.modal-backdrop').remove();
	//click handler
	$(".nui-btn-replace").click(function(){
		editor.setValue(mytext.replaceAll(getTextArea('1'), getTextArea('2')), 1);
	});
}

function nui_regexp() {
	$('#dl-trigger').removeClass('dl-active');$('.dl-menu').removeClass('dl-menuopen');$('.dl-menu').removeClass('dl-subview');$('.dl-menu').addClass('dl-menu-toggle');
	var editor = ace.edit("editor");
	var mytext = editor.getValue();
	bootbox.dialog({
		message: '<p class="text-center">Simple regexp</p>'+
			'Regex<br/>'+
			textArea('1')+
			'Replace with<br/>'+
			textArea('2'),
		closeButton: true,
		buttons: {
			/*cancel: {
				label: 'No',
				className: 'btn btn-default nui-btn-1'
			},*/
			confirm: {
				label: 'Replace all',
				className: 'btn btn-primary nui-btn-replace'
			}
		}
	});
	$('.modal-backdrop').remove();
	//click handler
	$(".nui-btn-replace").click(function(){
		console.log(mytext)
	});
}

function nui_add_top_end() {
	$('#dl-trigger').removeClass('dl-active');$('.dl-menu').removeClass('dl-menuopen');$('.dl-menu').removeClass('dl-subview');$('.dl-menu').addClass('dl-menu-toggle');
	var editor = ace.edit("editor");
	var mytext = editor.getValue();
	bootbox.dialog({
		message: '<p class="text-center">Thêm vào đầu/cuối mỗi dòng</p>'+
			'Lưu ý: dấu xuống dòng sẽ đc chuyển thành \\r\\n. Dòng trống sẽ ko đc thêm gì.<br/>'+
			textArea('1'),
		closeButton: true,
		buttons: {
			btn1: {
				label: 'Thêm vào ĐẦU',
				className: 'btn btn-primary nui-btn-1'
			},
			btn2: {
				label: 'Thêm vào CUỐI',
				className: 'btn btn-primary nui-btn-2'
			}
		}
	});
	$('.modal-backdrop').remove();
	//click handler
	$(".nui-btn-1").click(function(){
		var arrayofLines = mytext.replace(/\r\n|\n\r|\n|\r/g,"\n").split("\n");
		arrayofLines.forEach(function (item, index) {
			arrayofLines[index] = arrayofLines[index]=="" ? "" : getTextArea('1')+arrayofLines[index];
		});
		editor.setValue(arrayofLines.join("\r\n"));
	});
	$(".nui-btn-2").click(function(){
		var arrayofLines = mytext.replace(/\r\n|\n\r|\n|\r/g,"\n").split("\n");
		arrayofLines.forEach(function (item, index) {
			arrayofLines[index] = arrayofLines[index]=="" ? "" : arrayofLines[index]+getTextArea('1');
		});
		editor.setValue(arrayofLines.join("\r\n"));
	});
}

function nui_add_char() {
	$('#dl-trigger').removeClass('dl-active');$('.dl-menu').removeClass('dl-menuopen');$('.dl-menu').removeClass('dl-subview');$('.dl-menu').addClass('dl-menu-toggle');
	var editor = ace.edit("editor");
	var mytext = editor.getValue();
	bootbox.dialog({
		message: '<p class="text-center">Thêm vào giữa mỗi dòng</p>'+
			'Lưu ý: dấu xuống dòng sẽ đc chuyển thành \\r\\n. Dòng trống sẽ ko đc thêm gì.<br/><br/>'+
			'Chuỗi<br/>'+
			textArea('1')+
			'Thêm vào sau ký tự thứ '+input('1')+'<br/>',
		closeButton: true,
		buttons: {
			btn1: {
				label: 'tính từ ĐẦU dòng',
				className: 'btn btn-primary nui-btn-1'
			},
			btn2: {
				label: 'tính từ CUỐI dòng',
				className: 'btn btn-primary nui-btn-2'
			}
		}
	});
	$('.modal-backdrop').remove();
	$('.nui-inp-1').val(editor.getCursorPosition().column);
	//click handler
	$(".nui-btn-1").click(function(){
		var arrayofLines = mytext.replace(/\r\n|\n\r|\n|\r/g,"\n").split("\n");
		arrayofLines.forEach(function (item, index) {
			if (arrayofLines[index] != "") {
				if (arrayofLines[index].length >= +getInput('1')) {
					arrayofLines[index] = arrayofLines[index].splice(+getInput('1'), 0, getTextArea('1'));
				}
			}
		});
		editor.setValue(arrayofLines.join("\r\n"));
	});
	$(".nui-btn-2").click(function(){
		var arrayofLines = mytext.replace(/\r\n|\n\r|\n|\r/g,"\n").split("\n");
		arrayofLines.forEach(function (item, index) {
			if (arrayofLines[index] != "") {
				if (arrayofLines[index].length >= +getInput('1')) {
					arrayofLines[index] = arrayofLines[index].splice(
								arrayofLines[index].length-(+getInput('1')), 0, getTextArea('1'));
				}
			}
		});
		editor.setValue(arrayofLines.join("\r\n"));
	});
}

function nui_del_top_end() {
	$('#dl-trigger').removeClass('dl-active');$('.dl-menu').removeClass('dl-menuopen');$('.dl-menu').removeClass('dl-subview');$('.dl-menu').addClass('dl-menu-toggle');
	var editor = ace.edit("editor");
	var mytext = editor.getValue();
	bootbox.dialog({
		message: '<p class="text-center">Xóa mấy ký tự đầu/cuối</p>'+
			'Lưu ý: dấu xuống dòng sẽ đc chuyển thành \\r\\n. Dòng trống sẽ ko đc sửa gì.<br/><br/>'+
			'Xóa bao nhiêu ký tự? '+input('1')+'<br/>',
		closeButton: true,
		buttons: {
			btn1: {
				label: 'tính từ ĐẦU dòng',
				className: 'btn btn-primary nui-btn-1'
			},
			btn2: {
				label: 'tính từ CUỐI dòng',
				className: 'btn btn-primary nui-btn-2'
			}
		}
	});
	$('.modal-backdrop').remove();
	$('.nui-inp-1').val(editor.getCursorPosition().column);
	//click handler
	$(".nui-btn-1").click(function(){
		var arrayofLines = mytext.replace(/\r\n|\n\r|\n|\r/g,"\n").split("\n");
		arrayofLines.forEach(function (item, index) {
			if (arrayofLines[index] != "") {
				if (arrayofLines[index].length >= +getInput('1')) {
					arrayofLines[index] = arrayofLines[index].slice(+getInput('1'));
				}
			}
		});
		editor.setValue(arrayofLines.join("\r\n"));
	});
	$(".nui-btn-2").click(function(){
		var arrayofLines = mytext.replace(/\r\n|\n\r|\n|\r/g,"\n").split("\n");
		arrayofLines.forEach(function (item, index) {
			if (arrayofLines[index] != "") {
				if (arrayofLines[index].length >= +getInput('1')) {
					arrayofLines[index] = arrayofLines[index].substring(0, arrayofLines[index].length-getInput('1'));
				}
			}
		});
		editor.setValue(arrayofLines.join("\r\n"));
	});
}


function nui_del_mid() {
	$('#dl-trigger').removeClass('dl-active');$('.dl-menu').removeClass('dl-menuopen');$('.dl-menu').removeClass('dl-subview');$('.dl-menu').addClass('dl-menu-toggle');
	var editor = ace.edit("editor");
	var mytext = editor.getValue();
	bootbox.dialog({
		message: '<p class="text-center">Xóa mấy ký tự ở giữa</p>'+
			'Lưu ý: dấu xuống dòng sẽ đc chuyển thành \\r\\n. Dòng trống sẽ ko đc sửa gì.<br/><br/>'+
			'Xóa từ ký tự nào? '+input('1')+'<br/>'+
			'Xóa bao nhiêu ký tự? '+input('2')+'<br/>',
		closeButton: true,
		buttons: {
			btn1: {
				label: 'OKAY',
				className: 'btn btn-primary nui-btn-1'
			}
		}
	});
	$('.modal-backdrop').remove();
	$('.nui-inp-1').val(editor.getCursorPosition().column);
	//click handler
	$(".nui-btn-1").click(function(){
		var arrayofLines = mytext.replace(/\r\n|\n\r|\n|\r/g,"\n").split("\n");
		arrayofLines.forEach(function (item, index) {
			if (arrayofLines[index] != "") {
				if (arrayofLines[index].length >= +getInput('1')) {
					arrayofLines[index] = arrayofLines[index].splice(+getInput('1'), +getInput('2'), "");
				}
			}
		});
		editor.setValue(arrayofLines.join("\r\n"));
	});
}

function nui_del_empty() {
	$('#dl-trigger').removeClass('dl-active');$('.dl-menu').removeClass('dl-menuopen');$('.dl-menu').removeClass('dl-subview');$('.dl-menu').addClass('dl-menu-toggle');
	var editor = ace.edit("editor");
	var mytext = editor.getValue();
	bootbox.dialog({
		message: '<p class="text-center">Xóa dòng trống</p>'+
			'Lưu ý: dấu xuống dòng sẽ đc chuyển thành \\r\\n.<br/>',
		closeButton: true,
		buttons: {
			btn1: {
				label: 'OKAY',
				className: 'btn btn-primary nui-btn-1'
			}
		}
	});
	$('.modal-backdrop').remove();
	//click handler
	$(".nui-btn-1").click(function(){
		var arrayofLines = mytext.replace(/\r\n|\n\r|\n|\r/g,"\r\n").replaceAll("\r\n\r\n", "\r\n");
		editor.setValue(arrayofLines);
	});
}

function nui_proper() {
	$('#dl-trigger').removeClass('dl-active');$('.dl-menu').removeClass('dl-menuopen');$('.dl-menu').removeClass('dl-subview');$('.dl-menu').addClass('dl-menu-toggle');
	var editor = ace.edit("editor");
	var mytext = editor.getValue();
	bootbox.dialog({
		message: '<p class="text-center">Viết hoa kiểu tên riêng</p>'+
			'Lưu ý: dấu xuống dòng sẽ đc giữ nguyên.<br/>',
		closeButton: true,
		buttons: {
			btn1: {
				label: 'OKAY',
				className: 'btn btn-primary nui-btn-1'
			}
		}
	});
	$('.modal-backdrop').remove();
	//click handler
	$(".nui-btn-1").click(function(){
		editor.setValue(toTitleCase(mytext));
	});
}

function nui_add_number() {
	$('#dl-trigger').removeClass('dl-active');$('.dl-menu').removeClass('dl-menuopen');$('.dl-menu').removeClass('dl-subview');$('.dl-menu').addClass('dl-menu-toggle');
	var editor = ace.edit("editor");
	var mytext = editor.getValue();
	bootbox.dialog({
		message: '<p class="text-center">Thêm số thứ tự ở đầu</p>'+
			'Lưu ý: dấu xuống dòng sẽ đc chuyển thành \\r\\n.<br/><br/>'+
			'Bắt đầu từ số? '+input('1')+'<br/>'+
			'Kiểu số:<br/>'+
			'&nbsp;&nbsp;<input type="radio" name="q12_3" value="1" checked>Chỉ số không: 1 ... 999<br/>'+
			'&nbsp;&nbsp;<input type="radio" name="q12_3" value="2">Có số 0 đằng trước: 001 ... 999<br/>'+
			'Sau số thứ tự là:<br/>'+
			'&nbsp;&nbsp;<input type="radio" name="q1_3" value="1" checked>Không thêm gì<br/>'+
			'&nbsp;&nbsp;<input type="radio" name="q1_3" value="2">Dấu cách<br/>'+
			'&nbsp;&nbsp;<input type="radio" name="q1_3" value="3">Dấu chấm<br/>'+
			'&nbsp;&nbsp;<input type="radio" name="q1_3" value="4">Dấu gạch ngang<br/>'+
			'&nbsp;&nbsp;<input type="radio" name="q1_3" value="5">Dấu 2 chấm<br/>',
		closeButton: true,
		buttons: {
			btn1: {
				label: 'OKAY',
				className: 'btn btn-primary nui-btn-1'
			}
		}
	});
	$('.modal-backdrop').remove();
	$('.nui-inp-1').val(1);
	//click handler
	$(".nui-btn-1").click(function(){
		var arrayofLines = mytext.replace(/\r\n|\n\r|\n|\r/g,"\n").split("\n");
		var count = +getInput('1');
		var sperator = "";
		if ($("input[name=q1_3]:checked").val() == 2) sperator = " ";
		if ($("input[name=q1_3]:checked").val() == 3) sperator = ". ";
		if ($("input[name=q1_3]:checked").val() == 4) sperator = " - ";
		if ($("input[name=q1_3]:checked").val() == 5) sperator = ": ";
		
		if ($("input[name=q12_3]:checked").val() == 1) {
			arrayofLines.forEach(function (item, index) {
				arrayofLines[index] = count + sperator + arrayofLines[index];
				count++;
			});
		} else {
			var numOfDigit = ((count + arrayofLines.length - 1) + "").length;
			console.log(numOfDigit);
			arrayofLines.forEach(function (item, index) {
				arrayofLines[index] = pad(count+"", numOfDigit) + sperator + arrayofLines[index];
				count++;
			});
		}
		editor.setValue(arrayofLines.join("\r\n"),1);
	});
}

function nui_short_name() {
	$('#dl-trigger').removeClass('dl-active');$('.dl-menu').removeClass('dl-menuopen');$('.dl-menu').removeClass('dl-subview');$('.dl-menu').addClass('dl-menu-toggle');
	var editor = ace.edit("editor");
	var mytext = editor.getValue();
	bootbox.dialog({
		message: '<p class="text-center">Lấy 2 từ của tên riêng</p>'+
			'Lưu ý: dấu xuống dòng sẽ đc chuyển thành \\r\\n. Dòng trống sẽ ko đc sửa gì.<br/><br/>'+
			'Ví dụ:<br/>'+'Nguyễn Xuân Sơn => Xuân Sơn<br/>'+'Nguyễn Thị Kiều Trang => Kiểu Trang<br/>'+'Nguyễn Văn Linh => Nguyễn Linh<br/>'+'Nguyễn Thị Hoa => Nguyễn Hoa<br/>'+'Vũ Hoàng => Vũ Hoàng<br/>',
		closeButton: true,
		buttons: {
			btn1: {
				label: 'OKAY',
				className: 'btn btn-primary nui-btn-1'
			}
		}
	});
	$('.modal-backdrop').remove();
	$('.nui-inp-1').val(editor.getCursorPosition().column);
	//click handler
	$(".nui-btn-1").click(function(){
		var arrayofLines = mytext.replace(/\r\n|\n\r|\n|\r/g,"\n").split("\n");
		arrayofLines.forEach(function (item, index) {
			if (arrayofLines[index] != "") {
				var words = arrayofLines[index].trim().split(/\s+/);;
				if (words.length>2)
					var i = words.length;
					arrayofLines[index] = chooseShortNameWords(words[0], words[i-2], words[i-1]);
			}
		});
		editor.setValue(arrayofLines.join("\r\n"));
	});
}