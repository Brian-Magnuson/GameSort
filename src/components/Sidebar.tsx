import React from 'react';
import FilterSection from './FilterSection';
import SearchSection from './SearchSection';

export default function Sidebar() {
  return (
    <>
      <aside className="sidebar">
        <SearchSection />
        <FilterSection
          title='Platform'
          choices={['PC', 'XBOX', 'PlayStation 5', 'Nintendo Switch']}
        />
        <FilterSection
          title='Platform'
          choices={['PC', 'XBOX', 'PlayStation 5', 'Nintendo Switch']}
        />
        <FilterSection
          title='Platform'
          choices={['PC', 'XBOX', 'PlayStation 5', 'Nintendo Switch']}
        />
        <FilterSection
          title='Platform'
          choices={['PC', 'XBOX', 'PlayStation 5', 'Nintendo Switch']}
        />
        <FilterSection
          title='Platform'
          choices={['PC', 'XBOX', 'PlayStation 5', 'Nintendo Switch']}
        />
        <button className="sidebar__submit-button">
          Sort
        </button>
      </aside>
    </>
  );
}