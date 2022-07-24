import React from 'react'
import styled from '@emotion/styled'
import { navigate } from 'gatsby'

import config from '../config'

const SelectButton = styled.select`
  border-radius: 0.35rem;
  background: ${config.lighterGray};
  box-shadow: 5px 5px 35px #d4d4d420;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  /* styling */
  border-radius: 4px;
  display: inline-block;
  line-height: 1.5em;
  padding: 0.5em 3.5em 0.5em 1em;
  margin: 15px 19px;
  box-sizing: border-box;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-image: linear-gradient(45deg, transparent 50%, gray 50%),
    linear-gradient(135deg, gray 50%, transparent 50%),
    linear-gradient(to right, #ccc, #ccc);
  background-position: calc(100% - 20px) calc(1em + 2px),
    calc(100% - 15px) calc(1em + 2px), calc(100% - 2.5em) 0.5em;
  background-size: 5px 5px, 5px 5px, 1px 1.5em;
  background-repeat: no-repeat;
  &:hover {
    color: ${config.glossbossBlue};
  }
  &:focus {
    background-image: linear-gradient(45deg, green 50%, transparent 50%),
      linear-gradient(135deg, transparent 50%, green 50%),
      linear-gradient(to right, #ccc, #ccc);
    background-position: calc(100% - 15px) 1em, calc(100% - 20px) 1em,
      calc(100% - 2.5em) 0.5em;
    background-size: 5px 5px, 5px 5px, 1px 1.5em;
    background-repeat: no-repeat;
    border-color: green;
    outline: 0;
  }
`
/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
export default ({ category }) => {
  const handleChange = (e) => {
    const navigateTo =
      e.target.value === 'Alle' ? '' : e.target.value.toLowerCase()
    navigate(`/${navigateTo}`)
  }
  return (
    <>
      <form onChange={(e) => handleChange(e)}>
        <SelectButton
          id="catFilter"
          role="navigation"
          itemScope
          itemType="http://schema.org/SiteNavigationElement"
        >
          Filter
          {config.categories.map((cat) => {
            if (cat === 'Index') {
              return (
                <option
                  itemProp="name"
                  selected={category === 'GLOSSBOSS'}
                  key={cat}
                >
                  Alle
                </option>
              )
            } else {
              return (
                <option itemProp="name" selected={cat === category} key={cat}>
                  {cat}
                </option>
              )
            }
          })}
        </SelectButton>
      </form>
    </>
  )
}
