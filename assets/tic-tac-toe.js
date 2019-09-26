// <!-- 
// @Author : Ujjal Das
// github: ujjaldas132
// -->


var N_SIZE=3,EMPTY='&nbsp;',boxes=[],turn='X',score,moves;

var cellSize=285;
var winningMoves=N_SIZE;

if(window.screen.width>780){
var screenWidth = window.screen.width;
cellSize=.24*(screenWidth/N_SIZE);}

console.log(screenWidth);

function boxup(){
	if(N_SIZE<5){
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
		}

	}
	document.getElementById('tictactoe').appendChild(board);
	startNewGame();

}


// new game

function startNewGame(){
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
	console.log(this);
	this.innerHTML=turn;
	moves +=1;
	score[turn]+=this.identifier;
	if(win(this)){
		// alert('Winner: Player'+turn);
		// startNewGame();
		document.getElementById('turn').textContent='Player '+turn+' is the WINNER';
		boxes.forEach(function (square){// learn
		square.removeEventListener('click',set);//clicking event is removed
	})
		

	}else if(moves==N_SIZE*N_SIZE){
		// alert('DRAW GAME');
		// startNewGame();

		document.getElementById('turn').textContent='the match is DRAW ';
	}else{
		turn = turn === 'X' ? 'O' : 'X';
		document.getElementById('turn').textContent='Player '+turn;
	}
}




init();