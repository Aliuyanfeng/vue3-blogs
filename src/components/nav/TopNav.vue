<template>
    <!-- 头部导航 -->
    <div class="header_nav flex_box scroll-sup" :class="{'scroll-style':isScroll || isHaveBackground}">
        <!-- 左侧logo -->
        <a href="/" class="home_link flex_box">
            <img src="@/assets/img/logo.png" alt="" v-if="!isScroll && !isHaveBackground">
            <img src="@/assets/img/lyf_logo.png" alt="" v-else class="zlb_logo">
            <span class="site_name">
            <!-- 朝与暮 -->
            </span>
        </a>
        <!-- 右侧导航 -->
        <div class="links">
            <!-- 一键切换黑暗模式 -->
            <BulbOutlined :style="{fontSize: '18px', lineHeight: '25px',marginRight: '1.5rem'}" v-if="darkMode" @click="changeMode"/>
            <BulbFilled :style="{fontSize: '18px', lineHeight: '25px',marginRight: '1.5rem'}" v-else @click="changeMode"/>
            <!-- 文章搜索按钮 -->
            <!-- <a-input-group compact>
                <a-select v-model:value="searchType">
                    <a-select-option value="文章">文章</a-select-option>
                    <a-select-option value="标签">标签</a-select-option>
                </a-select>
                <a-input-search style="width: 60%" v-model:value="searchKeywords" placeholder="输入你想搜索的内容吧" @search="onSearch"/>
            </a-input-group> -->

            <a-select
                v-model="searchKeywords"
                show-search
                placeholder="输入你想搜索的内容吧"
                style="width: 200px"
                :default-active-first-option="false"
                :show-arrow="false"
                :filter-option="false"
                :not-found-content="null"
                :options="searchData"
                @search="handleSearch"
                @change="handleChange"
            >
            </a-select>
            <!-- 导航 -->
            <ul class="links_list">
                <li class="link_item">
                    <router-link to="/">首页</router-link>
                </li>
                 <li class="link_item">
                    <router-link to="/demo">Demo</router-link>
                </li>
                 <li class="link_item">
                    <router-link to="/Archive">归档</router-link>
                </li>
                 <li class="link_item">
                    <router-link to="/ArticleList">文章</router-link>
                </li>
                 <li class="link_item">
                    <router-link to="/Note">笔记</router-link>
                </li>
                 <li class="link_item">
                    <router-link to="/">生活</router-link>
                </li>
                 <li class="link_item">
                    <router-link to="/QuestionBank">题库</router-link>
                </li>
                 <li class="link_item">
                    <router-link to="/">关于我</router-link>
                </li>
                 <li class="link_item">
                    <a-dropdown>
                        <a class="ant-dropdown-link" @click.prevent>
                        GitHub
                        <DownOutlined />
                        </a>
                        <template #overlay>
                        <a-menu @click="gitClick($event as MenuInfo)">
                            <a-menu-item key="1">
                                <a href="https://github.com/Aliuyanfeng" target="_blank">Aliuyanfeng</a>
                            </a-menu-item>
                            <a-menu-item key="2">
                                <a href="https://github.com/Aliuyanfeng/vue3-blogs" target="_blank">{{msg}}项目地址</a>
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
    import {ref,onMounted, watch} from 'vue'

    import { BulbFilled,DownOutlined,BulbOutlined} from '@ant-design/icons-vue';

    import { searchArticle } from '@/api/article'

    import { useRouter } from "vue-router";

    const router = useRouter();
    // const props = defineProps({ 
    //     isopen: {
    //         type: Boolean, //(string也可以是其他你自定义的接口)
    //         required: true, 
    //         default: () => false 
    //     } 
    // });
    // defineProps<{
    //     isopen:boolean  
    // }>()
    // interface Props{
    //     isopen:boolean  
    // }
    //  const props = withDefaults(defineProps<Props>(), {
    //     isopen:false
    // })

    const props = defineProps({
        msg: String,
        isHaveBackground:Boolean
    });

    const emits = defineEmits(['search-article'])

    // 切换灯光模式
    const darkMode = ref<boolean>(true)

    const changeMode = ()=>{
        darkMode.value = !darkMode.value
    }

    // 搜索文章
    // const searchType = ref<string[]>(['标签'])
    
    const searchKeywords = ref<string>('')

    // const onSearch = () => {
    //     console.log('搜索文章')
    //     emits('search-article', searchKeywords.value)
    // }
    
    // 搜索数据
    const searchData = ref<any[]>([]);

    let timeout:any
    // 触发搜索
    const handleSearch = async (val: string) => {
        searchKeywords.value = val;
        if (timeout) {
            clearTimeout(timeout);
            timeout = null;
        }

        timeout = setTimeout(_searchArticle, 300);
    };
    
     //文章模糊搜索
    const _searchArticle = async () => {
        await searchArticle({
            keyword: searchKeywords.value
        }).then(d=>{
            const result = d.data;
            searchData.value = []
            result.forEach((r: any) => {
                searchData.value.push({
                    value: r['id'],
                    label: r['article_title'],
                });
            });
        })
    }

    const handleChange = (val: string) => {

        searchKeywords.value = val;

        router.push({
            path:`/articleDetail/${val}`
        })
    };
    // 切换搜文章类型
     // 约束下拉菜单
    interface MenuInfo{
        key:string
    }
    const gitClick = ({key}:MenuInfo) =>{
        if(key == "1"){
            
        }
    }

    const scroll = ref<number>(0)  //滚动高度

    const isScroll = ref<boolean>(false)  //是否滚动到指定高读

    // 监听滚动高读
    const handleScroll = () =>{
        scroll.value = document.documentElement.scrollTop||document.body.scrollTop
    }
    watch(scroll,(newVal,oldVal) => {
        if(scroll.value > 180){
            isScroll.value = true
        }else{
            isScroll.value = false
        }
    })
     onMounted(() => {
        window.addEventListener('scroll',handleScroll)
    })
</script>

<style lang="scss" scoped>
ul,ol{
    list-style: none;
}
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
    align-items: center;
    z-index: 100;
    .home_link{
        align-items: center;
        .zlb_logo{
            width: 120px;
            margin-left: 30px;
        }
        .site_name{
            font-size: 1.3rem;
            // font-weight: 600;
            // color: #2c3e50;
            color: #fff;
            font-family: STKaiti;
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
                background-color: transparent;
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
                    position: relative;
                    transition: all .5s ease-in-out linear;
                    &:hover{
                        transition: all .5s ease-in-out linear;
                        &::after{
                            content: "";
                            position: absolute;
                            bottom: -5px;
                            left: 50%;
                            transform: translate(-50%,0);
                            width: 30px;
                            height: 3px;
                            background-color: turquoise;
                            transition: all .5s ease-in-out linear;
                        }
                    }
                    a{
                        color: #fff;
                        font-size: 16px;
                    }
                }
            }
    }

    
}
.header_nav.scroll-sup.scroll-style{
    background-color: #fff;
}
.header_nav.scroll-sup.scroll-style :deep(*) {
    color: #333!important;
}
</style>