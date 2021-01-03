import React, { useRef, useState } from 'react'
import { View, Text, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'

import './index.less'

export default function HomeList () {

    const handleClick = (e) => {
        // e.persist()
        // console.log(e)
        // Taro.navigateTo({
        //     url: `/pages/make_picture/${e._targetInst.key}/${e._targetInst.key}`
        // })
        Taro.navigateTo({
            url: `/pages/make_picture/${e}/${e}`
        })
    }

    return (
        <View className='make_picture_Container'>
            <Button className='make_picture_button button1' onClick={() => handleClick('make_long_picture')}>制作长图</Button>
            {/* <Button className='make_picture_button button2' onClick={() => handleClick('make_scrawl_picture')}>涂鸦</Button> */}
            <Button className='make_picture_button button3' onClick={() => handleClick('make_move_picture')}>制作动图</Button>
        </View>
    )
}