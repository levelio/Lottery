/**
 * Created by hezhiqiang on 15/1/21.
 */

angular.module('ngPrize.controllers', []).controller('MainController', function ($scope, $timeout) {

    //15个奖槽 13个罚槽
    var prizeSource = {
        '1000': function () {
            this.name = '一等奖';
            this.key = '1000';
            this.count = 1;
            this.url = 'lib/img/1000.jpg';
            this.detail = '1000 元';
            this.select = false;
            this.id = 1;
        },
        '500': function () {
            this.name = '二等奖';
            this.key = '500';
            this.count = 2;
            this.url = 'lib/img/500.jpg';
            this.detail = '500 元';
            this.select = false;
            this.id = 2;
        },
        '300': function () {
            this.name = '三等奖';
            this.key = '300';
            this.count = 3;
            this.url = 'lib/img/300.jpg';
            this.detail = '300 元';
            this.select = false;
            this.id = 3;
        },
        'doubleBall': function () {
            this.name = '感恩奖';
            this.count = 5;
            this.key = 'doubleBall';
            this.url = 'lib/img/double_ball.jpg';
            this.detail = '双色球5注';
            this.select = false;
            this.id = 4;
        },
        'again': function () {
            this.name = '再来一次';
            this.count = 4;
            this.key = 'again';
            this.url = 'lib/img/again.jpg';
            this.detail = '再抽一次';
            this.select = false;
            this.id = 0;
        },
        'threeCups': function () {
            this.name = '惩罚';
            this.key = 'threeCups';
            this.count = 3;
            this.url = 'lib/img/three_cups.jpg';
            this.detail = '罚酒三杯';
            this.select = false;
            this.id = 0;
        },
        'oneCup': function () {
            this.name = '惩罚';
            this.key = 'oneCup';
            this.count = 3;
            this.url = 'lib/img/a_cup.jpg';
            this.detail = '罚酒一杯';
            this.select = false;
            this.id = 0;
        },
        'perform': function () {
            this.name = '惩罚';
            this.key = 'perform';
            this.count = 4;
            this.url = 'lib/img/perform.jpg';
            this.detail = '表演一个';
            this.select = false;
            this.id = 0;
        },
        'choose': function () {
            this.name = '参与奖';
            this.key = 'choose';
            this.count = 3;
            this.url = 'lib/img/choose.jpg';
            this.detail = '找人演一个';
            this.select = false;
            this.id = 0;
        }
    }

    $scope.topPrize  = [new prizeSource['1000'](), new prizeSource['threeCups'](), new prizeSource['500'](), new prizeSource['perform'](), new prizeSource['threeCups'](), new prizeSource['choose'](), new prizeSource['doubleBall'](), new prizeSource['oneCup']()];
    $scope.rightPrize= [new prizeSource['choose'](), new prizeSource['perform'](), new prizeSource['300'](), new prizeSource['doubleBall'](), new prizeSource['again'](), new prizeSource['oneCup']()];
    $scope.bottomPrize  = [new prizeSource['doubleBall'](), new prizeSource['again'](), new prizeSource['doubleBall'](), new prizeSource['500'](), new prizeSource['threeCups'](), new prizeSource['300'](), new prizeSource['oneCup'](), new prizeSource['doubleBall']()];
    $scope.leftPrize = [new prizeSource['perform'](), new prizeSource['again'](), new prizeSource['300'](), new prizeSource['perform'](), new prizeSource['choose'](), new prizeSource['again']()];
    $scope.allPrize = [];
    $scope.gameState = "ready";
    $scope.lotteryNum;
    $scope.lotterPrize;
    var gameCount = 2;

    $scope.gameStart = function () {
        if (!($scope.gameState === "runing")) {
            if(!(typeof($scope.lotteryNum) == "undefined")) closePrize();
            $scope.gameState = "runing";
            var prizeCount = $scope.allPrize.length;
            $scope.lotteryNum = prizeNum(prizeCount);
            console.log($scope.lotteryNum);
            gameCount = 2;
            document.getElementById('music').play();
            go($scope.allPrize, 0, 100);
        }
    }

    var go = function (prizes, currentPrize, outTime) {
        var prizeCount = prizes.length;
        if (currentPrize <= prizeCount) {
            $timeout(function () {
                if (currentPrize != prizeCount) prizes[currentPrize].select = true;
                if (currentPrize != 0) prizes[currentPrize - 1].select = false;
                currentPrize++;
                go(prizes, currentPrize, outTime);
            }, outTime);
        } else {
            gameCount--
            if (gameCount > 0) {
                go($scope.allPrize, 0, 100)
            } else {
                stop($scope.allPrize, 0, $scope.lotteryNum, 100);
            }
        }
    }

    var stop = function (prizes, currentPrize, lotteryNum, outTime) {
        var prizeCount = prizes.length;
        if (currentPrize <= lotteryNum) {
            $timeout(function () {
                if (currentPrize != prizeCount) prizes[currentPrize].select = true;
                if (currentPrize != 0) prizes[currentPrize - 1].select = false;
                currentPrize++;
                stop(prizes, currentPrize, lotteryNum, outTime + 4 * currentPrize);
            }, outTime);
        } else {
            $scope.lotterPrize = $scope.allPrize[lotteryNum];
            $timeout(function(){
                $scope.gameState = "stop";

                if(!(typeof($scope.lotteryNum) == "undefined")) resetPrize();

                var play =document.getElementById('music');
                $timeout(function(){
                    play.pause();
                    play.currentTime = 0;
                },2000);
            },1500)
        }
    }

    $scope.Init = function () {
        setPrizes();
        addPrizes($scope.topPrize);
        addPrizes($scope.rightPrize);
        addPrizes($scope.bottomPrize, true);
        addPrizes($scope.leftPrize, true);
    }

    var prizeNum = function (prizeCount) {
        return 0;
        return Math.floor(Math.random() * prizeCount);
    }

    var closePrize = function () {
        var prize =  $scope.allPrize[$scope.lotteryNum];
        prize.select = false;
        if(prize.id==1||prize.id==2||prize.id==3||prize.id==4){
            prize.url = 'lib/img/a_cup.jpg';
            prize.detail = '罚酒一杯';
            prize.id = 0;
            prize.key = 'oneCup';
            prize.name = '惩罚';
        }
    };

    var resetPrize = function () {
        var prize =  $scope.allPrize[$scope.lotteryNum];
        if(prize.id==1||prize.id==2||prize.id==3||prize.id==4){
            prize.key = 'oneCup';
            addData("tp",$scope.topPrize);
            addData("rp",$scope.rightPrize);
            addData("bp",$scope.bottomPrize);
            addData("lp",$scope.leftPrize);
        }
    };


    var addPrizes = function (prizes, isReverse) {
        if (isReverse) {
            prizes.forEach(function (item, idx) {
                $scope.allPrize.push(prizes[prizes.length - idx - 1]);
            });
        } else {
            prizes.forEach(function (item) {
                $scope.allPrize.push(item);
            });
        }
    }



    var setPrizes = function(){
        var tp = localStorage.getItem('tp');
        var rp = localStorage.getItem('rp');
        var bp = localStorage.getItem('bp');
        var lp = localStorage.getItem('lp');
        var tpModel = [];
        var rpModel = [];
        var bpModel = [];
        var lpModel = [];
        if(tp!=null&&tp!="null"){
            var ps = tp.split(',');
            ps.forEach(function(item){
                tpModel.push(new prizeSource[item]());
            })

            $scope.topPrize = tpModel;
        }
        if(rp!=null&&rp!="null"){
            var ps = rp.split(',');
            ps.forEach(function(item){
                rpModel.push(new prizeSource[item]());
            })
            $scope.rightPrize = rpModel;
        }
        if(bp!=null&&bp!="null"){
            var ps = bp.split(',');
            ps.forEach(function(item){
                bpModel.push(new prizeSource[item]());
            })
            $scope.bottomPrize = bpModel;
        }
        if(lp!=null&&lp!="null"){
            var ps = lp.split(',');
            ps.forEach(function(item){
                lpModel.push(new prizeSource[item]());
            })

            $scope.leftPrize = lpModel;
        }
    }

    var addData = function(key,prizes){
        var values = "";
        prizes.forEach(function(item){
            values+= item.key;
            values+=',';
        });
        values = values.substring(0,values.length-1)
        localStorage.setItem(key,values);
    }

    $scope.dd = function(){
        localStorage.setItem('tp',null);
        localStorage.setItem('rp',null);
        localStorage.setItem('bp',null);
        localStorage.setItem('lp',null);
    }
})