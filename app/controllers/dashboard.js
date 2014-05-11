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
        }
    }
});