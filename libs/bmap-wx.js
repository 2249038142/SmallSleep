
class BMapWX {

    /**
     * 百度地图微信小程序API类
     * @constructor
     */
    constructor(param) {
        this.ak = param["ak"];
    }

    /**
     * 使用微信接口进行定位
     *
     * @param {string} type 坐标类型
     * @param {Function} success 成功执行
     * @param {Function} fail 失败执行
     * @param {Function} complete 完成后执行
     */
    getWXLocation(type, success, fail, complete) {
        type = type || 'gcj02',
        success = success || function () {};
        fail = fail || function () {};
        complete = complete || function () {};
        wx.getLocation({
            type: type,
            success: success,
            fail: fail,
            complete:complete
        });
    }
    /**
     * 天气检索
     * @param {Object} param 检索配置
     */
    weather(param) {
        var that = this;
        param = param || {};
        let weatherparam = {
            coord_type: param["coord_type"] || 'gcj02',
            output: param["output"] || 'json',
            ak: that.ak,
            sn: param["sn"] || '',
            timestamp: param["timestamp"] || ''
        };
        let otherparam = {
            success: param["success"] || function () {},
            fail: param["fail"] || function () {}
        };
        let type = 'gcj02';
        let locationsuccess = function (result) {
            weatherparam["location"] = result["longitude"] + ',' + result["latitude"];
            wx.request({
                url: 'https://api.map.baidu.com/telematics/v3/weather',
                data: weatherparam,
                header: {
                    "content-type": "application/json"
                },
                method: 'GET',
                success(data) {
                    let res = data["data"];
                    if (res["error"] === 0 && res["status"] === 'success') {
                        let weatherArr = res["results"];
                        // outputRes 包含两个对象，
                        // originalData为百度接口返回的原始数据
                        // wxMarkerData为小程序规范的marker格式
                        let outputRes = {};
                        outputRes["originalData"] = res;
                        outputRes["currentWeather"] = [];    
                        outputRes["currentWeather"][0] = {
                            currentCity: weatherArr[0]["currentCity"],
                            pm25: weatherArr[0]["pm25"],
                            date: weatherArr[0]["weather_data"][0]["date"],
                            temperature: weatherArr[0]["weather_data"][0]["temperature"],
                            weatherDesc: weatherArr[0]["weather_data"][0]["weather"],
                            wind: weatherArr[0]["weather_data"][0]["wind"]
                        };
                        otherparam.success(outputRes);
                    } else {
                        otherparam.fail({
                            errMsg: res["message"],
                            statusCode: res["status"]
                        });
                    }
                },
                fail(data) {
                    otherparam.fail(data);
                }
            });
        }
        let locationfail = function (result) {
            otherparam.fail(result);
        }
        let locationcomplete = function (result) {
        }
        if (!param["location"]) {
            that.getWXLocation(type, locationsuccess, locationfail, locationcomplete);
        } else {
            let longitude = param.location.split(',')[0];
            let latitude = param.location.split(',')[1];
            let errMsg = 'input location';
            let res = {
                errMsg: errMsg,
                latitude: latitude,
                longitude: longitude
            };
            locationsuccess(res);
        }
    }
}

module.exports.BMapWX = BMapWX;