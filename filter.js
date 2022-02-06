let filters = document.querySelectorAll(".filter");
let selectedfilter = "none";

for(let i=0;i<filters.length;i++){
    filters[i].addEventListener("click", function(e) { 
        console.log(e);
        let currentfilter = e.target.style.backgroundColor;
        if(currentfilter == ""){
            if(document.querySelector(".filter-div")){
                document.querySelector(".filter-div").remove();
                selectedfilter = "none";
                return;
            }
        }
        if(selectedfilter == currentfilter){
            return;
        }
        let filterdiv = document.createElement("div");
        filterdiv.classList.add("filter-div");
        filterdiv.style.backgroundColor = currentfilter;

        if(selectedfilter=="none"){
            document.body.append(filterdiv);
        }
        else{
            document.querySelector(".filter-div").remove();
            document.body.append(filterdiv);
        }
        selectedfilter = currentfilter;
    });
}