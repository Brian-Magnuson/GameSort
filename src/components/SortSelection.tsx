import React from 'react';
import FormInput from '../interfaces/FormInput';

interface SortSelectionProps {
  formInput: FormInput,
  setFormInput: React.Dispatch<React.SetStateAction<FormInput>>
}
/**
 * Contains the radio buttons displayed next to the Sidebar that allow the user
 * to select a sort method.
 * Although this component is a sibling to the Sidebar, both share the same
 * formInput state.
 * @param props @see SortSelectionProps
 * @returns SortSelection component
 */
export default function SortSelection(props: SortSelectionProps) {

  // Change the formInput state when a sort option is chosen
  const goChangeSort = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setFormInput((prev) => ({ ...prev, sortSelection: event.target.value }))
  }

  return (
    <>
      <div className="content__sort-selection">
        <h4>Sort Method:</h4>
        <span>
          <input
            type="radio"
            name="Sort"
            id="Merge"
            value="Merge"
            checked={props.formInput.sortSelection == "Merge"}
            onChange={goChangeSort} />
          <label htmlFor="Merge">Merge</label>
        </span>
        <span>
          <input
            type="radio"
            name="Sort"
            id="Quick"
            value="Quick"
            checked={props.formInput.sortSelection == "Quick"}
            onChange={goChangeSort} />
          <label htmlFor="Quick">Quick</label>
        </span>
        <span>
          <input
            type="radio"
            name="Sort"
            id="Heap"
            value="Heap"
            checked={props.formInput.sortSelection == "Heap"}
            onChange={goChangeSort} />
          <label htmlFor="Heap">Heap</label>
        </span>
        <span>
          <input
            type="radio"
            name="Sort"
            id="JsSort"
            value="JsSort"
            checked={props.formInput.sortSelection == "JsSort"}
            onChange={goChangeSort} />
          <label htmlFor="JsSort">JS Sort</label>
        </span>
      </div>
    </>
  );
}