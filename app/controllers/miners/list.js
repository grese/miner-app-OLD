export default Em.ArrayController.extend({
    columns: Em.computed(function(){
        var idCol = Em.Table.ColumnDefinition.create({
            headerCellName: 'ID',
            contentPath: 'id',
            defaultColumnWidth: 180,
            textAlign: 'text-align-center',
            canAutoResize: false
        });
        var nameCol = Em.Table.ColumnDefinition.create({
            headerCellName: 'Name',
            contentPath: 'name',
            canAutoResize: true
        });
        var descrCol = Em.Table.ColumnDefinition.create({
            headerCellName: 'Description',
            contentPath: 'description',
            canAutoResize: true
        });
        var expSpeedCol = Em.Table.ColumnDefinition.create({
            headerCellName: 'Expected Speed (MH/s)',
            contentPath: 'expectedSpeed',
            defaultColumnWidth: 20,
            canAutoResize: true
        });
        return [idCol, nameCol, descrCol, expSpeedCol];
    }),
    rows: Em.computed(function(){
        return this.get('model.content');
    }).property('model.content.@each')
});