import React from 'react'
import { filterDataObject } from '../data/filterData'
import FilterSection from './FilterSection'
import SearchSection from './SearchSection'
export default function Sidebar() {
  return (
    <>
      <aside className='sidebar'>
        <SearchSection />
        <FilterSection
          title='Platform'
          choices={filterDataObject.possiblePlatforms}
          numberDisplayed={4}
        />
        <FilterSection
          title='Genre'
          choices={filterDataObject.possibleGenres}
          numberDisplayed={4}
        />
        <FilterSection
          title='Age Rating'
          choices={filterDataObject.possibleAgeRatings}
          numberDisplayed={4}
        />
        <div className='sidebar__filter-section'>
          <div className="sidebar__filter-section-header">
            <h4>Release Date</h4>
          </div>

          <label htmlFor='before-release-date'>Before Date</label>
          <br />
          <input type='date' name='before-release-date' />
          <br />
          <label htmlFor='after-release-date'>After Date</label>
          <br />
          <input type='date' name='after-release-date' />
        </div>

        <div className='sidebar__filter-section'>
          <div className="sidebar__filter-section-header">
            <h4>Review Ratings</h4>
          </div>

          <label htmlFor='at-least-rating'>Lower Bound</label>
          <br />
          <input className='sidebar__text-field' type='number' name='at-least-rating' min={0} />
          <br />
          <label htmlFor='at-most-rating'>Upper Bound</label>
          <br />
          <input className='sidebar__text-field' type='number' name='at-most-rating' min={0} />
          <br />
          <label htmlFor='review-count'>Min Review Count</label>
          <br />
          <input className='sidebar__text-field' type='number' name='review-count' min={0} />
        </div>

        <button className='sidebar__submit-button'>Sort</button>
      </aside>
    </>
  )
}
