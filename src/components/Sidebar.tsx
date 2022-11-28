import React from 'react';
import { gameDataObject } from '../data/data';
import FilterSection from './FilterSection';
import SearchSection from './SearchSection';
export default function Sidebar() {



  return (
    <>
      <aside className="sidebar">
        <SearchSection />
        <FilterSection
          title='Platform'
          choices={gameDataObject.possiblePlatforms}
          numberDisplayed={4}
        />
        <FilterSection
          title='Genre'
          choices={gameDataObject.possibleGenres}
          numberDisplayed={4}
        />
        <FilterSection
          title='Age Rating'
          choices={gameDataObject.possibleAgeRatings}
          numberDisplayed={4}
        />
        <div className="sidebar__filter-section">
          <h4>Release Date</h4>
          <label htmlFor="before-release-date">Before Date</label>
          <input type="date" name="before-release-date" />
          <br />
          <label htmlFor="after-release-date">After Date</label>
          <input type="date" name="after-release-date" />
        </div>
        <div className="sidebar__filter-section">
          <h4>Review Ratings</h4>
          <label htmlFor="at-least-rating">Lower Bound</label>
          <input type="number" name="at-least-rating" />
          <br />
          <label htmlFor="at-most-rating">Upper Bound</label>
          <input type="number" name="at-most-rating" />
          <br />
          <label htmlFor="review-count">Min Review Count</label>
          <input type="number" name="review-count" />
        </div>
        <button className="sidebar__submit-button">
          Sort
        </button>
      </aside>
    </>
  );
}