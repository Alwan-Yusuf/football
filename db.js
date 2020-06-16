var dbPromise = idb.open("competitions",1,function(upgradeDb){
    if(!upgradeDb.objectStoreNames.contains("favorite")){
        upgradeDb.createObjectStore("favorite",{keyPath:'id'});
    }
});

function getFavorites(){
    return dbPromise.then(function(db){
        var tx = db.transaction("favorite","readonly");
        var store = tx.objectStore("favorite");
        return store.getAll();
    }).then(function(items){
        var html = `
        <table class="table table-hover">
        <tr>
            <th>No</th>
            <th>Name</th>
            <th>Action</th>
        </tr>
        `;
        var no = 1;
        items.forEach(function(item){
            html += `
                
                    <tr>
                        <td>${no}</td>
                        <td>${item.name}</td>
                        <td>
                            <button class="btn btn-danger" onclick="delFavorite(${item.id})">delete</button>
                        </td>
                    </tr>
            `;
            no++;
        })

        html += `</table>`;

        document.querySelector("#favorite").innerHTML = html
    })
}

function checkFavorite(id){
    return dbPromise.then(function(db){
        var tx = db.transaction("favorite","readonly");
        var store = tx.objectStore("favorite");
        return store.get(id);
    }).then(function(item){
        if(item){
            return true;
        }
        return false;
    })
}

function addFavorite(id,name){
    dbPromise.then(function(db){
        var tx = db.transaction("favorite","readwrite");
        var store = tx.objectStore("favorite");
        var data = {
            id:id,
            name:name
        };
        store.add(data);
        return tx.complete;
    }).then(function(){
        console.log('success')
        location.reload();
    }).catch(function(){
        console.log('failed')
    })
}

function delFavorite(id){
    dbPromise.then(function(db){
        var tx = db.transaction("favorite","readwrite");
        var store = tx.objectStore("favorite");
        store.delete(id);
        return tx.complete;
    }).then(function(){
        console.log('success')
        location.reload();
    },function(){
        console.log('failed')
    })
}