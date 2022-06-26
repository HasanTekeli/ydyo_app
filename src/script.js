quizmaker_btn = document.querySelector("quizmaker_btn")

document.getElementById("arrange_results_btn").addEventListener("click", (evt) => {
    evt.preventDefault()
    window.postMessage({
        type: "select-dirs",
    })
})


function qmbtn_onclick(){
    console.log("Clicked")
}

function results_onclick(){
    console.log("results")
}
    