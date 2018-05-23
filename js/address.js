new Vue({
    el: '.container',
    data: {
        addressList: [],
        limitNum: 3,
        currentIndex: 0,
        shippingMethod: 1,
    },
    mounted: function() {
        this.$nextTick(function() {
            this.getAddressList()
        })
    },
    computed: {
        filterAddress: function() {
            return this.addressList.slice(0, this.limitNum);
        }
    },
    methods: {
        getAddressList: function() {
            this.$http.get('data/address.json').then(response => {
                let res = response.data;
                if (res.status == 0) {
                    this.addressList = res.result;
                }
            })
        },
        loadMore: function() {
            this.limitNum = this.addressList.length;
        },
        setDefault: function(addressId) {
            this.addressList.forEach(function(item, index) {
                if (item.addressId == addressId) {
                    item.isDefault = true;
                } else {
                    item.isDefault = false;
                }
            })
        }
    }
})