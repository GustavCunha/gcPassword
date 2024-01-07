export function assessPassStrength(pass: string) {
    const regexCaracteresEspeciais = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/;
    const regexLetras = /[a-zA-Z]/;
    const regexNumeros = /\d/;

    const hasSpecialCharacters = regexCaracteresEspeciais.test(pass);
    const hasLetters = regexLetras.test(pass);
    const hasNumbers = regexNumeros.test(pass);

    if (pass.length > 8 && hasLetters && hasNumbers && hasSpecialCharacters) {
        return "Forte";
    } else if (pass.length > 8 && (hasLetters && hasNumbers || hasSpecialCharacters)) {
        return "Boa";
    } else if (pass.length > 8 && (hasLetters || hasNumbers)) {
        return "Média";
    } else {
        return "Fraca";
    }
}