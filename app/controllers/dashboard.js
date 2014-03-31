export default Em.Controller.extend({
    speedMetric: 'MH',
    speedIsGh: function(){
        return this.get('speedMetric') === 'GH';
    }.property('speedMetric'),
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