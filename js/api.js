const base_url = "https://api.football-data.org/v2/";
const API_KEY = "53a5308fb9d2451191fa93800479f221";

function status(response) {
    if (response.status !== 200) {
      console.log("Error : " + response.status);
      return Promise.reject(new Error(response.statusText));
    }else if (response.status == 404) {
        console.log("not found");
    }else {
      return Promise.resolve(response);
    }
}


function json(response){
    return response.json();
}

function getCompetitions(){
    if("caches" in window){
        caches.match(base_url+"competitions").then(json).then(function(data){
            document.querySelector("#loadingIndc").style.display = 'none'; 
            var html = "";
            data.competitions.forEach(function(competition){
                if(competition.id === 2000 || competition.id === 2001 || competition.id === 2002 || competition.id === 2003 || competition.id === 2013 || competition.id === 2014 || competition.id === 2015 || competition.id === 2016 || competition.id === 2017 || competition.id === 2018 || competition.id === 2019 || competition.id === 2021 ){
                    html = `
                        <div class="col s12 m6 l3 mb-3">
                            <div class="card">
                                <a href="competition.html?id=${competition.id}">
                                    <div class="card-content">
                                        <p>${competition.name}</p>
                                    </div>
                                </a>
                            </div>
                        </div>
                    `;
                    document.querySelector("#competitions").innerHTML += html;
                }
            })
        })
    }
        fetch(base_url+"competitions",{headers:{'X-Auth-Token':API_KEY}}).then(status).then(json).then(function(data){
            var html = "";
            document.querySelector("#loadingIndc").style.display = 'none'; 
            data.competitions.forEach(function(competition){
                if(competition.id === 2000 || competition.id === 2001 || competition.id === 2002 || competition.id === 2003 || competition.id === 2013 || competition.id === 2014 || competition.id === 2015 || competition.id === 2016 || competition.id === 2017 || competition.id === 2018 || competition.id === 2019 || competition.id === 2021 ){
                    html = `
                        <div class="col s12 m6 l3 mb-3">
                            <div class="card">
                                <a href="competition.html?id=${competition.id}">
                                    <div class="card-content">
                                        <p>${competition.name}</p>
                                    </div>
                                </a>
                            </div>
                        </div>
                    `;
                    document.querySelector("#competitions").innerHTML += html;
                }
            })
        })
    
    
}

function getCompetitionById(){
    var urlParams = new URLSearchParams(window.location.search);
    var idParam = urlParams.get("id");

    if("caches" in window){
        caches.match(base_url+"competitions/"+idParam+"/standings").then(json).then(function(data){
            document.querySelector("#loadingIndc").style.display = 'none'; 
            var html = "";
            document.querySelector("#competition-name").innerHTML = data.competition.name;
            var competition = data.standings[0];
            if(competition){
                competition.table.forEach(function(team){
                    checkFavorite(team.team.id).then(function(res){
                        var button = "";
                        if(res){
                            button = `
                            <button class="btn red">Favorite</button>
                            `;
                        }else{
                            button = `
                            <button class="btn teal" onclick="addFavorite(${team.team.id},'${team.team.name}')">+ Add to Favorite</button>
                            `;
                        }
                        html = `
                        <div class="col s12 m6 l3 mb-3">
                            <div class="card">
                                <div class="card-image">
                                    <img src="${team.team.crestUrl ? team.team.crestUrl : ""}" alt="${team.team.name}">
                                </div>
                                <div class="card-content">
                                    <h4>${team.position}</h4>
                                    <p>${team.team.name}</p>
                                    ${button}
                                </div>
                            </div>
                        </div>
                    `;
                    document.querySelector("#teams").innerHTML += html;
                    })
                })
            }else{
                html = `
                    <div class="col">
                        <p>tidak ada data</div>
                    </div>
                `;
                document.querySelector("#teams").innerHTML = html;
            }
        })
    }
        fetch(base_url+"competitions/"+idParam+"/standings",{headers:{'X-Auth-Token':API_KEY}}).then(status).then(json).then(function(data){
            document.querySelector("#loadingIndc").style.display = 'none'; 
            var html = "";
            document.querySelector("#competition-name").innerHTML = data.competition.name;
            var competition = data.standings[0];
            if(competition){
                competition.table.forEach(function(team){
                    checkFavorite(team.team.id).then(function(res){
                        var button = "";
                        if(res){
                            button = `
                            <button class="btn red">Favorite</button>
                            `;
                        }else{
                            button = `
                            <button class="btn teal" onclick="addFavorite(${team.team.id},'${team.team.name}')">+ Add to Favorite</button>
                            `;
                        }
                        html = `
                        <div class="col s12 m6 l3 mb-3 text-center">
                            <div class="card">
                                <div class="card-image">
                                    <img src="${team.team.crestUrl ? team.team.crestUrl : ""}" alt="${team.team.name}">
                                </div>
                                <div class="card-content">
                                    <h4>${team.position}</h4>
                                    <p>${team.team.name}</p>
                                    ${button}
                                </div>
                            </div>
                        </div>
                    `;
                    document.querySelector("#teams").innerHTML += html;
                    })
                })
            }else{
                html = `
                    <div class="col">
                        <p>tidak ada data</div>
                    </div>
                `;
                document.querySelector("#teams").innerHTML = html;
            }
        })
    
}
