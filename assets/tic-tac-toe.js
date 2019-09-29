// <!-- 
// @Author : Ujjal Das
// github: ujjaldas132
// -->


var N_SIZE=3,EMPTY='&nbsp;',boxes=[],turn='X',score,moves;
var gameEnd=false;
var array;
var rowMap={};
var colMap={};

var cellSize=285;
var winningMoves=N_SIZE;

if(window.screen.width>780){
var screenWidth = window.screen.width;
cellSize=0.25*(screenWidth/N_SIZE);}

console.log(screenWidth);

function boxup(){
	if(N_SIZE<8){
	N_SIZE++;
	winningMoves=N_SIZE;
	document.getElementById('board').remove();
	// location.reload();
	init();}
}
function boxdown(){
	if(N_SIZE>3){
	N_SIZE--;
	winningMoves=N_SIZE;
	document.getElementById('board').remove();
	init();}else{
		alert('the game can not be played below N=3')
	}
}


// make the board and start

function init(){
	boxes=[];

	array=new Array(N_SIZE);
	for(var i=0;i<N_SIZE;i++){
		var tmat= new Array(N_SIZE);
		// for(var k ;k<N_SIZE;k++)
		// 	tmat[k]=-1;
		array[i]=tmat;
	}
	for(var i=0;i<N_SIZE;i++){
		for(var j=0;j<N_SIZE;j++){
			array[i][j]=-1;
		}
	}
	console.log(array);

	var board=document.createElement('table');//create table 
	board.id='board';
	board.setAttribute('border',1);
	board.setAttribute('cellspacing',0);


	var identifier =1;

	for(var i=0;i<N_SIZE;i++){
		var row=document.createElement('tr');
		board.appendChild(row);
		// cell.setAttribute('height',N_SIZE*120);
		// cell.setAttribute('width',N_SIZE*120);

		for(var j=0;j<N_SIZE;j++){
			var cell=document.createElement('td');
			
			cell.setAttribute('height',3*cellSize/(N_SIZE));
			cell.setAttribute('width',3*cellSize/(N_SIZE));
			cell.setAttribute('align','center');
			cell.setAttribute('valign','center');
			// cell.setAttribute('fontSize',(N_SIZE*80/3));
			// cell.style.fontSize =(N_SIZE*80/3)px;
			// cell.style.fontSize = "(N_SIZE*160/3)px";
			cell.classList.add('col'+j,'row'+i);// learn
			if(i==j){
				cell.classList.add('diagonal0');
			}
			if(j==N_SIZE-i-1){
				cell.classList.add('diagonal1');
			}

			cell.identifier=identifier;//know 

			// cell.addEventListener('click',set);
			row.appendChild(cell);
			boxes.push(cell);
			identifier+=identifier;
			rowMap[cell]=i;
			colMap[cell]=j;
		}

	}
	document.getElementById('tictactoe').appendChild(board);
	startNewGame();

}


// new game

function startNewGame(){
	gameEnd=false;

	for(var i=0;i<N_SIZE;i++){
		for(var j=0;j<N_SIZE;j++){
			array[i][j]=-1;
		}
	}


	if(N_SIZE>5){
		winningMoves=5;
	}

	score ={
		'X':0,'O':0

	};

	moves=0;
	turn='X';
	boxes.forEach(function (square){// learn
		square.innerHTML=EMPTY;
	})
		boxes.forEach(function (square){// learn
		square.addEventListener('click',set);//clicking event is add
	})
	document.getElementById('turn').textContent='Player '+turn;
}





// clicked node list
function contains(selector,text){
	var elements= document.querySelectorAll(selector);
	return [].filter.call(elements,function(element){
		return RegExp(text).test(element.textContent);
	});
}


// set when clicked as well change the turn

function set(){
	if(this.innerHTML !=EMPTY){
		return;
	}

	var row= parseInt(this.classList[1].substring(3,4));
	var col= parseInt(this.classList[0].substring(3,4));
	// var row=rowMap[this];
	// var col=colMap[this];
	console.log(row);
	console.log(col);
	// var row=parseInt(rowStr.substr(3,4));
	// var col=parseInt(colStr.substr(3,4));
	if(turn=='X'){
		array[row][col]=0;
	}else{
		array[row][col]=1;
	}

	console.log(checkWin(turn,row,col));
	this.innerHTML=turn;
	moves +=1;
	score[turn]+=this.identifier;
	// if(win(this)){
	if(checkWin(turn,row,col)){
		// alert('Winner: Player'+turn);
		// startNewGame();
		gameEnd=true;
		document.getElementById('turn').textContent='Player '+turn+' is the WINNER';
		boxes.forEach(function (square){// learn
		square.removeEventListener('click',set);//clicking event is removed
	})
		

	}else if(moves==N_SIZE*N_SIZE){
		// alert('DRAW GAME');
		// startNewGame();

		document.getElementById('turn').textContent='the match is DRAW ';
	}else{
		var turnchange=0;
		// turn = turn === 'X' ? 'O' : 'X';
		// document.getElementById('turn').textContent='Player '+turn;
	}
	computerturn();
}


function checkWin(turn,row,col){

	var num=1;
	if(turn=='X')
		num=0;

	var count=1;
	for(var i=col+1;i<N_SIZE;i++){
		if(array[row][i]==num){
			count++;
		}else{
			break;
		}

	}
	for(var i=col-1;i>=0;i--){
		if(array[row][i]==num){
			count++;
		}else{
			break;
		}
	}

	if(count>=winningMoves){
		return true;
	}


count=1;
for(var i=row+1;i<N_SIZE;i++){
		if(array[i][col]==num){
			count++;
		}else{
			break;
		}

	}
	for(var i=row-1;i>=0;i--){
		if(array[i][col]==num){
			count++;
		}else{
			break;
		}
	}
	if(count>=winningMoves){
		return true;
	}


count=1;
	for(var i=1;row-i>=0 && col+i<N_SIZE ;i++){
		if(array[row-i][col+i]==num){
			count++;
		}else{
			break;
		}
	}
	for(var i=1;row+i<N_SIZE && col-i>=0 ;i++){
		if(array[row+i][col-i]==num){
			count++;
		}else{
			break;
		}
	}

if(count>=winningMoves){
		return true;
	}

	
	count=1;
	for(var i=1;row-i>=0 && col-i>=0 ;i++){
		if(array[row-i][col-i]==num){
			count++;
		}else{
			break;
		}
	}
	for(var i=1;row+i<N_SIZE && col+i<N_SIZE ;i++){
		if(array[row+i][col+i]==num){
			count++;
		}else{
			break;
		}
	}
return count>=winningMoves;

}


function computerturn(){
	if(gameEnd || moves>=N_SIZE*N_SIZE)
		return;
	var check=true;
	var row=parseInt((Math.random()*1000)%N_SIZE);
	var col=parseInt((Math.random()*1000)%N_SIZE);
	for(var i=0;i<N_SIZE;i++){
		for(var j=0;j<N_SIZE;j++){
			if(array[i][j]==-1){

				if(checkWin('O',i,j)){

					check=false;
					row=i;
					col=j;
					break;
				}

			}
		}
		if(!check)
			break;
	}



	if(check){
	for(var i=0;i<N_SIZE;i++){
		for(var j=0;j<N_SIZE;j++){
			if(array[i][j]==-1){

				if(checkWin('X',i,j)){

					check=false;
					row=i;
					col=j;
					break;
				}

			}
		}
		if(!check)
			break;
	}
}



	if(check){
	while(array[row][col]!=-1){
		row=parseInt((Math.random()*1000)%N_SIZE);
		col=parseInt((Math.random()*1000)%N_SIZE);
	}}
	array[row][col]=1;
	boxes.forEach(function (square){// learn

		var rowS= parseInt(square.classList[1].substring(3,4));
		var colS= parseInt(square.classList[0].substring(3,4));
		if(row==rowS && col==colS){

			square.innerHTML='O';
			moves+=1;
		}
		// square.innerHTML=EMPTY;
	})


	if(checkWin('O',row,col)){
		// alert('Winner: Player'+turn);
		// startNewGame();
		gameEnd=true;
		document.getElementById('turn').textContent='Player Computer  '+' is the WINNER';
		boxes.forEach(function (square){// learn
		square.removeEventListener('click',set);//clicking event is removed
	})
		

	}

}




init();








































































//win or lose
function win(clicked){

	// all the cell classes
	var memberOf= clicked.className.split(/\s+/);
	console.log(memberOf);
	for(var i=0;i<memberOf.length;i++){
		var testClass='.'+memberOf[i];
		var items= contains('#tictactoe '+testClass,turn);
		//winning condition
		// console.log(items);
		if(items.length==winningMoves){
			return true;
		}
	}
	return false;
}