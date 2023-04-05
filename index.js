async function main() {
  var viewtime = 0
  var viewsForEachPage = {}
  var viewTimeForEachPage = {}
  const response = await fetch("https://novella-cb696-default-rtdb.europe-west1.firebasedatabase.app/main/tracking.json");
  const jsonData = await response.json();
  console.log(Object.keys(jsonData).length);
  for(const key in jsonData) {
    viewtime += jsonData[key].timeOnSite
    if (viewsForEachPage[jsonData[key].pageUrl] == undefined) {
      viewsForEachPage[jsonData[key].pageUrl] = 1
    } else {
      viewsForEachPage[jsonData[key].pageUrl] += 1
    }
    if (viewTimeForEachPage[jsonData[key].pageUrl] == undefined) {
      viewTimeForEachPage[jsonData[key].pageUrl] = jsonData[key].timeOnSite
    } else {
      viewTimeForEachPage[jsonData[key].pageUrl] += jsonData[key].timeOnSite
    }

  }
document.getElementById("views").innerHTML = Object.keys(jsonData).length + " megtekintés, " + Math.round(viewtime / 60) + "perc olvasási idő (JSON alapján)";
console.log(viewsForEachPage)
console.log(Object.keys(viewsForEachPage))
var viewsArray = []
var labelsArray = []
var labels2Array = []
for (const key in viewsForEachPage) {
  viewsArray.push(viewsForEachPage[key])
  labelsArray.push(key)
  labels2Array.push(Math.round(viewTimeForEachPage[key]))
}
console.log(viewsArray)
console.log(labelsArray)
console.log(labels2Array)


const ctx = document.getElementById('myChart');

new Chart(ctx, {
  type: 'bar',
  data: {
    labels: labelsArray,
    datasets: [{
      label: 'Megtekintések',
      data: viewsArray,
      borderWidth: 1,
    },
    {
      label: 'Olvasási idő, JSON alapján',
      data: labels2Array,
      borderWidth: 1,
      yAxisID: 'y1'
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      },
      y1: {
        beginAtZero: true
    }
    }
  }
});
}

main()
