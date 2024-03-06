const inspire = require('./db.json')
let updateId  = 6;
let goals = [];
let healthData = [];

module.exports = {
    
    getCompliment: (req, res) => {
        const compliments = ["Gee, you're a smart cookie!", "Cool shirt!", "Your Javascript skills are stellar."];
      
        // choose random compliment
        let randomIndex = Math.floor(Math.random() * compliments.length);
        let randomCompliment = compliments[randomIndex];
      
        res.status(200).send(randomCompliment);
    },

    //  Add a New Feature code on the Node.js backend. 

    getFortune: (req, res) => {
        const fortunes  = [
            "Have a beautiful day.", "Wish you happiness.", "Love lights up the world.", "You are working hard.", "Your goal will be reached very soon.", "Your reputation is your wealth",
            "Your ability is appreciated."
        ];

        // choose random fortune
        const randomFortuneIndex = Math.floor(Math.random() * fortunes.length);

        const randomFortuneValue = fortunes [randomFortuneIndex];  
        
        res.status(200).send(randomFortuneValue);
    
    },

    getInspires: (req, res) =>{
        res.status(200).send(inspire);
        },
    
        createInspire: (req, res) =>{
        const { words, name, rating, imageURL } = req.body;
     
        const newInspire = {
         id: updateId,
         words,
         name,
         rating,
         imageURL
        }
     
        inspire.push(newInspire);
         res.status(200).json(inspire);
     },

     editInspire: (req, res) =>{
        const { identify } = req.params;
        const { type } = req.body;
    
        for(let i = 0; i < inspire.length; i++){
            if(inspire[i].id === Number(identify)){
    
                if(type === "plus" && inspire[i].rating < 5){
                    const newRating = inspire[i].rating + 1;
                    inspire[i].rating = newRating;
                    res.status(200).json(inspire);
                    return;
                }
                if(type === "minus" && inspire[i].rating > 0){
                    const newRating = inspire[i].rating - 1;
                    inspire[i].rating = newRating;
                    res.status(200).json(inspire);
                    return;
                }
            }
        }
    },

    deleteInspire: (req, res) => {
        const { identity } = req.params;
    
        for (let i = 0; i < inspire.length; i++){
            if(inspire[i].id === Number(identity)){
                inspire.splice(i, 1)
                res.status(200).json(inspire);
            }
        }
    },

    createGoal: (req, res) => {
        const { name, progress } = req.body;
         // Validate request data
         if(!name || !progress){
            return res.status(400).json({message: 'Name and progress are required'});
         }

           // Create a new goal object
        
           const newGoal = {
            id: goals.length + 1, 
            name: name,
            progress: progress
        };

        goals.push(newGoal);

        res.status(201).json({ message: 'Goal added successfully', goal: newGoal });
     },

     deleteGoal: (req, res) => {
        const { goalId } = req.params;
    
        for (let i = 0; i < goals.length; i++){
            if(goals[i].id === Number(goalId)){
                goals.splice(i, 1)
                res.status(200).json(goals);
            }
        }
    },
    
    // POST request to add a new health entr
    healthCreate: (req, res) =>{
        const { water, exercise, bloodsugerlevel } = req.body;
    const newEntry = {
        date: new Date().toString(),
        water,
        exercise,
        bloodsugerlevel
    };

    healthData.push(newEntry);
    res.json(newEntry);
    },

    deleteHealthRecord: (req, res) => {
        const { recordId } = req.params;
    
        // Find the index of the record with the specified ID
        const index = healthData.findIndex(record => record.id === Number(recordId));
    
        // If the record with the specified ID is found, delete it and send a success response
        if (index !== -1) {
            healthData.splice(index, 1);
            res.status(200).json({ message: 'Record deleted successfully' });
        } else {
            // If the record with the specified ID is not found, send a 404 error response
            res.status(404).json({ error: 'Record not found' });
        }
    }
}


    



