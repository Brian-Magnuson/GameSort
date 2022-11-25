import React from 'react';

export default function SearchSection() {
  return (
    <>
      <div className="sidebar__filter-section">
        <h4>Keywords</h4>
        <label htmlFor="keywords">Search</label>
        <input type="text" name="keywords" />
      </div>
    </>
  );
}