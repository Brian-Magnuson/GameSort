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
export default function FilterSection(props: FilterSectionProps) {
  const [showMore, setShowMore] = React.useState(false)
  const goChangeSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(Array.isArray(props.formInput[props.formInputField]))
    if (event.target.checked) {
      const newArray = Array.from(props.formInput[props.formInputField]);
      newArray.push(event.target.value)
      props.setFormInput((prev) => ({
        ...prev,
        [props.formInputField]: [...newArray]
      }))
    } else {
      const index = props.formInput[props.formInputField].indexOf(event.target.value);
      const newArray = Array.from(props.formInput[props.formInputField]);
      newArray.splice(index, 1)
      props.setFormInput((prev) => ({
        ...prev,
        [props.formInputField]: [...newArray]
      }))
    }
  }

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
