function getRandomChar(pool) {
    return pool[Math.floor(Math.random() * pool.length)];
}

function getRandomLower(){
    return getRandomChar('abcdefghijklmnopqrstuvwxyz');
}

function getRandomUpper(){
    return getRandomChar('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
}

function getRandomNumber(){
    return getRandomChar('0123456789');
}

function getRandomSymbol(){
    return getRandomChar('!@#$%^&*(){}[]=');
}


const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
};

const generate = document.getElementById("generate");

generate.addEventListener("click", () => {
    const length = document.getElementById("length").value;
    const hasUpper = document.getElementById("uppercase").checked;
    const hasLower = document.getElementById("lowercase").checked;
    const hasNumber = document.getElementById("numbers").checked;
    const hasSymbol = document.getElementById("symbols").checked;
    const result = document.getElementById("result");

    result.value = generatePassword(
        hasLower,
        hasUpper,
        hasNumber,
        hasSymbol,
        length
    );
});

function generatePassword(lower, upper, number, symbol, length){
    let generatedPassword = "";
    const typeCount = lower + upper + number + symbol;

    const typesArr = [{lower}, {upper}, {number}, {symbol}].filter((item) => Object.values(item) [0]);

    for (let i = 0; i < length; i += typeCount) {
        typesArr.forEach((type) => {
            const funcName = Object.keys(type)[0];
            generatedPassword += randomFunc[funcName]();
    });
}
const finalPassword = generatedPassword.slice(0, length);
return finalPassword;
}

const button = document.getElementById("copy");
const result = document.getElementById("result");
button.addEventListener("click", async () => {
    try {
        await navigator.clipboard.writeText(result.value);
        alert("Password copied to clipboard!");
    } catch (error) {
        console.error("Failed to copy password: ", error);
    }
});