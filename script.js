document.addEventListener("DOMContentLoaded", () => {
    loadConfigOptions();
    loadTableData();

    const form = document.getElementById("ecrForm");
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        saveEcrData();
    });
});

function loadConfigOptions() {
    if (typeof CONFIG !== "undefined") {
        // Plant Options
        const plantSelect = document.getElementById("plant");
        if (CONFIG.plants) {
            CONFIG.plants.forEach(plant => {
                const opt = document.createElement("option");
                opt.value = plant;
                opt.textContent = plant;
                plantSelect.appendChild(opt);
            });
        }

        // Status Options
        const statusSelect = document.getElementById("status");
        if (CONFIG.statuses) {
            CONFIG.statuses.forEach(status => {
                const opt = document.createElement("option");
                opt.value = status;
                opt.textContent = status;
                statusSelect.appendChild(opt);
            });
        }

        // Priority Options (A, B, C, D)
        const prioritySelect = document.getElementById("priority");
        if (CONFIG.priorities) {
            CONFIG.priorities.forEach(priority => {
                const opt = document.createElement("option");
                opt.value = priority;
                opt.textContent = priority;
                prioritySelect.appendChild(opt);
            });
        }
    }
}

function saveEcrData() {
    const entry = {
        snNo: document.getElementById("snNo").value,
        hqEcNo: document.getElementById("hqEcNo").value,
        sielEcNo: document.getElementById("sielEcNo").value,
        ecReceivedDate: document.getElementById("ecReceivedDate").value,
        title: document.getElementById("title").value,
        reason: document.getElementById("reason").value,
        plant: document.getElementById("plant").value,
        agreementRaiseBy: document.getElementById("agreementRaiseBy").value,
        ecrType: document.getElementById("ecrType").value,
        pendingSince: document.getElementById("pendingSince").value,
        status: document.getElementById("status").value,
        product: document.getElementById("product").value,
        vendor: document.getElementById("vendor").value,
        hqPic: document.getElementById("hqPic").value,
        runDate: document.getElementById("runDate").value,
        ecrApprovalWeek: document.getElementById("ecrApprovalWeek").value,
        localImport: document.getElementById("localImport").value,
        pa: document.getElementById("pa").value,
        partcode: document.getElementById("partcode").value,
        remarks: document.getElementById("remarks").value,
        priority: document.getElementById("priority").value
    };

    let ecrList = JSON.parse(localStorage.getItem("ecrList")) || [];
    ecrList.push(entry);
    localStorage.setItem("ecrList", JSON.stringify(ecrList));

    document.getElementById("ecrForm").reset();
    loadTableData();
}

function loadTableData() {
    const tableBody = document.getElementById("tableBody");
    tableBody.innerHTML = "";

    let ecrList = JSON.parse(localStorage.getItem("ecrList")) || [];

    ecrList.forEach((item) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.snNo}</td>
            <td>${item.hqEcNo}</td>
            <td>${item.sielEcNo}</td>
            <td>${item.ecReceivedDate}</td>
            <td>${item.title}</td>
            <td>${item.reason}</td>
            <td>${item.plant}</td>
            <td>${item.agreementRaiseBy}</td>
            <td>${item.ecrType}</td>
            <td>${item.pendingSince}</td>
            <td class="status-${item.status}">${item.status}</td>
            <td>${item.product}</td>
            <td>${item.vendor}</td>
            <td>${item.hqPic}</td>
            <td>${item.runDate}</td>
            <td>${item.ecrApprovalWeek}</td>
            <td>${item.localImport}</td>
            <td>${item.pa}</td>
            <td>${item.partcode}</td>
            <td>${item.remarks}</td>
            <td>${item.priority}</td>
        `;
        tableBody.appendChild(row);
    });
}
