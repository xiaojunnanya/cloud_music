import NoFinished from '@/components/noFinished'
import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

interface IPerson{
  children?: ReactNode
}

const DownLoad: FC<IPerson> = memo(() => {
  return (
    <div>
      <NoFinished></NoFinished>
    </div>
  )
})

export default DownLoad