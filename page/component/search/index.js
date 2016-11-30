var typelist = require('../../../utils/searchtypelist.js');
Page({
    data: {
        tab: 1,
        value: "",
        tabs: {},
        recent:[1,2,3]
    },
    onLoad: function (options) {
        console.log(typelist)
        this.setData({
            tabs: typelist,
            tab: { tab: typelist[0].type, index: 0 },
        })
    },
    inputext: function (e) {
        var name = e.detail.value;
        console.log(name)
        this.setData({ value: name });
    },
    search: function (e) {
        var name = e.detail.value.name;
        console.log(name);
        var index = this.data.tab.index;
        var curtab =typelist[index]
        var that = this;
        this.setData({
            tabs: typelist
        })
        this.httpsearch(name,curtab.offset,this.data.tab.tab, function (res) {
            curtab.relist = res;
            var tl=typelist;
            tl[index]=curtab;
            that.setData({
                tabs:tl
            })
        })
    },
    loadresult:function(e){
        var data=e.currentTarget.dataset;
        var index=data.index,
            type=data.type
    },
    httpsearch: function (name, offset,type, cb) {
        wx.request({
            url: 'https://n.sqaiyan.com/search',
            data: {
                name: name,
                offset: offset,
                limit: 20,
                type:type
            },
            method: 'GET',
            success: function (res) {
               cb && cb(res.data.result)
            }
        })
    },
    tabtype: function (e) {
        this.setData({
            tab:{
                tab:e.currentTarget.dataset.tab,
                index:e.currentTarget.dataset.index
            }
        })
    }
})