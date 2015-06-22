var tables = document.getElementsByTagName("TABLE");
var table, newRow, newCell, newElement, tmp, hrefLnk, show_excl_button = 0;
var t = 0;

if (tables[0].className.match('buttons')) {
	// ignore the 1st table which is the table for show/hide buttons
	t = 1;
}

for (; t < tables.length; t++) {
	table = tables[t];
	table.cellspacing = "2";
	table.cellpadding = "2";
	
	newRow = table.rows[0];
	
	newCell = document.createElement('TH');
	newCell.className = 'odd';
	newCell.align = 'left';
	newCell.innerHTML = 'Cover Directive';
	newRow.appendChild(newCell);
	
	newCell = document.createElement('TH');
	newCell.className = 'even';
	newCell.innerHTML = 'Hits';
	newRow.appendChild(newCell);
	
	newCell = document.createElement('TH');
	newCell.className = 'odd';
	newCell.innerHTML = 'Status';
	newRow.appendChild(newCell);
	
	// loop on the rest of the rows	
	for (var r = 1; r < table.rows.length; r++) {
		var excluded = 0;
		newRow = table.rows[r];

		// row class if existing
		tmp = newRow.getAttribute('cr');
		switch (tmp) {
			case 'c':
				newRow.className = 'covered'; break;
			case 'm':
				newRow.className = 'missing'; break;
			case 'n':
				newRow.className = 'neutral'; break;
			case 'e': //excluded
				excluded = 1; newRow.className = 'excluded'; show_excl_button = 1; break;	
			default:
				newRow.className = ''; break;
		}
		
		newCell = document.createElement('TD');
		newCell.className = 'odd';
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
		
		newCell = document.createElement('TD');
		tmp = newRow.getAttribute('h');
		if (tmp) {
			newCell.className = 'even_r';
			if (newRow.getAttribute('k')) {
				newElement = document.createElement('a');
				hrefLnk = newRow.getAttribute('k').match(/^([^$]*)\$([^$]*)$/i);
				if (hrefLnk && hrefLnk.length == 3) {
					newElement.setAttribute("href", "pertest.htm?bin=d" + hrefLnk[1] + "&scope=" + hrefLnk[2]);
				} else {
					newElement.setAttribute("href", newRow.getAttribute('k'));
				}
				newElement.setAttribute("rel", 'popup 200 200');
				newElement.innerHTML = tmp;
				newCell.appendChild(newElement);
			} else {
				newCell.innerHTML = tmp;
			}
			if (excluded) {
				newCell.style.color = "dimGrey";
			}
			newRow.appendChild(newCell);

			newCell = document.createElement('TD');
			if (excluded == 0) {
				tmp = newRow.getAttribute('c');
				switch (tmp) {
					case 'r':
						newCell.className = 'red';   newCell.innerHTML = "ZERO"; break;
					case 'g':
						newCell.className = 'green'; newCell.innerHTML = "Covered"; break;
					default:
						newCell.className = ''; break;
				}
			} else {
				newCell.className = 'grey'; newCell.innerHTML = 'Excluded';
			}
		} else {
			newCell.className = 'even';
			newCell.align = "center";
			newCell.innerHTML = "--";
			if (excluded) {
				newCell.style.color = "dimGrey";
			}
			newRow.appendChild(newCell);
			
			newCell = document.createElement('TD');
			newCell.className = 'odd';
			newCell.align = "center";
			newCell.innerHTML = "--";
			if (excluded) {
				newCell.style.color = "dimGrey";
			}
		}
		newRow.appendChild(newCell);
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
