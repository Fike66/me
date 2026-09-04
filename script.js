// ============================================
// WEDDING INVITATION - COMPLETE SCRIPT
// ============================================

// ============================================
// 1. GUEST NAME FROM URL (NEW)
// ============================================

// Get guest name from URL parameter
function getGuestNameFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get('name');
    if (name) {
        return decodeURIComponent(name);
    }
    return null;
}

// Display guest name from URL
function displayGuestNameFromURL() {
    const guestName = getGuestNameFromURL();
    const displayElement = document.getElementById('guestNameDisplay');
    const inputElement = document.getElementById('guestName');
    
    if (guestName && displayElement) {
        // Show the name in the display element
        displayElement.textContent = guestName;
        displayElement.style.color = '#8B0000';
        displayElement.style.fontSize = '22px';
        displayElement.style.fontWeight = '700';
        displayElement.style.minHeight = '45px';
        displayElement.style.padding = '4px 10px';
        displayElement.style.margin = '2px auto';
        displayElement.style.borderBottom = '2px dashed #b88932';
        displayElement.style.display = 'inline-block';
        
        // Also update the hidden input if needed
        if (inputElement) {
            inputElement.value = guestName;
        }
        
        console.log('✅ Guest name loaded from URL:', guestName);
        return true;
    } else if (displayElement) {
        // Show default message if no name
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
// 2. ORIGINAL GUEST NAME INPUT (KEEP FOR ADMIN)
// ============================================

const guestInput = document.getElementById("guestName");
const guestDisplay = document.getElementById("guestDisplay");

// Only attach input listener if elements exist
if (guestInput && guestDisplay) {
    guestInput.addEventListener("input", () => {
        const name = guestInput.value.trim();
        guestDisplay.textContent = name || "እንግዳችን";
    });
}

// ============================================
// 3. REMOVE SHARE & ADMIN BUTTONS FROM GUESTS
// ============================================

function removeUnauthorizedButtons() {
    // Hide the entire card-actions div
    const actionsDiv = document.querySelector('.card-actions');
    if (actionsDiv) {
        actionsDiv.style.display = 'none';
    }
    
    // Also remove any share buttons that might exist elsewhere
    document.querySelectorAll('.share-btn, .share-button, .social-share, .share-icons, [id*="share"]').forEach(el => {
        el.style.display = 'none';
        el.remove();
    });
    
    // Remove any JOHN/SOL buttons
    document.querySelectorAll('button, a, div').forEach(el => {
        const text = el.textContent || '';
        if (text.includes('JOHN') || text.includes('SOL') || text.includes('index2')) {
            el.style.display = 'none';
            el.remove();
        }
    });
}

// ============================================
// 4. ORIGINAL FUNCTIONS - KEPT AS IS
// ============================================

// SHARE CARD (Original - kept for admin use)
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

// PRINT CARD (Original)
function printCard() {
    window.print();
}

// SAVE PDF (Original)
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
// 5. RUN ON PAGE LOAD
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // 1. Display guest name from URL
    displayGuestNameFromURL();
    
    // 2. Remove all share and admin buttons (for guests)
    removeUnauthorizedButtons();
    
    // 3. Hide the input field (for guests)
    const inputField = document.getElementById('guestName');
    if (inputField) {
        inputField.style.display = 'none';
    }
    
    console.log('✅ Wedding invitation loaded');
    console.log('📅 Wedding: October 17, 2026');
});

// ============================================
// 6. WATCH FOR NEW BUTTONS
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
