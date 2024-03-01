const daysTag = document.querySelector(".top_calender .days"),
currentDate = document.querySelector(".top_calender header .current-date"),
prevNextIcon = document.querySelectorAll(".top_calender .icons span");

let date = new Date(),
currYear = date.getFullYear(),
currMonth = date.getMonth();

// const months = ["January", "February", "March", "April", "May", "June", "July",
//               "August", "September", "October", "November", "December"];
const months = ["1월", "2월", "3월", "4월", "5월", "6월", "7월","8월", "9월", "10월", "11월", "12월"];
// const months = ["01", "02", "03", "04", "05", "06", "07","08", "09", "10", "11", "12"];
// const months = ["1月", "2月", "3月", "4月", "5月", "6月", "7月","8月", "9月", "10月", "11月", "12月"];

const renderCalendar = () => {
    let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(),
    lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(),
    lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(),
    lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate();
    let liTag = "";

    for (let i = firstDayofMonth; i > 0; i--) {
        liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
    }

    for (let i = 1; i <= lastDateofMonth; i++) { 
        let isToday = i === date.getDate() && currMonth === new Date().getMonth() 
                     && currYear === new Date().getFullYear() ? "active" : "";
        liTag += `<li class="${isToday}">${i}</li>`;
    }

    for (let i = lastDayofMonth; i < 6; i++) {
        liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`
    }
    currentDate.innerText = `${currYear} ${months[currMonth]}`; // passing current mon and yr as currentDate text
    daysTag.innerHTML = liTag;
}
renderCalendar();

prevNextIcon.forEach(icon => { // getting prev and next icons
    icon.addEventListener("click", () => { // adding click event on both icons
        // if clicked icon is previous icon then decrement current month by 1 else increment it by 1
        currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;

        if(currMonth < 0 || currMonth > 11) { // if current month is less than 0 or greater than 11
            // creating a new date of current year & month and pass it as date value
            date = new Date(currYear, currMonth, new Date().getDate());
            currYear = date.getFullYear(); // updating current year with new date year
            currMonth = date.getMonth(); // updating current month with new date month
        } else {
            date = new Date(); // pass the current date as date value
        }
        renderCalendar(); // calling renderCalendar function
    });
});