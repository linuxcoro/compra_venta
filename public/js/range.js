function range()
{
    document.getElementById('range').innerHTML = '';
    document.getElementById('calc').innerHTML = '';
    document.getElementById('frtab').innerHTML = '';
    var y=1;
    var ds1,gstr='-';
    var datas=document.getElementById('dat').value;
	datas = datas.replace(' ','');
	var resul;
	var bb = true;
	if(datas != '')
	{
		resul = datas.split(',');
	}

	for(var v=0; v<resul.length; v++)
	{
		resul[v] = parseInt(resul[v], 10);
		var d = resul[v];
		if(isNaN(d))
		{
			var bb = false;
			break;
		}
	}

	if(bb == true)
	{
		var tot = resul.length-1; 
	        var start = 0;

		for (var i = tot - 1; i >= start;  i--)             // Bubble Sort Function
	         {
	          for (var j = start; j <= i; j++) 
		   {
		     if (resul[j+1] < resul[j]) 
		      {
			var tempValue = resul[j];
		        resul[j] = resul[j+1];
		        resul[j+1] = tempValue;
		      }
	           }
		 }
	      var rang = resul[tot] - resul[0]; 
	  var nam1 = new Array('M&iacute;nimo','M&aacute;ximo','Alcance','N&uacute;meros Totales','Frecuencia');
	  var val1 = new Array('  <input type=text name=min id=min readonly value='+resul[0]+'> ',' <input type=text name=max id=max readonly value='+resul[tot]+'> ','  <input type=text name=rag id=rag readonly value='+rang+'>','  <input type=text name=n id=n readonly value='+resul.length+'> ','<input type=radio name=frq value=ind id=ind onclick=nogrp()> Individuos   <input type=radio value=grp id=grp name=frq onclick=nogrp()> Grupo');
	  var tabary = new Array();

	for(i=0;i<5;i++)
	{
		tabary[i] = new Array(2);
		for(j=0;j<2;j++)
		{ 
			if(j==0)
			{
				tabary[i][j] = nam1[i];
			}
			else if(j==1)
			{
				tabary[i][j] = val1[i];
			}
		}
	} 

	  // Declare variables and create the header, footer, and caption.
	  var oTable = document.createElement('TABLE');
	  var oTBody = document.createElement('TBODY');
	  var oRow, oCell;
	  var i, j;

	  // Insert the created elements into oTable.
	  oTable.appendChild(oTBody);
	  oTBody.setAttribute('align','center');
       
	  // Insert rows and cells into bodies.
	  for (i=0; i<5; i++)
	  {
	    oRow = document.createElement('TR');
	    oTBody.appendChild(oRow);
	    for (j=0; j<tabary[i].length; j++)
	    {
	      oCell = document.createElement('TD');
	      oCell.innerHTML = tabary[i][j];
	      oRow.appendChild(oCell);
	    }
	  }
  
	  // Insert the table into the document tree.
	  var frtb = document.getElementById('range');
	  frtb.appendChild(oTable);
          document.getElementById('range').innerHTML += '<tr><td><input type=hidden id=resul value='+resul+'></td></tr>';
	  document.getElementById('calc').innerHTML += '<br> </tr><tr align=center><td> <input type=button name=frqtab value=\'Distribuci&oacute;n De Frecuencias\' onclick=frqtable()> </td></tr>';
         }
}

function nogrp()
{
    var radiosel = $('[name=frq]:checked').val();
          if(radiosel=='ind')
	  {
              document.getElementById('nogroup').innerHTML = '';
          }
          else
	  {
              document.getElementById('nogroup').innerHTML += '<tr align=center><td> N&uacute;mero de Grupos </td><td> = <input type=text name=ng id=ng> </td></tr>';
          }
}

function frqtable()
{ 
    document.getElementById('frtab').innerHTML = '';
    var sortval = document.getElementById('resul').value;
    sortval = sortval.replace(' ','');
    var result;
    var vs = true;
    if(sortval != '')
    {
	result = sortval.split(',');
    }

    for(var v=0; v<result.length; v++)
    {
	result[v] = parseInt(result[v], 10);
	var d = result[v];
	if(isNaN(d) || d == '')
	{
	    var vs = false;
	    break;
	 }
     }
  
   var frname = document.getElementById('frnam').value;
   var n = document.getElementById('n').value; 
    var radiosel = $('[name=frq]:checked').val();

   if(radiosel == 'ind')
   { 
	var temp;
	var freq = new Array();
    	var nodup =new Array();

  		label:for(var i=0; i<n;i++ )
 		{  
  		 for(var j=0; j<nodup.length;j++ )
  		 {
  		  if(nodup[j]==result[i]) 
		  continue label;	
		 }
		 nodup[nodup.length] = result[i];
  		}
 
   		for (var i=0; i<nodup.length; i++)
		{
		  temp = nodup[i]; 
		  var count = 0;
		  for (var j=0; j<=n; j++)
		  {
		    if(result[j]==temp)
		     {
			count = count + 1;
		     }
		  }
		 freq[i] = count;
		} 

	var tabary1 = new Array();
	for(i=0;i<nodup.length;i++)
	{
		tabary1[i] = new Array(2);
		for(j=0;j<2;j++)
		{ 
			if(j==0)
			{
				tabary1[i][j] = nodup[i];
			}
			else if(j==1)
			{
				tabary1[i][j] = freq[i];
			}
		}
	} 

	  // Declare variables and create the header, footer, and caption.
	  var oTable1 = document.createElement('TABLE');
	  var oTHead1 = document.createElement('THEAD');
	  var oTBody1 = document.createElement('TBODY');
	  var oRow1, oCell1;
	  var i, j;

	  // Declare stock data that would normally be read in from a stock Web site.
	  var heading1 = new Array();
	
	  heading1[0] = frname;
	  heading1[1] = 'Frecuencia';

	  // Insert the created elements into oTable.
	  oTable1.appendChild(oTHead1);
	  oTable1.appendChild(oTBody1);
	  //oTable1.border = 1;
	  oTBody1.setAttribute('align','center');
    
	  // Insert a row into the header and set its background color.
	  oRow1 = document.createElement('TR');
	  oTHead1.appendChild(oRow1);
	  oTHead1.setAttribute('bgColor','lightskyblue');
	  
	  // Create and insert cells into the header row.
	  for (i=0; i<heading1.length; i++)
	  {
	    oCell1 = document.createElement('TH');
	    oCell1.innerHTML = heading1[i];
	    oRow1.appendChild(oCell1);
	  }
	  
	  // Insert rows and cells into bodies.
	  for (i=0; i<tabary1.length; i++)
	  {
	    oRow1 = document.createElement('TR');
	    if(i%2==0)
	    {
		oRow1.setAttribute('class','bg1');
	    }
	    else
	    {
		oRow1.setAttribute('class','bg2');
	    }
	    oTBody1.appendChild(oRow1);
	    for (j=0; j<tabary1[i].length; j++)
	    {
	      oCell1 = document.createElement('TD');
	      oCell1.innerHTML = tabary1[i][j];
	      oRow1.appendChild(oCell1);
	    }
	  }
  
	  // Insert the table into the document tree.
	  var frtb = document.getElementById('frtab');
	  frtb.appendChild(oTable1);

   }
   else if(radiosel == 'grp')
   {
         var ng = document.getElementById('ng').value;
  	 var range = document.getElementById('rag').value;
         var sigrp = 1 + Math.round(range/ng); 
	 if(ng=='')
         {
	    alert('Introducir N&uacute;mero de Grupos');
 	 }
	 else
	 {		
		var xaxis = result[0];
		var temp;
		var freq = new Array();
		var xval = new Array();
		var yval = new Array();

		for (var i=0; i<ng; i++)
		{
		  temp = xaxis; 
		  xaxis = xaxis + sigrp;
		  var count = 0;
		  for (var j=0; j<n; j++)
		  {
		    if(result[j]>=temp && result[j]<xaxis)
		     {
			count = count + 1;
		     }
		  }
		 //xval[i] = temp+ ' - ' +xaxis;
		 xval[i] = temp;
		 yval[i] = xaxis;
		 freq[i] = count;
		} 
	var tabary2 = new Array();
	var acu1=0;
	var acu2=0;

	var numbers = [5, 4, 1, 4];

	function getSum(total, num) {
	    return total + num;
	}

	var tem_div=0;

	for(i=0;i<ng;i++)
	{
		//tabary2[i] = new Array(2);
		//for(j=0;j<2;j++)
		tabary2[i] = new Array(6);
		for(j=0;j<6;j++)
		{ 
			if(j==0)
			{
				tabary2[i][j] = xval[i] + ' - ' +yval[i];
			}
			else if(j==1)
			{
				tabary2[i][j] = freq[i];
			}
			/*----------------------------------------*/
			// agregando columnas
			else if(j==2)
			{
				acu1+=freq[i];
				resta=acu1-freq[i];
				tabary2[i][j] = resta+"+"+freq[i]+"="+acu1;
			}
			else if(j==3)
			{
				divide=freq[i]/freq.reduce(getSum);
				tabary2[i][j] = freq[i]+"/"+freq.reduce(getSum);
			}
			else if(j==4)
			{
				divide=freq[i]/freq.reduce(getSum);
				tabary2[i][j] = divide.toFixed(2);
			}
			else if(j==5)
			{
				acu2+=freq[i];
				divide=acu2/freq.reduce(getSum);
				tabary2[i][j] = acu2+"/"+freq.reduce(getSum)+"="+divide.toFixed(2);
			}
			/*----------------------------------------*/

		}
	} 

	  // Declare variables and create the header, footer, and caption.
	  var oTable2 = document.createElement('TABLE');
	  var oTHead2 = document.createElement('THEAD');
	  var oTBody2 = document.createElement('TBODY');
	  var oRow2, oCell2;
	  var i, j;

	  // Declare stock data that would normally be read in from a stock Web site.
	  var heading2 = new Array();
	
	  heading2[0] = frname;
	  heading2[1] = 'Frecuencia Absoluta (fi)';
	  heading2[2] = 'Frecuencia Acumulada (Fi)';
	  heading2[3] = 'Frecuencia Relativa (hi)';
	  heading2[4] = 'Total (hi)';
	  heading2[5] = 'Frecuencia Relativa Acumulada (Hi)';

	  // Insert the created elements into oTable.
	  oTable2.appendChild(oTHead2);
	  oTable2.appendChild(oTBody2);
	  //oTable2.border = 1;
	  oTBody2.setAttribute('align','center');
    
	  // Insert a row into the header and set its background color.
	  oRow2 = document.createElement('TR');
	  oTHead2.appendChild(oRow2);
	  oTHead2.setAttribute('bgColor','lightskyblue');
	  
	  // Create and insert cells into the header row.
	  for (i=0; i<heading2.length; i++)
	  {
	    oCell2 = document.createElement('TH');
	    oCell2.innerHTML = heading2[i];
	    oRow2.appendChild(oCell2);
	  }
	  
	  // Insert rows and cells into bodies.
	  var prueba = new Array();
	  for (i=0; i<tabary2.length; i++)
	  {
	    for (j=0; j<tabary2[i].length; j++)
	    {
	      if (j==4) {
		    prueba[i] = tabary2[i][4];
	      }
	    }
	  }




	  for (i=0; i<tabary2.length; i++)
	  {
	    oRow2 = document.createElement('TR');
	    if(i%2==0)
	    {
		oRow2.setAttribute('class','bg1');
	    }
	    else
	    {
		oRow2.setAttribute('class','bg2');
	    }

	    oTBody2.appendChild(oRow2);
	    for (j=0; j<tabary2[i].length; j++)
	    {
	      oCell2 = document.createElement('TD');
	      /*=======================================*/
		  //oCell2.innerHTML = tabary2[i][j];
		  console.log(Math.max.apply(Math, prueba));
		  if (tabary2[i][4]==Math.max.apply(Math, prueba)) {
		  	oCell2.setAttribute("style", "color:red;");
		  	oCell2.innerHTML = "<a href='http://localhost/tabla_frecuencia/crecuencia.html?inicio="+xval[i]+"&fin="+yval[i]+"'>"+tabary2[i][j]+"</a>";	

		  	//destino.html?var1=3&var2=Hola  	
		  }
		  else
		  	oCell2.innerHTML = tabary2[i][j];
	      /*=======================================*/

	      oRow2.appendChild(oCell2);
	    }
	  }
  
	  // Insert the table into the document tree.
	  var frtb = document.getElementById('frtab');
	  frtb.appendChild(oTable2);

          }
   }
   else
   {
       alert('Para comprobar en el bot&oacute;n de radio de frecuencia para mostrar');
   }
}

function clrall()
{
$('#frnam').html('');
$('#dat').html('');
$('#range').html('');
$('#nogroup').html('');
$('#calc').html('');
$('#frtab').html('');
}
