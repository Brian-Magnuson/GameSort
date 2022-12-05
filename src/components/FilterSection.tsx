import React from 'react'
import FormInput from '../interfaces/FormInput'

interface FilterSectionProps {
  title: string
  choices: string[]
  numberDisplayed: number
  formInput: FormInput
  formInputField: 'platforms' | 'genres' | 'ageRatings'
  setFormInput: React.Dispatch<React.SetStateAction<FormInput>>
}
/**
 * Contains a list of checkboxes that allow the user to select different values.
 * Contained only within Sidebar; the numberDisplayed can be adjusted to change
 * how many options are shown before the user has to click 'Show more'
 * Selecting an option will change the formInputState contained in the Content
 * component.
 * Only used exactly 3 times: for platforms, genres, and ageRatings
 * @param props @see FilterSectionProps
 * @returns FilterSection component
 */
export default function FilterSection(props: FilterSectionProps) {
  const [showMore, setShowMore] = React.useState(false)
  const goChangeSelection = (event: React.ChangeEvent<HTMLInputElement>) => {

    // When the checkbox is checked...
    if (event.target.checked) {
      // Add the item to the array
      const newArray = Array.from(props.formInput[props.formInputField]);
      newArray.push(event.target.value)
      props.setFormInput((prev) => ({
        ...prev,
        [props.formInputField]: [...newArray]
      }))
      // When the checkbox is unchecked...
    } else {
      // Remove the item from the array
      const index = props.formInput[props.formInputField].indexOf(event.target.value);
      const newArray = Array.from(props.formInput[props.formInputField]);
      newArray.splice(index, 1)
      props.setFormInput((prev) => ({
        ...prev,
        [props.formInputField]: [...newArray]
      }))
    }
  }

  // Render all the selection choices
  const selectionChoices = props.choices.map((elem, index) => {
    if (index < props.numberDisplayed || showMore) {
      return (
        <React.Fragment key={index}>
          <div>
            <input
              type='checkbox'
              name={elem}
              value={elem}
              checked={Array.from(props.formInput[props.formInputField]).includes(elem)}
              onChange={goChangeSelection}
            />
            <label htmlFor={elem}>{elem}</label>
          </div>
        </React.Fragment>
      )
    } else {
      return
    }
  })

  return (
    <>
      <div className='sidebar__filter-section-header'>
        <h4>{props.title}</h4>
        <br />
        {showMore && <p onClick={() => setShowMore(false)}>Show Less</p>}
      </div>
      <div
        className={
          showMore
            ? 'sidebar__filter-section sidebar__filter-section--scrolling'
            : 'sidebar__filter-section'
        }
      >
        {selectionChoices}
        {!showMore && <p onClick={() => setShowMore(true)}>Show More</p>}
      </div>
    </>
  )
}
