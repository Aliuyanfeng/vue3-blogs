import { Module } from "vuex";

import RootStateTypes from "@/store/interface";

import DeviceModulesTypes from "@/store/modules/device/interface";

const deviceModule: Module<DeviceModulesTypes,RootStateTypes> = {
    namespaced: true,
    state:{
        name: 'device-module',
        ip: '', // 用户IP
        address: '', // 用户地址
        os: '', // 所用设备系统
        browser: '', // 所用浏览器
        a_id: '' //地址id
    },
    mutations: {
        UPDATE_DEVICE(state,device) {
            state.ip = device.ip
            state.address = device.address
            state.a_id = device.c_id
            state.os = device.os
            state.browser = device.browser
        }
    },
    actions: {
        updateDevice({ commit }, device) {
            commit('UPDATE_DEVICE', device)
        }
    }
}

export default deviceModule