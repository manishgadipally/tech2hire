// search
function search() {
  var input = document.getElementById("myInput");
  var filter = input.value.toUpperCase();
  var table = document.getElementById("myTable");
  var tr = table.getElementsByTagName("tr");
  for (var i = 0; i < tr.length; i++) {
    var td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      var txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

// sorting ascending and descending
function sortTable(n) {
  var table,
    rows,
    switching,
    i,
    x,
    y,
    shouldSwitch,
    direction,
    switchcount = 0;
  table = document.getElementById("myTable");
  switching = true;
  dir = "ascending";
  while (switching) {
    switching = false;
    rows = table.rows;
    for (i = 1; i < rows.length - 1; i++) {
      if (rows[i].className.includes("pinned")) {
        continue;
      }

      shouldSwitch = false;
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      if (dir == "ascending") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      } else if (dir == "descending") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      switchcount++;
    } else {
      if (switchcount == 0 && dir == "ascending") {
        dir = "descending";
        switching = true;
      }
    }
  }
}

// Move row  to the top of the table

var table = document.getElementById("myTable");
if (table != null) {
  for (var i = 1; i < table.rows.length; i++) {
    for (var j = 0; j < table.rows[i].cells.length; j++)
      table.rows[i].cells[j].onclick = function() {
        tableText(this);
      };
  }
}
function tableText(tableCell) {
  if (tableCell.cellIndex == 6) {
    var row = tableCell.parentNode;
    if (!row.className.includes("pinned")) {
      var table = tableCell.parentNode.parentNode;
      var df = table.insertRow(1);
      df.innerHTML = row.innerHTML;
      df.className = df.className + "pinned";
      for (var f = 0; f < df.cells.length; f++) {
        df.cells[f].onclick = function(e) {
          tableText(this);
        };
      }
      table.deleteRow(row.rowIndex);
    } else {
      row.classList.remove("pinned");
    }
  }
}
