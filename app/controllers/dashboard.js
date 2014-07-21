export default Em.Controller.extend({
    speedMetric: 'MH',
    speedIsGh: function(){
        return this.get('speedMetric') === 'GH';
    }.property('speedMetric'),
    dateRangeChanged: function(){
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
    summary: function(){
        switch(this.get('speedMetric')){
            case 'GH':
                return this.convertSummaryToGH(this.get('model.summary'));
            default:
                return this.get('model.summary');
        }
    }.property('speedMetric', 'model.summary'),
    summaryAvgHeading: function(){
        return this.get('speedMetric') === 'GH' ? 'Avg Gh/s' : 'Avg Mh/s';
    }.property('speedMetric', 'model.summary'),
    summaryTotalHeading: function(){
        return this.get('speedMetric') === 'GH' ? 'Total Gh' : 'Total Mh';
    }.property('speedMetric', 'model.summary'),
    convertSummaryToGH: function(model){
        var s = {},
            mhVal = model.get('MHS av'),
            tMHVal = model.get('Total MH');
        mhVal = mhVal / 1000;
        tMHVal = tMHVal / 1000;
        s.getMHsAv = mhVal;
        s.getTotalMH = tMHVal;
        s.Elapsed = model.get('Elapsed');
        return Em.Object.create(s);
    },
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
            var $ghBtn = $('#dashboard-speed-gh'),
                $mhBtn = $('#dashboard-speed-mh');
            if(metric === 'GH'){
                if(!$ghBtn.hasClass('active')){ $ghBtn.addClass('active'); }
                this.set('speedMetric', 'GH');
                $mhBtn.removeClass('active');
            }else{
                if(!$mhBtn.hasClass('active')){ $mhBtn.addClass('active'); }
                this.set('speedMetric', 'MH');
                $ghBtn.removeClass('active');
            }
        },
        refreshDashboard: function(){
            this.send('updateModel', {startDate: this.get('startDate'), endDate: this.get('endDate')});
        }
    }
});