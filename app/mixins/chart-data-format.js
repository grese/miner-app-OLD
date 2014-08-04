export default Em.Mixin.create({
    formatLineChartSingleSeries: function(){
        var ctr = 0,
            self = this,
            model = this.get('model');
        return model.map(function(item){
            var date = moment.unix(item.get('collected')),
                dateExists = false;
            if(ctr > 0){
                var dateStr = date.format(self.get('format')),
                    prevDateStr = moment.unix(model[ctr - 1].get('collected')).format(self.get('format'));
                dateExists = (prevDateStr === dateStr);
            }

            var y = parseInt(date.format('YYYY'), 10),
                m = parseInt(date.format('M'), 10) -1,
                d = parseInt(date.format('D'), 10),
                h = parseInt(date.format('h'), 10),
                mm = parseInt(date.format('m'), 10),
                s = parseInt(date.format('s'), 10),
                ss = parseInt(date.format('SSS'), 10);
            m = m >= 0 ? m : 11;

            ctr++;
            if(!dateExists){
                return [Date.UTC(y,m,d,h,mm,s,ss), parseFloat(item.get('value')['MHS 5s'])];
            }
        });
    },
    formatLineChartMinerMultiSeries: function(){
        var self = this,
            model = this.get('model');
        var miners = {};
        model.map(function(item){
            if(!miners['miner-'+item.get('ID')]){
                miners['miner-'+item.get('ID')] = Em.A([]);
            }

            var date = moment.unix(item.get('collected')),
                y = parseInt(date.format('YYYY'), 10),
                m = parseInt(date.format('M'), 10) -1,
                d = parseInt(date.format('D'), 10),
                h = parseInt(date.format('h'), 10),
                mm = parseInt(date.format('m'), 10),
                s = parseInt(date.format('s'), 10),
                ss = parseInt(date.format('SSS'), 10);
            m = m >= 0 ? m : 11;
            miners['miner-'+item.get('ID')].addObject([Date.UTC(y,m,d,h,mm,s,ss), parseFloat(item.get('value')['MHS 5s'])]);
        });
        return miners;
    }
});