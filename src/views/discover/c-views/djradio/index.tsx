import NoFinished from '@/components/noFinished'
import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

interface IPerson{
  children?: ReactNode
}

const Djradio: FC<IPerson> = memo(() => {
  return (
    <div>
      <NoFinished></NoFinished>
    </div>
  )
})

export default Djradio