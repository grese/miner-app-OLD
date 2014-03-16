import { test , moduleForComponent } from 'minerapp/tests/helpers/module-for';

moduleForComponent('template-less');

test("template", function(){
  var component = this.subject();
  ok(this.$());
});
