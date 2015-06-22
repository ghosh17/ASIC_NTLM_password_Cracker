var tables = document.getElementsByTagName("TABLE");
var table, newRow, newCell, newElement, newElement2, childCell, tmp, tmp2, hrefLnk, lastClassOdd, numOfAttr, curr_class;
var t = 0;
var debug = 0;
var TEXTAREA_COLS = 20;
var TEXTAREA_COLS_STR = 20;
var TEXTAREA_ROWS_STR = 2;
if (tables[0].className.match('noborder')) {
	// ignore the 1st table which is the table for Expand/Collapse buttons
	t = 1;
}

for (; t < tables.length; t++) {
	table = tables[t];
	newRow = table.rows[0];

	newCell = document.createElement('TH');
	newCell.className = 'odd';
	newCell.colSpan = newRow.getAttribute('s');
	newCell.innerHTML = 'Testplan section';
	newRow.appendChild(newCell);
	
	newCell = document.createElement('TH');
	newCell.className = 'even';
	newCell.innerHTML = 'Linked Items';
	newRow.appendChild(newCell);
	
	newCell = document.createElement('TH');
	newCell.className = 'odd';
	newCell.innerHTML = 'Covered Items';
	newRow.appendChild(newCell);
	
	newCell = document.createElement('TH');
	newCell.className = 'even';
	newCell.innerHTML = 'Coverage';
	newRow.appendChild(newCell);
	
	newCell = document.createElement('TH');
	newCell.className = 'odd';
	newCell.innerHTML = '% of Goal';
	newRow.appendChild(newCell);
	
	newCell = document.createElement('TH');
	newCell.className = 'even';
	newCell.innerHTML = 'Type';
	newRow.appendChild(newCell);
	
	newCell = document.createElement('TH');
	newCell.className = 'odd';				// this is the last of the default columns, because its class is odd
											// so lastClassOdd is true
	newCell.innerHTML = 'Description';
	newRow.appendChild(newCell);

	// the same value should be set down also after the comment that says so.
	lastClassOdd = true;
	var i = 1
	for(; i > 0; i++) {
		tmp = newRow.getAttribute('x' + i);
		if (!tmp) break;
		newCell = document.createElement('TH');
		if (lastClassOdd)
			newCell.className = 'even';
		else
			newCell.className = 'odd';
					
		lastClassOdd = !lastClassOdd;
		newCell.innerHTML = tmp;
		newRow.appendChild(newCell);
	}
	numOfAttr = i - 1;
/********************************** End Of row 0 -- hearders **********************************/	
	for (var r = 1; r < table.rows.length; r++) {
		newRow = table.rows[r];
		tmp = newRow.getAttribute('l');
		if (tmp) {
			for(var i = 0; i < tmp; i++) {
				newCell = document.createElement('TD');
				newCell.innerHTML = '&nbsp;';
				newRow.appendChild(newCell);
			}
		}

		if (newRow.id.match(/^t\d+L\d+Id$/)) {
			newCell = document.createElement('TD');
			newCell.className = 'tgTdO';
			tmp = newRow.getAttribute('s');
			if (tmp > 1) {
				newCell.setAttribute("colSpan", tmp);
			} else {
				newCell.setAttribute("colSpan", "1");
			}
			tmp = newRow.getAttribute('i');
			if (tmp) {
				newElement = document.createElement('DIV');
				newElement.id = 't' + tmp + 'L' + newRow.getAttribute('in') + "IdB" ;
				newElement.className = "btnD";
				newElement.setAttribute("onclick", "toggleContentsDisplay(t" + tmp + "L" + newRow.getAttribute('in') + ')');
				
				newElement2 = document.createElement('IMG');
				newElement2.src = "images/rtr.png";
				newElement.appendChild(newElement2);
				newCell.appendChild(newElement);
			}
			newElement = document.createElement('DIV');
			newElement.className = "tpD";
			newElement.innerHTML = newRow.getAttribute('z');
			newCell.appendChild(newElement);
			newRow.appendChild(newCell);
		} else if (newRow.id.match(/^t\d+L\d+IdFp$/)) {
			newRow.className = "fpTr";
			
			newCell = document.createElement('TD');
			newCell.className = 'tgTdO';
			tmp2 = newRow.getAttribute('s');
			if (tmp2 > 1) {
				newCell.setAttribute("colSpan", tmp2);
			} else {
				newCell.setAttribute("colSpan", "1");
			}
			newCell.innerHTML = newRow.getAttribute('z');
			newRow.appendChild(newCell);
		} else /* if (newRow.id.match(/^t\d+Id$/)) */ {
			newCell = document.createElement('TD');
			newCell.className = 'odd';
			tmp = newRow.getAttribute('s');
			if (tmp > 1) {
				newCell.setAttribute("colSpan", tmp);
			} else {
				newCell.setAttribute("colSpan", "1");
			}

			tmp = newRow.getAttribute('d');
			if (tmp == 1) {
				newElement = document.createElement('DIV');
				newElement.id = 't' + newRow.getAttribute('i') + "IdB" ;
				newElement.className = "btnD";
				newElement.setAttribute("onclick", "toggleContentsDisplay(t" + newRow.getAttribute('i') + ')');
				
				newElement2 = document.createElement('IMG');
				newElement2.src = "images/dtr.png";
				newElement.appendChild(newElement2);
				newCell.appendChild(newElement);
			} else if (tmp == 2){
				newElement = document.createElement('DIV');
				newElement.className = "dimBtnD";
				newElement2 = document.createElement('IMG');
				newElement2.src = "images/dimrtr.png";
				newElement.appendChild(newElement2);
				newCell.appendChild(newElement);
			}
			newElement = document.createElement('DIV');
			newElement.className = "tpD";
			tmp = newRow.getAttribute('n');
			if (tmp) {
				newElement2 = document.createElement('a');
				newElement2.setAttribute("href", "pages/" + tmp);
				newElement2.innerHTML = newRow.getAttribute('z');
				newElement.appendChild(newElement2);
			} else {
				newElement.innerHTML = newRow.getAttribute('z');
			}
			newCell.appendChild(newElement);
			newRow.appendChild(newCell);
		}
		/***************************************************************************************************/
		tmp = newRow.getAttribute('f');
		if (tmp == 1) {
			newCell = document.createElement('TD');
			newCell.className = 'even';
			newCell.align = 'right';
			newCell.innerHTML = newRow.getAttribute('c');
			newRow.appendChild(newCell);
				
			newCell = document.createElement('TD');
			newCell.className = 'odd';
			newCell.align = 'right';
			newCell.innerHTML = newRow.getAttribute('v');
			newRow.appendChild(newCell);
				
			newCell = document.createElement('TD');
			newCell.className = 'cntreven';
			tmp2 = newRow.getAttribute('h');
			if(tmp2) {
				newCell.innerHTML = tmp2 + '%';
			} else {
				newCell.innerHTML = "--";
			}
			newRow.appendChild(newCell);
				
			newCell = document.createElement('TD');
			newCell.innerHTML = newRow.getAttribute('p') + '%';
			tmp2 = newRow.getAttribute('pc');
			switch (tmp2) {
				case 'R':
					newCell.className = 'bgRed'; break;
				case 'Y':
					newCell.className = 'bgYellow'; break;
				case 'G':
					newCell.className = 'bgGreen'; break;
				default:
					newCell.className = ''; break;
			}
			newRow.appendChild(newCell);
		} else if (tmp == 2){
			for(i = 0; i < 4; i++) {
				newCell = document.createElement('TD');
				newCell.innerHTML = "(none)";
				if(i%2) {
					newCell.className = 'cntrodd';
				} else {
					newCell.className = 'cntreven';
				}
				newRow.appendChild(newCell);
			}
		} else if (tmp == 3){
			newCell = document.createElement('TD'); /* Linked Items */
			newCell.className = 'tgTdE';
			newCell.innerHTML = "--";
			newRow.appendChild(newCell);
				
			newCell = document.createElement('TD');  /* Covered Items */
			newCell.className = 'tgTdO';
			newCell.innerHTML = "--";
			newRow.appendChild(newCell);
				
			newCell = document.createElement('TD');
			newCell.className = 'tgTdCntrE';
			newCell.innerHTML = newRow.getAttribute('h') + '%';
			newRow.appendChild(newCell);
				
			newCell = document.createElement('TD');
			tmp2 = newRow.getAttribute('pc');
			switch (tmp2) {
				case 'R':
					newCell.className = 'bgRed';    newCell.innerHTML = newRow.getAttribute('p') + '%'; break;
				case 'Y':
					newCell.className = 'bgYellow'; newCell.innerHTML = newRow.getAttribute('p') + '%'; break;
				case 'G':
					newCell.className = 'bgGreen';  newCell.innerHTML = newRow.getAttribute('p') + '%'; break;
				default:
					newCell.className = 'tgTdCntrO'; newCell.innerHTML = "--"; break;
			}
			newRow.appendChild(newCell);
				
			newCell = document.createElement('TD'); /* Type */
			newCell.className = 'tgTdCntrE';
			newCell.innerHTML = newRow.getAttribute('t');
			newRow.appendChild(newCell);
				
			newCell = document.createElement('TD'); /* Description */
			newCell.className = 'tgTdO';
			newCell.innerHTML = "--";
			newRow.appendChild(newCell);
				
			// NOTE: if the default columns are changed, then lastClassOdd should be changed accordingly
			// according to the class of the last column of the default columns
			lastClassOdd = true;
			for(i = 0; i < numOfAttr; i++) {
				newCell = document.createElement('TD');
				newCell.innerHTML = "--";
				if (lastClassOdd)
					newCell.className = 'tgTdE';
				else
					newCell.className = 'tgTdO';
								
				lastClassOdd = !lastClassOdd;

				newRow.appendChild(newCell);
			}
		}
		if ((tmp == 1) || (tmp ==2)) {
			newCell = document.createElement('TD');
			newCell.className = 'cntreven';
			newCell.innerHTML = newRow.getAttribute('t'); /* Type */
			newRow.appendChild(newCell);
				
			newCell = document.createElement('TD'); /* Description */
			newCell.className = 'odd';
			tmp2 = newRow.getAttribute('ch');
			if(tmp2.length > TEXTAREA_COLS) {
				newElement = document.createElement('textarea');
				newElement.readonly = "readonly";
				newElement.className = "oddTxtBox";
				newElement.cols = TEXTAREA_COLS_STR;
				newElement.rows = TEXTAREA_ROWS_STR;
				newElement.innerHTML = tmp2;
				newCell.appendChild(newElement);
			} else {
				newCell.innerHTML = tmp2;
			}
			newRow.appendChild(newCell);
				
			// NOTE: if the default columns are changed, then lastClassOdd should be changed accordingly
			// according to the class of the last column of the default columns
			lastClassOdd = true;
			for(i = 1; i <= numOfAttr; i++) {
				newCell = document.createElement('TD');
				if (lastClassOdd) {
					newCell.className = 'even';
					curr_class = 'even';
				} else {
					newCell.className = 'odd';
					curr_class = 'odd';
				}
								
				lastClassOdd = !lastClassOdd;
				
				tmp2 = newRow.getAttribute('x' + i);
				if (tmp2) {
					if (tmp2.length > TEXTAREA_COLS) {
						newElement = document.createElement('textarea');
						newElement.readonly = "readonly";
						newElement.className = curr_class + "TxtBox";
						newElement.cols = TEXTAREA_COLS_STR;
						newElement.rows = TEXTAREA_ROWS_STR;
						newElement.innerHTML = tmp2;
						newCell.appendChild(newElement);
					} else {
						newCell.innerHTML = tmp2;
					}
				} else {
					newCell.innerHTML = "--";
				}
				newRow.appendChild(newCell);
			}
		}
	}
} /* end of script */
loadTreeNodes();
