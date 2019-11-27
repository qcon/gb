import React from 'react'
import styled from '@emotion/styled'

const Logo = styled.div`
  text-align: center;
  svg {
    max-width: ${props => (props.maxWidth ? `${props.maxWidth}px` : '50px')};
    width: ${props => (props.maxWidth ? `${props.maxWidth}px` : '50px')};
    height: ${props => (props.maxWidth ? `${props.maxWidth}px` : '50px')};
  }
  img {
    max-width: ${props => (props.maxWidth ? `${props.maxWidth}px` : '50px')};
    width: ${props => (props.maxWidth ? `${props.maxWidth}px` : '50px')};
    height: ${props => (props.maxWidth ? `${props.maxWidth}px` : '50px')};
  }
`

export default ({ width }) => (
  <Logo maxWidth={width}>
    <img src="/G2.svg" alt="GLOSSBOSS Logo" />
  </Logo>
)

// <svg
//   xmlns="http://www.w3.org/2000/svg"
//   width="180"
//   height="180"
//   viewBox="50 50 550 550"
// >
//   <g fill="none" fillRule="evenodd">
//     <path
//       fill={config.textColor}
//       d="M87 317.46c.531-.9926.5657-2.0892.6377-3.1712.176-2.683.2615-5.3738.515-8.0486.415-4.3946.8925-8.7838 1.418-13.1664.571-4.764 1.4356-9.4828 2.3642-14.1922 2.404-12.1977 5.798-24.1166 10.137-35.7607 7.714-20.695 18.146-39.921 31.283-57.675.368-.498.653-1.086 1.359-1.429.405.477.464 1.068.612 1.585 1.827 6.393 3.626 12.794 5.438 19.191 8.536 30.143 17.076 60.284 25.613 90.427 6.323 22.331 12.628 44.667 18.973 66.992 5.08 17.871 13.174 34.232 24.782 48.781 19.344 24.247 43.897 40.746 73.73 49.312 5.526 1.587 11.148 2.779 16.839 3.646 4.683.714 9.368 1.337 14.104 1.505 2.943.104 5.885.277 8.827.276 3.841-.002 7.669-.294 11.497-.645 15.79-1.448 30.906-5.483 45.421-11.807 15.545-6.775 29.259-16.263 41.374-28.092 13.257-12.944 23.617-27.899 31.096-44.849.279-.631.507-1.284.814-2.067-.4415-.054-.7336-.111-1.027-.119-.6405-.016-1.281-.007-1.921-.007H322.571c-.7686 0-1.549.072-2.3028-.034-.7458-.104-1.509-.3-2.1893-.617-1.061-.494-1.684-1.413-1.703-2.5888-.013-.815.107-1.657.316-2.4468.384-1.445 1.276-2.638 2.126-3.841 11.037-15.636 22.073-31.27 33.11-46.9048 1.291-1.831 2.563-3.676 3.883-5.486 2.553-3.5038 5.893-6.008 9.898-7.635 1.856-.755 3.771-1.114 5.793-1.112 26.508.0214 53.017.0134 79.527.0134h105.708c.604.572.492 1.179.509 1.738.07 2.304.101 4.6097.182 6.912.028.822.157 1.641.241 2.4618v13.064c-.083.822-.212 1.641-.242 2.464-.099 2.7496-.043 5.511-.267 8.249-.358 4.3985-.847 8.7864-1.362 13.169-.862 7.3082-2.214 14.5323-3.828 21.7112-4.776 21.219-12.39 41.3705-22.829 60.4402-16.374 29.9105-38.2268 55.1104-65.457 75.624-17.1036 12.8845-35.654 23.205-55.6126 30.986-9.947 3.8766-20.1024 7.084-30.494 9.5492-5.5924 1.327-11.209 2.5212-16.8936 3.3763-2.843.427-5.685.866-8.536 1.23-2.979.3815-5.963.73-8.9543.9965-2.6105.232-5.2334.3294-7.851.491-2.108.1305-4.216.2533-6.322.411-.6328.0464-1.258.196-1.8868.2985h-9.221c-.9476-.121-1.892-.29-2.843-.356-5.235-.363-10.478-.564-15.701-1.116-4.135-.438-8.2546-.946-12.369-1.541-5.8206-.842-11.5906-1.949-17.3166-3.269-14.103-3.249-27.802-7.747-41.059-13.56-32.157-14.098-59.823-34.351-82.987-60.7274-18.9525-21.5804-33.4395-45.852-43.5094-72.7474-4.3794-11.7-7.779-23.684-10.207-35.945-.983-4.96-1.844-9.939-2.493-14.95-.527-4.0594-.9086-8.1404-1.274-12.219-.2456-2.74-.3444-5.494-.523-8.241-.0708-1.083-.119-2.176-.6365-3.172V317.46"
//     />
//     <path
//       fill={config.glossbossBlue}
//       d="M334.0033 90.3002c3.0658.1908 6.1396.2815 9.1987.5376 2.9938.2508 5.978.627 8.9585 1.0086 2.7883.3575 5.578.731 8.3462 1.21 4.3412.7525 8.6904 1.4822 12.9902 2.4308 12.241 2.7042 24.195 6.3663 35.85 11.0024 17.731 7.0534 34.356 16.1293 49.881 27.2238.52.3722 1.038.7497 1.551 1.1313.292.3295.331.3842.345.4442-8.944 32.808-17.892 65.424-26.846 98.039-.874.209-1.129-.35-1.476-.766-3.282-3.939-6.72-7.734-10.392-11.313-18.31-17.844-39.809-30.032-64.581-36.421-5.078-1.31-10.214-2.287-15.396-3.092-8.572-1.332-17.19-1.711-25.836-1.39-3.767.14-7.526.519-11.276.987-6.99.872-13.86 2.285-20.648 4.132-12.516 3.403-24.093 8.87-34.865 16.04-13.091 8.713-24.689 19.104-34.687 31.258-.242.295-.515.563-.779.836-.697-.292-.739-.885-.882-1.397-1.314-4.745-2.6-9.497-3.904-14.245-7.5-27.313-15.003-54.627-22.502-81.94-.235-.853-.431-1.717-.649-2.592.551-.417.994-.777 1.461-1.101 21.2604-14.822 44.3084-25.903 69.211-33.118 7.304-2.117 14.691-3.892 22.166-5.267 4.459-.819 8.9586-1.422 13.4505-2.048 3.039-.423 6.09-.788 9.1465-1.05 3.059-.261 6.133-.348 9.197-.539.759-.047 1.5104-.2 2.2655-.305h18.827c.623.104 1.242.261 1.869.3zm62.978 213.1944c-.667.2695-1.374.1374-2.0586.1387-8.1954.0107-16.3895.032-24.5836-.008-2.677-.012-5.213.5323-7.617 1.6423-4.141 1.913-7.62 4.6494-10.272 8.4115-13.682 19.402-27.384 38.792-41.066 58.194-.624.886-1.222 1.811-1.677 2.79-.397.858-.684 1.801-.828 2.737-.315 2.045.755 3.669 2.74 4.24.729.21 1.503.28 2.262.362.507.054 1.024.011 1.536.011 19.142.002 38.282 0 57.424.003.687 0 1.376.032 2.116.05-1.063 1.772-5.965 5.669-11.173 8.936-9.848 6.178-20.56 9.978-32.093 11.297-12.995 1.488-25.648-.077-37.824-4.957-34.875-13.978-55.252-50.77-47.247-88.451 7.735-36.407 40.948-63.57 80.8255-61.258 12.184.706 23.603 4.201 34.161 10.372 10.745 6.279 19.503 14.651 26.2727 25.095 4.19 6.465 8.6957 16.564 9.106 20.4"
//     />
//   </g>
// </svg>
