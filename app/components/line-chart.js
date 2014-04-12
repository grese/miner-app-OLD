
var LineGraphBaseConfig = Em.Object.extend({
    title: { text: null },
    chart: {
        marginTop: 10,
        marginLeft: 60,
        marginBottom: 30,
        marginRight: 10,
        spacingTop: 10,
        spacingLeft: 0,
        spacingBottom: 30,
        spacingRight: 10,
        height: 200
    },
    legend: {enabled: false},
    credits: { enabled: false },
    xAxis: {
        type: 'datetime',
        title: {text: null},
        format: '%H:%M',
        lineColor: 'transparent',
        gridLineWidth: 0,
        gridLineColor: '#fff',
        tickLength: 0
    },
    yAxis: {
        title: {
            text: 'Speed (MH)',
            style: {
                fontFamily: "Helvetica",
                fontWeight: 100,
                color: '#777'
            }
        },
        labels: {
            style: {
                color: '#999'
            }
        },
        showFirstLabel: false,
        lineWidth: 0,
        gridLineWidth: 0
    },
    plotOptions: {
        line: {
            marker: {
                radius: 4,
                symbol: 'circle'
            }
        }
    }
});


export default Em.Component.extend({
    tagName: 'div',
    init: function(){
        this._super();
        this.set('baseConfig', LineGraphBaseConfig.create());
    },
    modelChanged: function(){
        this.get('chart').highcharts().series[0].remove();
        this.get('chart').highcharts().addSeries({
            data: this.prepareChartData(),
            color: this.get('chartColor')
        });
    }.observes('model.content'),
    classNames: ['line-graph-component'],
    chartSelector: function(){
        return '#'+this.get('elementId')+' .line-chart';
    }.property('elementId'),
    prepareChartData: function(){
        var ctr = 0,
            self = this,
            model = this.get('model.content');
        return model.map(function(item){
            var date = moment(item.get('date')),
                dateExists = false;
            if(ctr > 0){
                var dateStr = moment(item.get('date')).format(self.get('format')),
                    prevDateStr = moment(model[ctr - 1].get('date')).format(self.get('format'));
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
                return [Date.UTC(y,m,d,h,mm,s,ss), parseFloat(item.get('value'))];
            }
        });
    },
    yAxisInterval: null,
    didInsertElement: function(){
        var self = this;
        self.set('baseConfig.chart.renderTo', self.get('chartSelector'));
        self.set('baseConfig.plotOptions.line.marker.lineColor', self.get('chartColor'));
        var chartParams = {
            title: self.get('baseConfig.title'),
            chart: self.get('baseConfig.chart'),
            credits: self.get('baseConfig.credits'),
            xAxis: self.get('baseConfig.xAxis'),
            yAxis: self.get('baseConfig.yAxis'),
            series: [{
                data: self.prepareChartData(),
                color: self.get('chartColor')
            }],
            legend: self.get('baseConfig.legend'),
            plotOptions: self.get('baseConfig.plotOptions')
        };
        if(this.get('yAxisInterval') != null){ chartParams.set('yAxis.tickInterval', this.get('yAxisTickInterval')); }
        var chart = $(this.get('chartSelector')).highcharts(chartParams);
        this.set('chart', chart);
    },
    chartColor: function(){
        return this.get('colors.'+this.get('colorKey'));
    }.property('colorKey'),
    colorKey: null,
    colors: {
        SUMMARY: '#ed6639',
        MINER: '#009999'
    }
});