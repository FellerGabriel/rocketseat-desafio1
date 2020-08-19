const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4");
const { isUuid } = require("uuidv4");


const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {

  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;
  const likes = 0;

  const repositorie = { id: uuid(), title, url, techs, likes };

  repositories.push(repositorie);

  return response.json(repositorie);
});

app.put("/repositories/:id", (request, response) => {
	const { title, url, techs, likes } = request.body;
	const { id } = request.params;

  if(likes > 0){
	  return response.json({"likes":0})
  }

  repositorieIndex = repositories.findIndex((repositories) => repositories.id == id);

  if (repositorieIndex < 0) {
    return response.status(400).json({ error: "Deu Ruim, não tem esse id naum" });
  }
  
  const updatedRepositorie = {title,url,techs};

  repositories[repositorieIndex] = updatedRepositorie;

  return response.json(updatedRepositorie);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  repositorieIndex = repositories.findIndex((repositorie) => repositorie.id == id);

  if (repositorieIndex < 0) {
    return response.status(400).json({ error: "Deu Ruim, não tem esse id naum" });
  }

  repositories.splice(repositorieIndex, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params

  repositorieIndex = repositories.findIndex((repositorie) => repositorie.id == id);
 
  if (repositorieIndex < 0) {
    return response.status(400).json({ error: "Deu Ruim, não tem esse id naum" });
  }

  const repositorie = repositories.find((repositories) => repositories.id == id);
  
  repositorie.likes ++

  repositories[repositorieIndex] = repositorie;
  
  return response.json(repositorie)

});

module.exports = app;
