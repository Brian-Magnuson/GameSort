import React from 'react';
import GamesView from './GamesView';
import Sidebar from './Sidebar';
import SortSelection from './SortSelection';

export default function Content() {
  return (
    <>
      <main className="content">
        <Sidebar />
        <SortSelection />
        <GamesView />
      </main>
    </>
  );
}