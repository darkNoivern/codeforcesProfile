document.querySelector(".search-handle").addEventListener('click',function(){

    let handle = document.querySelector(".getHandle").value;
    document.querySelector(".getHandle").value = '';
    document.querySelector(".getHandle").placeholder = 'Search';
    // console.log(handle);
    requiem(handle);
});

requiem("tourist");

function requiem(handle){

    let url = `https://codeforces.com/api/user.info?handles=${handle}`;
    
    // let statsURL = `https://codeforces.com/api/user.status?handle=Fefer_Ivan&from=1&count=10`;
    let statsURL = `https://codeforces.com/api/user.status?handle=${handle}`;
    
    fetch(url)
    .then((response) => {
        return response.json();
    }).then((data) => {
        // console.log(data);
        // console.log(data.result[0].rating);
        setUser(data);
    });

    fetch(statsURL)
    .then((response) => {
        return response.json();
    }).then((data) => {
        changeDetails(data);
    });
}

function setUser(data){
    
    //  USER INFO API
    let handle = data.result[0].handle;
    let shandle = handle.slice(1);
    document.querySelector(".handle").innerHTML = `<span>${handle[0]}</span>${shandle}`;
    document.querySelector(".currentRating").textContent = data.result[0].rating;
    document.querySelector(".currentRank").textContent = data.result[0].rank;
    document.querySelector(".numberOfFriends").textContent = `Friend of ${data.result[0].friendOfCount} Users 🐾`;
    document.querySelector("img").src = data.result[0].titlePhoto;
    // console.log(data.result[0].titlePhoto);
    document.querySelector(".max-rating").textContent = data.result[0].maxRating;
    document.querySelector(".max-rank").textContent = data.result[0].maxRank;  
    let maxRank = data.result[0].maxRank
    
    console.log(maxRank);
    console.log(data.result[0].rank);

    sus(maxRank);
    imposter(data.result[0].rank);

}

function changeDetails(data){

    //  https://codeforces.com/api/user.status?handle=Fefer_Ivan&from=1&count=10
    
    let totalSubmissions = data.result.length;
    let submissions = data.result;

    const acceptedSubmissions = submissions.filter(function(submission){
        if(submission.verdict === "OK"){
            return true;
        }
    }).length;

    // console.log(acceptedSubmissions);

    document.querySelector(".ac-count").textContent = acceptedSubmissions;
    document.querySelector(".accuracy").textContent = `${(acceptedSubmissions/totalSubmissions*100).toFixed(2)} %`;
    
    const easyProblems = submissions.filter(submission => submission.verdict === "OK")
                                    .filter(submission => submission.problem.rating <= 1300).length; 

    console.log(easyProblems);

    const mediumProblems = submissions.filter(submission => submission.verdict === "OK")
                                    .filter(submission => submission.problem.rating <= 2000).length; 

    console.log(mediumProblems);

    const hardProblems = submissions.filter(submission => submission.verdict === "OK")
                                    .filter(submission => submission.problem.rating <= 3500).length; 
    
    console.log(hardProblems);

    document.querySelector(".easy-problems").textContent = easyProblems;
    document.querySelector(".medium-problems").textContent = mediumProblems-easyProblems;
    document.querySelector(".hard-problems").textContent = hardProblems-mediumProblems;
    document.querySelector(".unrated-problems").textContent = acceptedSubmissions-(hardProblems);

    // const retailCompanies = companies.filter(function(company){
    //     if(company.category==='auto'){
    //         return true;
    //     }
    // });
}

function sus(maxRank){
    if(maxRank === "newbie"){
        document.querySelector(".max-rating-header").style.backgroundColor = "grey";
        document.querySelector(".max-rank-header").style.backgroundColor = "grey";
        document.querySelector(".max-rating-header").style.color = "white";
        document.querySelector(".max-rank-header").style.color = "white";
    }
    else if(maxRank === "pupil"){
        document.querySelector(".max-rating-header").style.backgroundColor = "green";
        document.querySelector(".max-rank-header").style.backgroundColor = "green";    
        document.querySelector(".max-rating-header").style.color = "white";
        document.querySelector(".max-rank-header").style.color = "white";
    }
    else if(maxRank === "specialist"){
        document.querySelector(".max-rating-header").style.backgroundColor = `#03a89e`;
        document.querySelector(".max-rank-header").style.backgroundColor = `#03a89e`;
    
    }
    else if(maxRank === "expert"){
        document.querySelector(".max-rating-header").style.backgroundColor = "blue";
        document.querySelector(".max-rank-header").style.backgroundColor = "blue";
        document.querySelector(".max-rating-header").style.color = "white";
        document.querySelector(".max-rank-header").style.color = "white";
    }
    else if(maxRank === "candidate master"){
        document.querySelector(".max-rating-header").style.backgroundColor = "blueviolet";
        document.querySelector(".max-rank-header").style.backgroundColor = "blueviolet";
        document.querySelector(".max-rating-header").style.color = "white";
        document.querySelector(".max-rank-header").style.color = "white";
    }
    else if(maxRank === "master" || maxRank === "international master"){
        document.querySelector(".max-rating-header").style.backgroundColor = "orange";
        document.querySelector(".max-rank-header").style.backgroundColor = "orange";
    }
    else if(maxRank === "grandmaster" || maxRank === "international grandmaster"){
        document.querySelector(".max-rating-header").style.backgroundColor = "red";
        document.querySelector(".max-rank-header").style.backgroundColor = "red";
        document.querySelector(".max-rating-header").style.color = "white";
        document.querySelector(".max-rank-header").style.color = "white";
    }
    else if(maxRank === "legendary grandmaster"){
        document.querySelector(".max-rating-header").style.backgroundColor = "red";
        document.querySelector(".max-rank-header").style.backgroundColor = "red";
    }
}

function imposter(currentRank){
    if(currentRank === "newbie"){
        document.querySelector(".handle").style.color = "grey";
        document.querySelector(".currentRating").style.color = "grey";
        document.querySelector(".currentRank").style.color = "grey";
    }
    else if(currentRank === "pupil"){
        document.querySelector(".handle").style.color = "green";
        document.querySelector(".currentRating").style.color = "green";
        document.querySelector(".currentRank").style.color = "green";
    }
    else if(currentRank === "specialist"){
        document.querySelector(".handle").style.color = `#03a89e`;
        document.querySelector(".currentRating").style.color = `#03a89e`;
        document.querySelector(".currentRank").style.color = `#03a89e`;
    }
    else if(currentRank === "expert"){
        document.querySelector(".handle").style.color = "blue";
        document.querySelector(".currentRating").style.color = "blue";
        document.querySelector(".currentRank").style.color = "blue";
    }
    else if(currentRank === "candidate master"){
        document.querySelector(".handle").style.color = "blueviolet";
        document.querySelector(".currentRating").style.color = "blueviolet";
        document.querySelector(".currentRank").style.color = "blueviolet";
    }
    else if(currentRank === "master" || currentRank === "international master"){
        document.querySelector(".handle").style.color = "orange";
        document.querySelector(".currentRating").style.color = "orange";
        document.querySelector(".currentRank").style.color = "orange";
    }
    else if(currentRank === "grandmaster" || currentRank === "international grandmaster"){
        document.querySelector(".handle").style.color = "red";
        document.querySelector(".currentRating").style.color = "red";
        document.querySelector(".currentRank").style.color = "red";
    }
    else if (currentRank === "legendary grandmaster"){
        document.querySelector(".handle").style.color = "red";
        document.querySelector("span").style.color = "black";
        document.querySelector(".currentRating").style.color = "red";
        document.querySelector(".currentRank").style.color = "red";
    }
}

// #03a89e -> cyan