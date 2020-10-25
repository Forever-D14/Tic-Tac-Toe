

var nJ1=document.getElementById("nJ1");
var nJ2=document.getElementById("nJ2");//Obtenemos labels de los nombres


var cJ1=document.getElementById("colorJ1")//Obtenemos ColorPickers
var cJ2=document.getElementById("colorJ2")

var tJ1=document.getElementById("tJ1");//Obtenemos las labels para saber a quien le toca
var tJ2=document.getElementById("tJ2");

var sJ1=document.getElementById("PJ1");//Obtenemos las labels de las puntaciones
var sJ2=document.getElementById("PJ2");

var coord=document.getElementsByClassName("XY");
var dots=document.getElementsByClassName("circulo");
var profileColors=document.getElementsByClassName("profileColor")
var buttons=document.getElementsByClassName("buttons")

var scoreJ1=0;
var scoreJ2=0;
var nturno=0;

var turnoJ1=true;//declaramos solo el turno del primer jugador ya que no si es verdadero el del segundo es falso y al reves.

var ttu="Tu turno!!!!";
var ntu="Esperando....";

function valid(){
	if(nturno >=4){

		if(dots[0].style.color == dots[1].style.color && dots[2].style.color == dots[1].style.color	&& dots[0].style.color != blanco){

				wColor(dots[0].style.color);
			
			}else if(dots[0].style.color == dots[4].style.color && dots[4].style.color == dots[8].style.color && dots[8].style.color != blanco){
					
							wColor(dots[0].style.color);
				
				}else if(dots[0].style.color == dots[3].style.color && dots[3].style.color == dots[6].style.color && dots[6].style.color != blanco) {

								wColor(dots[0].style.color);
					
					}else if(dots[6].style.color == dots[4].style.color && dots[4].style.color == dots[2].style.color && dots[2].style.color != blanco) {
					
									wColor(dots[6].style.color);
					
						}else if(dots[8].style.color == dots[7].style.color && dots[7].style.color == dots[6].style.color && dots[6].style.color != blanco){
					
										wColor(dots[8].style.color);
					
							}else if(dots[8].style.color == dots[5].style.color && dots[5].style.color == dots[2].style.color && dots[2].style.color != blanco){
						
											wColor(dots[8].style.color);
						
									}else if(dots[3].style.color == dots[4].style.color && dots[4].style.color == dots[5].style.color && dots[5].style.color != blanco) {
						
													wColor(dots[3].style.color);
						
										}else if(dots[7].style.color == dots[4].style.color && dots[4].style.color == dots[1].style.color && dots[1].style.color != blanco) {
							
														wColor(dots[7].style.color);
											}else if(nturno == 9) alert("EMPATE")

	}else{
		
	}
}

function tiro(index){
	console.log(nturno);
	if(turnoJ1){

		if(!dots[index].classList.contains("catCircleGame") && !dots[index].classList.contains("catCrossGame")){
			dots[index].classList.add("catCircleGame");
			dots[index].style.color=cJ1.value;
			nturno++;
			valid();
			tJ1.innerHTML=ntu;
			tJ2.innerHTML=ttu;
			turnoJ1=false;
		}else if(dots[index].style.color == rgb1){
				alert("No puedes tirar dos veces en el mismo lugar!");
			}else{
				alert("No puedes tirar en donde tu oponente tiro!");
			}	
	}else{	
		if(!dots[index].classList.contains("catCircleGame") && !dots[index].classList.contains("catCrossGame")){
			dots[index].classList.add("catCrossGame");
			dots[index].style.color=cJ2.value;
			nturno++;
			valid();
			tJ1.innerHTML=ttu;
			tJ2.innerHTML=ntu;
			turnoJ1=true;
		}
		else if(dots[index].style.color == rgb2){
				alert("No puedes tirar dos veces en el mismo lugar!");
			}else{
				alert("No puedes tirar en donde tu oponente tiro!");
			}
	}
	return false;
}



function wColor(xColor){
	
	if(xColor == rgb1){
		alert("HA GANADO " + nJ1.innerHTML);//GANO JUGADOR 1
		scoreJ1++;
		clean();
	}else if(xColor == rgb2){
			alert("HA GANADO " + nJ2.innerHTML);
			scoreJ2++;
			clean();
		}
	sJ1.innerHTML=scoreJ1;
	sJ2.innerHTML=scoreJ2;	
	return false;
}

function clean(){
	for(let j=0;j<dots.length;j++){
		dots[j].style.color=blanco;
		dots[j].classList.remove("catCrossGame","catCircleGame");
	}
	nturno=0;
	return false;
}

function reinicia(){
	scoreJ1=0;
	scoreJ2=0;
	clean();
	tJ1.innerHTML=ttu;
	tJ2.innerHTML=ntu;
	sJ1.innerHTML=scoreJ1;
	sJ2.innerHTML=scoreJ2;
	return false;
}

function home(){
	location.href ='Home.html';
	localStorage.clear();
	return false;
}

function main(){

	if(localStorage.length == 0){
		location.href="Home.html"
	}

	nJ1.innerHTML=localStorage.getItem("nJ1");//Asignamos nombres
	nJ2.innerHTML=localStorage.getItem("nJ2");
	
	cJ1.value=localStorage.getItem("cJ1");
	cJ2.value=localStorage.getItem("cJ2");
	
	cJ1.style.visibility="hidden";
	cJ2.style.visibility="hidden";
	
	profileColors[0].classList.add("catCircleProfile");
	profileColors[0].style.color=cJ1.value;
	profileColors[1].classList.add("catCrossProfile");
	profileColors[1].style.color=cJ2.value;

	
	tJ1.innerHTML=ttu;
	tJ2.innerHTML=ntu;

	coord[0].style.color=cJ1.value;//Esto lo hacemos por que con CSS el color se convierte en RGB
	coord[1].style.color=cJ2.value;//Y xColor es RGB, para poder hacer el if
	coord[2].style.color="#FFFFFF";//Este es para que evalue si los circulos que estan conectados no sean blancos

	blanco=coord[2].style.color;
	rgb1=coord[0].style.color; 
	rgb2=coord[1].style.color;

	alert("QUE EMPIECE EL JUEGO");

	clean();//Limpiamos el tablero 

	for(let i=0;i<coord.length;i++){
		coord[i].onclick=function(){
				tiro(i);	
		}
	}	

	buttons[0].onclick=reinicia;
	buttons[1].onclick=home;
	//window.GlobalEventHandlers.onclose=localStorage.clear();
}

main();
