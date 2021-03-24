

import styled from 'styled-components'
import {HandThumbsDown, HandThumbsUp} from '@styled-icons/bootstrap'


export const ThumbUp = styled(HandThumbsUp)`
  color: purple;
  font-weight: bold;
  margin: 0.25rem;
  &:hover {
    box-shadow: inset 0 0 10px #000000;
    cursor: pointer;
  }
  
`

export const ThumbDown = styled(HandThumbsDown)`
  color: purple;
  font-weight: bold;
  margin: 0.25rem;
  &:hover {
    box-shadow: inset 0 0 10px #000000;
    curser: pointer;
  }
  
  

`

// ${(props) => (props.important ? 'bold' : 'normal') }

//box-shadow: ${(props) => (props.voteType === 'downvote' ? 'inset 0 0 10px #000000' : 'none') };
// box-shadow: ${(props) => (props.voteType=== 'upvote' ? 'inset 0 0 10px #000000' : 'none') };