function validateForm() {

    var name = document.getElementById("name").value.trim();
    var email = document.getElementById("email").value.trim();
    var password = document.getElementById("password").value;
    var mobile = document.getElementById("mobile").value;

    if (name === "") {
        alert("⚠️ Access Denied: Name missing.");
        return false;
    }

    if (!email.includes("@mitwpu.edu.in")) {
        alert("📧 Only MIT-WPU email allowed.");
        return false;
    }

    if (password.length < 6) {
        alert("🔐 Weak password detected. Minimum 6 characters required.");
        return false;
    }

    if (isNaN(mobile) || mobile.length !== 10) {
        alert("📱 Invalid mobile number. Must be 10 digits.");
        return false;
    }

    alert(
        "✅ Authentication Successful!\n\n" +
        "Welcome Prathamesh Desale 👨‍💻\n" +
        "TY CSE | MIT-WPU\n\n" +
        "System Access: GRANTED 🚀"
    );

    return true;
}
