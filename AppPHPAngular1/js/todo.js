/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
//var destinosjs = <?php echo json_encode($arr_destinos);?>;
//var hotelesjs = <?php echo json_encode($arr_hoteles);?>;
//var hotelesViejojs = <?php echo json_encode($arr_hoteles);?>;
var destinosjs = [
    {
        idDestino:1, 
        ciudad:"Varadero"
    },
    {
        idDestino:2, 
        ciudad:"Habana"
    }
];

var hotelesjs = [
    {
    idHotel:1, 
    idDestino:1, 
    nombre:'Hotel Varadero 1',
    categoria:'hotel'
    },
    {
    idHotel:2, 
    idDestino:1, 
    nombre:'Hotel Varadero 2',
    categoria:'hotel'
    },
    {
    idHotel:3, 
    idDestino:1, 
    nombre:'Hotel Varadero 3',
    categoria:'hotel'
    },
    {
    idHotel:4, 
    idDestino:2, 
    nombre:'Hotel Habana 1',
    categoria:'hotel'
    },
    {
    idHotel:5, 
    idDestino:2, 
    nombre:'Hotel Habana 2',
    categoria:'hotel'
    },
    {
    idHotel:6, 
    idDestino:2, 
    nombre:'Hotel Habana 3',
    categoria:'hotel'
    },
];


angular.module('todoApp', [])
  .controller('TodoListController', function() {
    var todoList = this;
    todoList.hotelesviejo = hotelesjs;
    todoList.hoteles = hotelesjs;
    todoList.destinos = destinosjs;
    todoList.selectedDestino = "Seleccione un destino";
    todoList.selectedHotel = "Seleccione un hotel";
    todoList.todos = [
      {text:'learn AngularJS', done:true},
      {text:'build an AngularJS app', done:false}];
    todoList.destino = function(){
        var idDestino;
        var arr = todoList.selectedDestino.split("-");
        var idDestino = arr[0];
        var nuevos_hoteles = [];
        for (i = 0; i < todoList.hotelesViejo.length; i++) {
          if(idDestino == todoList.hotelesViejo[i].idDestino){
              nuevos_hoteles.push(todoList.hotelesViejo[i]);
          }
        }
        todoList.hoteles = nuevos_hoteles;
    },  
    todoList.addTodo = function() {
      todoList.todos.push({text:todoList.todoText, done:false});
      todoList.todoText = '';
    };
 
    todoList.remaining = function() {
      var count = 0;
      angular.forEach(todoList.todos, function(todo) {
        count += todo.done ? 0 : 1;
      });
      return count;
    };
 
    todoList.archive = function() {
      var oldTodos = todoList.todos;
      todoList.todos = [];
      angular.forEach(oldTodos, function(todo) {
        if (!todo.done) todoList.todos.push(todo);
      });
    };
  });


