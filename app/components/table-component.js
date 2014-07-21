
var DefaultColumnConfig = Em.Object.extend({
    getCellContent: null,
    contentPath: null,
    headerCellText: '',
    getFooterCellContent: false
});

Ember.Handlebars.helper('tableComponentCell', function(row, column){
    var getCellContent = column.get('getCellContent') ? column.get('getCellContent') : null;
    if(!getCellContent && !column.get('contentPath')){
        Em.Logger.debug("<ERROR>: All column definitions require either the \'contentPath\' property or \'getCellContent\' function to be defined.");
    }
    if(getCellContent){
        return getCellContent(row);
    }else{
        return new Em.Handlebars.SafeString(row.get(column.get('contentPath')));
    }
});

Ember.Handlebars.helper('tableComponentFooterCell', function(rows, column){
    var getFooterCellContent = column.get('getFooterCellContent') ? column.get('getFooterCellContent') : null;
    return getFooterCellContent ? getFooterCellContent(rows) : '';
});

export default Em.Component.extend({
    parsedColumns: function(){
        return Em.A(this.get('columns').map(function(col){
            return DefaultColumnConfig.create(col);
        }));
    }.property('columns')
});