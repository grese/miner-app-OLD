/*
// The startDate & endDate properties of this component are the actual start/end dates.

This component is built on a fork of the bootstrap-datetimepicker.
 http://eonasdan.github.io/bootstrap-datetimepicker/
 */

export default Em.Component.extend({
    classNames: ['drp'],
    format: 'MM/DD/YYYY hh:mm A',
    startPicker: null,
    endPicker: null,
    startDate: null,
    endDate: null,
    opens: 'left',
    defaultStartDate: moment().subtract('hours', 1),
    defaultEndDate: moment(),
    dateRange: null,
    dateRangeDidChange: function(){
        var dates = this.get('dateRange').split(' - ');
        this.setProperties({
            startDate: moment(dates[0], this.get('format')),
            endDate: moment(dates[1], this.get('format'))
        });
    }.observes('dateRange'),
    datepickerInput: function(){
        return $('#'+this.get('elementId')+' input.drp-input');
    }.property(),
    didInsertElement: function(){
        var self = this;
        var picker =  $('#'+this.get('elementId')+' input.dtrp-input').datetimerangepicker(
            {
                format: self.get('format'),
                renderTo: '#'+self.get('elementId'),
                maxDate: moment(),
                minDate: moment().subtract('days', 30),
                direction: self.get('opens'),
                defaultStartDate: self.get('defaultStartDate'),
                ranges: self.get('ranges'),
                icons: self.get('icons')
            }
        );
        self.set('picker', picker);
    },
    icons: {
        time: "fa fa-clock-o",
        date: "fa fa-calendar",
        up: "fa fa-arrow-up",
        down: "fa fa-arrow-down"
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
    ]
});