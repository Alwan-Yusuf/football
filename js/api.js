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
                                    <a href="detail.html?id=${team.team.id}" class="btn blue">Detail</a>
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
            console.log(data)
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
                                    <a href="detail.html?id=${team.team.id}" class="btn blue">Detail</a>
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


function getDetail(){
    var urlParams = new URLSearchParams(window.location.search);
    var id = urlParams.get("id");

    if("caches" in window){
        caches.match(base_url+"teams/"+id).then(json).then(function(data){
            var content = document.querySelector("#content")
            document.querySelector("#name").innerHTML = data.name;
            
            var left = document.querySelector("#img");
            left.innerHTML += `<img src="${data.crestUrl}" alt="${data.name}" width="200">`;

            checkFavorite(data.id).then(function(res){
                var button = "";
                if(res){
                    button = `
                    <button class="btn red">Favorite</button>
                    `;
                }else{
                    button = `
                    <button class="btn teal" onclick="addFavorite(${data.id},'${data.name}')">+ Add to Favorite</button>
                    `;
                }
                left.innerHTML +=  button;
            })
            
            var html = ""
            html += `<h4>Active Competitions</h4>

            <table class="table-responsive">
                    <tr>
                        <th>Area</th>
                        <th>Name</th>
                    </tr>`

            data.activeCompetitions.forEach((competition)=>{
                html += `
                    <tr>
                        <td>${competition.area.name}</td>
                        <td>${competition.name}</td>
                    </tr>
                `
            })

            html += `</table>`

            html += `<h4>Squad</h4>

            <table class="table-responsive">
                    <tr>
                        <th>Name</th>
                        <th>Position</th>
                        <th>Nationality</th>
                    </tr>`

            data.squad.forEach((player)=>{
                html += `
                    <tr>
                        <td>${player.name}</td>
                        <td>${player.position}</td>
                        <td>${player.nationality}</td>
                    </tr>
                `
            })

            html += `</table>`
            content.innerHTML += html
        })
    }else{
        fetch(base_url+"teams/"+id,{headers:{'X-Auth-Token':API_KEY}}).then(status).then(json).then(function(data){
            var content = document.querySelector("#content")
            document.querySelector("#name").innerHTML = data.name;
            var left = document.querySelector("#img");
            left.innerHTML += `<img src="${data.crestUrl}" alt="${data.name}" width="200">`;

            checkFavorite(data.id).then(function(res){
                var button = "";
                if(res){
                    button = `
                    <button class="btn red">Favorite</button>
                    `;
                }else{
                    button = `
                    <button class="btn teal" onclick="addFavorite(${data.id},'${data.name}')">+ Add to Favorite</button>
                    `;
                }
                left.innerHTML +=  button;
            })


            var html = ""
            html += `<h4>Active Competitions</h4>

            <table class="table-responsive">
                    <tr>
                        <th>Area</th>
                        <th>Name</th>
                    </tr>`

            data.activeCompetitions.forEach((competition)=>{
                html += `
                    <tr>
                        <td>${competition.area.name}</td>
                        <td>${competition.name}</td>
                    </tr>
                `
            })

            html += `</table>`

            html += `<h4>Squad</h4>

            <table class="table-responsive">
                    <tr>
                        <th>Name</th>
                        <th>Position</th>
                        <th>Nationality</th>
                    </tr>`

            data.squad.forEach((player)=>{
                html += `
                    <tr>
                        <td>${player.name}</td>
                        <td>${player.position}</td>
                        <td>${player.nationality}</td>
                    </tr>
                `
            })

            html += `</table>`
            content.innerHTML += html
        })
    }
    
}
