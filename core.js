// Brukerens registrerte studietider
let studyTimes = [
    { subject: "Matematikk", room: "Rom 101", status: "Godkjent" },
    { subject: "Fysikk", room: "Rom 202", status: "Venter på godkjenning" },
];

// Hent tabell og form-elementer
const studyTimeTable = document.getElementById("studyTimeTable").getElementsByTagName("tbody")[0];
const studyTimeForm = document.getElementById("studyTimeForm");

// Funksjon for å oppdatere tabellen
function updateStudyTimeTable() {
    studyTimeTable.innerHTML = ""; // Tøm tabellen før oppdatering
    studyTimes.forEach((studyTime, index) => {
        let row = studyTimeTable.insertRow();

        // Sett inn fag og rom
        let cell1 = row.insertCell(0);
        cell1.innerText = studyTime.subject;

        let cell2 = row.insertCell(1);
        cell2.innerText = studyTime.room;

        // Sett inn status
        let cell3 = row.insertCell(2);
        cell3.innerHTML = `<span class="status-${studyTime.status.toLowerCase()}">${studyTime.status}</span>`;

        // Sett inn handlinger (rediger/slett hvis status er "Venter på godkjenning")
        let cell4 = row.insertCell(3);
        if (studyTime.status === "Venter på godkjenning") {
            cell4.innerHTML = `
                <button class="edit" onclick="editStudyTime(${index})">Rediger</button>
                <button class="delete" onclick="deleteStudyTime(${index})">Slett</button>
            `;
        } else {
            cell4.innerHTML = "-";
        }
    });
}

// Håndter innsending av nytt studietid
studyTimeForm.onsubmit = function(event) {
    event.preventDefault(); // Hindre sideinnlasting

    // Hent verdier fra form
    const subject = document.getElementById("subject").value;
    const room = document.getElementById("room").value;

    // Legg til ny studietid med status "Venter på godkjenning"
    studyTimes.push({ subject, room, status: "Venter på godkjenning" });

    // Oppdater tabellen
    updateStudyTimeTable();
};

// Funksjon for å redigere studietid
function editStudyTime(index) {
    const newSubject = prompt("Rediger fag:", studyTimes[index].subject);
    const newRoom = prompt("Rediger rom:", studyTimes[index].room);

    if (newSubject !== null && newRoom !== null) {
        studyTimes[index].subject = newSubject;
        studyTimes[index].room = newRoom;
        updateStudyTimeTable();
    }
}

// Funksjon for å slette studietid
function deleteStudyTime(index) {
    if (confirm("Er du sikker på at du vil slette denne registreringen?")) {
        studyTimes.splice(index, 1);
        updateStudyTimeTable();
    }
}

// Initial oppdatering av tabellen
updateStudyTimeTable();
