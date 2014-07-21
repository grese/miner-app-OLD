export default Em.ArrayController.extend({
    columns: Em.computed(function(){
        var idCol = Em.Object.create({
            headerCellText: 'ID',
            contentPath: 'ID',
            columnWidth: 60,
            getFooterCellContent: function(rows){
                return rows.length;
            }
        });
        var nameCol = Em.Object.create({
            headerCellText: 'Name',
            getCellContent: function(row){
                return row.get('Name')+' '+row.get('ID');
            }
        });
        var enabledCol = Em.Object.create({
            headerCellText: 'Enabled',
            getCellContent: function(row){
                return (row.get('Enabled') === 'Y') ? 'Yes' : 'No';
            }
        });
        var statusCol = Em.Object.create({
            headerCellText: 'Status',
            contentPath: 'Status'
        });
        var tempCol = Em.Object.create({
            headerCellText: 'Temp.',
            getCellContent: function(row){
                return new Em.Handlebars.SafeString(row.get('Temperature')+'&deg;');
            }
        });
        var deviceElapsed = Em.Object.create({
            headerCellText: 'Elapsed',
            getCellContent: function(row){
                return moment.duration(row.get('Device Elapsed'), 'seconds').humanize();
            }
        });

        var accCol = Em.Object.create({
            headerCellText: 'Accepted',
            contentPath: 'Accepted',
            getFooterCellContent: function(rows){
                var total = 0;
                $.each(rows, function(idx, row){
                    total += row.get('Accepted');
                });
                return total;
            }
        });

        var rejCol = Em.Object.create({
            headerCellText: 'Rejected',
            getCellContent: function(row){
                return row.get('Rejected')+' ('+parseFloat(row.get('Device Rejected%')).toFixed(2)+'%)';
            },
            getFooterCellContent: function(rows){
                var total = 0,
                    totalRate = 0;
                $.each(rows, function(idx, row){
                    total += row.get('Rejected');
                    totalRate += row.get('Device Rejected%');
                });
                return total + ' ('+parseFloat(totalRate).toFixed(2)+'%)';
            }
        });

        var errCol = Em.Object.create({
            headerCellText: 'Errors',
            contentPath: 'Hardware Errors',
            getCellContent: function(row){
                return row.get('Hardware Errors') + ' ('+parseFloat(row.get('Device Hardware%')).toFixed(2)+'%)';
            },
            getFooterCellContent: function(rows){
                var total = 0,
                    totalRate = 0;
                $.each(rows, function(idx, row){
                    total += row.get('Hardware Errors');
                    totalRate += row.get('Device Hardware%');
                });
                return total + ' ('+parseFloat(totalRate).toFixed(2)+'%)';
            }
        });

        var mh5sCol = Em.Object.create({
            headerCellText: 'Mh/s (5sec)',
            contentPath: 'MHS 5s'
        });

        var avgMhsCol = Em.Object.create({
            headerCellText: 'Avg. Mh/s',
            contentPath: 'MHS av',
            getFooterCellContent: function(rows){
                var total = 0;
                $.each(rows, function(idx, row){
                    total += row.get('MHS av');
                });
                return total;
            }
        });

        var utilityCol = Em.Object.create({
            headerCellText: 'Utility',
            contentPath: 'Utility',
            getFooterCellContent: function(rows){
                var total = 0;
                $.each(rows, function(idx, row){
                    total += row.get('Utility');
                });
                return total;
            }
        });
        var totalMhsCol = Em.Object.create({
            headerCellText: 'Total MH',
            getCellContent: function(row){
                return $.number(row.get('Total MH'), 4);
            },
            getFooterCellContent: function(rows){
                var total = 0;
                $.each(rows, function(idx, row){
                    total += row.get('Total MH');
                });
                return $.number(total, 4);
            }
        });
        var lastShareCol = Em.Object.create({
            headerCellText: 'Last Share',
            getCellContent: function(row){
                return moment.unix(row.get('Last Share Time')).format('MM-DD-YYYY hh:mm:ss');
            }
        });
        return [idCol, nameCol, enabledCol, statusCol, tempCol, deviceElapsed, accCol,
            rejCol, errCol, mh5sCol, avgMhsCol, utilityCol, totalMhsCol, lastShareCol];
    }),
    rows: Em.computed(function(){
        Em.Logger.debug('THE CONTENT: ', this.get('model'));
        return this.get('model.content');
    }).property('model.@each'),
    filterRows: function(rows){
        var self = this,
            filteredRows = [];
        $.each(rows, function(idx, itm){
            if(self.filterTypes.DISABLED.filterEnabled && itm.get('Enabled') !== 'Y'){ return true; }
            filteredRows.push(itm);
        });
        return filteredRows;
    },

    filterTypes: {
        DISABLED: {
            filterEnabled: true,
            btnSelector: '#show-disabled-miners'
        }
    },
    actions: {
        toggleFilter: function(type){
            var btn = $(this.filterTypes[type].btnSelector);
            if(this.filterTypes[type].filterEnabled || btn.hasClass('filter-enabled')){
                this.filterTypes[type].filterEnabled = false;
                btn.removeClass('filter-enabled');
            }else{
                this.filterTypes[type].filterEnabled = true;
                if(!btn.hasClass('filter-enabled')){ btn.addClass('filter-enabled'); }
            }
            this.transitionTo('/dashboard');
        }
    }
});