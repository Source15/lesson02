'use strict'

class First {

   hello() {
      console.log("Привет я метод родителя!");

   }

};

class Second extends First {

   hello() {
      First1.hello();

      console.log("А я наследуемый метод!");

   }

};

const First1 = new First();
const Second1 = new Second();

Second1.hello()