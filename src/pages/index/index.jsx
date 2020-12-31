import React, { Component } from 'react'
import Taro, { eventCenter } from '@tarojs/taro'
import { View, Swiper, SwiperItem, Image } from '@tarojs/components'
import { observer, inject } from 'mobx-react'

import './index.less'
import HomeList from '../../components/list'
import dogImg from '../../assets/狗子.jpeg'
import aImg from '../../assets/a.jpeg'
import bImg from '../../assets/b.gif'
import dImg from '../../assets/d.jpeg'

@inject('store')                    //该装饰器方便使用全局store， 避免层层传递
@observer
class Index extends Component {

    constructor(props) {
        super(props)
        this.state = {
            current: 0
        }
    }

    componentDidMount () { }

    componentWillUnmount () { }

    componentDidShow () { }

    componentDidHide () { }

    // increment = () => {
    //     const { counterStore } = this.props.store
    //     counterStore.increment()
    // }
    handleAtTabBarClick = (data) => {
        this.setState({
            current: data
        })
        console.log(data)
        Taro.redirectTo({
            url: '/pages/thread_detail/thread_detail'
        })
    }

    render () {
        // const { counterStore: { counter } } = this.props.store
        return (
            <View className="index">
                <View>
                    <Swiper
                        className='test-h'
                        indicatorColor='#999'
                        indicatorActiveColor='#333'
                        // vertical
                        circular
                        indicatorDots
                        autoplay>
                        <SwiperItem>
                            <View className='demo-text-1'>
                                <Image src={aImg} className='avatar' />
                            </View>
                        </SwiperItem>
                        <SwiperItem>
                            <View className='demo-text-2'>
                                <Image src={bImg} className='avatar' />
                            </View>
                        </SwiperItem>
                        <SwiperItem>
                            <View className='demo-text-3'>
                                <Image src={dImg} className='avatar' />
                            </View>
                        </SwiperItem>
                    </Swiper>
                </View>
                <View>
                    <HomeList />
                </View>

            </View>
        )
    }
}

export default Index
