var tables = document.getElementsByTagName("TABLE");
var table, newRow, newCell, newElement, tmp, tmp2, hrefLnk, show_excl_button = 0;
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
	newCell.innerHTML = 'Assertion';
	newRow.appendChild(newCell);
	
	newCell = document.createElement('TH');
	newCell.className = 'even';
	newCell.innerHTML = 'Fail';
	newRow.appendChild(newCell);
	
	newCell = document.createElement('TH');
	newCell.className = 'odd';
	newCell.innerHTML = 'Pass';
	newRow.appendChild(newCell);
	
	newCell = document.createElement('TH');
	newCell.className = 'even';
	newCell.innerHTML = 'Attempts';
	newRow.appendChild(newCell);
	
	newCell = document.createElement('TH');
	newCell.className = 'odd';
	newCell.innerHTML = 'Vacuous';
	newRow.appendChild(newCell);
	
	newCell = document.createElement('TH');
	newCell.className = 'even';
	newCell.innerHTML = 'Disabled';
	newRow.appendChild(newCell);
	
	newCell = document.createElement('TH');
	newCell.className = 'odd';
	newCell.innerHTML = 'Active';
	newRow.appendChild(newCell);
	
	newCell = document.createElement('TH');
	newCell.className = 'even';
	newCell.innerHTML = 'Peak Active';
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
			case 'e':
				newRow.className = 'excluded'; excluded = 1; show_excl_button = 1; break;
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
		
		tmp = newRow.getAttribute('fc');
		if (tmp) {
			switch (tmp) {
				case 'Gr':
					newCell.className = 'bgGreen_r'; break;
				case 'Rr':
					newCell.className = 'bgRed_r'; break;
				case 'er':
					newCell.className = 'even_r'; break;
				case 'or':
					newCell.className = 'odd_r'; break;
				default:
					newCell.className = ''; break;
			}
			tmp = newRow.getAttribute('F');
			if (tmp) {
				newElement = document.createElement('a');
				hrefLnk = tmp.match(/^([^$]*)\$([^$]*)$/i);
				if (hrefLnk && hrefLnk.length == 3) {
					newElement.setAttribute("href", "pertest.htm?bin=a" + hrefLnk[1] + "&scope=" + hrefLnk[2]);
				} else {
					newElement.setAttribute("href", tmp);
				}
				newElement.setAttribute("rel", 'popup 200 200');
				newElement.innerHTML = newRow.getAttribute('h1');
				newCell.appendChild(newElement);
			} else {
				newCell.innerHTML = newRow.getAttribute('h1');
			}
		} else {
			newCell.className = 'even_r';
			newCell.innerHTML = '-';
		}
		if (excluded) {
			// if excluded override the class name
			newCell.className = 'even_rGrey';
		}
		newRow.appendChild(newCell);

		newCell = document.createElement('TD');
		
		tmp = newRow.getAttribute('pc');
		if (tmp) {
			switch (tmp) {
				case 'Gr':
					newCell.className = 'bgGreen_r'; break;
				case 'Rr':
					newCell.className = 'bgRed_r'; break;
				case 'er':
					newCell.className = 'even_r'; break;
				case 'or':
					newCell.className = 'odd_r'; break;
				default:
					newCell.className = ''; break;
			}
			tmp = newRow.getAttribute('P');
			if (tmp) {
				newElement = document.createElement('a');
				hrefLnk = tmp.match(/^([^$]*)\$([^$]*)$/i);
				if (hrefLnk && hrefLnk.length == 3) {
					newElement.setAttribute("href", "pertest.htm?bin=a" + hrefLnk[1] + "&scope=" + hrefLnk[2]);
				} else {
					newElement.setAttribute("href", tmp);
				}
				newElement.setAttribute("rel", 'popup 200 200');
				newElement.innerHTML = newRow.getAttribute('h2');
				newCell.appendChild(newElement);
			} else {
				newCell.innerHTML = newRow.getAttribute('h2');
			}
		} else {
			newCell.className = 'odd_r';
			newCell.innerHTML = '-';
		}
		if (excluded) {
			// if excluded override the class name
			newCell.className = 'odd_rGrey';
		}
		newRow.appendChild(newCell);

		newCell = document.createElement('TD');
		newCell.className = 'even_r';

		tmp2 = newRow.getAttribute('h3');
		if (tmp2) {
			tmp = newRow.getAttribute('At');
			if (tmp) {
				newElement = document.createElement('a');
				hrefLnk = tmp.match(/^([^$]*)\$([^$]*)$/i);
				if (hrefLnk && hrefLnk.length == 3) {
					newElement.setAttribute("href", "pertest.htm?bin=a" + hrefLnk[1] + "&scope=" + hrefLnk[2]);
				} else {
					newElement.setAttribute("href", tmp);
				}
				newElement.setAttribute("rel", 'popup 200 200');
				newElement.innerHTML = tmp2; // newRow.getAttribute('h3')
				newCell.appendChild(newElement);
			} else {
				newCell.innerHTML = tmp2; // newRow.getAttribute('h3')
			}
		} else {
			newCell.innerHTML = '-';
		}
		if (excluded) {
			// if excluded override the class name
			newCell.className = 'even_rGrey';
		}
		newRow.appendChild(newCell);

		newCell = document.createElement('TD');
		newCell.className = 'odd_r';

		tmp2 = newRow.getAttribute('h4');
		if (tmp2) {
			tmp = newRow.getAttribute('V');
			if (tmp) {
				newElement = document.createElement('a');
				hrefLnk = tmp.match(/^([^$]*)\$([^$]*)$/i);
				if (hrefLnk && hrefLnk.length == 3) {
					newElement.setAttribute("href", "pertest.htm?bin=a" + hrefLnk[1] + "&scope=" + hrefLnk[2]);
				} else {
					newElement.setAttribute("href", tmp);
				}
				newElement.setAttribute("rel", 'popup 200 200');
				newElement.innerHTML = tmp2; // newRow.getAttribute('h4')
				newCell.appendChild(newElement);
			} else {
				newCell.innerHTML = tmp2; // newRow.getAttribute('h4')
			}
		} else {
			newCell.innerHTML = '-';
		}
		if (excluded) {
			// if excluded override the class name
			newCell.className = 'odd_rGrey';
		}
		newRow.appendChild(newCell);

		newCell = document.createElement('TD');
		newCell.className = 'even_r';

		tmp2 = newRow.getAttribute('h5');
		if (tmp2) {
			tmp = newRow.getAttribute('D');
			if (tmp) {
				newElement = document.createElement('a');
				hrefLnk = tmp.match(/^([^$]*)\$([^$]*)$/i);
				if (hrefLnk && hrefLnk.length == 3) {
					newElement.setAttribute("href", "pertest.htm?bin=a" + hrefLnk[1] + "&scope=" + hrefLnk[2]);
				} else {
					newElement.setAttribute("href", tmp);
				}
				newElement.setAttribute("rel", 'popup 200 200');
				newElement.innerHTML = tmp2; // newRow.getAttribute('h5')
				newCell.appendChild(newElement);
			} else {
				newCell.innerHTML = tmp2; // newRow.getAttribute('h5')
			}
		} else {
			newCell.innerHTML = '-';
		}
		if (excluded) {
			// if excluded override the class name
			newCell.className = 'even_rGrey';
		}
		newRow.appendChild(newCell);

		newCell = document.createElement('TD');
		newCell.className = 'odd_r';

		tmp2 = newRow.getAttribute('h6');
		if (tmp2) {
			tmp = newRow.getAttribute('A');
			if (tmp) {
				newElement = document.createElement('a');
				hrefLnk = tmp.match(/^([^$]*)\$([^$]*)$/i);
				if (hrefLnk && hrefLnk.length == 3) {
					newElement.setAttribute("href", "pertest.htm?bin=a" + hrefLnk[1] + "&scope=" + hrefLnk[2]);
				} else {
					newElement.setAttribute("href", tmp);
				}
				newElement.setAttribute("rel", 'popup 200 200');
				newElement.innerHTML = tmp2; // newRow.getAttribute('h6')
				newCell.appendChild(newElement);
			} else {
				newCell.innerHTML = tmp2; // newRow.getAttribute('h6')
			}
		} else {
			newCell.innerHTML = '-';
		}
		if (excluded) {
			// if excluded override the class name
			newCell.className = 'odd_rGrey';
		}
		newRow.appendChild(newCell);

		newCell = document.createElement('TD');
		newCell.className = 'even_r';

		tmp2 = newRow.getAttribute('h7');
		if (tmp2) {
			tmp = newRow.getAttribute('PA');
			if (tmp) {
				newElement = document.createElement('a');
				hrefLnk = tmp.match(/^([^$]*)\$([^$]*)$/i);
				if (hrefLnk && hrefLnk.length == 3) {
					newElement.setAttribute("href", "pertest.htm?bin=a" + hrefLnk[1] + "&scope=" + hrefLnk[2]);
				} else {
					newElement.setAttribute("href", tmp);
				}
				newElement.setAttribute("rel", 'popup 200 200');
				newElement.innerHTML = tmp2; // newRow.getAttribute('h7')
				newCell.appendChild(newElement);
			} else {
				newCell.innerHTML = tmp2; // newRow.getAttribute('h7')
			}
		} else {
			newCell.innerHTML = '-';
		}
		if (excluded) {
			// if excluded override the class name
			newCell.className = 'even_rGrey';
		}
		newRow.appendChild(newCell);
		
		newCell = document.createElement('TD');
		if (excluded == 0) {
			tmp = newRow.getAttribute('c');
			switch (tmp) {
				case 'F':
					newCell.className = 'red';   newCell.innerHTML = "Failed"; break;
				case 'Z':
					newCell.className = 'red';   newCell.innerHTML = "ZERO"; break;
				case 'g':
					newCell.className = 'green'; newCell.innerHTML = "Covered"; break;
				default:
					newCell.className = ''; break;
			}
		} else {
			newCell.className = 'grey'; newCell.innerHTML = "Excluded";
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
