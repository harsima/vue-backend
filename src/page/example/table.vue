<template>
    <div class="page">
        <v-pageSection title="车辆管理">
            <v-pageNotes>本页实际路径: src/page/example/table.vue   table根组件为ElementUI。table配置请查看官方文档，table分页请查看“系统组件-功能类-表格分页”</v-pageNotes>
            <v-pageSearch>
                <el-form :inline="true" :model="searchForm">
                    <el-form-item>
                        <el-date-picker v-model="searchForm.time" type="date" placeholder="选择日期"></el-date-picker>
                    </el-form-item>
                    <el-form-item>
                        <el-select v-model="searchForm.type" placeholder="车辆型号">
                            <el-option label="M13" value="M13"></el-option>
                            <el-option label="I3" value="I3"></el-option>
                            <el-option label="F49" value="F49"></el-option>
                            <el-option label="G38" value="G38"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-input v-model="searchForm.vin" placeholder="车架号/车牌号/IMEI"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="search">查询</el-button>
                    </el-form-item>
                </el-form>
            </v-pageSearch>
            <v-pageToolbar>
                <el-button type="primary" @click="filterShow">筛选</el-button>
                <el-button type="primary" v-if="hasPermission('outport')">导出</el-button>
                <el-button type="primary">添加</el-button>
            </v-pageToolbar>
            <v-pageTable pagination paginationAlign="center">
                <el-table v-loading="tableData.loading" :data="tableData.body" border style="width: 100%" :default-sort="{prop: 'date', order: 'descending'}">
                    <el-table-column type="index" label="序号" width="64" align="center"></el-table-column>
                    <el-table-column v-for="(item,index) in tableData.head" :prop="item.key" :label="item.name" sortable :key="index"></el-table-column>
                    <!-- <el-table-column prop="vin" label="车架号" sortable width="180"></el-table-column>
                        <el-table-column prop="plate" label="车牌号" sortable width="180"></el-table-column>
                        <el-table-column prop="imei" label="IMEI" sortable></el-table-column>
                        <el-table-column prop="type" label="车辆型号" sortable></el-table-column>
                        <el-table-column prop="endTime" label="最后注册时间" sortable></el-table-column>
                        <el-table-column prop="declear" label="经销商名称" sortable></el-table-column>
                        <el-table-column prop="area" label="所属区域" sortable></el-table-column> -->
                    <el-table-column label="操作">
                        <template scope="scope">
                            <el-button v-if="scope.row.operation.indexOf('edit') >= 0" type="text" size="small">查看</el-button>
                            <el-button v-if="scope.row.operation.indexOf('delete') >= 0" type="text" size="small">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </v-pageTable>
        </v-pageSection>
        <signal-group-dialog title="筛选" :show.sync="dialog.filter.show" :defaultChecked.sync="dialog.filter.checked" :dialogData="dialog.filter.data" @confirm="signalUpdate">
        </signal-group-dialog>
    </div>
</template>

<script>
// import signalGroup from 'sysComponents/locale/signalGroup/signalGroup'
import signalGroupDialog from 'sysComponents/locale/signalGroup/dialogView'
// console.log(charts)
export default {
    data() {
        return {
            dialog: {
                filter: {
                    show: false,
                    checked: [],
                    data: {}
                }
            },
            searchForm: {
                time: '',
                type: '',
                vin: ''
            },
            tableData: {
                loading: true,
                head: [],
                body: []
            },
            checkAll: true,
            isIndeterminate: true
        }
    },
    methods: {
        // eslint-disable-next-line 
        getTableData(data) {
            // ajax 查询表格数据
            this.tableData.head = [
                {
                    key: 'vin',
                    name: '车架号2'
                },
                {
                    key: 'plate',
                    name: '车牌号'
                },
                {
                    key: 'imei',
                    name: 'IMEI'
                },
                {
                    key: 'type',
                    name: '车辆型号'
                },
                {
                    key: 'endTime',
                    name: '最后注册时间'
                },
                {
                    key: 'declear',
                    name: '经销商名称'
                },
                {
                    key: 'area',
                    name: '所属区域'
                }
            ]
            this.tableData.body = [
                {
                    vin: '123123123123',
                    plate: '辽A12345',
                    imei: '123123123123',
                    type: 'I3',
                    endTime: '2016-12-13 03:15:12',
                    declear: 'BMW',
                    area: '辽宁',
                    operation: 'edit,delete'
                },
                {
                    vin: '123123123000',
                    plate: '辽A12316',
                    imei: '123123123000',
                    type: 'M12',
                    endTime: '2016-12-13 01:15:10',
                    declear: 'BMW',
                    area: '辽宁',
                    operation: 'edit,delete'
                }
            ]
            // 模拟加载
            setTimeout(() => {
                this.tableData.loading = false
            }, 500)
        },
        getFilterData() {
            // 已有数据就不再请求
            if (!this.dialog.filter.checked.length) this.dialog.filter.checked = ["sendingTime", "bir"]
            if (!this.dialog.filter.data.hasOwnProperty()) {
                this.dialog.filter.data = { "child": [{ "child": [{ "child": [{ "key": "sendingTime", "name": "采集时间", "type": "1" }, { "key": "vehicles_status", "name": "车辆状态2.5整车", "type": "1" }, { "key": "charging_status", "name": "充电状态", "type": "1" }, { "key": "woking_model", "name": "运行模式", "type": "1" }, { "key": "speed", "name": "车速(KM/H)", "type": "1" }, { "key": "mileage", "name": "累计里程(KM)", "type": "1" }, { "key": "total_voltage", "name": "总电压(V)", "type": "1" }, { "key": "total_current", "name": "总电流(A)", "type": "1" }, { "key": "SOC", "name": "SOC(%)", "type": "1" }, { "key": "dcdc_state", "name": "DC-DC状态", "type": "1" }, { "key": "gears_position", "name": "挡位", "type": "1" }, { "key": "bir", "name": "电池绝缘电阻(KΩ)", "type": "1" }, { "key": "accelerateSpeedValue", "name": "加速踏板行程值-整车(%)", "type": "1" }, { "key": "brakeSpeedValue", "name": "制动踏板状态-整车(%)", "type": "1" }], "key": "ZC", "name": "整车数据", "type": "0" }, { "child": [{ "key": "driving_motor_data", "name": "电机信息", "type": "1" }], "key": "DJ", "name": "驱动电机数据", "type": "0" }, { "child": [{ "key": "engine_status", "name": "发动机状态(RTM2.5)", "type": "1" }, { "key": "crankshaft_speed", "name": "曲轴转速(RPM)", "type": "1" }, { "key": "fuel_consumption", "name": "燃料消耗率(%)", "type": "1" }], "key": "FDJ", "name": "发动机数据", "type": "0" }, { "child": [{ "key": "loc", "name": "定位状态", "type": "1" }, { "key": "original_longitude", "name": "经度", "type": "1" }, { "key": "original_latitude", "name": "纬度", "type": "1" }, { "key": "longitude_state", "name": "经度信息", "type": "1" }, { "key": "latitude_state", "name": "纬度信息", "type": "1" }], "key": "WZ", "name": "车辆位置数据", "type": "0" }, { "child": [{ "key": "pbsnwmax_voltage", "name": "最高电压电池子系统号", "type": "1" }, { "key": "onocwmax_voltage", "name": "最高电压电池单体代号", "type": "1" }, { "key": "max_vofcells", "name": "电池单体电压最高值(V)", "type": "1" }, { "key": "pbsnwmin_voltage", "name": "最低电压电池子系统号", "type": "1" }, { "key": "onocwmin_voltage", "name": "最低电压电池单体代号", "type": "1" }, { "key": "min_vofcells", "name": "电池单体电压最低值(V)", "type": "1" }, { "key": "pbsnwmax_temperature", "name": "最高温度子系统号", "type": "1" }, { "key": "onocwmax_temperature", "name": "最高温度探针单体代号", "type": "1" }, { "key": "max_temperaturea", "type": "1" }, { "key": "pbsnwmin_temperature", "name": "最低温度子系统号", "type": "1" }, { "key": "onocwmin_temperature", "name": "最低温度探针单体代号", "type": "1" }, { "key": "min_temperature", "name": "最低温度值(℃)", "type": "1" }, { "key": "max_temperature", "name": "最高温度值(℃)", "type": "1" }], "key": "JZ", "name": "极值数据", "type": "0" }, { "child": [{ "key": "pbpv_data", "name": "电池包电压数据", "type": "1" }], "key": "DCDY", "name": "单体蓄电池电压数据", "type": "0" }, { "child": [{ "key": "pbpt_data", "name": "电池包温度数据", "type": "1" }], "key": "WD", "name": "动力蓄电池包温度数据", "type": "0" }, { "child": [{ "key": "driving_range", "name": "续航剩余里程(KM)", "type": "1" }, { "key": "residual_energy", "name": "剩余能量(KW*H)", "type": "1" }, { "key": "Battery_Temperature_12V", "name": "电池温度(℃)", "type": "1" }, { "key": "gps_speed", "type": "1" }, { "key": "heading", "type": "1" }, { "key": "HV-Battery", "name": "HV电池信息", "type": "1" }, { "key": "original_gps_speed", "name": "GPS速度(KM/H)", "type": "1" }, { "key": "original_heading", "name": "GPS方向", "type": "1" }], "key": "ZDY", "name": "用户自定义数据", "type": "0" }, { "child": [{ "key": "Reger_TorqueReserve", "name": "电机母线电流(A)", "type": "1" }, { "key": "status_info2_2", "name": "动力系统就绪_上海", "type": "1" }, { "key": "status_vehicle", "name": "车辆当前状态", "type": "1" }, { "key": "status_info2_3", "name": "紧急下电请求", "type": "1" }, { "key": "status_info2_4", "name": "电池均衡激活", "type": "1" }, { "key": "status_info2_0", "name": "制动踏板状态(上海)(%)", "type": "1" }, { "key": "hv_leakage_status", "name": "漏电状态", "type": "1" }, { "key": "ignition_on_time", "name": "点火时间", "type": "1" }, { "key": "ignition_off_time", "name": "熄火时间", "type": "1" }, { "key": "charging_pile_insertion_time", "name": "充电桩插时间", "type": "1" }, { "key": "charging_pile_pulled_time", "name": "充电桩拔时间", "type": "1" }, { "key": "charging_start_time", "name": "充电起始时间", "type": "1" }, { "key": "charging_end_time", "name": "充电终止时间", "type": "1" }, { "key": "inverter_temperature", "name": "逆变器温度(℃)", "type": "1" }, { "key": "chrage_current", "name": "充电电流(A)", "type": "1" }, { "key": "battery_pack_max_temperature", "name": "电池包电池最高温度数据(℃)", "type": "1" }, { "key": "battery_pack_min_temperature", "name": "电池包电池最低温度数据(℃)", "type": "1" }, { "key": "chrage_voltage", "name": "充电电压(V)", "type": "1" }, { "key": "rtm_type", "name": "RTM 类型", "type": "1" }], "key": "TSXH", "name": "上海地标特殊信号", "type": "0" }], "key": "RTM25", "name": "RTM2.5", "type": "0" }, { "child": [{ "child": [{ "key": "sendingTime", "name": "采集时间", "type": "1" }, { "key": "vehicles_status", "name": "车辆状态2.5整车", "type": "1" }, { "key": "charging_status", "name": "充电状态", "type": "1" }, { "key": "woking_model", "name": "运行模式", "type": "1" }, { "key": "speed", "name": "车速(KM/H)", "type": "1" }, { "key": "mileage", "name": "累计里程(KM)", "type": "1" }, { "key": "total_voltage", "name": "总电压(V)", "type": "1" }, { "key": "total_current", "name": "总电流(A)", "type": "1" }, { "key": "SOC", "name": "SOC(%)", "type": "1" }, { "key": "dcdc_state", "name": "DC-DC状态", "type": "1" }, { "key": "gears_position", "name": "挡位", "type": "1" }, { "key": "bir", "name": "电池绝缘电阻(KΩ)", "type": "1" }, { "key": "accelerateSpeedValue", "name": "加速踏板行程值-整车(%)", "type": "1" }, { "key": "brakeSpeedValue", "name": "制动踏板状态-整车(%)", "type": "1" }], "key": "ZC", "name": "整车数据", "type": "0" }, { "child": [{ "key": "driving_motor_data", "name": "电机信息", "type": "1" }], "key": "DJ", "name": "驱动电机数据", "type": "0" }, { "child": [{ "key": "engine_status", "name": "发动机状态(RTM2.5)", "type": "1" }, { "key": "crankshaft_speed", "name": "曲轴转速(RPM)", "type": "1" }, { "key": "fuel_consumption", "name": "燃料消耗率(%)", "type": "1" }], "key": "FDJ", "name": "发动机数据", "type": "0" }, { "child": [{ "key": "loc", "name": "定位状态", "type": "1" }, { "key": "original_longitude", "name": "经度", "type": "1" }, { "key": "original_latitude", "name": "纬度", "type": "1" }], "key": "WZ", "name": "车辆位置数据", "type": "0" }, { "child": [{ "key": "pbsnwmax_voltage", "name": "最高电压电池子系统号", "type": "1" }, { "key": "onocwmax_voltage", "name": "最高电压电池单体代号", "type": "1" }, { "key": "max_vofcells", "name": "电池单体电压最高值(V)", "type": "1" }, { "key": "pbsnwmin_voltage", "name": "最低电压电池子系统号", "type": "1" }, { "key": "onocwmin_voltage", "name": "最低电压电池单体代号", "type": "1" }, { "key": "min_vofcells", "name": "电池单体电压最低值(V)", "type": "1" }, { "key": "pbsnwmax_temperature", "name": "最高温度子系统号", "type": "1" }, { "key": "onocwmax_temperature", "name": "最高温度探针单体代号", "type": "1" }, { "key": "max_temperaturea", "type": "1" }, { "key": "pbsnwmin_temperature", "name": "最低温度子系统号", "type": "1" }, { "key": "onocwmin_temperature", "name": "最低温度探针单体代号", "type": "1" }, { "key": "min_temperature", "name": "最低温度值(℃)", "type": "1" }, { "key": "max_temperature", "name": "最高温度值(℃)", "type": "1" }], "key": "JZ", "name": "极值数据", "type": "0" }, { "child": [{ "key": "pbpv_data", "name": "电池包电压数据", "type": "1" }], "key": "DCDY", "name": "单体蓄电池电压数据", "type": "0" }, { "child": [{ "key": "pbpt_data", "name": "电池包温度数据", "type": "1" }], "key": "WD", "name": "动力蓄电池包温度数据", "type": "0" }], "key": "BIT", "name": "BIT", "type": "0" }, { "child": [{ "child": [{ "key": "sendingTime", "name": "采集时间", "type": "1" }, { "key": "vehicles_status", "name": "车辆状态2.5整车", "type": "1" }, { "key": "charging_status", "name": "充电状态", "type": "1" }, { "key": "woking_model", "name": "运行模式", "type": "1" }, { "key": "speed", "name": "车速(KM/H)", "type": "1" }, { "key": "mileage", "name": "累计里程(KM)", "type": "1" }, { "key": "total_voltage", "name": "总电压(V)", "type": "1" }, { "key": "total_current", "name": "总电流(A)", "type": "1" }, { "key": "SOC", "name": "SOC(%)", "type": "1" }, { "key": "dcdc_state", "name": "DC-DC状态", "type": "1" }, { "key": "gears_position", "name": "挡位", "type": "1" }, { "key": "bir", "name": "电池绝缘电阻(KΩ)", "type": "1" }, { "key": "accelerateSpeedValue", "name": "加速踏板行程值-整车(%)", "type": "1" }, { "key": "brakeSpeedValue", "name": "制动踏板状态-整车(%)", "type": "1" }], "key": "ZC", "name": "整车数据", "type": "0" }, { "child": [{ "key": "driving_motor_data", "name": "电机信息", "type": "1" }], "key": "DJ", "name": "驱动电机数据", "type": "0" }, { "child": [{ "key": "engine_status", "name": "发动机状态(RTM2.5)", "type": "1" }, { "key": "crankshaft_speed", "name": "曲轴转速(RPM)", "type": "1" }, { "key": "fuel_consumption", "name": "燃料消耗率(%)", "type": "1" }], "key": "FDJ", "name": "发动机数据", "type": "0" }, { "child": [{ "key": "loc", "name": "定位状态", "type": "1" }, { "key": "original_longitude", "name": "经度", "type": "1" }, { "key": "original_latitude", "name": "纬度", "type": "1" }], "key": "WZ", "name": "车辆位置数据", "type": "0" }, { "child": [{ "key": "pbsnwmax_voltage", "name": "最高电压电池子系统号", "type": "1" }, { "key": "onocwmax_voltage", "name": "最高电压电池单体代号", "type": "1" }, { "key": "max_vofcells", "name": "电池单体电压最高值(V)", "type": "1" }, { "key": "pbsnwmin_voltage", "name": "最低电压电池子系统号", "type": "1" }, { "key": "onocwmin_voltage", "name": "最低电压电池单体代号", "type": "1" }, { "key": "min_vofcells", "name": "电池单体电压最低值(V)", "type": "1" }, { "key": "pbsnwmax_temperature", "name": "最高温度子系统号", "type": "1" }, { "key": "onocwmax_temperature", "name": "最高温度探针单体代号", "type": "1" }, { "key": "max_temperaturea", "type": "1" }, { "key": "pbsnwmin_temperature", "name": "最低温度子系统号", "type": "1" }, { "key": "onocwmin_temperature", "name": "最低温度探针单体代号", "type": "1" }, { "key": "min_temperature", "name": "最低温度值(℃)", "type": "1" }, { "key": "max_temperature", "name": "最高温度值(℃)", "type": "1" }], "key": "JZ", "name": "极值数据", "type": "0" }, { "child": [{ "key": "pbpv_data", "name": "电池包电压数据", "type": "1" }], "key": "DCDY", "name": "单体蓄电池电压数据", "type": "0" }, { "child": [{ "key": "pbpt_data", "name": "电池包温度数据", "type": "1" }], "key": "WD", "name": "动力蓄电池包温度数据", "type": "0" }, { "child": [{ "key": "driving_range", "name": "续航剩余里程(KM)", "type": "1" }], "key": "ZDY", "name": "用户自定义数据", "type": "0" }], "key": "BQI", "name": "BQI", "type": "0" }], "key": "LSSJ", "name": "历史数据", "type": "0" }
            }
        },
        filterShow() {
            this.getFilterData()
            this.dialog.filter.show = true
        },
        signalUpdate() {
            // 提交已选中的信号，更新table数据
            // ajax data:{signalList: 'this.dialog.filter.checked'}
            // this.getTableData(data)
            console.log(this.dialog.filter.checked)
            console.log('查询表格数据')
            this.tableData.loading = true
            this.getTableData()
        },
        search(){
            console.log(`欲提交的数据   车辆型号:${this.searchForm.type}  车辆vin: ${this.searchForm.vin}`)
        }
    },
    mounted() {
        // 获取table数据
        this.getTableData()
        // console.log(charts)
    },
    components: {signalGroupDialog}
}

</script>
