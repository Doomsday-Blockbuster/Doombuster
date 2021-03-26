

import styled from 'styled-components'
import {HandThumbsDown, HandThumbsUp} from '@styled-icons/bootstrap'


export const ThumbUp = styled(HandThumbsUp)`
  color: #BE00FE;
  font-weight: bold;
  margin: 0.25rem 0.5rem 0.25rem 0.25rem;
  &:hover {
    color: #EC3499;
    box-shadow: inset 0 0 10px #000000;
    cursor: pointer;
  }
  
`

export const ThumbDown = styled(HandThumbsDown)`
  color: #BE00FE;
  font-weight: bold;
  margin: 0.25rem 0.5rem 0.25rem 0.25rem;
  &:hover {
    color: #EC3499;
    box-shadow: inset 0 0 10px #000000;
    cursor: pointer;
  }
  
  

`

// ${(props) => (props.important ? 'bold' : 'normal') }

//box-shadow: ${(props) => (props.voteType === 'downvote' ? 'inset 0 0 10px #000000' : 'none') };
// box-shadow: ${(props) => (props.voteType=== 'upvote' ? 'inset 0 0 10px #000000' : 'none') };