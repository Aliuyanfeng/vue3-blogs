// 测试模块引入
import TestModulesTypes from "./modules/test/interface";
import DeviceModulesTypes from "./modules/device/interface";

// 根节点state类型定义
export default interface RootStateTypes{
    test: string;
    baseInfo: object;
    isLoading: boolean;
    allTag: Array<any>
    // ip: string;
    // address: string;
    // os: string;
    // browser: string
}

// vuex 所有state类型集成
export interface AllStateTypes extends RootStateTypes {
    testModule: TestModulesTypes
    deviceModule: DeviceModulesTypes
}