import React, { useState, useEffect } from 'react'
import { View, Button, Canvas, CoverView } from '@tarojs/components'
import { AtNavBar } from 'taro-ui'
import Taro, { getImageInfo, createCanvasContext } from '@tarojs/taro'
import GIF from 'gif.js'

import './index.less'

var gif = new GIF({
    workers: 2,
    quality: 10
});

//   // add an image element
//   gif.addFrame(imageElement);

//   // or a canvas element
//   gif.addFrame(canvasElement, {delay: 200});

//   // or copy the pixels from a canvas context
//   gif.addFrame(ctx, {copy: true});

//   gif.on('finished', function(blob) {
//     window.open(URL.createObjectURL(blob));
//   });

//   gif.render();



export default function HomeList () {

    const [canvasStyle, setCanvasStyle] = useState({})
    const [systemScreen, setSystemScreen] = useState({})
    const [imgUrl, setImgUrl] = useState('')

    useEffect(() => {
        Taro.getSystemInfo({
            success: res => {
                setSystemScreen({
                    sWidth: res.screenWidth,
                    sHeight: res.screenHeight
                })
            }
        })

    }, [])

    const handleUpload = () => {
        const ctx = createCanvasContext('myCanvas')
        Taro.chooseImage({
            count: 9, // 默认9
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有，在H5浏览器端支持使用 `user` 和 `environment`分别指定为前后摄像头
            success: async function (res) {
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                var tempFilePaths = res.tempFilePaths
                let x = 0, y = 0, heights = []
                // const heights = tempFilePaths.map(item => width / item.width * item.height)
                for (let i = 0; i < tempFilePaths.length; i++) {
                    await getImageInfo({
                        src: tempFilePaths[i],
                        success: function (res) {
                            const { width, height } = res
                            const { sWidth, sHeight } = systemScreen
                            const h = sWidth / width * height
                            Taro.getSystemInfo
                            ctx.drawImage(tempFilePaths[i], 0, y, sWidth, h)
                            y += h
                        }
                    })
                }
                console.log(x, y)
                setCanvasStyle({
                    width: systemScreen.sWidth,
                    height: y
                })
                ctx.draw(false, setTimeout(() => {
                    Taro.canvasToTempFilePath({
                        width: systemScreen.sWidth,
                        height: y,
                        destWidth: 2 * systemScreen.sWidth,
                        destHeight: 2 * y,
                        canvasId: 'myCanvas',
                        success: function (res) {
                            console.log(res)
                            setImgUrl(res.tempFilePath)
                        }
                    })
                }, 1000))
            }
        })
    }

    const handleSave = () => {
        Taro.getImageInfo({
            src: imgUrl,
            success (result) {
                console.log(33, result)
                if (result.path) {
                    Taro.saveImageToPhotosAlbum({
                        filePath: result.path
                    }).then(getImageInfoResult => {
                        if (getImageInfoResult.errMsg === 'saveImageToPhotosAlbum:ok') {
                            // toast('已成功保存至相册！');
                        } else {
                            // toast('图片保存失败！');
                        }
                    });
                }
            }
        });
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
            <Canvas
                id="myCanvas"
                canvasId='myCanvas'
                style={canvasStyle}
            ></Canvas>
            <CoverView className='button_cotainer'>
                <Button className='button_circle button_left' onClick={handleUpload}>上传</Button>
                <Button className='button_circle button_right' onClick={handleSave}>保存</Button>
            </CoverView>
        </View>
    )
}

