console.log("tied-in")

$(".showMe").on('click', e => {
//    e.preventDefault()
    console.log("clisk")

    $.get("/api/readdb", function(data){
        console.log(data);
        for (let i =0; i<data.length; i++){
            const myStr = `<div class="card">
            <h3>name: ${data[i].name}</h3>
            <h5>Is Student: ${data[i].isStudent}</h5>
        </div>`
            $(".append_here").append(myStr);
        }
    })
    
})

$(".submitBtn").on('click', e => {
    e.preventDefault();
    console.log("submut1");

    const stuData ={
        userName:$(".userName").val().trim(),
        trueOrFalse:$(".userStudent").val().trim().toLowerCase() === "y" ? true : false
    }
    $.post("/api/create", stuData, function(data){
       window.location.href="/mypage";
    })
})