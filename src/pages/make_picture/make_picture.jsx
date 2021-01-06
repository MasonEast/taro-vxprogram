import React, { useRef, useState } from 'react'
import { View, Text, Button } from '@tarojs/components'
import { AtAvatar } from 'taro-ui'
import Taro from '@tarojs/taro'

import './index.less'
import img1 from '../../assets/1.jpg'
import img2 from '../../assets/2.jpg'
import img3 from '../../assets/3.jpg'
import img4 from '../../assets/4.jpg'
import img5 from '../../assets/5.jpeg'
import img6 from '../../assets/6.jpeg'


export default function HomeList () {

    const handleClick = (e) => {
        Taro.navigateTo({
            url: `/pages/make_picture/${e}/${e}`
        })
    }

    return (
        <View>
            <View className='make_picture_Container' />
            <View className='button_container'>
                <View className='make_picture_button button1' onClick={() => handleClick('make_long_picture')}>
                    <AtAvatar circle image={img1} />
                    <Text>制作长图</Text>
                </View>
                <View className='make_picture_button button1' onClick={() => handleClick('make_scrawl_picture')}>
                    <AtAvatar circle image={img2} />
                    <Text>涂鸦</Text>
                </View>
                <View className='make_picture_button button1' onClick={() => handleClick('make_move_picture')}>
                    <AtAvatar circle image={img3} />
                    <Text>制作动图</Text>
                </View>
                <View className='make_picture_button button1' onClick={() => handleClick('make_long_picture')}>
                    <AtAvatar circle image={img4} />
                    <Text>制作头像</Text>
                </View>
                <View className='make_picture_button button1' onClick={() => handleClick('make_long_picture')}>
                    <AtAvatar circle image={img5} />
                    <Text>制作九宫格</Text>
                </View>
                <View className='make_picture_button button1' onClick={() => handleClick('make_long_picture')}>
                    <AtAvatar circle image={img6} />
                    <Text>制作长图</Text>
                </View>
            </View>
        </View>
    )
}