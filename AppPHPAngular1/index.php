<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<!doctype html>
<html ng-app="todoApp">
  <head>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.4/angular.min.js"></script>
    <script src="js/todo.js"></script>
    <link rel="stylesheet" href="todo.css">
  </head>
  <body>
    <h2>Todo</h2>
    <div ng-controller="TodoListController as todoList">
      <span>
          {{todoList.remaining()}} of {{todoList.todos.length}} remaining
      </span>
      [ <a href="" ng-click="todoList.archive()">archive</a> ]
      <ul class="unstyled">
        <li ng-repeat="todo in todoList.todos">
          <label class="checkbox">
            <input type="checkbox" ng-model="todo.done">
            <span class="done-{{todo.done}}">{{todo.text}}</span>
          </label>
        </li>
      </ul>
      <form ng-submit="todoList.addTodo()">
        <input type="text" ng-model="todoList.todoText"  size="30"
               placeholder="add new todo here">
        <input class="btn-primary" type="submit" value="add">
      </form>
        <select
            ng-model="selectedDestino"
            class="selectDestino require-error borde-select texto-blanco"
            data-live-search="true"
            title="Destino, Cuidad, Localidad..."
            ng-change="destino()"
            ng-click="destinoSeleccionado"
            required="required">
            <optgroup label="Destino">
                <option 
                    value="todos" 
                    selected>
                  Seleccione un destino
                </option>
                <option 
                    ng-repeat="destino in todoList.destinos"
                    value="{{destino.idDestino+'-destino'}}">
                    {{ destino.ciudad }}
                </option>
            </optgroup>
        </select>
      <select
                ng-model="selectedHotel"
                class="selectHotel require-error borde-select"
                data-live-search="true"
                title="Nombre del Hotel"
                ng-change="hotel()"
                ng-click="hotelSeleccionado"
                required="required">
                <optgroup label="Hotel">
                    <option selected>
                      Seleccione un Hotel
                    </option>
                    <option
                        ng-repeat="hotel in todoList.hoteles"
                        value="{{hotel.idHotel+'-hotel'}}">
                        {{ hotel.nombre }}
                    </option>
                </optgroup>
                <optgroup label="Hoteles">
                    <option
                      value="todos">
                      Mostrar Todos los Hoteles
                    </option>
                </optgroup>
            </select>
    </div>
        <span>Selected: {{ selectedDestino | json }}</span>
  </body>
</html>