import DeviceMixin from 'minerapp/mixins/device-mixin';

export default Em.Controller.extend(DeviceMixin, {
    speedMetric: function(){
        var sm = localStorage.getItem('dashboard_speedMetric'),
            metric = (sm === null) ? 'MH' : sm;
        this.set('chosenSpeedMetric', metric);
        return metric;
    }.property('chosenSpeedMetric'),
    chosenSpeedMetric: 'MH',
    showInactiveMiners: true,
    speedIsGh: function(){
        return this.get('speedMetric') === 'GH';
    }.property('speedMetric'),
    dateRangeChanged: function(){
        this.send('updateModel', {startDate: this.get('startDate'), endDate: this.get('endDate')});
    }.observes('dateRange'),
    dateRange: function(){
        return moment(this.get('startDate')).format('MM/DD/YYYY hh:mm a') + ' - ' + moment(this.get('endDate')).format('MM/DD/YYYY hh:mm a');
    }.property('startDate', 'endDate'),
    summaryTrend: function(){
        return this.convertSummaryTrend(this.get('model.summaryTrend.content'), this.get('speedMetric'));
    }.property('speedMetric', 'model.summaryTrend.content'),
    summaryTrendAvailable: function(){
        return (this.get('model.summaryTrend.content') && (this.get('model.summaryTrend.content').length > 0));
    }.property('model.summaryTrend.[]'),
    minerTrendAvailable: function(){
        return (this.get('model.minerTrend.content') && (this.get('model.minerTrend.content').length > 0));
    }.property('model.minerTrend.[]'),
    summary: function(){
        switch(this.get('speedMetric')){
            case 'GH':
                return this.summaryToGH(this.get('model.summary'));
            default:
                return this.summaryToMH(this.get('model.summary'));
        }
    }.property('speedMetric', 'model.summary'),
    summaryToMH: function(model){
        var MHModel = Em.Object.create({
            speedMetric: 'MH',
            avg: model.get('MHS av'),
            total: model.get('Total MH'),
            elapsed: model.get('Elapsed')
        });
        return MHModel;
    },
    summaryToGH: function(model){
        var GHModel = Em.Object.create({
            avg: model.get('MHS av') / 1000,
            total: model.get('Total MH') / 1000,
            speedMetric: 'GH',
            elapsed: model.get('Elapsed')
        });
        return GHModel;
    },
    allMiners: function(){
        return this.get('model.miners.content');
    }.property('model.miners.[]', 'speedMetric'),

    minerTrend: function(){
        return this.convertMinerTrend(this.get('model.minerTrend.content'), this.get('speedMetric'));
    }.property('speedMetric', 'model.minerTrend.[]'),
    convertSummaryTrend: function(model, metric){
        var arr = Em.A([]);
        $.each(model, function(idx, itm){
            var val = itm.get('value')['MHS 5s'];

            if(metric === 'GH'){
                val = val / 1000;
            }
            arr.addObject({
                collected: itm.get('collected'),
                value: val
            });
        });
        return arr;
    },
    convertMinerTrend: function(model, metric){
        var arr = Em.A([]);
        $.each(model, function(idx, itm){
            var val = itm.get('value')['MHS 5s'];

            if(metric === 'GH'){
                val = val / 1000;
            }
            arr.addObject({
                id: itm.get('id'),
                collected: itm.get('collected'),
                deviceName: itm.get('deviceName'),
                value: val
            });
        });
        return arr;
    },
    ranges: [
        {
            text: 'Last Hour',
            start: moment().subtract('hours', 1),
            end: moment()
        },
        {
            text: 'Last 12 Hours',
            start: moment().subtract('hours', 12),
            end: moment()
        },
        {
            text: 'Last 24 Hours',
            start: moment().subtract('hours', 24),
            end: moment()
        },
        {
            text: 'Last 7 Days',
            start: moment().subtract('days', 7),
            end: moment()
        }
    ],
    minerChartInterval: 0.1,
    actions: {
        changeSpeedMetric: function(metric){
            localStorage.setItem('dashboard_speedMetric', metric);
            this.set('chosenSpeedMetric', metric);
        },
        refreshDashboard: function(){
            this.send('updateModel', {startDate: this.get('startDate'), endDate: this.get('endDate')});
        }
    }
});