import React from 'react';

interface FilterSectionProps {
  title: string,
  choices: string[]
}
export default function FilterSection(props: FilterSectionProps) {

  let selectionChoices = props.choices.map((elem) =>
    <>
      <div>
        <input type="checkbox" name={elem} />
        <label htmlFor={elem}>{elem}</label>
      </div>
    </>
  );

  return (
    <>
      <div className="sidebar__filter-section">
        <h4>{props.title}</h4>
        {selectionChoices}
      </div>
    </>
  );
}