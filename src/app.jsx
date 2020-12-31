import React, { Component } from 'react'
import { Provider } from 'mobx-react'
import 'taro-ui/dist/style/index.scss' // 全局引入一次即可
import counterStore from './store/counter'
import { AtTabBar } from 'taro-ui'
import Taro from '@tarojs/taro'

import './app.less'

const store = {
    counterStore
}

class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
            current: 0
        }
    }

    componentDidMount () { }

    componentDidShow () { }

    componentDidHide () { }

    componentDidCatchError () { }

    handleAtTabBarClick = (data) => {
        this.setState({
            current: data
        })
        switch (data) {
            // case 0:
            //     Taro.navigateTo({
            //         url: '/pages/index/index'
            //     })
            //     break
            // case 1:
            //     Taro.navigateTo({
            //         url: '/pages/classify/classify'
            //     })
            //     break
            // case 2:
            //     Taro.navigateTo({
            //         url: '/pages/make_picture/make_picture'
            //     })
            //     break
            // case 3:
            //     Taro.navigateTo({
            //         url: '/pages/personal_center/personal_center'
            //     })
            //     break

            case 0:
                Taro.navigateTo({
                    url: '/pages/make_picture/make_picture'
                })
                break
            case 1:
                Taro.navigateTo({
                    url: '/pages/personal_center/personal_center'
                })
                break
            default:
                Taro.navigateTo({
                    url: '/pages/index/index'
                })
        }
    }

    // this.props.children 就是要渲染的页面
    render () {
        return (
            <Provider store={store}>
                {this.props.children}
                <AtTabBar
                    current={this.state.current}
                    fixed
                    onClick={this.handleAtTabBarClick}
                    tabList={[
                        // { title: '首页', iconType: 'bullet-list', text: 'new' },
                        // { title: '分类', iconType: 'camera' },
                        { title: '制图', iconType: 'image' },
                        { title: '个人中心', iconType: 'user' }
                    ]}
                />
            </Provider>
        )
    }
}

export default App
