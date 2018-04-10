var app = angular.module('app', [])
app.controller("cuerpo", main)

function main($scope, $http) {
    
    //Acciones por defecto
    $scope.accion = {
        texto: "Añadir",
        cancelar: false
    }
    
    listarCRUD()
    function listarCRUD(){
        $http.get("/shana")
            .then((res) => {
                $scope.datos = res.data
        })
    }

    /*-------------FUNCIONES CRUD-------------*/
    
    $scope.anyadirDocumento = function(){
        var datos = $scope.nuevo
        
        $scope.accion.texto = "Añadir"
            
        $http.post("/anyadirDocumento", datos)
            .then((res) => {
                $scope.doc = res.data
            })
        
        delete $scope.nuevo
        listarCRUD()
    }
    
    $scope.leerDocumento = function(){
        var datos = JSON.stringify({_id: this.d._id})
        
        $http.post("/leerDocumento", datos)
            .then((res) => {
                $scope.nuevo = res.data
            })
        
        $scope.accion.texto = "Modificar"
        $scope.accion.cancelar = true
        listarCRUD()
    }
    
    $scope.editarDocumento = function(){
        var datos = $scope.nuevo
        
        $http.post("/editarDocumento", datos)
            .then((res) => {
                $scope.doc = res.data
            })
        
        $scope.accion.texto = "Añadir"
        delete $scope.nuevo
        listarCRUD()
    }
    
    $scope.borrarDocumento = function(){
        var datos = JSON.stringify({_id: this.d._id})
        
        $http.post("/borrarDocumento", datos)
            .then((res) => {
                $scope.datos = res.data
            })
        
        listarCRUD()
    }
    
    $scope.cancelarEdicion = function(){
        $scope.accion.cancelar = false
        $scope.accion.texto = "Añadir"
        delete $scope.nuevo
    }
}