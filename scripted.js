const table = document.getElementById('planner');

    function addRow() {
      const row = table.insertRow();
      const colCount = table.rows[0].cells.length;
      for (let i = 0; i < colCount; i++) {
        const cell = row.insertCell();
        cell.contentEditable = "true";
        if (i === 0) cell.textContent = "New Time";
      }
    }

    function deleteRow() {
      if (table.rows.length > 2) {
        table.deleteRow(table.rows.length - 1);
      } else {
        alert("At least one row must remain.");
      }
    }

    function addColumn() {
      const headerRow = table.rows[0];
      const newHeader = document.createElement("th");
      newHeader.textContent = "Task " + headerRow.cells.length;
      headerRow.appendChild(newHeader);

      for (let i = 1; i < table.rows.length; i++) {
        const cell = table.rows[i].insertCell();
        cell.contentEditable = "true";
      }
    }

    function deleteColumn() {
      const colCount = table.rows[0].cells.length;
      if (colCount > 2) {
        for (let row of table.rows) {
          row.deleteCell(colCount - 1);
        }
      } else {
        alert("At least one task column must remain.");
      }
    }