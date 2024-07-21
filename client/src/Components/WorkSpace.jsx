import React from 'react'
import Split from 'react-split';
import Playground from './Playground/Playground';
import ProblemDetails from './ProblemDescription/ProblemDetails';

const WorkSpace = () => {
  return (
    <Split className='split'>
        <ProblemDetails />
        <Playground />
    </Split>
  )
}

export default WorkSpace
