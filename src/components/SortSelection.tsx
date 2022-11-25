import React from 'react';

export default function SortSelection() {
  return (
    <>
      <div className="content__sort-selection">
        <h4>Sort Method:</h4>
        <span>
          <input type="radio" name="Sort" id="Merge" />
          <label htmlFor="Merge">Merge</label>
        </span>
        <span>
          <input type="radio" name="Sort" id="Quick" />
          <label htmlFor="Quick">Quick</label>
        </span>
        <span>
          <input type="radio" name="Sort" id="Heap" />
          <label htmlFor="Heap">Heap</label>
        </span>
      </div>
    </>
  );
}