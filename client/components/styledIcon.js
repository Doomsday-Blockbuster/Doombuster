

import styled from 'styled-components'
import {HandThumbsDown, HandThumbsUp} from '@styled-icons/bootstrap'


export const ThumbUp = styled(HandThumbsUp)`
  color: red;
  font-weight: bold;
  margin: 0.5rem;
  &:hover {
    box-shadow: inset 0 0 10px #000000;
    cursor: pointer;
  }
  box-shadow: ${(props) => (props.voteType=== 'upvote' ? 'inset 0 0 10px #000000' : 'none') };
`

export const ThumbDown = styled(HandThumbsDown)`
  color: red;
  font-weight: bold;
  margin: 0.5rem;
  &:hover {
    box-shadow: inset 0 0 10px #000000;
    curser: pointer;
  }
  box-shadow: ${(props) => (props.voteType === 'downvote' ? 'inset 0 0 10px #000000' : 'none') };
  

`

// ${(props) => (props.important ? 'bold' : 'normal') }

//export const IconStyleWrapper = 

// import {StyledIconBase} from '@styled-icons/styled-icon'

// export const IconStyleWrapper = styled.div`
//   ${StyledIconBase} {
//     color: red;
//     /* icon styles go here */
//   }
// `