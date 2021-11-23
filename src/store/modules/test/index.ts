import { Module } from "vuex";

import RootStateTypes from "@/store/interface";

import TestModulesTypes from "@/store/modules/test/interface";

const testModule: Module<TestModulesTypes,RootStateTypes> = {
    namespaced: true,
    state:{
        name: 'test-module',
        count: 0, 
    },
    mutations: {
        add_count(state) {
            state.count +=1
        }
    },
    actions: {
        
    }
}

export default testModule