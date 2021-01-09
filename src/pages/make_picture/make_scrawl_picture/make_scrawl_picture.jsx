import React, { useState } from 'react'
import { View, Button, Canvas, CoverView } from '@tarojs/components'
import { AtNavBar } from 'taro-ui'
import Taro, { getImageInfo, createCanvasContext } from '@tarojs/taro'

import './index.less'
import { useEffect } from 'react'

let arr = []

export default function HomeList () {

    const [canvasStyle, setCanvasStyle] = useState({})
    const [systemScreen, setSystemScreen] = useState({})
    const [isPen, setIsPen] = useState(false)
    const [penPath, setPenPath] = useState([])
    const [imgStyle, setImgStyle] = useState({})

    const ctx = createCanvasContext('myCanvas')


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
        // const ctx = createCanvasContext('myCanvas')
        Taro.chooseImage({
            count: 1, // 默认9
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
                            setImgStyle({
                                width: sWidth,
                                height: h
                            })
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
                            setPenPath(penPath => {
                                penPath.push(res.tempFilePath)
                                return penPath
                            })
                        }
                    })
                }, 1000))
            }
        })
    }

    const handleSave = () => {
        Taro.getImageInfo({
            src: penPath[penPath.length - 1],
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

    const handleTouchStart = (e) => {
        arr = []
    }

    const handleTouchMove = (e) => {
        arr.push([e.touches[0].x, e.touches[0].y])
        ctx.setStrokeStyle('red')
        ctx.setLineJoin('round')
        ctx.setLineWidth(5)
        ctx.beginPath();
        arr.length > 1 && ctx.moveTo(arr[arr.length - 2][0], arr[arr.length - 2][1]);
        ctx.lineTo(arr[arr.length - 1][0], arr[arr.length - 1][1]);
        ctx.closePath();
        ctx.stroke();  //描边

    }

    const handleTOuchEnd = () => {
        ctx.draw(true, setTimeout(() => {
            Taro.canvasToTempFilePath({
                canvasId: 'myCanvas',
                success: function (res) {
                    console.log(penPath)
                    setPenPath(penPath => {
                        penPath.push(res.tempFilePath)
                        return penPath
                    })
                }
            })
        }, 10))
    }

    const recallClick = (e) => {
        let step = penPath.length - 1
        const { width, height } = imgStyle
        if (step > 0) {
            step--;
            ctx.drawImage(penPath[step], 0, 0, width, height);
            ctx.draw()
            setPenPath(penPath => {
                penPath.pop()
                return penPath
            })
        } else {
            console.log('不能再继续撤销了');
        }

    }

    return (
        <View>
            <AtNavBar
                onClickLeftIcon={handleClick}
                color='#000'
                title='涂鸦'
                leftText='返回'
            />
            <Canvas
                id="myCanvas"
                canvasId='myCanvas'
                style={canvasStyle}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTOuchEnd}
            ></Canvas>
            <CoverView className='button_cotainer'>
                <Button className='button_circle button_left' onClick={handleUpload}>上传</Button>
                <Button className='button_circle button_right' onClick={() => setIsPen(true)}>画笔</Button>
                <Button className='button_circle button_right' onClick={recallClick}>撤回</Button>
                <Button className='button_circle button_right' onClick={handleSave}>保存</Button>
            </CoverView>
        </View>
    )
}