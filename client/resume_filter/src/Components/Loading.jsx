import React from 'react'
import { Spin , Space} from 'antd'
export default function Loading() {
  return (
    <div style={{ display: 'grid' , placeItems : 'center' , height : '50vh' }} >
            <Spin  size='large'></Spin>
    </div>
  )
}
