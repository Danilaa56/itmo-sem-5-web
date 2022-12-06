alert = window.alert = function(msg) {
    let alertContainer = document.createElement("div");
    alertContainer.className = "alert_box";
    alertContainer.innerHTML = `<div class="alert">${msg}</div>`
    alertContainer.addEventListener("animationend", (e) => {
        switch (e.animationName) {
            case 'alert_hide':
                e.target.remove();
                break;
        }
    })
    document.body.appendChild(alertContainer);

    let containersList = document.querySelectorAll('.alert_box');
    let translate = alertContainer.offsetHeight;
    for (let i = containersList.length - 2; i >= 0; i--) {
        containersList[i].style.translate = `0 -${translate}px`;
        translate += containersList[i].offsetHeight;
    }

    setTimeout(() => alertContainer.style.translate = `0 0px`);
    setTimeout(() => alertContainer.className = "alert_box__hide", 5000);
}