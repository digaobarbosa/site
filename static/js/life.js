 var app = angular.module('life',[]);
    app.controller('LifeCtrl',function($scope,$timeout){
        $scope.VERTICAL = 30;
        $scope.HORIZONTAL = 30;
        $scope.twoplayers = true;
        $scope.playCount=0;
        var INTERVAL=300;
        var cell = function(value){return {value:value>0 ? 1 : value<0 ? -1 : 0};};
        var classMap = {"1":'blue',"0":'',"-1":'red'};
        $scope.cssClass = function(box){
          return classMap[box.value];
        };

        $scope.init = function(valFunc){
                var matrix = new Array($scope.VERTICAL);
                for(var i=0;i<$scope.VERTICAL;i++){
                    matrix[i]= new Array($scope.HORIZONTAL);
                    for(var j=0;j<$scope.HORIZONTAL;j++)
                        if(valFunc)
                            matrix[i][j] = cell(valFunc(i,j));
                        else
                            matrix[i][j] = cell(0);
                }
                $scope.matrix = matrix;
            };
        $scope.init();

        var MODES = {
            classic:{
                keep:{2:1,3:1},
                sex:{3:1}
            },
            explosive:{
                keep:{2:1,3:1},
                sex:{1:1}
            },
            labyrinth:{
                keep:{2:1,3:1,4:1,5:1},
                sex:{3:1}
            }

        }
        $scope.modeName='classic';
        var calculate = function(indexi,indexj){
            var matrix = $scope.matrix;
            var sum = 0;
            for(var i=-1;i<=1;i++){
                for(var j=-1;j<=1;j++){
                    var indi = indexi+i;
                    var indj = indexj+j;
                    if((i===0 && j===0) ||indi<0 || indj<0 || indi>=$scope.VERTICAL || indj>=$scope.HORIZONTAL)
                        continue;
                    sum+=matrix[indi][indj].value;
                }
            }
            var mode = MODES[$scope.modeName];
            var abs = Math.abs(sum);
            if(matrix[indexi][indexj].value==0)
                return mode.sex[abs] ? cell(sum): cell(0);
            else
                return mode.keep[abs]? cell(sum): cell(0);
        };

        $scope.nextStep = function(){

            for(var i=0;i<$scope.VERTICAL;i++){
                for(var j=0;j<$scope.HORIZONTAL;j++)
                    $scope.matrix[i][j].next = calculate(i,j);
            }
            for(var i=0;i<$scope.VERTICAL;i++){
                for(var j=0;j<$scope.HORIZONTAL;j++)
                    $scope.matrix[i][j] = $scope.matrix[i][j].next;
            }
            $scope.playCount+=1;

        };
        $scope.running = false;
        $scope.start = function(){
                $scope.running = true;
                $scope.ticker = $timeout(function tick(){
                    $scope.nextStep();
                    $scope.ticker = $timeout(tick,INTERVAL);
                },INTERVAL);
        };
        $scope.stop = function(){
            $timeout.cancel($scope.ticker);
            $scope.running = false;
        }
        $scope.player = 1;
        $scope.changePlayer = function(){
            if($scope.twoplayers)
                $scope.player = $scope.player==1 ? -1 :1;
        };
        $scope.randomInit = function(){
            if($scope.twoplayers)
                $scope.init(function(){
                    var v = Math.random();
                    if(v<0.3) return -1;
                    if(v<0.6) return 1;
                    return 0;
                });
            else{
                $scope.init(function(){
                    return Math.random()>0.5 ? 1:0;
                })
            }

        };
    });/**
 * Created with PyCharm.
 * User: digao
 * Date: 6/22/13
 * Time: 2:05 AM
 * To change this template use File | Settings | File Templates.
 */
