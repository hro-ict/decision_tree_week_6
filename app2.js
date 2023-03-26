import { DecisionTree } from "./libraries/decisiontree.js"
import { VegaTree } from "./libraries/vegatree.js"


var predict_diabetes;

$.fn.serializeObject = function() {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name]) {
            if (!o[this.name].push) {
                o[this.name] = [o[parseFloat(this.name)]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};


$( "form" ).on( "submit", function( event ) {
event.preventDefault();
//console.log( $( this ).serialize() );
var dat= JSON.stringify($("form").serializeObject())
predict_diabetes= JSON.parse(dat)

fetch("./model.json")
        .then((response) => response.json())
        .then((model) => {
            let decisionTree = new DecisionTree(model)

            // test om te zien of het werkt
            // let passenger = { Pregnant: 1, Glucose: 120, Bp: 82, Skin: 42 ,
            //     Insulin:96, bmi:31.6, Pedigree:0.637, Age: 23
            
            // }
            let prediction = decisionTree.predict(predict_diabetes)
            console.log("predicted " + prediction)  
            if (prediction==1){
               
                Swal.fire('You have a  high chance of having diabetes')
            }
            if (prediction==0) {
                Swal.fire('You have a low chance of having diabetes')
            }
        })


});







// function loadSavedModel() {
//     fetch("./model.json")
//         .then((response) => response.json())
//         .then((model) => modelLoaded(model))
// }

// function modelLoaded(model) {
//     let decisionTree = new DecisionTree(model)

//     // test om te zien of het werkt
//     let passenger = { Pregnant: 1, Glucose: 120, Bp: 82, Skin: 42 ,
//         Insulin:96, bmi:31.6, Pedigree:0.637, Age: 23
    
//     }
//     let prediction = decisionTree.predict(dati)
//     console.log("predicted " + prediction)
// }

// loadSavedModel()












// import { DecisionTree } from "./libraries/decisiontree.js"
// import { VegaTree } from "./libraries/vegatree.js"

// //
// // DATA
// //
// const csvFile = "./data/diabetes.csv"
// const trainingLabel = "Label"  
// const ignored = []  

// //
// // laad csv data als json
// //
// function loadData() {
//     Papa.parse(csvFile, {
//         download: true,
//         header: true,
//         dynamicTyping: true,
//         complete: results => console.log(results.data)   // gebruik deze data om te trainen
//     })
// }



// //
// // MACHINE LEARNING - Decision Tree
// //
// function trainModel(data) {
//     // todo : splits data in traindata en testdata
//     // Shuffle the data randomly
//     data.sort(() => (Math.random() - 0.5))
//     // Split the data into train and test sets
//     let trainData = data.slice(0, Math.floor(data.length * 0.8))
//     let testData = data.slice(Math.floor(data.length * 0.8) + 1)


//     // maak het algoritme aan
//     let decisionTree = new DecisionTree({
//         ignoredAttributes: ['Pregnancies', 'Outcome'],
//         trainingSet: trainData,
//         categoryAttr: trainingLabel
//     })

//     // Teken de boomstructuur - DOM element, breedte, hoogte, decision tree
//     let json = decisionTree.toJSON()
//     let visual = new VegaTree('#view', 2300, 1000, json)

//     // todo : maak een prediction met een sample uit de testdata
//     let diabetes = testData[0]
//     let diabetesPrediction = decisionTree.predict(diabetes)
//     console.log(`Survived the holiday : ${diabetesPrediction}`)


//     // todo : bereken de accuracy met behulp van alle test data
//     function testDiabetes(diabetes) {
//         // kopie van diabetes maken, zonder het "Label" label
//         const diabetesWithoutLabel = { ...diabetes }
//         delete diabetesWithoutLabel.Label
    
//         // prediction
//         let prediction = decisionTree.predict(diabetesWithoutLabel)
    
//         // vergelijk de prediction met het echte label
//         let message = (prediction === diabetes[trainingLabel]) ? "goed voorspeld!" : "fout voorspeld!"
//         console.log(message)
//     }
   
    
//     testPassenger(testData[0])


// }


// loadData()