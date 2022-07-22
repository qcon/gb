import React from 'react'
/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
export default ({ toggle }) => (
  <div>
    <svg viewBox="0 0 100 80" width="35" height="35">
      <rect width="100" height="12" rx="4"></rect>
      <rect y="30" width="100" height="12" rx="4"></rect>
      <rect y="60" width="100" height="12" rx="4"></rect>
    </svg>
  </div>
)
// export default ({ toggle }) => (
//   <div>
//     <svg enableBackground="new 0 0 50 50" viewBox="0 0 50 50">
//       <rect fill="none" />
//       <polygon points="47.25,15 45.164,12.914 25,33.078 4.836,12.914 2.75,15 25,37.25 " />
//     </svg>
//   </div>
// )
