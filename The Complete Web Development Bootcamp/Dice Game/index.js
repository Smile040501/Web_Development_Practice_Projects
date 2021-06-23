$("h1").hide();

$("p").css("margin-top", "10%");

$(".button").click(function () {
    let randomNumber1 = 1 + Math.floor(Math.random() * 6);

    let randomImageSource1 = "images/dice" + randomNumber1 + ".png";

    $(".img1").attr("src", randomImageSource1);

    let randomNumber2 = 1 + Math.floor(Math.random() * 6);

    let randomImageSource2 = "images/dice" + randomNumber2 + ".png";

    $(".img2").attr("src", randomImageSource2);

    $("h1").show();
    $("p").css("margin-top", "0%");
    if (randomNumber1 > randomNumber2) {
        $("h1").text("🚩 Player 1 Wins!");
    } else if (randomNumber1 < randomNumber2) {
        $("h1").text("Player 2 Wins! 🚩");
    } else {
        $("h1").text("Draw!");
    }
});
