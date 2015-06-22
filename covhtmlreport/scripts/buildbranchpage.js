var tables = document.getElementsByTagName("TABLE");
var table, newRow, newCell, newElement, childCell, tmp, hrefLnk, show_excl_button = 0;
var t = 0;

if (tables[0].className.match('buttons')) {
	// ignore the 1st table which is the table for show/hide buttons
	t = 1;
}

for (; t < tables.length; t++) {
	var grey = 0;
	table = tables[t];
	table.cellspacing = "2";
	table.cellpadding = "2";
	
	newRow = table.rows[0];
	
	newCell = document.createElement('TD');
	newCell.colSpan = "4";
	
	tmp = newRow.getAttribute('ch'); // ch is coverHead
	if (tmp) {
		newCell.innerHTML = tmp + ' ';
	}
	newElement = document.createElement('span');
	newElement.style.color = "red";
	newElement.innerHTML = newRow.getAttribute('l') + ":&nbsp;&nbsp;";
	newCell.appendChild(newElement);

	newElement = document.createElement('a');
	newElement.setAttribute("href",newRow.getAttribute('lnk'));
	name = newRow.getAttribute('z');
	if (name) {
		if (name.match(/^<.*>$/)) {
			newElement.innerHTML = name.replace(">","&gt;").replace("<","&lt;");				
		} else {
			newElement.innerHTML = name;
		}
	}
	newCell.appendChild(newElement);
	newRow.appendChild(newCell);
	
	childCell = document.createElement('TD');
	tmp = newRow.getAttribute('c');
	switch (tmp) {
		case 'R':
			childCell.className = 'bgRed'; 			 						break;
		case 'Y':
			childCell.className = 'bgYellow'; 								break;
		case 'G':
			childCell.className = 'bgGreen'; 		 						break;
		case 'e':
			childCell.className = 'grey';  grey = 1; show_excl_button = 1;  break;
		default:
			childCell.className = ''; 				 						break;
	}
	if (grey == 0) {
		childCell.innerHTML = newRow.getAttribute('p') + "%";
	} else {
		childCell.innerHTML = 'Excluded';
		newRow.className = 'excluded';
	}
	newRow.appendChild(childCell);
	
	newRow = table.rows[1];
	
	newCell = document.createElement('TH');
	newCell.className = 'odd';
	newCell.colSpan = "2";
	newCell.innerHTML = 'Branch';
	newRow.appendChild(newCell);
	
	newCell = document.createElement('TH');
	newCell.className = 'even';
	newCell.innerHTML = 'Source';
	newRow.appendChild(newCell);
	
	newCell = document.createElement('TH');
	newCell.className = 'odd';
	newCell.innerHTML = 'Hits';
	newRow.appendChild(newCell);
	
	newCell = document.createElement('TH');
	newCell.className = 'even';
	newCell.innerHTML = 'Status';
	newRow.appendChild(newCell);
	
	for (var r = 2; r < table.rows.length; r++) {
		var excluded = 0;
		newRow = table.rows[r];
		newCell = document.createElement('TD');

		// row class if existing
		tmp = newRow.getAttribute('cr');
		switch (tmp) {
			case 'c':
				newRow.className = 'covered'; break;
			case 'm':
				newRow.className = 'missing'; break;
			case 'e': //excluded
				excluded = 1; newRow.className = 'excluded'; show_excl_button = 1; break;
			default:
				newRow.className = ''; break;
		}
		
		newCell.className = 'invisible';
		newCell.innerHTML = '&nbsp;';
		newRow.appendChild(newCell);
		
		childCell = document.createElement('TD');
		childCell.className = 'odd';
		// t is branch type
		tmp = newRow.getAttribute('t');
		switch (tmp) {
			case 'I':
				childCell.innerHTML = "IF"; break;
			case 'E':
				childCell.innerHTML = "ELSE"; break;
			case 'T':
				childCell.innerHTML = "TRUE"; break;
			case 'F':
				childCell.innerHTML = "FALSE"; break;
			case 'A':
				childCell.innerHTML = "ALL FALSE"; break;
			default:
				childCell.innerHTML = "&nbsp;"; break;
		}
		newRow.appendChild(childCell);

		childCell = document.createElement('TD');
		childCell.className = 'even';
		
		newElement = document.createElement('span');
		newElement.style.color = "red";
		newElement.innerHTML = newRow.getAttribute('l') + ":&nbsp;&nbsp;";
		childCell.appendChild(newElement);
		
		newElement = document.createElement('a');
		newElement.setAttribute("href",newRow.getAttribute('lnk'));
		name = newRow.getAttribute('z');
		if (name) {
			if (name.match(/^<.*>$/)) {
				newElement.innerHTML = name.replace(">","&gt;").replace("<","&lt;");				
			} else {
				newElement.innerHTML = name;
			}
		}
		childCell.appendChild(newElement);
		newRow.appendChild(childCell);
		
		childCell = document.createElement('TD');
		tmp = newRow.getAttribute('h');
		if (tmp) {
			childCell.className = 'odd_r';
			if (newRow.getAttribute('k')) {
				newElement = document.createElement('a');
				hrefLnk = newRow.getAttribute('k').match(/^([^$]*)\$([^$]*)$/i);
				if (hrefLnk && hrefLnk.length == 3) {
					newElement.setAttribute("href", "pertest.htm?bin=b" + hrefLnk[1] + "&scope=" + hrefLnk[2]);
				} else {
					newElement.setAttribute("href", newRow.getAttribute('k'));
				}
				newElement.setAttribute("rel", 'popup 200 200');
				newElement.innerHTML = tmp;
				childCell.appendChild(newElement);
			} else {
				childCell.innerHTML = tmp;
			}
		} else {
			childCell.className = 'odd';
			childCell.align = "center";
			childCell.innerHTML = "--";
		}
		if (excluded) {
			childCell.style.color = "dimGrey";
		}
		newRow.appendChild(childCell);
		
		childCell = document.createElement('TD');
		if (excluded == 0) {
			tmp = newRow.getAttribute('c');
			switch (tmp) {
				case 'g':
					childCell.className = 'green'; childCell.innerHTML = 'Covered'; break;
				case 'r':
					childCell.className = 'red'; childCell.innerHTML = 'ZERO'; break;
				default:
					childCell.className = ''; break;
			}
		} else {
			childCell.className = 'grey'; childCell.innerHTML = 'Excluded';
		}
		newRow.appendChild(childCell);
	}
}
if (show_excl_button == 1) {
	if (tables[0].className.match('buttons')) {
		newCell = document.createElement('TD');
		newCell.id = "showExcl";
		newCell.width = 106;
		newCell.setAttribute("onclick", "showExcl()");
		newCell.className = "button_off";
		newCell.title = "Display only excluded scopes and bins.";
		newCell.innerHTML = "Show Excluded";
		tables[0].rows[0].appendChild(newCell);
	}
}
