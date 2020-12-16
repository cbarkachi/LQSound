/* eslint-disable require-jsdoc */
/* eslint-disable max-len */
function brieflyShowMessage(msg) {
    msg.style.display = "block";
    setTimeout(function () {
        msg.style.display = "none";
    }, 2000);
}
function addListeners() {
    // Messages
    var msgSoundChanged = document.getElementById("msg-sound-change");
    var msgDefaultSoundEnabled = document.getElementById("msg-default-sound-enabled");
    var msgEnableNotifications = document.getElementById("msg-enable-notifications");
    var msgInvalidURL = document.getElementById("msg-invalid-url");
    // Toggles
    var toggleSoundNotifications = document.getElementById("sound-notifications");
    toggleSoundNotifications.checked =
        localStorage.getItem("soundEnabled") === null;
    toggleSoundNotifications.onchange = function () {
        if (toggleSoundNotifications.checked) {
            localStorage.removeItem("soundEnabled");
            defaultGroup.style.display = "flex";
            formAlternateSound.style.display = toggleDefaultSound.checked
                ? "none"
                : "flex";
        }
        else {
            localStorage.setItem("soundEnabled", "false");
            defaultGroup.style.display = "none";
            formAlternateSound.style.display = "none";
        }
    };
    var toggleDefaultSound = document.getElementById("default-sound");
    var defaultGroup = document.getElementById("default-group");
    defaultGroup.style.display = toggleSoundNotifications.checked
        ? "flex"
        : "none";
    toggleDefaultSound.checked = localStorage.getItem("default") === null;
    toggleDefaultSound.onchange = function () {
        if (toggleDefaultSound.checked) {
            localStorage.removeItem("default");
            formAlternateSound.style.display = "none";
        }
        else {
            localStorage.setItem("default", "false");
            formAlternateSound.style.display = "flex";
        }
    };
    // Alternate sound form
    var formAlternateSound = document.getElementById("alternate-sound-form");
    formAlternateSound.style.display =
        toggleSoundNotifications.checked && !toggleDefaultSound.checked
            ? "flex"
            : "none";
    var fieldAlternateSound = document.getElementById("alternate-sound-url");
    formAlternateSound.onsubmit = function (event) {
        event.preventDefault();
        var url = fieldAlternateSound.value.replace(/&amp;/g, "&");
        if (!toggleSoundNotifications.checked) {
            brieflyShowMessage(msgEnableNotifications);
        }
        else if (toggleDefaultSound.checked) {
            brieflyShowMessage(msgDefaultSoundEnabled);
        }
        else {
            // Weak audio file validation
            var startPos = url.length - 3;
            var mp3 = url.indexOf("mp3", startPos) !== -1;
            var ogg = url.indexOf("ogg", startPos) !== -1;
            var wav = url.indexOf("wav", startPos) !== -1;
            if (mp3 || ogg || wav) {
                localStorage.setItem("src", url);
                fieldAlternateSound.value = "";
                brieflyShowMessage(msgSoundChanged);
            }
            else {
                brieflyShowMessage(msgInvalidURL);
            }
        }
    };
    // mail:to hyperlinks
    var toggleHyperlinks = document.getElementById("email-hyperlinks");
    toggleHyperlinks.checked = localStorage.getItem("hyperlinks") !== null;
    toggleHyperlinks.onchange = function () {
        if (toggleHyperlinks.checked) {
            localStorage.setItem("hyperlinks", "true");
        }
        else {
            localStorage.removeItem("hyperlinks");
        }
    };
}
addListeners();
