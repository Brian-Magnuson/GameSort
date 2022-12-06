import React from 'react'
import { filterDataObject } from '../data/filterData'
import FormInput from '../interfaces/FormInput'
import FilterSection from './FilterSection'
import MatchResult from '../interfaces/MatchResult'

interface SidebarProps {
  formInput: FormInput
  setFormInput: React.Dispatch<React.SetStateAction<FormInput>>
  findMatchRatingsToggle: Boolean
  setFindMatchRatingsToggle: React.Dispatch<React.SetStateAction<Boolean>>
  matches: MatchResult[]
  setMatches: React.Dispatch<React.SetStateAction<MatchResult[]>>
}
/**
 * Contains all the filter options for the end user, allowing him or her to
 * select things such as platform, genre, or age rating.
 * Is closely tied with the formInput state located in Content.
 * Displayed at all times on the left side of the web app within the Content
 * component.
 * Also contains the sort button which triggers the calcMatchRatings and sort
 * functions to create a MatchResult[].
 * @param props @see SidebarProps
 * @returns Sidebar component
 */
export default function Sidebar(props: SidebarProps) {

  // Changes a string field within the formInput state
  const plsGoChangeField = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setFormInput((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }))
  }
  // Changes a numeric field within the formInput state
  const plsGoChangeNumField = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setFormInput((prev) => ({
      ...prev,
      [event.target.name]: Number(event.target.value),
    }))
  }

  // Trigger the matching algorithm and sorting algorithm
  const goSort = (event: React.SyntheticEvent) => {
    event.preventDefault()
    props.setMatches([])
    //console.log(props.formInput)
  }

  // Reset filters to include ALL games
  const goResetFilters = () => {
    props.setFormInput({
      keywords: '',
      platforms: [],
      genres: [],
      ageRatings: [],
      afterReleaseDate: '',
      ratingsAtLeast: 0,
      ratingsAtMost: 100,
      ratingCountAtLeast: 0,
      sortSelection: 'Merge',
    })
  }

  return (
    <>
      <aside className='sidebar'>
        <form onSubmit={goSort}>
          <div className='sidebar__filter-section'>
            <h4>Keywords</h4>
            <label htmlFor='keywords'>Search</label>
            <input
              className='sidebar__text-field'
              type='text'
              name='keywords'
              value={props.formInput.keywords}
              onChange={(e) => plsGoChangeField(e)}
            />
          </div>

          <FilterSection
            title='Platform'
            choices={filterDataObject.possiblePlatforms}
            numberDisplayed={4}
            formInput={props.formInput}
            formInputField='platforms'
            setFormInput={props.setFormInput}
          />
          <FilterSection
            title='Genre'
            choices={filterDataObject.possibleGenres}
            numberDisplayed={4}
            formInput={props.formInput}
            formInputField='genres'
            setFormInput={props.setFormInput}
          />
          <FilterSection
            title='Age Rating'
            choices={filterDataObject.possibleAgeRatings}
            numberDisplayed={4}
            formInput={props.formInput}
            formInputField='ageRatings'
            setFormInput={props.setFormInput}
          />
          <div className='sidebar__filter-section'>
            <div className='sidebar__filter-section-header'>
              <h4>Release Date</h4>
            </div>

            <label htmlFor='beforeReleaseDate'>Before Date</label>
            <br />
            <input
              type='date'
              name='beforeReleaseDate'
              value={props.formInput.beforeReleaseDate}
              onChange={(e) => plsGoChangeField(e)}
            />
            <br />
            <label htmlFor='afterReleaseDate'>After Date</label>
            <br />
            <input
              type='date'
              name='afterReleaseDate'
              value={props.formInput.afterReleaseDate}
              onChange={(e) => plsGoChangeField(e)}
            />
          </div>

          <div className='sidebar__filter-section'>
            <div className='sidebar__filter-section-header'>
              <h4>Review Ratings</h4>
            </div>

            <label htmlFor='ratingsAtLeast'>Lower Bound</label>
            <br />
            <input
              className='sidebar__text-field'
              type='number'
              name='ratingsAtLeast'
              min={0}
              value={Number(props.formInput.ratingsAtLeast)}
              onChange={(e) => plsGoChangeNumField(e)}
            />
            <br />
            <label htmlFor='ratingsAtMost'>Upper Bound</label>
            <br />
            <input
              className='sidebar__text-field'
              type='number'
              name='ratingsAtMost'
              min={0}
              max={100}
              value={Number(props.formInput.ratingsAtMost)}
              onChange={(e) => plsGoChangeNumField(e)}
            />
            <br />
            <label htmlFor='ratingCountAtLeast'>Min Review Count</label>
            <br />
            <input
              className='sidebar__text-field'
              type='number'
              name='ratingCountAtLeast'
              min={0}
              value={Number(props.formInput.ratingCountAtLeast)}
              onChange={(e) => plsGoChangeNumField(e)}
            />
          </div>

          <button className='sidebar__submit-button' type='submit'>
            Sort
          </button>
          <button className='sidebar__reset-button' onClick={goResetFilters}>
            Reset filters
          </button>
        </form>
      </aside>
    </>
  )
}
