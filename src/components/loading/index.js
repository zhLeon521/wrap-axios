import React, { memo } from 'react'
import { connect } from 'react-redux'
import { Spin } from 'antd'

import './styles.scss'



function Loading(props) {
    const { loading } = props
    let display = loading ? 'flex' : 'none'
    return (
        <div>
            <div className="loding_conainer" style={{ display }}>
                <Spin tip="Loading..." size="large"></Spin>
            </div>
        </div>
    )
}

export default connect()(memo(Loading))
