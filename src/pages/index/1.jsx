import Taro from '@tarojs/taro'
import React from 'react'
import { View } from '@tarojs/components'
import { ThreadList } from '../../components/thread_list'
// import api from '../../utils/api'

import './index.less'

class Index extends React.Component {

    state = {
        loading: true,
        threads: []
    }

    async componentDidMount () {
        try {
            // const res = await Taro.request({
            //     url: api.getLatestTopic()
            // })
            this.setState({
                threads: [1, 2, 3],
                loading: false
            })
        } catch (error) {
            Taro.showToast({
                title: '载入远程数据错误'
            })
        }
    }

    config = {
        navigationBarTitleText: '首页'
    }

    render () {
        const { loading, threads } = this.state
        return (
            <View className='index'>
                <ThreadList
                    loading={loading}
                />
            </View>
        )
    }
}

export default Index