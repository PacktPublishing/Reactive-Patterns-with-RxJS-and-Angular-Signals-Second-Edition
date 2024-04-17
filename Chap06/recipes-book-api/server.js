const fs = require('fs')
const jsonServer = require('json-server')
const server = jsonServer.create()
server.use(jsonServer.defaults());
const recipes = JSON.parse(fs.readFileSync('./db-json/recipes.json', 'UTF-8'));
const tags = JSON.parse(fs.readFileSync('./db-json/tags.json', 'UTF-8'));

const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8081 });
let timerId = null;

server.get('/api/recipes', (req, res) => {
  res.status(200).json(recipes)
})
server.get('/api/recipes/:id', (req, res) => {
  const { id } = req.params;
  const recipe = recipes.find(recipe => recipe.id === parseInt(id));
  if (recipe) {
    res.status(200).json(recipe);
  } else {
    res.status(404).json({ error: 'Recipe not found' });
  }
});

server.get('/api/tags', (req, res) => {
  const query = req.query.criteria;

  // Filter the tags based on the query
    const filteredTags = tags.filter(tag => tag.name.toLowerCase().includes(query.toLowerCase()));
    res.status(200).json(filteredTags); // Send back the filtered tags as JSON

});

server.get('/api/recipesByTags/', (req, res) => {
  setTimeout(() => {
  const tagName = req.query.tagName;
  const filteredRecipes = recipes.filter(recipe => recipe.tags?.toLowerCase().includes(tagName.toLowerCase()));
  res.status(200).json(filteredRecipes);
}, 4000);
});

// server.get('/api/recipes', (req, res) => {
//   res.status(200).json(recipes)
//   const { page, limit } = req.query;
//   const pageNum = parseInt(page) || 1;
//   const pageSize = parseInt(limit) || 10;
//   const startIndex = (pageNum - 1) * pageSize;
//   const endIndex = pageNum * pageSize;
//   const paginatedRecipes = recipes.slice(startIndex, endIndex);
//   res.status(200).json(paginatedRecipes);

// })

server.post('/api/recipes', (req, res) => {
  setTimeout(() => {
  res.status(200).json(req.body);
}, 4000);


})

server.listen(3001, () => {
  console.log('Run Auth API Server')
})

wss.on('connection', ws => {
  onConnection(ws);
  ws.on('message', message => {
    onMessage(message, ws);
  });
  ws.on('error', error => {
    OnError(error);
  });
  ws.on('close', ws => {
    onClose();
  })

});

function onConnection(ws) {
  console.log(`Connection Established. Listenning on ${wss.options.port}`);
  // ws.send(JSON.stringify(  ));

  if (!timerId) {
    startTimer(ws);
  }
}

function onClose() {
  timerId = null;
  console.log('connection closed');
}

function OnError(error) {
  console.log(`Error => ${error[code]}`);
}

function onMessage(message, ws) {
  console.log(`Received message => ${message}`);
}

function startTimer(ws) {
  timerId = setInterval(() => {
    ws.send(JSON.stringify([{
      "id": 12,
      "title": "Chilli chicken",
      "prepTime": "10",
      "cookTime": "35",
      "servings": 10,
      "ingredients": [" 1 cup white sugar", "½ cup butter", "2 eggs", "2 teaspoons vanilla extract",
      "1 ½ cups all-purpose flour","1 ¾ teaspoons baking powder",
      "¾ cup milk",
      "1 tablespoon lemon zest",
      "1 tablespoon lemon juice"
      ],
      "steps": ["Step 1:Preheat the oven to 350 degrees F (175 degrees C). Grease a 9-inch square baking pan", 
      "Step 2: Beat sugar and butter together in a mixing bowl using an electric mixer until light and fluffy. Beat in eggs and vanilla extract",
      "Step 3: Sift flour and baking powder together in a separate bowl; add to creamed mixture. Pour in milk, lemon zest, and lemon juice and mix until you achieve a smooth batter. Spoon batter into the prepared pan.",
      "Step 4: Bake in the preheated oven until a toothpick inserted into the center comes out clean, about 35 minutes."
      ],
      "imageUrl": "chicken.jpg"
    }]));
  }, 5000);
}
