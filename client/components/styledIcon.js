

import styled from 'styled-components'
import {HandThumbsDown, HandThumbsUp, HandThumbsDownFill, HandThumbsUpFill} from '@styled-icons/bootstrap'

export const ThumbUp = styled(HandThumbsUp)`
  color: #BE00FE;
  font-weight: bold;
  margin: 0.25rem;
  &:hover {
    color: #EC3499;
    box-shadow: inset 0 0 10px #000000;
    cursor: pointer;
  }
  
`

export const ThumbDown = styled(HandThumbsDown)`
  color: #BE00FE;
  font-weight: bold;
  margin: 0.25rem;
  &:hover {
    color: #EC3499;
    box-shadow: inset 0 0 10px #000000;
    cursor: pointer;
  }

`

export const ThumbUpSelected = styled(HandThumbsUpFill)`
color: #BE00FE;
  font-weight: bold;
  margin: 0.25rem;
  &:hover {
    box-shadow: inset 0 0 10px #000000;
    cursor: pointer;
  }
  // box-shadow: 0 0 10px #34ebe5;
`

export const ThumbDownSelected = styled(HandThumbsDownFill)`
color: #BE00FE;
  font-weight: bold;
  margin: 0.25rem;
  &:hover {
    box-shadow: inset 0 0 10px #000000;
    curser: pointer;
  }
  // box-shadow: 0 0 10px #34ebe5;
`
// ${(props) => (props.important ? 'bold' : 'normal') }

//box-shadow: ${(props) => (props.voteType === 'downvote' ? 'inset 0 0 10px #000000' : 'none') };
// box-shadow: ${(props) => (props.voteType=== 'upvote' ? 'inset 0 0 10px #000000' : 'none') };