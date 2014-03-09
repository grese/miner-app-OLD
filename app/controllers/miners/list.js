export default Em.ArrayController.extend({
    columns: Em.computed(function(){
        var idCol = Em.Table.ColumnDefinition.create({
            headerCellName: 'ID',
            contentPath: 'id',
            defaultColumnWidth: 10,
            textAlign: 'text-align-center'
        });
        var nameCol = Em.Table.ColumnDefinition.create({
            headerCellName: 'Name',
            contentPath: 'name'
        });
        var descrCol = Em.Table.ColumnDefinition.create({
            headerCellName: 'Description',
            contentPath: 'description'
        });
        var expSpeedCol = Em.Table.ColumnDefinition.create({
            headerCellName: 'Expected Speed (MH/s)',
            contentPath: 'expectedSpeed'
        });
        return [idCol, nameCol, descrCol, expSpeedCol];
    }),
    rows: Em.computed(function(){
        return this.get('model.content');
    }).property('model.content.@each')
});