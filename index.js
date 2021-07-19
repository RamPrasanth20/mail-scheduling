const express=require('express');
const body=require('body-parser');
const cors=require('cors');
const path = require('path')

     
const app = express();
app.use(cors());

app.use(express.urlencoded({extended : true}));

app.use(express.json())
app.use(require('./routes/api'));

app.use(express.static("client/build"));
app.get("*", (req, res) => {
     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
   });

app.listen(process.env.PORT || 4000,function(){
     console.log("listening.. on port "+4000);
});

