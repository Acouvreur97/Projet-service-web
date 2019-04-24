const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();

//app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var db = mysql.createConnection({
host: "localhost",
user: "root",
password: "",
database: "projet",
port: "3306"
});

// ANIMALS

// Lire tous les animaux
   app.get('/animals', function(req, res) {
    var query = "SELECT * FROM animals";

/*
//filtre condition
	var conditions = ["id","name","race","food_per_day","born","entrance","cage_id"];
	var my_fields = [];

	for(var index in conditions){
		if (conditions[index] in req.query) {
			if(query.indexOf("WHERE") < 0) {
				query +=" WHERE ";
			}
			my_fields.push(conditions[index] + "='"+req.query[conditions[index]] +"'");
		}
	}

	query +=my_fields.join(' AND ');


//filtre ordre
if("sort" in req.query){
	var sort = req.query["sort"].split(",");
	query += " ORDER BY";

	for(var index in sort){
		var direction = sort[index].substr(0,1);
		var field = sort[index].substr(1);

		query += " " + field;

		if (direction == "-")
			query += " DESC,";
		else
			query += " ASC,";
	}
	query = query.slice(0, -1);
}

//filtre champs

if("fields" in req.query) {
	query = query.replace("*", req.query["fields"]);
}

//filtre pagination

if("limit" in  req.query) {
	query += " LIMIT " + req.query["limit"];
	if("offset" in req.query) {
		query += " OFFSET " + req.query["offset"];
	}
}*/

//execution de la requête
	db.query(query, function(err, result, fields) {
		if(err) throw err;
		res.send(JSON.stringify(result));
	});

 });
/*
//lire 1 animal
   app.get('/animals/:id', function(req, res) {
  	var id = req.params.id;
    var query = "SELECT * FROM animals where id = "+ id;

//execution de la requête
	db.query(query, function(err, result, fields) {
		if(err) throw err;
		res.send(JSON.stringify(result));
	});

 });

//ajouter 1 animal
   app.post('/animals', function(req, res) {
  	var name = req.body.name;
  	var breed = req.body.breed;
  	var food_per_day = req.body.food_per_day;
  	var birthday = req.body.birthday;
  	var entry_date = req.body.entry_date;
  	var id_cage = req.body.id_cage;
    var query = "INSERT INTO animals (name,breed,food_per_day,birthday,entry_date,id_cage) values ('"+name+"','"+breed+"','"+food_per_day+"','"+birthday+"','"+entry_date+"',"+id_cage+")";

//execution de la requête
	db.query(query, function(err, result, fields) {
		if(err) throw err;
		res.send(JSON.stringify("Animal bien ajouté"));
	});

 });

//mise à jour d'un animal (d'un ou plusieurs de ces paramètres)
   app.put('/animals/:id', function(req, res) {
  	var id = req.params.id;
    var query = "UPDATE animals SET ";
    var my_fields = [];

    for(let i=0; i < Object.keys(req.body).length; i++){
    	my_fields[i]=(Object.keys(req.body)[i]+"="+"'"+Object.values(req.body)[i]+"'");
    }

    query += my_fields.join();
    query += " WHERE id="+id;

//execution de la requête
	db.query(query, function(err, result, fields) {
		if(err) throw err;
    res.send(JSON.stringify("Mise à jour réussie"));
	});

 });


//Supprimer 1 animal
   app.delete('/animals/:id', function(req, res) {
  	var id = req.params.id;
    var query = "DELETE FROM animals where id =" + id;
//execution de la requête
	db.query(query, function(err, result, fields) {
		if(err) throw err;
		res.send(JSON.stringify("Animal supprimé"));
	});

 });


//Supprimer tous les animaux
   app.delete('/', function(req, res) {
    var query = "DELETE FROM animals";

//execution de la requête
	db.query(query, function(err, result, fields) {
		if(err) throw err;
    res.send(JSON.stringify("Tous les animaux ont été supprimés"));
	});

 });

/*


//Animals-Cages
   router.get('/:id(\\d+)/cages', function(req, res) {
  	console.log('animals Cages');
  	var id = req.params.id;
    var query = "SELECT cage.id cage_id,cage.name cage_name,cage.description,animal.id animal_id,animal.NAME animal_name,animal.race,animal.born,animal.entrance from animal INNER JOIN cage on animal.cage_id=cage.id where animal.id ="+id;

//execution de la requête
	db.query(query, function(err, result, fields) {
		if(err) throw err;
		res.send(JSON.stringify(result));
	});

 });

   router.get('/:id_animal(\\d+)/cages/:id_cage(\\d+)', function(req, res) {
  	console.log('animals Cages');
  	var id_cage = req.params.id_cage;
  	var id_animal = req.params.id_animal;
    var query = "SELECT cage.id cage_id,cage.name cage_name,cage.description,animal.id animal_id,animal.NAME animal_name,animal.race,animal.born,animal.entrance from animal INNER JOIN cage on animal.cage_id=cage.id where animal.id ="+id_animal+" AND cage.id="+id_cage;

//execution de la requête
	db.query(query, function(err, result, fields) {
		if(err) throw err;
		res.send(JSON.stringify(result));
	});

 });



//animals-Foods
   router.get('/:id(\\d+)/foods', function(req, res) {
  	console.log('animals Food');
  	var id = req.params.id;
    var query = "SELECT food.id, animal.name animal_name,animal.race,food.name food_name,food.animal id_animal,food.quantity from animal INNER JOIN food on animal.id=food.animal where animal.id = "+id;

//execution de la requête
	db.query(query, function(err, result, fields) {
		if(err) throw err;
		res.send(JSON.stringify(result));
	});

 });

   router.get('/:id_animal(\\d+)/foods/:id_food(\\d+)', function(req, res) {
  	console.log('animals Food');
  	var id_food = req.params.id_food;
  	var id_animal = req.params.id_animal;
    var query = "SELECT food.id, animal.name animal_name,animal.race,food.name food_name,food.animal id_animal,food.quantity from animal INNER JOIN food on animal.id=food.animal where animal.id="+id_animal+" AND food.id="+id_food;

//execution de la requête
	db.query(query, function(err, result, fields) {
		if(err) throw err;
		res.send(JSON.stringify(result));
	});

}); */

app.listen(3000, function() {
db.connect(function(err) {
if (err) throw err;
console.log('Connection to database successful!');
});
console.log('Example app listening on port 3000!');
});
