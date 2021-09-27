<template>
    <!-- 头部导航 -->
    <div class="header_nav">
        <!-- 左侧logo -->
        <a href="/" class="home_link">
            <span class="site_name">
            小刘没睡醒呢
            </span>
        </a>
        <!-- 右侧导航 -->
        <div class="links">
            <!-- 一键切换黑暗模式 -->
            <BulbOutlined :style="{fontSize: '18px', lineHeight: '25px',marginRight: '1.5rem'}" v-if="darkMode" @click="changeMode"/>
            <BulbFilled :style="{fontSize: '18px', lineHeight: '25px',marginRight: '1.5rem'}" v-else @click="changeMode"/>
            <!-- 文章搜索按钮 -->
            <a-input-group compact>
                <a-select v-model:value="searchType">
                    <a-select-option value="文章">文章</a-select-option>
                    <a-select-option value="标签">标签</a-select-option>
                </a-select>
                <a-input style="width: 60%" v-model:value="searchKeywords" @search="onSearch"/>
            </a-input-group>
            <!-- 导航 -->
            <ul class="links_list">
                <li class="link_item">
                    <router-link to="/">首页</router-link>
                </li>
                 <li class="link_item">
                    <router-link to="/">归档</router-link>
                </li>
                 <li class="link_item">
                    <router-link to="/">标签</router-link>
                </li>
                 <li class="link_item">
                    <router-link to="/">笔记</router-link>
                </li>
                 <li class="link_item">
                    <router-link to="/">生活</router-link>
                </li>
                 <li class="link_item">
                    <router-link to="/">旅程</router-link>
                </li>
                 <li class="link_item">
                    <router-link to="/">友链</router-link>
                </li>
                 <li class="link_item">
                    <a-dropdown>
                        <a class="ant-dropdown-link" @click.prevent>
                        GitHub
                        <DownOutlined />
                        </a>
                        <template #overlay>
                        <a-menu @click="gitClick">
                            <a-menu-item key="1">
                                <a href="https://github.com/Aliuyanfeng" target="_blank">Aliuyanfeng</a>
                            </a-menu-item>
                            <a-menu-item key="2">
                                <a href="https://github.com/Aliuyanfeng/vue3-blogs" target="_blank">项目地址</a>
                            </a-menu-item>
                        </a-menu>
                        </template>
                    </a-dropdown>
                </li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import {ref} from 'vue'
    import { BulbFilled,DownOutlined,BulbOutlined} from '@ant-design/icons-vue';

   
    // 切换灯光模式
    const darkMode = ref<boolean>(false)

    const changeMode = ()=>{
        darkMode.value = !darkMode.value
    }

    // 搜索文章
    const searchType = ref<string[]>(['标签'])
    
    const searchKeywords = ref<string>('')

    const onSearch = () => {
        console.log('搜索文章')
    }


    // 切换搜文章类型
     // 约束下拉菜单
    interface MenuInfo{
        key:string
    }
    const gitClick = ({key}:MenuInfo) =>{
        if(key == "1"){
            
        }
    }
</script>

<style lang="scss" scoped>
.header_nav{
    width: 100%;
    height: 3.6rem;
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    background-color: transparent;
    padding: 0.7rem 1.5rem;
    transition: all .5s ease-in-out;
    box-sizing: border-box;
    .home_link{
        .site_name{
            font-size: 1.3rem;
            font-weight: 600;
            color: #2c3e50;
        }
    }
    .links{
        position: absolute;
        right: 1.5rem;
        top: 0.7rem;
        display: flex;
        justify-content: space-between;
            :deep(.anticon-bulb){
                cursor: pointer;
                svg{
                    vertical-align: middle;
                }
            }
            :deep(.ant-menu){
                background: transparent;
                border-bottom: none;
            }

            :deep(.ant-input-group){
                width: 200px;
            }

            .links_list{
                display: flex;
                align-items: center;
                margin-bottom: 0;
                .link_item{
                    margin-left: 1.5rem;
                    min-width: 30px;
                    a{
                        color: #fff;
                    }
                }
            }
    }

    
}
</style>