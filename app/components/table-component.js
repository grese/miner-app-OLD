export default Em.Component.extend({
    parsedColumns: function(){
        return Em.A(this.get('columns').map(function(col){
            return DefaultColumnConfig.create(col);
        }));
    }.property('columns')
});


var DefaultColumnConfig = Em.Object.extend({
    getCellContent: null,
    contentPath: null,
    headerCellText: '',
    getFooterCellContent: false
});

Ember.Handlebars.helper('tableComponentCell', function(row, column){
    var getCellContent = column.get('getCellContent') ? column.get('getCellContent') : null,
        cellContent = '';
    if(!getCellContent && !column.get('contentPath')){
        Em.Logger.warn("<WARNING>: All column definitions require either the \'contentPath\' property or \'getCellContent\' function to be defined.");
    }
    if(getCellContent){
        cellContent = getCellContent(row);
    }else{
        cellContent = row.get(column.get('contentPath'));
    }
    return new Em.Handlebars.SafeString(cellContent);
});

Ember.Handlebars.helper('tableComponentFooterCell', function(rows, column){
    var getFooterCellContent = column.get('getFooterCellContent') ? column.get('getFooterCellContent') : null;
    return getFooterCellContent ? getFooterCellContent(rows) : '';
});