///////////////// fixed menu on scroll for desktop
if ($(window).width() > 100) {
  $(window).scroll(function(){
     if ($(this).scrollTop() > 40) {
        $('#navbar_top').addClass("fixed-top");
        // add padding top to show content behind navbar
        $('body').css('padding-top', $('.navbar').outerHeight() + 'px');
      }else{
        $('#navbar_top').removeClass("fixed-top");
         // remove padding top from body
        $('body').css('padding-top', '0');
      }
  });
}

$(document).ready(function(){
  var url="https://api.covid19india.org/data.json";
  $.getJSON(url,function(data){
    var state=[];
    var confirmed=[];
    var deaths=[];
    var recovered=[];

    $.each(data.statewise,function(id,obj){
      state.push(obj.state);
      confirmed.push(obj.confirmed);
      recovered.push(obj.recovered);
      deaths.push(obj.deaths);
    });
    state.shift();
    recovered.shift();
    deaths.shift();
    confirmed.shift();

    var myChart=document.getElementById("myChart").getContext("2d");

    var chart= new Chart(myChart,{
      type:"line",
      data:{
        labels:state,
        datasets:[
          {
            label:"confirmed cases",
            data:confirmed,
            backgroundColor:"#f1c40f",
            minBarLength:100
          },
          {
            label:"Recovered cases",
            data:recovered,
            backgroundColor:"#2ecc71",
            minBarLength:100
          },
          {
            label:"Deceased",
            data:deaths,
            backgroundColor:"#e74c3c",
            minBarLength:100
          }
        ]
      },
      options:{}
    });

  });

  const total_cases=$(".total-cases");
  const total_deaths=$(".total-deaths");
  const recovered=$(".recovered");
  const active_cases=$(".active-cases");
  var length;

  $.get("https://api.covid19india.org/data.json",function(response){
    var response=response;
    length=response.statewise.length;
    total_cases.html(response.statewise[0].confirmed);
    total_deaths.html(response.statewise[0].deaths);
    recovered.html(response.statewise[0].recovered);
    active_cases.html(response.statewise[0].active);
    for(var i=1;i<=length;i++){
      $("table").append("<tr><td>"+i+"</td><td>"+response.statewise[i].lastupdatedtime+"</td><td>"+response.statewise[i].state+"</td><td>"+response.statewise[i].confirmed+"</td><td>"+response.statewise[i].active+"</td><td>"+response.statewise[i].recovered+"</td><td>"+response.statewise[i].deaths+"</td><tr>");
    }
  });
});
