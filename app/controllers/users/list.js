import EditCellView from 'minerapp/views/users/edit-cell';

export default Em.ArrayController.extend({
    columns: Em.computed(function(){

        var nameCol = Em.Table.ColumnDefinition.create({
            headerCellName: 'Username',
            contentPath: 'username',
            textAlign: 'text-align-left',
            canAutoResize: true
        });
        var editCol = Em.Table.ColumnDefinition.create({
            headerCellName: '',
            tableCellViewClass: EditCellView,
            textAlign: 'text-align-left',
            contentPath: 'id',
            defaultColumnWidth: 120,
            canAutoResize: false

        });
        return [nameCol,  editCol];
    }),
    rows: Em.computed(function(){
        return this.get('model.content');
    }).property('model.content')
});