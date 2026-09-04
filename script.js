// ============================================
// WEDDING INVITATION - COMPLETE SCRIPT
// ============================================

// ============================================
// 1. GUEST NAME FROM URL
// ============================================

function getGuestNameFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get('name');
    if (name) {
        return decodeURIComponent(name);
    }
    return null;
}

function displayGuestNameFromURL() {
    const guestName = getGuestNameFromURL();
    const displayElement = document.getElementById('guestNameDisplay');
    const inputElement = document.getElementById('guestName');
    
    if (guestName && displayElement) {
        displayElement.textContent = guestName;
        displayElement.style.color = '#8B0000';
        displayElement.style.fontSize = '22px';
        displayElement.style.fontWeight = '700';
        displayElement.style.minHeight = '45px';
        displayElement.style.padding = '4px 10px';
        displayElement.style.margin = '2px auto';
        displayElement.style.borderBottom = '2px dashed #b88932';
        displayElement.style.display = 'inline-block';
        
        if (inputElement) {
            inputElement.value = guestName;
        }
        
        console.log('✅ Guest name loaded from URL:', guestName);
        return true;
    } else if (displayElement) {
        displayElement.textContent = 'እንግዳችን';
        displayElement.style.color = '#704716';
        displayElement.style.fontSize = '18px';
        displayElement.style.fontWeight = '400';
        displayElement.style.borderBottom = '1px solid #b88932';
        console.log('ℹ️ No guest name provided in URL');
    }
    return false;
}

// ============================================
// 2. ATTENDANCE OPTION FROM URL
// ============================================

function getAttendanceFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const attendance = urlParams.get('attendance');
    if (attendance) {
        return decodeURIComponent(attendance);
    }
    return null;
}

function displayAttendanceFromURL() {
    const attendance = getAttendanceFromURL();
    const displayElement = document.getElementById('attendanceDisplay');
    
    if (attendance && displayElement) {
        displayElement.textContent = attendance;
        displayElement.style.color = '#8B0000';
        displayElement.style.fontWeight = 'bold';
        displayElement.style.fontSize = '1.1em';
        displayElement.style.borderBottom = 'none';
        displayElement.style.padding = '0 5px';
        displayElement.style.display = 'inline-block';
        displayElement.style.minWidth = '80px';
        displayElement.style.minHeight = '25px';
        
        console.log('✅ Attendance option loaded:', attendance);
        return true;
    } else if (displayElement) {
        displayElement.textContent = '';
        displayElement.style.borderBottom = 'none';
        displayElement.style.padding = '0';
        displayElement.style.minWidth = '0';
        displayElement.style.minHeight = '0';
        displayElement.style.display = 'inline';
        console.log('ℹ️ No attendance option provided - single guest');
    }
    return false;
}

// ============================================
// 3. ORIGINAL GUEST NAME INPUT (ADMIN)
// ============================================

const guestInput = document.getElementById("guestName");
const guestDisplay = document.getElementById("guestDisplay");

if (guestInput && guestDisplay) {
    guestInput.addEventListener("input", () => {
        const name = guestInput.value.trim();
        guestDisplay.textContent = name || "እንግዳችን";
    });
}

// ============================================
// 4. REMOVE SHARE & ADMIN BUTTONS
// ============================================

function removeUnauthorizedButtons() {
    const actionsDiv = document.querySelector('.card-actions');
    if (actionsDiv) {
        actionsDiv.style.display = 'none';
    }
    
    document.querySelectorAll('.share-btn, .share-button, .social-share, .share-icons, [id*="share"]').forEach(el => {
        el.style.display = 'none';
        el.remove();
    });
    
    document.querySelectorAll('button, a, div').forEach(el => {
        const text = el.textContent || '';
        if (text.includes('JOHN') || text.includes('SOL') || text.includes('index2')) {
            el.style.display = 'none';
            el.remove();
        }
    });
}

// ============================================
// 5. ORIGINAL FUNCTIONS
// ============================================

async function shareCard() {
    const guestName = document.getElementById("guestName").value.trim();
    const shareText = guestName
        ? `ውድ ${guestName}፣ የዮሐንስ ሸዋ እና የሰላም ማረኝ የጋብቻ መልስ ፕሮግራም ላይ አንዲገኙ በክብር ጠርተንዎታል። ቀኑን እና ቦታውን ለማወቅ ሊንኩን ከፍተው ይመልከቱ። ከቤተሰቦቻቸው።`
        : `የዮሐንስ ሸዋ እና የሰላም ማረኝ የጋብቻ መልስ`;

    if (navigator.share) {
        try {
            await navigator.share({
                title: "የጋብቻ መልስ",
                text: shareText,
                url: window.location.href
            });
        } catch (error) {
            console.log("ማጋራት ተሰርዟል");
        }
    } else {
        alert("ይህ መሣሪያ በቀጥታ ማጋራትን አይደግፍም።");
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

// ============================================
// 6. RUN ON PAGE LOAD
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    displayGuestNameFromURL();
    displayAttendanceFromURL();
    removeUnauthorizedButtons();
    
    const inputField = document.getElementById('guestName');
    if (inputField) {
        inputField.style.display = 'none';
    }
    
    console.log('✅ Wedding invitation loaded');
    console.log('📅 Wedding: October 17, 2026');
});

// ============================================
// 7. WATCH FOR NEW BUTTONS
// ============================================

const observer = new MutationObserver(function() {
    removeUnauthorizedButtons();
});
observer.observe(document.body, { 
    childList: true, 
    subtree: true,
    attributes: true,
    attributeFilter: ['class', 'id', 'style']
});
