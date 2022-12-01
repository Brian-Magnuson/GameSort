import React from 'react'

interface FilterSectionProps {
  title: string
  choices: string[]
  numberDisplayed: number
}
export default function FilterSection(props: FilterSectionProps) {
  const [showMore, setShowMore] = React.useState(false)

  const selectionChoices = props.choices.map((elem, index) => {
    if (index < props.numberDisplayed || showMore) {
      return (
        <>
          <div>
            <input type='checkbox' name={elem} />
            <label htmlFor={elem}>{elem}</label>
          </div>
        </>
      )
    } else {
      return
    }
  })

  return (
    <>
      <div className='sidebar__filter-section-header'>
        <h4>{props.title}</h4>
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
