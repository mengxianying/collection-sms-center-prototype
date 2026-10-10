(() => {
  const content = document.querySelector('#content');
  if (!content) return;

  function renderTagColumn() {
    const table = content.querySelector('.table-wrap table');
    const headerCells = table ? [...table.querySelectorAll('thead th')] : [];
    const sourceIndex = headerCells.findIndex(cell => cell.textContent.trim() === '系统来源');
    if (sourceIndex < 0 || headerCells.some(cell => cell.textContent.trim() === '标签')) return;

    const records = listRows().slice((pageNo - 1) * pageSize, pageNo * pageSize);
    headerCells[sourceIndex].insertAdjacentHTML('afterend', '<th>标签</th>');

    [...table.querySelectorAll('tbody tr')].forEach((row, index) => {
      if (row.cells.length === 1) return;
      const cell = document.createElement('td');
      cell.textContent = tagText(records[index]?.tag || 'other');
      row.insertBefore(cell, row.cells[sourceIndex + 1]);
    });
  }

  new MutationObserver(renderTagColumn).observe(content, { childList: true, subtree: true });
  renderTagColumn();
})();
