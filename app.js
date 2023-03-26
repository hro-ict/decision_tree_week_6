import { DecisionTree } from "./libraries/decisiontree.js"
import { VegaTree } from "./libraries/vegatree.js"

//
// DATA
//
const csvFile = "./data/diabetes.csv"
const trainingLabel = "Label"  
const ignored = ["Skin"]  

var positive_true=0;
var negative_true=0;
var positive_false=0;
var negative_false=0;



//
// laad csv data als json
//
function loadData() {
    Papa.parse(csvFile, {
        download: true,
        header: true,
        dynamicTyping: true,
        complete: results => trainModel(results.data)
    })
}

//
// MACHINE LEARNING - Decision Tree
//
function trainModel(data) {
    // todo : splits data in traindata en testdata
    // Shuffle the data randomly
    data.sort(() => (Math.random() - 0.5))
    // Split the data into train and test sets
    let trainData = data.slice(0, Math.floor(data.length * 0.8))
    let testData = data.slice(Math.floor(data.length * 0.8))

    

    // maak het algoritme aan
    let decisionTree = new DecisionTree({
        ignoredAttributes: ['Pregnant','Label'],
        trainingSet: trainData,
        categoryAttr: trainingLabel
    })

    console.log(decisionTree.toJSON())
    // Teken de boomstructuur - DOM element, breedte, hoogte, decision tree
    let json = decisionTree.toJSON()
    let visual = new VegaTree('#view', 2300, 1000, json)
    console.log(decisionTree.stringify())
  

    // maak een prediction met een sample uit de testdata
    let diabetes = testData[0]
    let diabetesPrediction = decisionTree.predict(diabetes)
    console.log(`Prediction for diabetes: ${diabetesPrediction}`)



    // bereken de accuracy met behulp van alle test data
    let correctPredictions = 0
    for (let i = 0; i < testData.length; i++) {
        console.log("Test: "+ decisionTree.predict(testData[i]))
        console.log("Label: "+ testData[i][trainingLabel])
    //  ///
 
     ///
        if (decisionTree.predict(testData[i]) == testData[i][trainingLabel]) {
            correctPredictions+=1
            console.log("juist")

            if (decisionTree.predict(testData[i])==1){
                console.log("Positief TRUE")
              positive_true+=1
             $("#positive_true").html(positive_true)
            }
            if (decisionTree.predict(testData[i])==0){
                console.log("Negatief TRUE")
                negative_true+=1
                $("#negative_true").html(negative_true)
            }
        }

        else {
            if (decisionTree.predict(testData[i])==1){
                console.log("Positief FALSE")
                positive_false+=1
                $("#positive_false").html(positive_false)
            }
            if (decisionTree.predict(testData[i])==0){
                console.log("Negatief FALSE")
                negative_false+=1
                $("#negative_false").html(negative_false)
            }

        }
      
    }
    
    let accuracy = correctPredictions / testData.length*100
    accuracy= accuracy.toFixed(2)
    console.log(`Accuracy: % ${accuracy}`)
    document.getElementById("accuracy").innerHTML = "Accuracy: %"+accuracy;
}

loadData()


