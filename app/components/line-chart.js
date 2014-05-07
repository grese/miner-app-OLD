import ChartDataFormatMixin from 'minerapp/mixins/chart-data-format';

var LineGraphBaseConfig = Em.Object.extend({
    title: { text: null },
    colors: ['#D97F89', '#04668E', '#059AC4', '#F2642C', '#A44025'],
    chart: {
        marginTop: 20,
        marginLeft: 60,
        marginBottom: 30,
        marginRight: 10,
        spacingTop: 0,
        spacingLeft: 0,
        spacingBottom: 30,
        spacingRight: 10,
        height: 220
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
    },
    tooltip: {
        useHTML: true,
        backgroundColor: 'rgba(128,128,128, 0.85)',
        borderColor: '#888',
        borderRadius: 1,
        crosshairs: true,
        positioner: function(w, h, p){
            return {x: p.plotX, y: 0};
        }
    }
});


export default Em.Component.extend(ChartDataFormatMixin, {
    tagName: 'div',
    init: function(){
        this._super();
        this.set('baseConfig', LineGraphBaseConfig.create());
    },
    modelChanged: function(){

        Em.Logger.debug(this.get('chart').highcharts().series.length);

        while(this.get('chart').highcharts().series.length > 0)
            this.get('chart').highcharts().series[0].remove(true);

        if(this.get('key') === 'MINER'){
            var miners = this.prepareChartData();
            for(var m in miners){
                var id = m.replace('miner-', '');
                this.get('chart').highcharts().addSeries({
                    name: 'Miner '+id,
                    data: miners[m]
                });
            }
        }else{
            this.get('chart').highcharts().addSeries({
                data: this.prepareChartData(),
                color: this.get('chartColor')
            });
        }

    }.observes('model.content'),
    classNames: ['line-graph-component'],
    chartSelector: function(){
        return '#'+this.get('elementId')+' .line-chart';
    }.property('elementId'),
    prepareChartData: function(){
        if(this.get('key') === 'MINER'){
            return this.formatLineChartMinerMultiSeries();
        }else{
            return this.formatLineChartSingleSeries();
        }
    },
    yAxisInterval: null,

    didInsertElement: function(){
        var self = this;
        self.set('baseConfig.chart.renderTo', self.get('chartSelector'));
        self.set('baseConfig.plotOptions.line.marker.lineColor', self.get('chartColor'));
        var chartParams = {
            colors: self.get('baseConfig.colors'),
            title: self.get('baseConfig.title'),
            chart: self.get('baseConfig.chart'),
            tooltip: self.get('baseConfig.tooltip'),
            credits: self.get('baseConfig.credits'),
            xAxis: self.get('baseConfig.xAxis'),
            yAxis: self.get('baseConfig.yAxis'),
            legend: self.get('baseConfig.legend'),
            plotOptions: self.get('baseConfig.plotOptions')
        };

        if(this.get('key') === 'MINER'){
            var miners = this.prepareChartData();
            chartParams.series = [];
            for(var m in miners){
                var id = m.replace('miner-', '');
                chartParams.series.push({
                    name: 'Miner '+id,
                    data: miners[m]
                });
            }
        }else{
            chartParams.series = [{
                color: this.get('chartColor'),
                data: this.prepareChartData()
            }];
        }

        if(this.get('yAxisInterval') != null){ chartParams.set('yAxis.tickInterval', this.get('yAxisTickInterval')); }
        var chart = $(this.get('chartSelector')).highcharts(chartParams);
        this.set('chart', chart);

    },
    chartColor: function(){
        return this.get('colors.'+this.get('key'));
    }.property('key'),
    key: null,
    colors: {
        SUMMARY: '#ed6639',
        MINER: '#009999'
    }
});