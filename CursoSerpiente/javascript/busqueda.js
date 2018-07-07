class Busqueda{
    // 0 es vacio
     // 1 jugador
    //2 es comida
    //3 es obstaculos
    //4 son enemigos
    constructor(personaje){
        //guardar el mapa para el conteo de frutas
        this.mapa = personaje.mapa
        this.matriz = personaje.mapa.matriz
        this.tamaniox = personaje.mapa.columnas()
        this.tamanioy = personaje.mapa.filas()
        this.personaje = personaje
        this.listacerrada = []
        this.iniciar = true
    }
     menorpeso(B, adyacentes){
        var fp = 10000;
        var mejor = null;
        // var numbers = [1, 2, 3, 4, 5, 6, 7, 8];
        //     $.each(numbers, function(i, value){
        //         console.log(i+':'+value);
        //     });
        $.each(adyacentes, function(i, temporal){
            //console.log(i+':'+value);
            var F = 0;
            var G1 = 10;
            var G2 = 14;
            var H = this.distancias(temporal, B);
            if (temporal.x < B.x and temporal.y < B.y{
                F = G2 + H;
            }
            else if (temporal.x < B.x){
                F = G1 + H;
            }
            else if (temporal.y < B.y){
                F = G1 + H;
            }
            else if (temporal.x > B.x && temporal.y > B.y){
                F = G2 + H;
            }
            else if (temporal.x > B.x){
                F = G1 + H;
            }
            else if (temporal.y > B.y){
                F = G1 + H;
            }
            else if (temporal.x < B.x && temporal.y > B.y){
                F = G2 + H;
            }
            else if (temporal.x > B.x && temporal.y < B.y){
                F = G2 + H;
            }
            if (F < fp){
                fp = F;
                mejor = temporal;
            }
            });
        return mejor
    }
    addlistacerrada(B){
        this.listacerrada.add(B);
    }
    listacerrada(){
        return this.listacerrada;
    }
    adyacentes(A){
        var i = A.y;
        var j = A.x;
        this.listacerrada.add(A);
        var listaabierta = [];
        if (i - 1 > -1){
            var matx = i - 1;
            var maty = j;
            if (this.matriz[matx][maty] < 3){
                listaabierta = this.agregar_lista(j, i - 1, listaabierta)
            }

            if (j - 1 > -1){
                matx = i - 1;
                maty = j - 1;
                if (this.matriz[matx][maty]) < 3){
                    cx = j - 1;
                    cy = i - 1;
                    listaabierta = this.agregar_lista(cx, cy, listaabierta);
                }
            }
            if (j + 1 < this.tamaniox){
                matx = i - 1;
                maty = int(j + 1);
                if (this.matriz[matx][maty] < 3){
                    cx = j + 1;
                    cy = i - 1;
                    listaabierta = this.agregar_lista(cx, cy, listaabierta);
                }
            }
        }
        if (j - 1 > -1){
            matx = int(i)
            maty = int(j - 1)
            if (this.matriz[matx][maty] < 3){
                listaabierta = this.agregar_lista(j - 1, i, listaabierta)
            }
            if (i + 1 < this.tamanioy){
                matx = i + 1;
                maty = j - 1;
                if (this.matriz[matx][maty] < 3){
                    cx = j - 1;
                    cy = i + 1;
                    listaabierta = this.agregar_lista(cx, cy, listaabierta);
                }
            }
        }
        if (i + 1 < self.tamanioy){
            matx = i + 1;
            maty = j;
            if (this.matriz[matx][maty] < 3){
                listaabierta = self.agregar_lista(j, i + 1, listaabierta);
            }
        }
        if (j + 1 < self.tamaniox && i + 1 < self.tamanioy){
            matx = i + 1;
            maty = j + 1;
            if (self.matriz[matx][maty] < 3){
                listaabierta = self.agregar_lista(j + 1, i + 1, listaabierta);
            }
        }
        if (j + 1 < self.tamaniox){
            matx = int(i)
            maty = int(j + 1)
            if (self.matriz[matx][maty] < 3){
                listaabierta = self.agregar_lista(j + 1, i, listaabierta);
            }
        }
        return listaabierta;
    }
    repetido(punto1){
        // var numbers = [1, 2, 3, 4, 5, 6, 7, 8];
        //     $.each(numbers, function(i, value){
        //         console.log(i+':'+value);
        //     });
        $.each(this.listacerrada, function(i, li){
            if (punto1.x == li.x && punto1.y == li.y){
                return true;  
            }
        });
        return false;
    }
    agregar_lista(self, x, y, listaabierta){
        var punto1 = Punto(x, y);
        if (!this.repetido(punto1)){
            listaabierta.add(punto1);
        }
        return listaabierta;
    }
    cercano(self, A){
        var circulos = [];
        var i = 0;
        for filas in self.matriz:
            j = 0
            for columna in filas:
                if columna == 2:
                    circulos.append(Punto(j, i))
                    //#j es x, i es y
                j += 1
            i += 1
        dp = 1000
        cercano = None
        for temporal in circulos:
            if self.distancias(A, temporal) < dp:
                cercano = temporal
                dp = this.distancias(A, cercano)
        return cercano;
    }
     distancias(self, A, B):
//        double primero=(A.x==B.x)?0:((A.x<B.x)?(B.x-A.x):(A.x-B.x));
//        double segundo=(A.y==B.y)?0:((A.y<B.y)?(B.y-A.y):(A.y-B.y));
        var primero = 0;
        if (A.x == B.x){
            primero = 0;
        }
        elif A.x < B.x:
            primero = B.x - A.x
        elif A.x > B.x:
            primero = A.x - B.x
        segundo = 0
        if A.y == B.y:
            segundo = 0
        elif A.y < B.y:
            segundo = B.y - A.y
        elif A.y > B.y:
            segundo = A.y - B.y
        return primero + segundo

     astar(self, inicial):
        A = inicial
        B = self.cercano(A)
        self.listacerrada = []
        #while da error al acabarse la fruta crear metodo que verifique
        #Necesito saber cuantas frutas quedan siempre
        if self.mapa.getContador() != 0:
            while A.x != B.x or A.y != B.y:
                A = self.menorpeso(B, self.adyacentes(A))
            self.listacerrada.append(B)
            self.remover(inicial)
            return self.listacerrada

     remover(self, inicial):
        for li in self.listacerrada:
            if inicial.x == li.x && inicial.y == li.y:
                self.listacerrada.remove(li)

     mover(self):
        personaje = self.personaje
        escala = 50
        if self.iniciar:
            x = personaje.rect.x / escala
            y = personaje.rect.y / escala
            A = Punto(x, y)
            print(x, y)
            self.listacerrada = self.astar(A)
            self.iniciar = False
        if self.mapa.getContador() != 0:
            if not len(self.listacerrada) == 0:
                temp = self.listacerrada[0]
                self.listacerrada.remove(temp)
                personaje.rect.x = temp.x * escala
                personaje.rect.y = temp.y * escala
                print(temp.x, temp.y)
                self.iniciar = self.fue_eliminado(personaje.mapa.matriz)
            else:
                self.iniciar = True

     fue_eliminado(self, matriz):
        temp = None
        for li in self.listacerrada:
            temp = li
        if temp is not None:
            coord = temp
            elemento = matriz[coord.y][coord.x]
            if elemento == 0:
                return True
        return False
    }