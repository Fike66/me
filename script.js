const guestInput =
    document.getElementById("guestName");

const guestDisplay =
    document.getElementById("guestDisplay");


guestInput.addEventListener("input", () => {

    const name =
        guestInput.value.trim();

    guestDisplay.textContent =
        name || "እንግዳችን";

});

async function shareCard() {

    const guestName =
        document.getElementById("guestName").value.trim();

    const shareText =
        guestName
            ? `ውድ ${guestName}፣ የዮሐንስ ሸዋ እና የሰላም ማረኝ የጋብቻ መልስ ፕሮግራም ላይ አንዲገኙ በክብር ጠርተንዎታል። ቀኑን እና ቦታውን ለማወቅ ሊንኩን ከፍተው ይመልከቱ። ቤተሰቦቻቸው።`
            : `የዮሐንስ ሸዋ እና የሰላም ማረኝ የጋብቻ መልስ`;

    if (navigator.share) {

        try {

            await navigator.share({
                title:"የጋብቻ መልስ",
                text: shareText,
                url: window.location.href
            });

        } catch (error) {

            console.log("ማጋራት ተሰርዟል");

        }

    } else {

        alert(
            "ይህ መሣሪያ በቀጥታ ማጋራትን አይደግፍም።"
        );

    }
}

function printCard() {

    window.print();

}



function savePDF() {

    const card = document.querySelector(".invitation");

    const options = {

        margin: 0,

        filename: "Yohannes-and-Selam-Wedding-Invitation.pdf",

        image: {
            type: "jpeg",
            quality: 0.98
        },

        html2canvas: {
            scale: 2,
            useCORS: true,
            backgroundColor: "#f8f0df"
        },

        jsPDF: {
            unit: "mm",
            format: "a4",
            orientation: "landscape"
        }

    };

    html2pdf()
        .set(options)
        .from(card)
        .save();

}

