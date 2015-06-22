var tables = document.getElementsByTagName("TABLE");
var newCell, newRow, newElement, dataInCells, childCell, isCvg, cvg_cvi_table_index, tmp, lastClassOdd, name, binType, show_excl_button = 0;
var createlink = 0;

// The Covergroups / Instances Table
for (t = 0; t < tables.length; t++) {
	if (tables[t].id && tables[t].id.match(/^cvg\/cvi$/i)) {
		covergroup_instances_table = tables[t];
		cvg_cvi_table_index = t;
		break;
	}
}

// adjust the table attributes
covergroup_instances_table.cellspacing = "2";
covergroup_instances_table.cellpadding = "2";

// create the table header cells and append them
newCell = document.createElement('TH');
newCell.className = 'odd';
newCell.align = 'left';
newCell.colSpan = '2';
newCell.innerHTML = 'Covergroups / Instances';
covergroup_instances_table.rows[0].appendChild(newCell);

newCell = document.createElement('TH');
newCell.className = 'even';
newCell.innerHTML = 'Total Bins';
covergroup_instances_table.rows[0].appendChild(newCell);

newCell = document.createElement('TH');
newCell.className = 'odd';
newCell.innerHTML = 'Covered Bins';
covergroup_instances_table.rows[0].appendChild(newCell);

newCell = document.createElement('TH');
newCell.className = 'even';
newCell.innerHTML = 'Goal';
covergroup_instances_table.rows[0].appendChild(newCell);

newCell = document.createElement('TH');
newCell.className = 'odd';
newCell.innerHTML = 'Coverage';
covergroup_instances_table.rows[0].appendChild(newCell);

newCell = document.createElement('TH');
newCell.className = 'even';
newCell.innerHTML = '% of Goal';
covergroup_instances_table.rows[0].appendChild(newCell);
/**************************************************************************************************/

// Create The Covergroups / Instances Table Index Rows
for (var r = 1; r < covergroup_instances_table.rows.length; r++) {
	var excluded = 0;
	newRow = covergroup_instances_table.rows[r];
	newCell = newRow.cells[0];
	if (!newCell) continue;
	// row class if existing
	tmp = newRow.getAttribute('c');
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
	if (newCell.getAttribute('lnk') && newCell.getAttribute('lnk').match(/^.*#cvg\d+.*$/i)) { // covergroup
		newCell.className = 'odd';
		newCell.colSpan = '2';
		isCvg = 1;
	} else { // coverinstance
		newCell.className = 'invisible';
		newCell.innerHTML = '&nbsp;';
		newCell = newRow.cells[1];
		newCell.className = 'odd';
		isCvg = 0;
	}
	if (excluded) {
		newCell.className = 'oddGrey';
	}
	newElement = document.createElement('a');
	newElement.setAttribute("href",newCell.getAttribute('lnk'));

	name = newCell.getAttribute('z');
	if (name) {
		if (name.match(/^<.*>$/)) {
			newElement.innerHTML = name.replace("&","&amp;").replace(">","&gt;").replace("<","&lt;");				
		} else {
			newElement.innerHTML = name.replace("&","&amp;");
		}
	}
	
	if (newCell.childNodes.length > 0) {
		// in case there is a <DIV> element which means there is options table
		newCell.insertBefore(newElement,newCell.childNodes[0]);
	} else {
		newCell.appendChild(newElement);
	}
	if (isCvg == 1) { /* Covergroup */
		newCell.innerHTML = 'Covergroup ' + newCell.innerHTML;
	} else /* Instance */{
		newCell.innerHTML = 'Instance ' + newCell.innerHTML;
	}
	
	// Cell for 'tb' Total Bins
	childCell = document.createElement('TD');
	if (!excluded) {
		childCell.className = 'even_r';
	} else {
		childCell.className = 'even_rGrey';
	}
	tmp = newCell.getAttribute('tb');
	if (tmp) {
		childCell.innerHTML = tmp;
	} else {
		childCell.innerHTML = "--";
	}
	newRow.appendChild(childCell);

	// Cell for 'cb' Covered Bins
	childCell = document.createElement('TD');
	if (!excluded) {
		childCell.className = 'odd_r';
	} else {
		childCell.className = 'odd_rGrey';
	}
	tmp = newCell.getAttribute('cb');
	if (tmp) {
		childCell.innerHTML = tmp;
	} else {
		childCell.innerHTML = "--";
	}
	newRow.appendChild(childCell);
	
	// Cell for 'g' Goal
	childCell = document.createElement('TD');
	if (!excluded) {
		childCell.className = 'even_r';
	} else {
		childCell.className = 'even_rGrey';
	}
	tmp = newCell.getAttribute('g');
	if (tmp) {
		childCell.innerHTML = tmp + "%";
	} else {
		childCell.innerHTML = "--";
	}
	newRow.appendChild(childCell);
	
	// Cell for 'p' coverage percentage
	childCell = document.createElement('TD');
	if (!excluded) {
		childCell.className = 'odd_r';
	} else {
		childCell.className = 'odd_rGrey';
	}
	tmp = newCell.getAttribute('p');
	if (tmp) {
		childCell.innerHTML = tmp + "%";
	} else {
		childCell.innerHTML = "--";
	}
	newRow.appendChild(childCell);
	
	// Cell for 'pg' % of Goal and 'c' coverage color
	childCell = document.createElement('TD');
	if (!excluded) {
		tmp = newCell.getAttribute("c");
		switch (tmp) {
			case 'Y': {
				childCell.className = 'bgYellow'; break;
			}
			case 'R': {
				childCell.className = 'bgRed'; break;
			}
			case 'G': {
				childCell.className = 'bgGreen'; break;
			}
		}
		childCell.innerHTML = newCell.getAttribute('pg') + "%";
	} else {
		childCell.className = 'grey';
		childCell.innerHTML = "Excluded";
	}
	newRow.appendChild(childCell);
}
// End of The Covergroups / Instances Table Index Rows

/**************************************************************************************************/
// The Covergroups / Instances Tables
for (t = cvg_cvi_table_index + 1; t < tables.length; t++) {
	if (tables[t].getAttribute('t') && tables[t].getAttribute('t').match(/^gi$/i)) {
		covergroup_instances_table = tables[t];

		// process this details table
		// adjust the table attributes
		covergroup_instances_table.cellpadding = "2";
		covergroup_instances_table.cellspacing = "2";
		
		newCell = document.createElement('TD');
		newCell.className = 'odd';
		if (binRHS)
			newCell.colSpan = '5';
		else
			newCell.colSpan = '4';

		// row 0 contains 2 cells, cell 1: the item name, cell 2: the coverage percentage
		newRow = covergroup_instances_table.rows[0];
		tmp = newRow.getAttribute('t');
		if (tmp) {
			if (tmp.match(/^g$/i))
				newCell.innerHTML = 'Covergroup type:';
			else if (tmp.match(/^i$/i))
				newCell.innerHTML = 'Covergroup instance:';
		}
		
		tmp = newRow.getAttribute('lnk');
		if (tmp) {
			newElement = document.createElement('a');
			newElement.setAttribute("href",tmp);
			name = newRow.getAttribute('z');
			if (name) {	
				if (name.match(/^<.*>$/)) {
					newElement.innerHTML = name.replace("&","&amp;").replace(">","&gt;").replace("<","&lt;");				
				} else {
					newElement.innerHTML = name.replace("&","&amp;");
				}
			}
			newCell.appendChild(newElement);
		} else {
			name = newRow.getAttribute('z');
			if (name) {
				if (name.match(/^<.*>$/)) {
					newCell.innerHTML = newCell.innerHTML + name.replace("&","&amp;").replace(">","&gt;").replace("<","&lt;");				
				} else {
					newCell.innerHTML = newCell.innerHTML + name.replace("&","&amp;");
				}
			}
		}
		
		newRow.appendChild(newCell);
		/////////////////////////////
		tmp = newRow.getAttribute("cr");
		if (tmp && tmp == "e") {
			// excluded
			// change the class type of the 1st cell in this row
			newRow.cells[0].className = "oddGrey";
			
			newCell = document.createElement('TD');
			newCell.innerHTML = "--";
			if (binRHS)
				newCell.className = 'odd_rGrey';
			else
				newCell.className = 'even_rGrey';
			newRow.appendChild(newCell);
			
			newCell = document.createElement('TD');
			newCell.innerHTML = "--";
			if (binRHS)
				newCell.className = 'even_rGrey';
			else
				newCell.className = 'odd_rGrey';
			newRow.appendChild(newCell);
			
			newCell = document.createElement('TD');
			newCell.className = 'grey';
			newCell.innerHTML = "Excluded";
			newRow.appendChild(newCell);
		} else {
			newCell = document.createElement('TD');
			newCell.innerHTML = newRow.getAttribute("g") + "%";
			if (binRHS)
				newCell.className = 'odd_r';
			else
				newCell.className = 'even_r';
			newRow.appendChild(newCell);
			
			newCell = document.createElement('TD');
			newCell.innerHTML = newRow.getAttribute("p") + "%";
			if (binRHS)
				newCell.className = 'even_r';
			else
				newCell.className = 'odd_r';
			newRow.appendChild(newCell);
			//////////////////////////////
			
			// c = coverage color/class
			newCell = document.createElement('TD');
			tmp = newRow.getAttribute("c");
			switch (tmp) {
				case 'Y': {
					newCell.className = 'bgYellow'; break;
				}
				case'R': {
					newCell.className = 'bgRed'; break;
				}
				case 'G': {
					newCell.className = 'bgGreen'; break;
				}
			}
			// pg = % of Goal
			newCell.innerHTML = newRow.getAttribute("pg") + '%';
			newRow.appendChild(newCell);
		}
		
		// row 1 has 5 cells, 6 if binRHS
		// cell 1: coverpoint/bin, cell 2: binRHS if true, cell 3: At least
		// cell 4: Hits, cell 5: Goal, cell 6: Coverage
		newRow = covergroup_instances_table.rows[1];
		// create the table header cells and append them
		var colNum=1;
		
		newCell = document.createElement('TH');
		newCell.className = (colNum % 2) ? 'even' : 'odd';
		colNum++;
		newCell.colSpan = '2';
		newCell.innerHTML = 'Coverpoints / Bins';
		newRow.appendChild(newCell);
		
		if (binRHS) {
			newCell = document.createElement('TH');
			newCell.className = (colNum % 2) ? 'even' : 'odd';
			colNum++;
			newCell.innerHTML = 'RHS';
			newRow.appendChild(newCell);
		}

		newCell = document.createElement('TH');
		newCell.className = (colNum % 2) ? 'even' : 'odd';
		colNum++;
		newCell.innerHTML = 'At Least';
		newRow.appendChild(newCell);

		newCell = document.createElement('TH');
		newCell.className = (colNum % 2) ? 'even' : 'odd';
		colNum++;
		newCell.innerHTML = 'Hits';
		newRow.appendChild(newCell);

		newCell = document.createElement('TH');
		newCell.className = (colNum % 2) ? 'even' : 'odd';
		colNum++;
		newCell.innerHTML = 'Goal';
		newRow.appendChild(newCell);

		newCell = document.createElement('TH');
		newCell.className = (colNum % 2) ? 'even' : 'odd';
		colNum++;
		newCell.innerHTML = 'Coverage';
		newRow.appendChild(newCell);
		
		newCell = document.createElement('TH');
		newCell.className = (colNum % 2) ? 'even' : 'odd';
		colNum++;
		newCell.innerHTML = '% of Goal';
		newRow.appendChild(newCell);
		
		//Loop on the rest of the rows in the table
		for (var r = 2; r < covergroup_instances_table.rows.length; r++) {
			var excluded = 0;
			newRow = covergroup_instances_table.rows[r];
			newCell = newRow.cells[0];
			if (!(newCell.getAttribute('t').match(/^b$/i))) {
				tmp = newRow.getAttribute('c');
				switch (tmp) {
					case 'c': {
						newRow.className = 'covered'; break;
					}
					case 'm': {
						newRow.className = 'missing'; break;
					}
					case 'e': {
						newRow.className = 'excluded'; excluded = 1; show_excl_button = 1; break;
					}
					default: {
						newRow.className = ''; break;
					}
				}
				// coverpoint or cross
				if (excluded == 0) {
					newCell.className = 'odd';
				} else {
					newCell.className = 'oddGrey';
				}
				lastClassOdd = true;
				newCell.colSpan = '2';
				if (newCell.getAttribute('tplnk')) {
					newElement = document.createElement('a');
					newElement.setAttribute("name",newCell.getAttribute('tplnk'));
					newElement.innerHTML = "";
					if (newCell.childNodes.length > 0) {
						// in case there is a <DIV> element which means there is options table
						newCell.insertBefore(newElement,newCell.childNodes[0]);
					} else {
						newCell.appendChild(newElement);
					}
				}
				
				if (newCell.getAttribute('lnk')){
					newElement = document.createElement('a');
					newElement.setAttribute("href",newCell.getAttribute('lnk'));
					name = newCell.getAttribute('z');
					if (name) {
						if (name.match(/^<.*>$/)) {
							newElement.innerHTML = name.replace("&","&amp;").replace(">","&gt;").replace("<","&lt;");				
						} else {
							newElement.innerHTML = name.replace("&","&amp;");
						}					
					}

					if (newCell.childNodes.length > 0) {
						// in case there is a <DIV> element which means there is options table
						newCell.insertBefore(newElement,newCell.childNodes[0]);
					} else {
						newCell.appendChild(newElement);
					}
				} else {
					if (newCell.childNodes.length > 0) {
						// in case there is a <DIV> element which means there is options table
						name = newCell.getAttribute('z');
						if (name) {
							if (name.match(/^<.*>$/)) {
								newCell.innerHTML = name.replace("&","&amp;").replace(">","&gt;").replace("<","&lt;") + newCell.innerHTML;			
							} else {
								newCell.innerHTML = name.replace("&","&amp;") + newCell.innerHTML;
							}
						}
					} else {
						name = newCell.getAttribute('z');
						if (name) {
							if (name.match(/^<.*>$/)) {
								newCell.innerHTML = name.replace("&","&amp;").replace(">","&gt;").replace("<","&lt;");			
							} else {
								newCell.innerHTML = name.replace("&","&amp;");
							}
						}
					}
				}
				tmp = newCell.getAttribute('t');
				if (tmp) {
					if (tmp.match(/^p$/i)) { //coverpoint
						newCell.innerHTML = "Coverpoint: " + newCell.innerHTML;
					} else if (tmp.match(/^c$/i)) { // cross
						newCell.innerHTML = "Cross: " + newCell.innerHTML;
					}
				}
				if (excluded == 0) {
					if (binRHS) {
						tmp = newCell.getAttribute('rhs');
						childCell = document.createElement('TD');
						// rhs Class
						if (lastClassOdd)
							childCell.className = 'even';
						else
							childCell.className = 'odd';
						
						lastClassOdd = !lastClassOdd;
						
						if (tmp)
							childCell.innerHTML = tmp;
						else
							childCell.innerHTML = '&nbsp;';
						newRow.appendChild(childCell);
					}
					
					// Cell for 'al' AtLeast
					tmp = newCell.getAttribute('al');
					childCell = document.createElement('TD');
					// atleast Class
					if (lastClassOdd)
							childCell.className = 'even';
						else
							childCell.className = 'odd';
							
					lastClassOdd = !lastClassOdd;
					
					if (tmp)
						childCell.innerHTML = tmp;
					else
						childCell.innerHTML = '&nbsp;';
					newRow.appendChild(childCell);
	
					// Cell for 'h' Hit
					tmp = newCell.getAttribute('h');
					childCell = document.createElement('TD');
					// hit Class
					if (lastClassOdd)
						childCell.className = 'even';
					else
						childCell.className = 'odd';
							
					lastClassOdd = !lastClassOdd;
					
					if (tmp)
						childCell.innerHTML = tmp;
					else
						childCell.innerHTML = '&nbsp;';
					newRow.appendChild(childCell);
					
					// Cell for 'g' Goal
					tmp = newCell.getAttribute('g');
					childCell = document.createElement('TD');
					// goal Class
					if (lastClassOdd)
						childCell.className = 'even_r';
					else
						childCell.className = 'odd_r';
							
					lastClassOdd = !lastClassOdd;
					
					if (tmp)
						childCell.innerHTML = tmp + "%";
					else
						childCell.innerHTML = '&nbsp;';
					newRow.appendChild(childCell);
					
					// Cell for 'p' coverage percentage
					tmp = newCell.getAttribute('p');
					childCell = document.createElement('TD');
					if (tmp)
						childCell.innerHTML = tmp + "%";
					else
						childCell.innerHTML = '&nbsp;';
					
					// coverage class
					if (lastClassOdd)
						childCell.className = 'even_r';
					else
						childCell.className = 'odd_r';
					
					lastClassOdd = !lastClassOdd;
					newRow.appendChild(childCell);
					
					// Cell for 'pg' % of Goal 
					tmp = newCell.getAttribute('pg');
					childCell = document.createElement('TD');
					
					tmp2 = newCell.getAttribute("c");
					switch (tmp2) {
						case 'Y': {
							childCell.className = 'bgYellow'; break;
						}
						case 'R': {
							childCell.className = 'bgRed'; break;
						}
						case 'G': {
							childCell.className = 'bgGreen';
						}
					}
					if (tmp)
						childCell.innerHTML = tmp + "%";
					else
						childCell.innerHTML = '&nbsp;';
					newRow.appendChild(childCell);
				} else {
					if (binRHS) {
						childCell = document.createElement('TD');
						// rhs Class
						if (lastClassOdd)
							childCell.className = 'evenGrey';
						else
							childCell.className = 'oddGrey';
						
						lastClassOdd = !lastClassOdd;
						
						childCell.innerHTML = '&nbsp;';
						newRow.appendChild(childCell);
					}
					
					// Cell for 'al' AtLeast
					childCell = document.createElement('TD');
					// atleast Class
					if (lastClassOdd)
							childCell.className = 'evenGrey';
						else
							childCell.className = 'oddGrey';
							
					lastClassOdd = !lastClassOdd;
					
					childCell.innerHTML = '&nbsp;';
					newRow.appendChild(childCell);
	
					// Cell for 'h' Hit
					childCell = document.createElement('TD');
					// hit Class
					if (lastClassOdd)
						childCell.className = 'evenGrey';
					else
						childCell.className = 'oddGrey';
							
					lastClassOdd = !lastClassOdd;
					
					childCell.innerHTML = '&nbsp;';
					newRow.appendChild(childCell);
					
					// Cell for 'g' Goal
					childCell = document.createElement('TD');
					// goal Class
					if (lastClassOdd)
						childCell.className = 'even_rGrey';
					else
						childCell.className = 'odd_rGrey';
							
					lastClassOdd = !lastClassOdd;
					
					childCell.innerHTML = '--';
					newRow.appendChild(childCell);
					
					// Cell for 'p' coverage percentage
					childCell = document.createElement('TD');
					childCell.innerHTML = '--';
					
					// coverage class
					if (lastClassOdd)
						childCell.className = 'even_rGrey';
					else
						childCell.className = 'odd_rGrey';
					
					lastClassOdd = !lastClassOdd;
					newRow.appendChild(childCell);
					
					// Cell for 'pg' % of Goal 
					childCell = document.createElement('TD');
					childCell.className = 'grey';
					childCell.innerHTML = 'Excluded';
					newRow.appendChild(childCell);
				}
			} else /* if (newCell.getAttribute('t').match(/^b$/i)) */{
				// covergroup bin
				tmp = newRow.getAttribute('c');
				switch (tmp) {
					case 'c': {
						newRow.className = 'covered'; break;
					}
					case 'm': {
						newRow.className = 'missing'; break;
					}
					case 'n': {
						newRow.className = 'neutral'; break;
					}
					case 'e': {
						newRow.className = 'excluded'; excluded = 1; show_excl_button = 1; break;
					}
					default: {
						newRow.className = ''; break;
					}
				}
				newCell.className = 'invisible';
				newCell.innerHTML = '&nbsp;';
				
				childCell = document.createElement('TD');
				if (excluded == 0) {
					childCell.className = 'odd';
				} else {
					childCell.className = 'oddGrey';
				}
				lastClassOdd = true;
				name = newCell.getAttribute('z');
				if (name) {
					if (name.match(/^<.*>$/)) {
						childCell.innerHTML = newCell.getAttribute('bt') + " " + name.replace("&","&amp;").replace(">","&gt;").replace("<","&lt;");				
					} else {
						childCell.innerHTML = newCell.getAttribute('bt') + " " + name.replace("&","&amp;");
					}
				}
				newRow.appendChild(childCell);
				
				if (excluded == 0) {
					if (binRHS) {
						tmp = newCell.getAttribute('rhs');
						childCell = document.createElement('TD');
						childCell.align = 'center';
						// rhs Class
						if (lastClassOdd)
							childCell.className = 'even';
						else
							childCell.className = 'odd';
						
						lastClassOdd = !lastClassOdd;
							
						if (tmp)
							childCell.innerHTML = tmp;
						else
							childCell.innerHTML = '&nbsp;';
						newRow.appendChild(childCell);
					}
					
					childCell = document.createElement('TD');
					childCell.align = 'center';
					// AtLeast Class
					tmp = newCell.getAttribute('al');
					if (tmp) {
						childCell.innerHTML = tmp;
						if (lastClassOdd)
							childCell.className = 'even_r';
						else
							childCell.className = 'odd_r';
						
						lastClassOdd = !lastClassOdd;
					} else {
						childCell.innerHTML = '--';
						if (lastClassOdd)
							childCell.className = 'even';
						else
							childCell.className = 'odd';
						
						lastClassOdd = !lastClassOdd;
					}
					newRow.appendChild(childCell);
				} else {
					if (binRHS) {
						childCell = document.createElement('TD');
						childCell.align = 'center';
						// rhs Class
						if (lastClassOdd)
							childCell.className = 'evenGrey';
						else
							childCell.className = 'oddGrey';
						
						lastClassOdd = !lastClassOdd;

						childCell.innerHTML = '&nbsp;';
						newRow.appendChild(childCell);
					}
					
					childCell = document.createElement('TD');
					childCell.align = 'center';
					// AtLeast Class
					childCell.innerHTML = '--';
					if (lastClassOdd)
						childCell.className = 'evenGrey';
					else
						childCell.className = 'oddGrey';
						
					lastClassOdd = !lastClassOdd;
					newRow.appendChild(childCell);
				}
				
				childCell = document.createElement('TD');
				childCell.align = 'center';
				// Hit Class AKA count
				tmp = newCell.getAttribute('h');
				if (tmp) {
					if (newCell.getAttribute('lnk')) {
						newElement = document.createElement('a');
						hrefLnk = newCell.getAttribute('lnk').match(/^([^$]*)\$([^$]*)$/i);
						if (hrefLnk && hrefLnk.length == 3) {
							newElement.setAttribute("href", "pertest.htm?bin=g" + hrefLnk[1] + "&scope=" + hrefLnk[2]);
						} else {
							newElement.setAttribute("href", newCell.getAttribute('lnk'));
						}
						newElement.setAttribute("rel", 'popup 200 200');
						newElement.innerHTML = tmp;
						childCell.appendChild(newElement);
					} else {
						childCell.innerHTML = tmp;
					}
					if (excluded == 0) {
						if (lastClassOdd)
							childCell.className = 'even_r';
						else
							childCell.className = 'odd_r';
					} else {
						if (lastClassOdd)
							childCell.className = 'even_rGrey';
						else
							childCell.className = 'odd_rGrey';					
					}
					
					lastClassOdd = !lastClassOdd;
				} else {
					childCell.innerHTML = '--';
					if (excluded == 0) {
						if (lastClassOdd)
							childCell.className = 'even';
						else
							childCell.className = 'odd';
					} else {
						if (lastClassOdd)
							childCell.className = 'evenGrey';
						else
							childCell.className = 'oddGrey';					
					}
					
					lastClassOdd = !lastClassOdd;
				}
				newRow.appendChild(childCell);
				
				childCell = document.createElement('TD');
				childCell.innerHTML = '&nbsp;';
				// Goal class
				if (lastClassOdd)
					childCell.className = 'even';
				else
					childCell.className = 'odd';
					
				lastClassOdd = !lastClassOdd;
				newRow.appendChild(childCell);
				
				childCell = document.createElement('TD');
				// Coverage
				if (excluded == 0) {
					tmp = newCell.getAttribute('c') 
					switch (tmp) {
						case 'c': {
							childCell.innerHTML = 'Covered';
							childCell.className = 'green';
							break;
						}
						case 'u': {
							childCell.innerHTML = 'Uncovered';
							childCell.className = 'red';
							break;
						}
						case 'z': {
							childCell.innerHTML = 'ZERO';
							if (binType != "illegal_bin")
								childCell.className = 'red';
							else
								childCell.className = 'green';
							break;
						}
						case 'o': {
							childCell.innerHTML = 'Occurred';
							if (binType != "illegal_bin")
								childCell.className = 'green';
							else
								childCell.className = 'red';
							break;
						}
						default:
						childCell.innerHTML = '&nbsp;';
						break;
					}
				} else {
					childCell.innerHTML = 'Excluded';
					childCell.className = 'grey';
				}
				newRow.appendChild(childCell);
				lastClassOdd = !lastClassOdd; // call this to adjust the order of odd even classes
				
				childCell = document.createElement('TD');
				childCell.innerHTML = '--';
				// % of Goal class
				if (lastClassOdd)
					childCell.className = 'even';
				else
					childCell.className = 'odd';
					
				lastClassOdd = !lastClassOdd;
				newRow.appendChild(childCell);
			}
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
/**************************************************************************************************/
/* this variable "page_loaded" is needed to be set to 1 to tell the timestamp script that the script
 * buildcvgpage.js finished processing the page */
page_loaded = 1;
