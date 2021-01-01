import React, { useRef, useState } from 'react'
import { View, Text, Input, Button, Canvas } from '@tarojs/components'
import { AtNavBar } from 'taro-ui'
import Taro, { createSelectorQuery, createCanvasContext } from '@tarojs/taro'

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
        console.log(uploadRef.current)
        // uploadRef.current.click()
        const ctx = createCanvasContext('myCanvas')

        Taro.chooseImage({
            count: 9, // 默认9
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有，在H5浏览器端支持使用 `user` 和 `environment`分别指定为前后摄像头
            success: function (res) {
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                console.log(res)
                // var tempFilePaths = res.tempFilePaths
                // // drawImages(tempFilePaths)
                // let y = 0
                // const heights = tempFilePaths.map(item => width / item.width * item.height)
                // tempFilePaths.forEach((item, index) => {
                //     const height = heights[index]
                //     ctx.drawImage(item, 0, y, width, height)
                //     y += height
                // })

                ctx.drawImage(res.tempFilePaths[0], 0, 0, 150, 100)
                ctx.draw()
            }
        })
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
        console.log(heights)
        const context = createCanvasContext('myCanvas')
        // canvas.width = width
        // canvas.height = heights.reduce((total, current) => total + current)
        // const context = canvas.getContext('2d')

        let y = 0, finalImageUrl = ''

        images.forEach((item, index) => {
            const height = heights[index]
            context.drawImage(item, 0, y, width, height)
            y += height
        })

        // finalImageUrl = canvas.toDataURL('image/jpeg', encoderOptions)

        // setImageUrl(finalImageUrl)
        // setContainerShow(<img src={finalImageUrl} />)

    }

    const handleClick = () => {
        Taro.navigateBack({
            delta: 1
        })
    }

    return (
        <View>
            <AtNavBar
                onClickLeftIcon={handleClick}
                color='#000'
                title='长图制作'
                leftText='返回'
            />
            <View ref={containerRef}>
                {containerShow}
            </View>
            <Canvas
                // ref={uploadRef}
                // type="2d"
                id="myCanvas"
                canvasId='myCanvas'
                style={{ width, height: '100vh' }}
            ></Canvas>
            <Button className='button_circle button_left' onClick={handleUpload}>上传</Button>
            <Button className='button_circle button_right' onClick={handleSave}>保存</Button>
        </View>
    )
}