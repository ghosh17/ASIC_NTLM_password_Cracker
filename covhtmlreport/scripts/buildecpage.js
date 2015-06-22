var tables = document.getElementsByTagName("TABLE");
var table, newRow, newCell, newElement, tmp, hrefLnk, lastClassOdd, exFec, show_excl_button = 0;
var t = 0;

if (tables[0].className.match('buttons')) {
	// ignore the 1st table which is the table for show/hide buttons
	t = 1;
}

for (; t < tables.length; t++) {
	var excluded_row = 0;
	table = tables[t];
	table.cellspacing = "2";
	table.cellpadding = "2";
	
	newRow = table.rows[0];
	
	newCell = document.createElement('TH');
	newCell.colSpan = newRow.getAttribute('s'); // s is colSpan

	tmp = newRow.getAttribute('x'); // x for text
	switch (tmp) {
		case 'FC':
			newCell.innerHTML = 'FEC Condition:&nbsp;';  break;
		case 'FE':
			newCell.innerHTML = 'FEC Expression:&nbsp;'; break;
		case 'UC':
			newCell.innerHTML = 'UDP Condition:&nbsp;';  break;
		case 'UE':
			newCell.innerHTML = 'UDP Expression:&nbsp;'; break;
		default:
			newCell.innerHTML = '[Oops...]:&nbsp;';      break;
	}

	tmp = newRow.getAttribute('lnk');
	if (tmp) {
		newElement = document.createElement('a');
		newElement.setAttribute("href",tmp);
		name = newRow.getAttribute('z');
		if (name) {
			if (name.match(/^<.*>$/)) {
				newElement.innerHTML = name.replace(">","&gt;").replace("<","&lt;");				
			} else {
				newElement.innerHTML = name;
			}
		}
		newCell.appendChild(newElement);
	} else {
		newCell.innerHTML = newCell.innerHTML + newRow.getAttribute('z');
	}
	newRow.appendChild(newCell);
	
	newCell = document.createElement('TD');
	tmp = newRow.getAttribute('c');
	switch (tmp) {
		case 'R':
			newCell.className = 'bgRed'; break;
		case 'Y':
			newCell.className = 'bgYellow'; break;
		case 'G':
			newCell.className = 'bgGreen'; break;
		case 'e':
			newCell.className = 'grey'; excluded_row = 1 ; show_excl_button = 1; break;
		default:
			newCell.className = ''; break;
	}
	if (!excluded_row) {
		newCell.innerHTML = newRow.getAttribute('p') + "%";
	} else {
		newCell.innerHTML = "Excluded";
		newRow.cells[0].className = 'grey';
	}
	newRow.appendChild(newCell);

	tmp = newRow.getAttribute('F'); // F is FEC 
	exFec = tmp;
	if (tmp) {
		/**************************************************************************/
		newRow = table.rows[1];
		newCell = document.createElement('TH');
		newCell.className = 'even';
		newCell.colSpan = tmp;
		newCell.innerHTML = "Input Term";
		newRow.appendChild(newCell);
		
		newCell = document.createElement('TH');
		newCell.className = 'even';
		newCell.colSpan = tmp;
		newCell.innerHTML = "Covered";
		newRow.appendChild(newCell);
		
		newCell = document.createElement('TH');
		newCell.className = 'even';
		newCell.innerHTML = "Reason For No Coverage";
		newRow.appendChild(newCell);
		
		newCell = document.createElement('TH');
		newCell.className = 'even';
		newCell.innerHTML = "Hint";
		newRow.appendChild(newCell);
		
		var r = 2;
		for (; r < table.rows.length; r++) {
			var excluded = 0;
			newRow = table.rows[r];
			tmp = newRow.getAttribute('z');
			if (!tmp) {
				break;
			}
			newCell = document.createElement('TD');
			newCell.className = 'even';
			newCell.colSpan = exFec;
			newCell.align = 'center';
			newCell.innerHTML = tmp;
			newRow.appendChild(newCell);
			
			newCell = document.createElement('TD');
			tmp = newRow.getAttribute('c');
			switch (tmp) {
				case 'g':
					newCell.className = 'green'; newCell.innerHTML = 'Yes'; break;
				case 'r':
					newCell.className = 'red'; newCell.innerHTML = 'No'; break;
				case 'e':
					newCell.className = 'grey'; excluded = 1; show_excl_button = 1; newCell.innerHTML = 'Excluded'; newRow.cells[0].className = 'evenGrey'; break;
				default:
					newCell.className = ''; break;
			}
			newCell.colSpan = exFec;
			newCell.align = 'center';
			newRow.appendChild(newCell);
			
			newCell = document.createElement('TD');
			newCell.className = 'even';
			newCell.align = 'center';
			if (!excluded) {
				newCell.innerHTML = newRow.getAttribute('r'); // r is reason
			}
			newRow.appendChild(newCell);
			
			newCell = document.createElement('TD');
			newCell.className = 'even';
			newCell.align = 'center';
			if (!excluded) {
				newCell.innerHTML = newRow.getAttribute('i'); // i is hint
			}
			newRow.appendChild(newCell);
		}
		newRow = table.rows[r];
		if (exFec == 2) {
			/* extended fec */
			newCell = document.createElement('TH');
			newCell.className = 'even';
			newCell.innerHTML = "Rows";
			newRow.appendChild(newCell);
			newCell = document.createElement('TH');
			newCell.className = 'even';
			newCell.innerHTML = "FEC Target";
			newRow.appendChild(newCell);
			newCell = document.createElement('TH');
			newCell.className = 'even';
			newCell.innerHTML = "Hits (->0)";
			newRow.appendChild(newCell);
			newCell = document.createElement('TH');
			newCell.className = 'even';
			newCell.innerHTML = "Hits (->1)";
			newRow.appendChild(newCell);
			newCell = document.createElement('TH');
			newCell.className = 'even';
			newCell.innerHTML = "Matching Input Patterns (->0)";
			newRow.appendChild(newCell);
			newCell = document.createElement('TH');
			newCell.className = 'even';
			newCell.innerHTML = "Matching Input Patterns (->1)";
			newRow.appendChild(newCell);
			/***************************   end of table head  ***************************************/
			r++;
			for (; r < table.rows.length; r++) {
				var excluded = 0;
				newRow = table.rows[r];
				newCell = document.createElement('TD');
				newCell.className = 'even';
				newCell.align = "center";
				newCell.innerHTML = "Row&nbsp;" + newRow.getAttribute('n');
				newRow.appendChild(newCell);
				
				newCell = document.createElement('TD');
				newCell.className = 'even';
				newCell.align = "center";
				newCell.innerHTML = newRow.getAttribute('z');
				newRow.appendChild(newCell);
				
				newCell = document.createElement('TD');
				newCell.className = 'even';
				newCell.align = "center";
				tmp = newRow.getAttribute('h1');
				if (tmp) {
					if (newRow.getAttribute('k1')) {
						newElement = document.createElement('a');
						hrefLnk = newRow.getAttribute('k1').match(/^([^$]*)\$([^$]*)$/i);
						if (hrefLnk && hrefLnk.length == 3) {
							newElement.setAttribute("href", "pertest.htm?bin=" + newRow.getAttribute('t') + hrefLnk[1] + "&scope=" + hrefLnk[2]);
						} else {
							newElement.setAttribute("href", newRow.getAttribute('k1'));
						}
						newElement.setAttribute("rel", 'popup 200 200');
						newElement.innerHTML = tmp;
						newCell.appendChild(newElement);
					} else {
						newCell.innerHTML = tmp;
						if ((tmp == "E-Hit") || (tmp == "E-Miss")) {
							// excluded row
							excluded = 1;
							newRow.cells[0].className = 'evenGrey';
							newRow.cells[1].className = 'evenGrey';
							newCell.className.className = 'evenGrey';
						}
					}
				} else {
					newCell.innerHTML = "&nbsp;-&nbsp;";
				}
				newRow.appendChild(newCell);
				
				newCell = document.createElement('TD');
				newCell.className = 'even';
				newCell.align = "center";
				tmp = newRow.getAttribute('h2');
				if (tmp) {
					if (newRow.getAttribute('k2')) {
						newElement = document.createElement('a');
						hrefLnk = newRow.getAttribute('k2').match(/^([^$]*)\$([^$]*)$/i);
						if (hrefLnk && hrefLnk.length == 3) {
							newElement.setAttribute("href", "pertest.htm?bin=" + newRow.getAttribute('t') + hrefLnk[1] + "&scope=" + hrefLnk[2]);
						} else {
							newElement.setAttribute("href", newRow.getAttribute('k2'));
						}
						newElement.setAttribute("rel", 'popup 200 200');
						newElement.innerHTML = tmp;
						newCell.appendChild(newElement);
					} else {
						newCell.innerHTML = tmp;
						if ((tmp == "E-Hit") || (tmp == "E-Miss")) {
							// excluded row
							excluded = 1;
							newRow.cells[0].className = 'evenGrey';
							newRow.cells[1].className = 'evenGrey';
							newCell.className.className = 'evenGrey';
						}
					}
				} else {
					newCell.innerHTML = "&nbsp;-&nbsp;";
				}
				newRow.appendChild(newCell);
				
				newCell = document.createElement('TD');
				if (!excluded) {
					newCell.className = 'even';
				} else {
					newCell.className = 'evenGrey';
				}
				newCell.align = "center";
				newCell.innerHTML = "&nbsp;" + newRow.getAttribute('c1') + "&nbsp;";
				newRow.appendChild(newCell);
				
				newCell = document.createElement('TD');
				if (!excluded) {
					newCell.className = 'even';
				} else {
					newCell.className = 'evenGrey';
				}
				newCell.align = "center";
				newCell.innerHTML = "&nbsp;" + newRow.getAttribute('c2') + "&nbsp;";
				newRow.appendChild(newCell);
			}
		} else {
			/* fec */
			newCell = document.createElement('TH');
			newCell.className = 'even';
			newCell.innerHTML = "Rows";
			newRow.appendChild(newCell);
			newCell = document.createElement('TH');
			newCell.className = 'even';
			newCell.innerHTML = "FEC Target";
			newRow.appendChild(newCell);
			newCell = document.createElement('TH');
			newCell.className = 'even';
			newCell.innerHTML = "Hits";
			newRow.appendChild(newCell);
			newCell = document.createElement('TH');
			newCell.className = 'even';
			newCell.innerHTML = "Matching Input Patterns";
			newRow.appendChild(newCell);
			/***************************   end of table head  ***************************************/
			r++;
			for (; r < table.rows.length; r++) {
				var excluded = 0;
				newRow = table.rows[r];
				newCell = document.createElement('TD');
				newCell.className = 'even';
				newCell.align = "center";
				newCell.innerHTML = "Row&nbsp;" + newRow.getAttribute('n');
				newRow.appendChild(newCell);
				
				newCell = document.createElement('TD');
				newCell.className = 'even';
				newCell.align = "center";
				newCell.innerHTML = newRow.getAttribute('z');
				newRow.appendChild(newCell);
				
				newCell = document.createElement('TD');
				newCell.className = 'even';
				newCell.align = "center";
				tmp = newRow.getAttribute('h1');
				if (tmp) {
					if (newRow.getAttribute('k1')) {
						newElement = document.createElement('a');
						hrefLnk = newRow.getAttribute('k1').match(/^([^$]*)\$([^$]*)$/i);
						if (hrefLnk && hrefLnk.length == 3) {
							newElement.setAttribute("href", "pertest.htm?bin=" + newRow.getAttribute('t') + hrefLnk[1] + "&scope=" + hrefLnk[2]);
						} else {
							newElement.setAttribute("href", newRow.getAttribute('k1'));
						}
						newElement.setAttribute("rel", 'popup 200 200');
						newElement.innerHTML = tmp;
						newCell.appendChild(newElement);
					} else {
						newCell.innerHTML = tmp;
						if ((tmp == "E-Hit") || (tmp == "E-Miss")) {
							// excluded row
							excluded = 1;
							newRow.cells[0].className = 'evenGrey';
							newRow.cells[1].className = 'evenGrey';
							newCell.className = 'evenGrey';
						}
					}
				} else {
					newCell.innerHTML = "&nbsp;-&nbsp;";
				}
				newRow.appendChild(newCell);
				
				newCell = document.createElement('TD');
				if (!excluded) {
					newCell.className = 'even';
				} else {
					newCell.className = 'evenGrey';
				}
				newCell.align = "center";
				newCell.innerHTML = "&nbsp;" + newRow.getAttribute('c1') + "&nbsp;";
				newRow.appendChild(newCell);
			}
		}
	} else {
		var r = 1;
		lastClassOdd = true; // is true to start the series with 'even'
		for (; r < (table.rows.length) - 1; r++) { // I added the '-1' because the last row is processed outside the loop
			newRow = table.rows[r];
			tmp = newRow.getAttribute('r'); // r is rowspan
			if (!tmp) {
				break;
			}
			newCell = document.createElement('TD');
			newCell.innerHTML = "&nbsp;";
			newCell.rowSpan = tmp;
			if (lastClassOdd)
				newCell.className = 'even';
			else
				newCell.className = 'odd';
			
			// commented this line to use the same class for both cells
			//lastClassOdd = !lastClassOdd;
			newRow.appendChild(newCell);
			
			newCell = document.createElement('TD');
			newCell.innerHTML = newRow.getAttribute('z');
			if (lastClassOdd)
				newCell.className = 'odd'; // the inverse in intended
			else
				newCell.className = 'even';
				
			lastClassOdd = !lastClassOdd;
			newCell.colSpan = newRow.getAttribute('s'); // s is colspan
			newRow.appendChild(newCell);
		}
		newRow = table.rows[r];
		
		newCell = document.createElement('TD');
		newCell.innerHTML = "&nbsp;";
		newCell.rowSpan = '1';
		if (lastClassOdd)
			newCell.className = 'even';
		else
			newCell.className = 'odd';
			
		newRow.appendChild(newCell);
		
		newCell = document.createElement('TH');
		newCell.innerHTML = "Hits";
		if (lastClassOdd)
			newCell.className = 'even';
		else
			newCell.className = 'odd';
			
		newRow.appendChild(newCell);
		
		newCell = document.createElement('TH');
		newCell.innerHTML = "Status";
		if (lastClassOdd)
			newCell.className = 'even';
		else
			newCell.className = 'odd';
			
		newRow.appendChild(newCell);
		/***************************   end of table head  ***************************************/
		r++;
		for (; r < table.rows.length; r++) {
			var excluded = 0;
			lastClassOdd = true; // is true to start the series with 'even'
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
				case 'e':
					newRow.className = 'grey'; excluded = 1; show_excl_button = 1; break;
				default:
					newRow.className = ''; break;
			}
			newCell = document.createElement('TD');
			tmp = newRow.getAttribute('U'); // u is Unknown
			if (tmp) {
				newCell.className = 'odd';
				newCell.width = '20';
				newCell.align = 'center';
				newCell.colSpan = newRow.getAttribute('s');
				newCell.innerHTML = tmp;
				newRow.appendChild(newCell);
			} else {
				if (lastClassOdd)
					newCell.className = 'even';
				else
					newCell.className = 'odd';
				
				lastClassOdd = !lastClassOdd;
				newCell.innerHTML = "Row&nbsp;" + newRow.getAttribute('n');
				newRow.appendChild(newCell);
				
				tmp = newRow.getAttribute('o'); // o is loop
				if (tmp) {
					tmp = newRow.getAttribute('z');
					for(i = 0; i < tmp.length; i++) {
						newCell = document.createElement('TD');
						if (lastClassOdd)
							newCell.className = 'even';
						else
							newCell.className = 'odd';
						
						lastClassOdd = !lastClassOdd;
						newCell.width = '20';
						newCell.align = 'center';
						newCell.innerHTML = tmp.charAt(i);
						newRow.appendChild(newCell);
					}
				} else {
					newCell = document.createElement('TD');
					if (lastClassOdd)
						newCell.className = 'even';
					else
						newCell.className = 'odd';
					
					lastClassOdd = !lastClassOdd;
					newCell.width = '20';
					newCell.align = 'center';
					newCell.innerHTML = newRow.getAttribute('z');
					newRow.appendChild(newCell);
				}
			}
			newCell = document.createElement('TD');
			tmp = newRow.getAttribute('cc');
			switch (tmp) {
				case 'o':
					newCell.className = 'odd_r'; break;
				case 'e':
					newCell.className = 'even_r'; break;
				default:
					newCell.className = ''; break;
			}
			tmp = newRow.getAttribute('k1');
			if (tmp) {
				newElement = document.createElement('a');
				hrefLnk = tmp.match(/^([^$]*)\$([^$]*)$/i);
				if (hrefLnk && hrefLnk.length == 3) {
					newElement.setAttribute("href", "pertest.htm?bin=" + newRow.getAttribute('t') + hrefLnk[1] + "&scope=" + hrefLnk[2]);
				} else {
					newElement.setAttribute("href", tmp);
				}
				newElement.setAttribute("rel", 'popup 200 200');
				newElement.innerHTML = newRow.getAttribute('h1');
				newCell.appendChild(newElement);
			} else {
				newCell.innerHTML = newRow.getAttribute('h1');
			}
			newRow.appendChild(newCell);
			
			newCell = document.createElement('TD');
			if (!excluded) {
				tmp = newRow.getAttribute('c');
				switch (tmp) {
					case 'g':
						newCell.className = 'green'; newCell.innerHTML = 'Covered'; break;
					case 'r':
						newCell.className = 'red'; newCell.innerHTML = 'ZERO'; break;
					default:
						newCell.align = 'center'; newCell.innerHTML = '--'; break;
				}
			} else {
				newCell.className = 'grey'; newCell.innerHTML = 'Excluded';
			}
			newRow.appendChild(newCell);
		}
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
