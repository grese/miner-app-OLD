import { test , moduleFor } from 'minerapp/tests/helpers/module-for';

//import Index from 'minerapp/routes/index';

moduleFor('route:index', "Unit - IndexRoute");

test("it exists", function(){
  //ok(this.subject() instanceof Index);
});

test("#model", function(){
  deepEqual(this.subject().model(), ['red', 'yellow', 'blue']);
});
