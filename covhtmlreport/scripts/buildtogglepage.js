var tables = document.getElementsByTagName("TABLE");
var newCell, childCell, tmp, newRow, newElement, hrefLnk, show_excl_button = 0;

table = tables[tables.length - 1]; // the table contains the show/hide buttons may or may not exist
//alert("d");
// adjust the table attributes
table.cellspacing = "2";
table.cellpadding = "2";

/****************************** Start of row 0 ***********************************/
// create the table header cells and append them
newCell = document.createElement('TH');
newCell.className = 'odd';
newCell.colSpan = '2';
newCell.rowSpan = '2';
newCell.innerHTML = 'Signal / Value';
table.rows[0].appendChild(newCell);

newCell = document.createElement('TH');
newCell.className = 'even';
newCell.colSpan = '6';
newCell.innerHTML = 'Hits';
table.rows[0].appendChild(newCell);

newCell = document.createElement('TH');
newCell.className = 'odd';
newCell.rowSpan = '2';
newCell.innerHTML = 'ExtMode';
table.rows[0].appendChild(newCell);

newCell = document.createElement('TH');
newCell.className = 'even';
newCell.rowSpan = '2';
newCell.innerHTML = 'Status';
table.rows[0].appendChild(newCell);
/****************************** End of row 0 ***********************************/
newCell = document.createElement('TH');
newCell.className = 'even';
newCell.innerHTML = '0L->1H';
table.rows[1].appendChild(newCell);

newCell = document.createElement('TH');
newCell.className = 'odd';
newCell.innerHTML = '1H->0L';
table.rows[1].appendChild(newCell);

newCell = document.createElement('TH');
newCell.className = 'even';
newCell.innerHTML = '0L->Z';
table.rows[1].appendChild(newCell);

newCell = document.createElement('TH');
newCell.className = 'odd';
newCell.innerHTML = 'Z->1H';
table.rows[1].appendChild(newCell);

newCell = document.createElement('TH');
newCell.className = 'even';
newCell.innerHTML = '1H->Z';
table.rows[1].appendChild(newCell);

newCell = document.createElement('TH');
newCell.className = 'odd';
newCell.innerHTML = 'Z->0L';
table.rows[1].appendChild(newCell);
/****************************** End of row 1 ***********************************/

// Loop on the rows of the table
for (var r = 2; r < table.rows.length; r++) {
	var excluded = 0;
	newRow = table.rows[r];
	newCell = document.createElement('TD');
	tmp = newRow.getAttribute('s');
	if (tmp)
		newCell.colSpan = tmp;
	
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

	tmp = newRow.getAttribute('st');
	if (tmp) {
		/* colSpan is 1 */
		/* simple toggle */
		newCell.className = 'invisible';
		newCell.innerHTML = '&nbsp;';
		newRow.appendChild(newCell);
		childCell = document.createElement('TD');
		if (excluded == 1)
			childCell.className = 'oddGrey';
		else
			childCell.className = 'odd';

		childCell.innerHTML = newRow.getAttribute('z');
		newRow.appendChild(childCell);
	} else {
		newCell.className = 'odd';
		tmp = newRow.getAttribute('lnk');
		if (tmp) {
			newElement = document.createElement('a');
			newElement.setAttribute("href",tmp);
			tmp = newRow.getAttribute('t');
			newElement.innerHTML = newRow.getAttribute('z');
			if (tmp) {
				// in case there is a text in the cell i.e  [alias]
				newElement.setAttribute("title",tmp);
				newCell.innerHTML = '&nbsp;[alias]';
				newCell.insertBefore(newElement,newCell.childNodes[0]);
			} else {
				newCell.appendChild(newElement);
			}
		} else {
			tmp = newRow.getAttribute('t');
			if (tmp) {
				// in case there is a text in the cell i.e  [alias]
				newCell.innerHTML = newRow.getAttribute('z') + '&nbsp;[alias]';
				newCell.setAttribute("title",tmp);
			} else {
				newCell.innerHTML = newRow.getAttribute('z');
			}		
		}
		if (excluded == 1)
			newCell.className = 'oddGrey';
		else
			newCell.className = 'odd';

		newRow.appendChild(newCell);
	}
/////////////////////////////////////////////////////////////////////////////////////////////////		
	if (newCell.colSpan != 9) { /* i.e. newCell.colSpan == 2 or 1 */
		childCell = document.createElement('TD');
		tmp = newRow.getAttribute('LH');
		if (tmp) {
			childCell.className = 'even_r';
			newElement = document.createElement('a');
			hrefLnk = tmp.match(/^([^$]*)\$([^$]*)$/i);
			if (hrefLnk && hrefLnk.length == 3) {
				newElement.setAttribute("href", "pertest.htm?bin=t" + hrefLnk[1] + "&scope=" + hrefLnk[2]);
			} else {
				newElement.setAttribute("href", tmp);
			}
			newElement.setAttribute("rel", 'popup 200 200');
			newElement.innerHTML = newRow.getAttribute('h1');
			childCell.appendChild(newElement);
		} else {
			var bin_excluded = 0;
			tmp = newRow.getAttribute('h1');
			if (tmp) {
				childCell.className = 'even_r';
				childCell.innerHTML = tmp;
				if ((tmp == "E-Hit") || (tmp == "E-Miss")) {
					bin_excluded = 1;
				}
			} else {
				childCell.className = 'even';
				childCell.align = 'center';
				childCell.innerHTML = '--';
			}
			if (excluded || bin_excluded)
				childCell.style.color = "dimGrey";
		}
		newRow.appendChild(childCell);

		childCell = document.createElement('TD');
		tmp = newRow.getAttribute('HL');
		if (tmp) {
			childCell.className = 'odd_r';
			newElement = document.createElement('a');
			hrefLnk = tmp.match(/^([^$]*)\$([^$]*)$/i);
			if (hrefLnk && hrefLnk.length == 3) {
				newElement.setAttribute("href", "pertest.htm?bin=t" + hrefLnk[1] + "&scope=" + hrefLnk[2]);
			} else {
				newElement.setAttribute("href", tmp);
			}
			newElement.setAttribute("rel", 'popup 200 200');
			newElement.innerHTML = newRow.getAttribute('h2');
			childCell.appendChild(newElement);
		} else {
			var bin_excluded = 0;
			tmp = newRow.getAttribute('h2');
			if (tmp) {
				childCell.className = 'odd_r';
				childCell.innerHTML = tmp;
				if ((tmp == "E-Hit") || (tmp == "E-Miss")) {
					bin_excluded = 1;
				}
			} else {
				childCell.className = 'odd';
				childCell.align = 'center';
				childCell.innerHTML = '--';
			}
			if (excluded || bin_excluded)
				childCell.style.color = "dimGrey";
		}
		newRow.appendChild(childCell);
		
		childCell = document.createElement('TD');
		tmp = newRow.getAttribute('LZ');
		if (tmp) {
			childCell.className = 'even_r';
			newElement = document.createElement('a');
			hrefLnk = tmp.match(/^([^$]*)\$([^$]*)$/i);
			if (hrefLnk && hrefLnk.length == 3) {
				newElement.setAttribute("href", "pertest.htm?bin=t" + hrefLnk[1] + "&scope=" + hrefLnk[2]);
			} else {
				newElement.setAttribute("href", tmp);
			}
			newElement.setAttribute("rel", 'popup 200 200');
			newElement.innerHTML = newRow.getAttribute('h3');
			childCell.appendChild(newElement);
		} else {
			var bin_excluded = 0;
			tmp = newRow.getAttribute('h3');
			if (tmp) {
				childCell.className = 'even_r';
				childCell.innerHTML = tmp;
				if ((tmp == "E-Hit") || (tmp == "E-Miss")) {
					bin_excluded = 1;
				}
			} else {
				childCell.className = 'even';
				childCell.align = 'center';
				childCell.innerHTML = '--';
			}
			if (excluded || bin_excluded)
				childCell.style.color = "dimGrey";
		}
		tmp = newRow.getAttribute('s1');
		if (tmp) {
			childCell.innerHTML = childCell.innerHTML + '&nbsp;' + tmp;
		}
		newRow.appendChild(childCell);
		
		childCell = document.createElement('TD');
		tmp = newRow.getAttribute('ZH');
		if (tmp) {
			childCell.className = 'odd_r';
			newElement = document.createElement('a');
			hrefLnk = tmp.match(/^([^$]*)\$([^$]*)$/i);
			if (hrefLnk && hrefLnk.length == 3) {
				newElement.setAttribute("href", "pertest.htm?bin=t" + hrefLnk[1] + "&scope=" + hrefLnk[2]);
			} else {
				newElement.setAttribute("href", tmp);
			}
			newElement.setAttribute("rel", 'popup 200 200');
			newElement.innerHTML = newRow.getAttribute('h4');
			childCell.appendChild(newElement);
		} else {
			var bin_excluded = 0;
			tmp = newRow.getAttribute('h4');
			if (tmp) {
				childCell.className = 'odd_r';
				childCell.innerHTML = tmp;
				if ((tmp == "E-Hit") || (tmp == "E-Miss")) {
					bin_excluded = 1;
				}
			} else {
				childCell.className = 'odd';
				childCell.align = 'center';
				childCell.innerHTML = '--';
			}
			if (excluded || bin_excluded)
				childCell.style.color = "dimGrey";
		}
		tmp = newRow.getAttribute('s2');
		if (tmp) {
			childCell.innerHTML = childCell.innerHTML + '&nbsp;' + tmp;
		}
		newRow.appendChild(childCell);

		childCell = document.createElement('TD');
		tmp = newRow.getAttribute('HZ');
		if (tmp) {
			childCell.className = 'even_r';
			newElement = document.createElement('a');
			hrefLnk = tmp.match(/^([^$]*)\$([^$]*)$/i);
			if (hrefLnk && hrefLnk.length == 3) {
				newElement.setAttribute("href", "pertest.htm?bin=t" + hrefLnk[1] + "&scope=" + hrefLnk[2]);
			} else {
				newElement.setAttribute("href", tmp);
			}
			newElement.setAttribute("rel", 'popup 200 200');
			newElement.innerHTML = newRow.getAttribute('h5');
			childCell.appendChild(newElement);
		} else {
			var bin_excluded = 0;
			tmp = newRow.getAttribute('h5');
			if (tmp) {
				childCell.className = 'even_r';
				childCell.innerHTML = tmp;
				if ((tmp == "E-Hit") || (tmp == "E-Miss")) {
					bin_excluded = 1;
				}
			} else {
				childCell.className = 'even';
				childCell.align = 'center';
				childCell.innerHTML = '--';
			}
			if (excluded || bin_excluded)
				childCell.style.color = "dimGrey";
		}
		tmp = newRow.getAttribute('s3');
		if (tmp) {
			childCell.innerHTML = childCell.innerHTML + '&nbsp;' + tmp;
		}
		newRow.appendChild(childCell);

		childCell = document.createElement('TD');
		tmp = newRow.getAttribute('ZL');
		if (tmp) {
			childCell.className = 'odd_r';
			newElement = document.createElement('a');
			hrefLnk = tmp.match(/^([^$]*)\$([^$]*)$/i);
			if (hrefLnk && hrefLnk.length == 3) {
				newElement.setAttribute("href", "pertest.htm?bin=t" + hrefLnk[1] + "&scope=" + hrefLnk[2]);
			} else {
				newElement.setAttribute("href", tmp);
			}
			newElement.setAttribute("rel", 'popup 200 200');
			newElement.innerHTML = newRow.getAttribute('h6');
			childCell.appendChild(newElement);
		} else {
			var bin_excluded = 0;
			tmp = newRow.getAttribute('h6');
			if (tmp) {
				childCell.className = 'odd_r';
				childCell.innerHTML = tmp;
				if ((tmp == "E-Hit") || (tmp == "E-Miss")) {
					bin_excluded = 1;
				}
			} else {
				childCell.className = 'odd';
				childCell.align = 'center';
				childCell.innerHTML = '--';
			}
			if (excluded || bin_excluded)
				childCell.style.color = "dimGrey";
		}
		tmp = newRow.getAttribute('s4');
		if (tmp) {
			childCell.innerHTML = childCell.innerHTML + '&nbsp;' + tmp;
		}
		newRow.appendChild(childCell);
		
		childCell = document.createElement('TD');
		tmp = newRow.getAttribute('em'); // External Mode
		if (tmp) {
			childCell.innerHTML = tmp;
		} else {
			childCell.innerHTML = '--';
		}
		if (!newRow.getAttribute('st')) {
			childCell.className = 'even_r';
		} else {
			childCell.className = 'even';
		}
		if (excluded)
			childCell.style.color = "dimGrey";

		newRow.appendChild(childCell);
	}
	
	childCell = document.createElement('TD');
	if (excluded == 0) {
		tmp = newRow.getAttribute('c');
		switch (tmp) {
			case 'R':
				childCell.className = 'bgRed';    childCell.innerHTML = newRow.getAttribute('p') + "%"; break;
			case 'Y':
				childCell.className = 'bgYellow'; childCell.innerHTML = newRow.getAttribute('p') + "%"; break;
			case 'G':
				childCell.className = 'bgGreen';  childCell.innerHTML = newRow.getAttribute('p') + "%"; break;
			case 'g':
				childCell.className = 'green';    childCell.innerHTML = 'Covered'; 						break;
			case 'r':
				childCell.className = 'red';      childCell.innerHTML = 'ZERO'; 						break;
			default:
				childCell.className = ''; break;
		}
	} else {
		childCell.className = 'grey'; childCell.innerHTML = 'Excluded';
	}
	newRow.appendChild(childCell);
	/* end of Row */
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
