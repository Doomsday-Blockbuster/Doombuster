

import styled from 'styled-components'
import {HandThumbsDown, HandThumbsUp, HandThumbsDownFill, HandThumbsUpFill} from '@styled-icons/bootstrap'

export const ThumbUp = styled(HandThumbsUp)`
color: purple;
font-weight: bold;
margin: 0.25rem;
&:hover {
  box-shadow: inset 0 0 10px #000000;
  curser: pointer;
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

export const ThumbUpSelected = styled(HandThumbsUpFill)`
color: purple;
font-weight: bold;
margin: 0.25rem;
&:hover {
  box-shadow: inset 0 0 10px #000000;
  cursor: pointer;
}
box-shadow: 0 0 10px purple;
`

export const ThumbDownSelected = styled(HandThumbsDownFill)`
color: purple;
font-weight: bold;
margin: 0.25rem;
&:hover {
  box-shadow: inset 0 0 10px #000000;
  cursor: pointer;
}
box-shadow: 0 0 10px purple;
`