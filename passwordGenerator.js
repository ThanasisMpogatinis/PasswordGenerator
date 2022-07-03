var numbersCharset = "0123456789";
var lettersCharset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
var specialCharsCharset = "!@#$%^&*,./";

function generate() {
    var charset="";

    var length = document.getElementById('passwordLengthRange').value;
    
    var numbersCheckBox = document.getElementById('numbersCheckBox');
    var lettersCheckBox = document.getElementById('lettersCheckBox');
    var specialCharsCheckBox = document.getElementById('specialCharsCheckBox');

    if (numbersCheckBox.checked) {
        charset += numbersCharset;
    }
    if (lettersCheckBox.checked) {
        charset += lettersCharset;
    }
    if (specialCharsCheckBox.checked) {
        charset += specialCharsCharset;
    }

    passwordGenerated = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        passwordGenerated += charset.charAt(Math.floor(Math.random() * n));
    }

    var password = document.getElementById('password');
    password.textContent = passwordGenerated;

    //activate copy button
    document.getElementById('copyButton').style.display = "inline";

    calculatePasswordStrength(length, numbersCheckBox.checked, lettersCheckBox.checked, specialCharsCheckBox.checked);
}

var crackTimes = [
    ["Instanly", "Instanly" , "Instanly"], // 4chars
    ["Instanly", "Instanly" , "Instanly"], // 5chars
    ["Instanly", "1 sec" , "5 secs"], // 6chars
    ["Instanly", "1 min" , "6 mins"], // 7chars
    ["Instanly", "1 hour" , "8 hours"], // 8chars
    ["Instanly", "3 days" , "3 weeks"], // 9chars
    ["Instanly", "7 months" , "5 years"], // 10chars
    ["2 secs", "41 years" , "400 years"], // 11chars
    ["25 secs", "2k years" , "34k years"], // 12chars
    ["4 mins", "100k years", "2m years"], // 13chars
    ["41 mins", "9m years" , "200m years"], // 14chars
    ["6 hours", "600m years" , "15bn years"], // 15chars
    ["2 days", "37bn years" , "1tn years"], // 16chars
    ["4 weaks", "2tn years" , "93 tn years"], // 17chars
    ["9 months", "100tn years" , "7qd years"] // 18chars
];

function calculatePasswordStrength(length, numbers, letters, special) {
    var passwordStrength = document.getElementById('passwordStrength');
    var passwordCrackTime = document.getElementById('passwordCrackTime');

    var lengthTimes = crackTimes[length-4];
    var result = "";

    // est. crack time
    if (numbers & !letters & !special) result = lengthTimes[0];
    else if (numbers & letters & !special) result = lengthTimes[1];
    else if (numbers & letters & special) result = lengthTimes[2];
    else if (!numbers & letters & special) result = lengthTimes[1];
    else result = lengthTimes[0];

    passwordCrackTime.textContent = "est. crack time: " +result;

    // password strength
    var passwordStrengthResult = {strength: "", color: ""};

    if (result.includes("year")){
        passwordStrengthResult.strength = "Strong";
        passwordStrengthResult.color = "green";
    } else if (result.includes("month") || result.includes("week")){
        passwordStrengthResult.strength = "Weak";
        passwordStrengthResult.color = "orange";
    } else {
        passwordStrengthResult.strength = "Very Weak";
        passwordStrengthResult.color = "red";
    }

    passwordStrength.textContent = passwordStrengthResult.strength;
    passwordStrength.style.color = passwordStrengthResult.color;
}

function checkBoxesActive() {
    var numbersCheckBox = document.getElementById('numbersCheckBox');
    var lettersCheckBox = document.getElementById('lettersCheckBox');
    var specialCharsCheckBox = document.getElementById('specialCharsCheckBox');
    var generateButton = document.getElementById('generateButton');

    generateButton.disabled = true ? !numbersCheckBox.checked && !lettersCheckBox.checked && !specialCharsCheckBox.checked : false;

    console.log(generateButton.disabled)
}

function copyToClipBoard() {
    const cb = navigator.clipboard;
    const password = document.getElementById('password').textContent;
    cb.writeText(password);
  }