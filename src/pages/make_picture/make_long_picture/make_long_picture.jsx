import React, { useRef, useState } from 'react'
import { View, Text, Input, Button } from '@tarojs/components'
import { AtNavBar } from 'taro-ui'
import Taro from '@tarojs/taro'

import './index.less'

// 拼出来的图片的宽度
const width = document.body.clientWidth
// 拼出来的图片的质量，0-1之间，越大质量越好
const encoderOptions = 1

export default function HomeList () {

    const uploadRef = new useRef()
    const containerRef = new useRef()
    const [containerShow, setContainerShow] = useState('')
    const [imageUrl, setImageUrl] = useState('')

    const handleUpload = () => {
        uploadRef.current.click()
    }

    const handleSave = () => {
        const downloadEl = document.createElement('a')
        downloadEl.style.display = 'none'
        downloadEl.href = imageUrl
        downloadEl.download = '长图.jpeg';
        // 触发点击
        document.body.appendChild(downloadEl);
        downloadEl.click();
        // 然后移除
        document.body.removeChild(downloadEl);
    }

    const handleChange = (e) => {
        e.persist()
        const files = Array.from(e.target.files)
        const length = files.length
        let instances = []
        let finished = 0

        // 根据图片文件拿到图片实例
        files.forEach((file, index) => {
            const reader = new FileReader()
            // 把文件读为 dataUrl
            reader.readAsDataURL(file)
            reader.onload = e => {
                const image = new Image()
                image.src = e.target.result
                image.onload = () => {
                    // 图片实例化成功后存起来
                    instances[index] = image
                    finished++
                    if (finished === length) {
                        drawImages(instances)
                    }
                }
            }
        })
    }

    // 拼图
    const drawImages = (images) => {
        const heights = images.map(item => width / item.width * item.height)
        const canvas = document.createElement('canvas')
        canvas.width = width
        canvas.height = heights.reduce((total, current) => total + current)
        const context = canvas.getContext('2d')

        let y = 0, finalImageUrl = ''

        images.forEach((item, index) => {
            const height = heights[index]
            context.drawImage(item, 0, y, width, height)
            y += height
        })

        finalImageUrl = canvas.toDataURL('image/jpeg', encoderOptions)

        setImageUrl(finalImageUrl)
        setContainerShow(<img src={finalImageUrl} />)
    }

    const handleClick = () => {
        Taro.navigateBack({
            delta: 1
        })
    }

    return (
        <View>
            <AtNavBar
                // onClickRgIconSt={handleClick}
                // onClickRgIconNd={handleClick}
                onClickLeftIcon={handleClick}
                color='#000'
                title='长图制作'
                leftText='返回'
            // rightFirstIconType='bullet-list'
            // rightSecondIconType='user'
            />
            <View ref={containerRef}>
                {containerShow}
            </View>
            <input ref={uploadRef} onChange={handleChange} id='upload-input' type="file" accept="image/*" multiple="multiple" />
            <Button className='button_circle button_left' onClick={handleUpload}>上传</Button>
            <Button className='button_circle button_right' onClick={handleSave}>保存</Button>
        </View>
    )
}