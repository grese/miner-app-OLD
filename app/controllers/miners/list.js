export default Em.ArrayController.extend({
    columns: Em.computed(function(){
        var nameCol = Em.Table.ColumnDefinition.create({
            headerCellName: 'Name',
            defaultColumnWidth: 100,
            getCellContent: function(row){
                return row.get('Name')+' '+row.get('id');
            }
        });
        var driverCol = Em.Table.ColumnDefinition.create({
            headerCellName: 'Driver',
            contentPath: 'Driver',
            defaultColumnWidth: 100
        });
        var enabledCol = Em.Table.ColumnDefinition.create({
            headerCellName: 'Enabled',
            getCellContent: function(row){
                return row.get('Enabled') === 'Y';
            },
            defaultColumnWidth: 75
        });
        var statusCol = Em.Table.ColumnDefinition.create({
            headerCellName: 'Status',
            contentPath: 'Status',
            defaultColumnWidth: 75
        });
        var PGACol = Em.Table.ColumnDefinition.create({
            headerCellName: 'PGA',
            contentPath: 'PGA',
            defaultColumnWidth: 50
        });
        var accCol = Em.Table.ColumnDefinition.create({
            headerCellName: 'Accepted',
            contentPath: 'Accepted'
        });
        var errCol = Em.Table.ColumnDefinition.create({
            headerCellName: 'Errors',
            contentPath: 'Hardware Errors',
            defaultColumnWidth: 100
        });
        var avgMhsCol = Em.Table.ColumnDefinition.create({
            headerCellName: 'Avg. Mh/s',
            contentPath: 'MHS av'
        });

        var totalMhsCol = Em.Table.ColumnDefinition.create({
            headerCellName: 'Total Mh',
            contentPath: 'Total MH'
        });
        return [nameCol, driverCol, enabledCol, statusCol, PGACol, accCol, errCol, avgMhsCol, totalMhsCol];
    }),
    rows: Em.computed(function(){
        return this.filterRows(this.get('model.content'));
    }).property('model.content.@each'),
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