import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

interface IPerson{
  children?: ReactNode
}

const Player: FC<IPerson> = memo(() => {
  return (
    <div>Player</div>
  )
})

export default Player