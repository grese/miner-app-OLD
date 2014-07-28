export default Em.Controller.extend({
    speedMetric: 'MH',
    showInactiveMiners: true,
    speedIsGh: function(){
        return this.get('speedMetric') === 'GH';
    }.property('speedMetric'),
    dateRangeChanged: function(){
        Em.Logger.debug('RANGE CHANGE!');
        this.send('updateModel', {startDate: this.get('startDate'), endDate: this.get('endDate')});
    }.observes('endDate'),
    dateRange: function(){
        return moment(this.get('startDate')).format('MM/DD/YYYY hh:mm a') + ' - ' + moment(this.get('endDate')).format('MM/DD/YYYY hh:mm a');
    }.property('startDate', 'endDate'),
    summaryTrend: function(){
        switch(this.get('speedMetric')){
            case 'GH':
                return this.convertTrendToGH(this.get('model.summaryTrend.content'));
            default:
                return this.get('model.summaryTrend.content');
        }
    }.property('speedMetric', 'model.summaryTrend.content'),
    summaryTrendAvailable: function(){
        return (this.get('model.summaryTrend.content') && (this.get('model.summaryTrend.content').length > 0));
    }.property('model.summaryTrend.content'),
    minerTrendAvailable: function(){
        return (this.get('model.minerTrend.content') && (this.get('model.minerTrend.content').length > 0));
    }.property('model.minerTrend.content'),
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
    }.property('model.miners', 'speedMetric'),
    activeMiners: function(){
        return Em.A(this.get('model.miners').filterBy('Enabled', 'Y'));
    }.property('speedMetric', 'model.miners'),
    activeMinerIDs: function(){
        return this.get('activeMiners').map(function(item){
            return item.get('ID');
        });
    }.property('model.miners'),
    activeMinersTrend: function(){
        var activeIDs = this.get('activeMinerIDs');
        switch(this.get('speedMetric')){
            case 'GH':
                return this.convertTrendToGH(
                    this.get('model.minerTrend').filter(function(item, idx){
                        if($.inArray(item.get('ID'), activeIDs) > -1){
                            return item;
                        }
                    })
                );
            default:
                return this.get('model.minerTrend').filter(function(item, idx){
                    if($.inArray(item.get('ID'), activeIDs) > -1){
                        return item;
                    }
                });
        }
    }.property('speedMetric', 'model.miners'),
    minerTrend: function(){
        switch(this.get('speedMetric')){
            case 'GH':
                return this.convertTrendToGH(this.get('model.minerTrend.content'));
            default:
                return this.get('model.minerTrend.content');
        }
    }.property('speedMetric', 'model.minerTrend.content'),
    convertTrendToGH: function(model){
        var arr = Em.A([]);
        $.each(model, function(idx, itm){
            var pt = {},
                val = itm.get('value');
            pt.value = val / 1000;
            pt.id = itm.get('id');
            pt.ID = itm.get('ID');
            pt.date = itm.get('date');
            arr.addObject(Em.Object.create(pt));
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
            this.set('speedMetric', metric);
        },
        refreshDashboard: function(){
            this.send('updateModel', {startDate: this.get('startDate'), endDate: this.get('endDate')});
        }
    }
});